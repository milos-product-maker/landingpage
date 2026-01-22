
// animation.js
document.addEventListener('DOMContentLoaded', () => {
    // --- HERO ANIMATION (Three.js) ---
    const container = document.getElementById('hero-animation');
    if (container) {
        // SCENE
        const scene = new THREE.Scene();

        // Use a fixed square aspect ratio for the camera to keep sphere circular
        const size = Math.min(container.clientWidth, container.clientHeight);

        // CAMERA - Fixed 1:1 aspect ratio
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 1.8;

        // RENDERER - Square canvas
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(size, size);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Position canvas at left edge, vertically centered
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.top = '50%';
        renderer.domElement.style.transform = 'translateY(-50%)';

        container.appendChild(renderer.domElement);

        // GEOMETRY - increased size
        const geometry = new THREE.IcosahedronGeometry(1.2, 4);

        // MATERIAL
        const material = new THREE.MeshBasicMaterial({
            color: 0xf8d648,
            wireframe: true,
            transparent: true,
            opacity: 0.8,
            wireframeLinewidth: 2,
        });

        // MESH - No scaling needed now!
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.x = -1.2; // Moved right to show ~50-60% of sphere
        scene.add(sphere);

        // ANIMATION LOOP
        function animate() {
            requestAnimationFrame(animate);
            sphere.rotation.y += 0.0005;
            sphere.rotation.x += 0.0002;
            renderer.render(scene, camera);
        }
        animate();

        // RESIZE HANDLE
        window.addEventListener('resize', () => {
            const newSize = Math.min(container.clientWidth, container.clientHeight);
            renderer.setSize(newSize, newSize);
            // Camera aspect stays 1:1, no update needed
        });
    }

    // --- SCROLLYTELLING LOGIC (always runs) ---
    const triggers = document.querySelectorAll('.trigger');
    const textPanels = document.querySelectorAll('.text-panel');
    const svgElements = {
        'tee-box': [document.getElementById('tee-box'), document.getElementById('sovereign-container-group')],
        'evaluator-box': [document.getElementById('evaluator-box')],
        'verifier-box': [document.getElementById('verifier-box'), document.getElementById('verification-group')]
    };

    // Set first panel as active by default
    if (textPanels.length > 0) {
        textPanels[0].classList.add('active');
    }
    if (svgElements['tee-box']) {
        svgElements['tee-box'].forEach(el => {
            if (el) el.classList.add('highlighted');
        });
    }

    if (triggers.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const highlightId = entry.target.getAttribute('data-highlight');
                    const panelId = entry.target.getAttribute('data-panel');

                    // Update text panels
                    textPanels.forEach(p => p.classList.remove('active'));
                    const activePanel = document.getElementById(panelId);
                    if (activePanel) {
                        activePanel.classList.add('active');
                    }

                    // Update SVG highlights
                    Object.values(svgElements).forEach(els => {
                        els.forEach(el => {
                            if (el) el.classList.remove('highlighted');
                        });
                    });
                    if (svgElements[highlightId]) {
                        svgElements[highlightId].forEach(el => {
                            if (el) el.classList.add('highlighted');
                        });
                    }
                }
            });
        }, observerOptions);

        triggers.forEach(trigger => observer.observe(trigger));
    }

    // --- MARKETPLACE CAROUSEL (Infinite Loop) ---
    const marketplaceTrack = document.getElementById('marketplace-track');
    if (marketplaceTrack) {
        const cardWidth = 360 + 24; // card width + gap (updated to 360px)
        const originalCards = Array.from(marketplaceTrack.children);
        const numOriginalCards = originalCards.length;

        // Clone all cards and append for seamless loop
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            marketplaceTrack.appendChild(clone);
        });

        let marketplacePosition = 0;
        let autoScrollVelocity = 0.5; // pixels per frame
        let isHovering = false;
        const totalWidth = numOriginalCards * cardWidth;

        // Auto-scroll animation with seamless loop
        function animateMarketplace() {
            if (!isHovering) {
                marketplacePosition += autoScrollVelocity;

                // Seamless reset when we've scrolled past the original set
                if (marketplacePosition >= totalWidth) {
                    marketplacePosition = 0;
                }

                marketplaceTrack.style.transform = `translateX(-${marketplacePosition}px)`;
            }
            requestAnimationFrame(animateMarketplace);
        }

        // Start animation
        animateMarketplace();

        // Pause on hover
        marketplaceTrack.addEventListener('mouseenter', () => {
            isHovering = true;
        });

        marketplaceTrack.addEventListener('mouseleave', () => {
            isHovering = false;
        });

        // Manual scroll function (exposed globally for onclick)
        window.scrollMarketplace = function(direction) {
            marketplacePosition += direction * cardWidth;

            // Wrap around for infinite loop
            if (marketplacePosition < 0) {
                marketplacePosition = totalWidth + marketplacePosition;
            } else if (marketplacePosition >= totalWidth) {
                marketplacePosition = marketplacePosition - totalWidth;
            }

            marketplaceTrack.style.transform = `translateX(-${marketplacePosition}px)`;
        };
    }

    // --- LOGO CAROUSEL (Social Proof) ---
    const logoTrack = document.getElementById('logo-carousel-track');
    if (logoTrack) {
        const logoItems = Array.from(logoTrack.children);
        const numLogos = logoItems.length;

        // Clone logos multiple times for seamless infinite scroll
        for (let i = 0; i < 3; i++) {
            logoItems.forEach(item => {
                const clone = item.cloneNode(true);
                logoTrack.appendChild(clone);
            });
        }

        let logoPosition = 0;
        const logoScrollSpeed = 0.3;
        const logoGap = 64; // 4rem = 64px
        const logoWidth = logoItems[0].offsetWidth + logoGap;
        const totalLogoWidth = numLogos * logoWidth;

        function animateLogos() {
            logoPosition += logoScrollSpeed;

            if (logoPosition >= totalLogoWidth) {
                logoPosition = 0;
            }

            logoTrack.style.transform = `translateX(-${logoPosition}px)`;
            requestAnimationFrame(animateLogos);
        }

        animateLogos();
    }
});
