// Check for development parameter and show team section
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const isDevelopment = urlParams.has('development');

    if (isDevelopment) {
        // Show team section and navigation links
        const teamSection = document.getElementById('team');
        const navTeam = document.getElementById('nav-team');
        const mobileNavTeam = document.getElementById('mobile-nav-team');

        if (teamSection) teamSection.style.display = 'block';
        if (navTeam) navTeam.style.display = 'block';
        if (mobileNavTeam) mobileNavTeam.style.display = 'block';
    }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    console.log('Menu button:', mobileMenuButton);
    console.log('Mobile menu:', mobileMenu);

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Button clicked!');
            mobileMenu.classList.toggle('hidden');
            console.log('Menu classes after toggle:', mobileMenu.className);
        });

        // Close menu when clicking on a link
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    } else {
        console.error('Menu elements not found!');
    }
});

// Initialize 3D Globe
let scene, camera, renderer, globe, particles;
let mouseX = 0, mouseY = 0;

function initGlobe() {
    const container = document.getElementById('globe-container');
    
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create globe geometry
    const geometry = new THREE.SphereGeometry(10, 64, 32);
    const material = new THREE.MeshBasicMaterial({
        color: 0x1c2f44,
        transparent: true,
        opacity: 0.1,
        wireframe: true
    });
    globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        color: 0x1c2f44,
        size: 0.5,
        transparent: true,
        opacity: 0.6
    });

    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    globe.rotation.y += 0.005;
    particles.rotation.y -= 0.001;
    particles.rotation.x -= 0.001;

    // Mouse interaction
    globe.rotation.x += (mouseY * 0.0001);
    globe.rotation.y += (mouseX * 0.0001);

    renderer.render(scene, camera);
}

// Mouse movement
document.addEventListener('mousemove', function(event) {
    mouseX = event.clientX - window.innerWidth / 2;
    mouseY = event.clientY - window.innerHeight / 2;
});

// Window resize
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize globe on load
initGlobe();

// Cyber lines animation
function createCyberLine() {
    const line = document.createElement('div');
    line.className = 'cyber-line';
    line.style.left = Math.random() * 100 + '%';
    line.style.animationDuration = (Math.random() * 3 + 2) + 's';
    document.getElementById('cyber-lines').appendChild(line);

    setTimeout(() => {
        line.remove();
    }, 5000);
}

setInterval(createCyberLine, 200);

// Copyright year
const copyrightYear = document.getElementById('copyright-year');
if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});