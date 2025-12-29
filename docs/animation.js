
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

    // --- SCROLLYTELLING LOGIC (legacy, removed) ---
    // The architecture scrolly section has been removed in the redesign.
});
