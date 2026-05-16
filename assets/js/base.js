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

// Mobile menu toggle (full-screen overlay)
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenuButton || !mobileMenu) return;

    const buttonIcon = mobileMenuButton.querySelector('.material-symbols-outlined');

    const setOpen = (open) => {
        mobileMenu.classList.toggle('is-open', open);
        mobileMenuButton.setAttribute('aria-expanded', String(open));
        mobileMenu.setAttribute('aria-hidden', String(!open));
        document.body.classList.toggle('menu-open', open);
        if (buttonIcon) buttonIcon.textContent = open ? 'close' : 'menu';
    };

    mobileMenuButton.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');

    mobileMenuButton.addEventListener('click', function(e) {
        e.preventDefault();
        setOpen(!mobileMenu.classList.contains('is-open'));
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
            setOpen(false);
        }
    });
});

// Initialize 3D Globe
let scene, camera, renderer, globe, particles;
let mouseX = 0, mouseY = 0;

function initGlobe() {
    const container = document.getElementById('globe-container');
    if (!container || typeof THREE === 'undefined') return;

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
    if (!globe || !particles) return;
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
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize globe on load
initGlobe();

// Cyber lines animation
function createCyberLine() {
    const container = document.getElementById('cyber-lines');
    if (!container) return;
    const line = document.createElement('div');
    line.className = 'cyber-line';
    line.style.left = Math.random() * 100 + '%';
    line.style.animationDuration = (Math.random() * 3 + 2) + 's';
    container.appendChild(line);

    setTimeout(() => {
        line.remove();
    }, 5000);
}

if (document.getElementById('cyber-lines')) {
    setInterval(createCyberLine, 200);
}

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

// Mobile top nav: collapse the brand pill to just the logo circle on scroll,
// expand back when scrolled to the very top.
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.getElementById('topnav');
    if (!nav) return;
    const THRESHOLD = 24;
    let ticking = false;
    function apply() {
        nav.classList.toggle('is-scrolled', window.scrollY > THRESHOLD);
        ticking = false;
    }
    window.addEventListener('scroll', function() {
        if (!ticking) { ticking = true; requestAnimationFrame(apply); }
    }, { passive: true });
    apply();
});