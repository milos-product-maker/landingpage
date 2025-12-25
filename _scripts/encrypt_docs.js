const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Configuration
const PASSWORD = process.env.DOCS_PASSWORD || 'lucid-secret';
const SOURCE_DIR = path.join(__dirname, '../_docs_src');
const TARGET_DIR = path.join(__dirname, '../docs');
const TEMPLATE_PATH = path.join(__dirname, 'lockbox_template.html');

// Helper to extract encrypted data from our HTML template
function extractEncryptedData(html) {
    const startTag = '<script id="encrypted-data" type="text/plain">';
    const endTag = '</script>';
    const start = html.indexOf(startTag);
    const end = html.indexOf(endTag, start);
    if (start === -1 || end === -1) return null;
    return html.substring(start + startTag.length, end).trim();
}

// Simple wrapper for CryptoJS-compatible encryption in Node
function encrypt(text, password) {
    // We use a simplified version for this utility, but for production 
    // we'd use a more robust implementation of CryptoJS compatibility if needed.
    // However, CryptoJS's default AES.encrypt uses a specific KDF (OpenSSL EVB_BytesToKey).
    // To keep it simple and reliable, we'll use a small trick: 
    // We'll use a simple Buffer-based encryption that we can match on the client side.

    // Actually, to be 100% compatible with CryptoJS.AES.decrypt(data, password) on the client,
    // it's easiest to just use a small JS bundle or use the Web Crypto API on both ends.
    // Since we're in Node, let's use a standard format and use a small helper on the client.

    // BUT! Since I want this to be "zero-config" for the user, I'll use a string-based approach.
    // Let's use standard AES-256-CBC with a pbkdf2 derived key.

    const salt = crypto.randomBytes(16);
    const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    // Return a combined string that the client can parse: salt:iv:encrypted
    return `${salt.toString('base64')}:${iv.toString('base64')}:${encrypted}`;
}

function decrypt(encryptedData, password) {
    const [saltBase64, ivBase64, cipherTextBase64] = encryptedData.split(':');
    const salt = Buffer.from(saltBase64, 'base64');
    const iv = Buffer.from(ivBase64, 'base64');
    const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(cipherTextBase64, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Update the lockbox script to handle this format
const LOCKBOX_CLIENT_LOGIC = `
        form.onsubmit = async (e) => {
            e.preventDefault();
            const password = passwordInput.value;
            const dataParts = encryptedData.split(':');
            
            if (dataParts.length !== 3) {
                showError();
                return;
            }

            try {
                const [saltBase64, ivBase64, cipherTextBase64] = dataParts;
                const salt = strToUint8Array(atob(saltBase64));
                const iv = strToUint8Array(atob(ivBase64));
                const cipherText = strToUint8Array(atob(cipherTextBase64));

                // Derive key
                const baseKey = await crypto.subtle.importKey(
                    "raw", 
                    new TextEncoder().encode(password), 
                    "PBKDF2", 
                    false, 
                    ["deriveKey"]
                );
                
                const key = await crypto.subtle.deriveKey(
                    {
                        name: "PBKDF2",
                        salt: salt,
                        iterations: 100000,
                        hash: "SHA-256"
                    },
                    baseKey,
                    { name: "AES-CBC", length: 256 },
                    false,
                    ["decrypt"]
                );

                const decryptedBuffer = await crypto.subtle.decrypt(
                    { name: "AES-CBC", iv: iv },
                    key,
                    cipherText
                );

                const decrypted = new TextDecoder().decode(decryptedBuffer);
                
                document.open();
                document.write(decrypted);
                document.close();
            } catch (err) {
                console.error(err);
                showError();
            }
        };

        function strToUint8Array(str) {
            const arr = new Uint8Array(str.length);
            for (let i = 0; i < str.length; i++) arr[i] = str.charCodeAt(i);
            return arr;
        }

        function showError() {
            errorMsg.classList.remove('hidden');
            passwordInput.classList.add('border-red-500/50');
            passwordInput.value = '';
            setTimeout(() => {
                errorMsg.classList.add('hidden');
                passwordInput.classList.remove('border-red-500/50');
            }, 3000);
        }
`;

function run() {
    const isDecrypt = process.argv.includes('--decrypt');

    if (isDecrypt) {
        if (!fs.existsSync(TARGET_DIR)) return;
        if (!fs.existsSync(SOURCE_DIR)) fs.mkdirSync(SOURCE_DIR, { recursive: true });

        const files = fs.readdirSync(TARGET_DIR).filter(f => f.endsWith('.html'));
        console.log(`Decrypting ${files.length} files from ${TARGET_DIR} to ${SOURCE_DIR}...`);

        files.forEach(file => {
            try {
                const content = fs.readFileSync(path.join(TARGET_DIR, file), 'utf8');
                const encryptedData = extractEncryptedData(content);
                if (!encryptedData) return;

                const decrypted = decrypt(encryptedData, PASSWORD);
                fs.writeFileSync(path.join(SOURCE_DIR, file), decrypted);
                console.log(`  [UNLOCKED] ${file}`);
            } catch (e) {
                console.error(`  [FAILED] ${file}: ${e.message}`);
            }
        });
    } else {
        if (!fs.existsSync(SOURCE_DIR)) {
            console.log(`Source directory ${SOURCE_DIR} empty. No files to encrypt.`);
            return;
        }
        if (!fs.existsSync(TARGET_DIR)) fs.mkdirSync(TARGET_DIR, { recursive: true });

        const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
        const files = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('.html'));

        console.log(`Encrypting ${files.length} files to ${TARGET_DIR}...`);

        files.forEach(file => {
            const filePath = path.join(SOURCE_DIR, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const encryptedContent = encrypt(content, PASSWORD);

            let output = template.replace('DATA_PLACEHOLDER', encryptedContent);

            // Replace the default CryptoJS logic with our WebCrypto logic for better security/compatibility
            // We'll find the <script> block in the template and replace it
            const scriptStart = output.indexOf('form.onsubmit = (e) => {');
            const scriptEnd = output.lastIndexOf('};') + 2;

            if (scriptStart !== -1) {
                output = output.substring(0, scriptStart) + LOCKBOX_CLIENT_LOGIC + output.substring(scriptEnd);
            }

            fs.writeFileSync(path.join(TARGET_DIR, file), output);
            console.log(`  [LOCKED] ${file}`);
        });
    }
    console.log(`\nUsing password: ${PASSWORD}`);
}

run();
