
// animation.js
document.addEventListener('DOMContentLoaded', () => {
    // --- HERO ANIMATION (Three.js) ---
    const container = document.getElementById('hero-animation');
    if (container) {
        // SCENE
        const scene = new THREE.Scene();

        // CAMERA
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 1.8;

        // RENDERER
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // GEOMETRY
        const geometry = new THREE.IcosahedronGeometry(0.9, 4);

        // MATERIAL
        const material = new THREE.MeshBasicMaterial({
            color: 0xffea00,
            wireframe: true,
            transparent: true,
            opacity: 0.8,
            wireframeLinewidth: 2,
        });

        // MESH
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.x = -2;
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
            const width = container.clientWidth;
            const height = container.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
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
});
