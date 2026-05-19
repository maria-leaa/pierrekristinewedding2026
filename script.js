// --- 1. Selection of Elements ---
const mainBody = document.body;
const overlay = document.getElementById('invitation-overlay');
const openBtn = document.getElementById('open-invitation-btn');
const music = document.getElementById('wedding-music');
const musicControl = document.getElementById('music-control');
const muteBtn = document.getElementById('mute-btn');
const mainNav = document.getElementById('main-nav');
const scrollBadge = document.querySelector('.hero-scroll-badge'); 

// Back to Top Elements
const backToTop = document.getElementById('back-to-top');
const progressCircle = document.getElementById('scroll-progress');
const radius = 24; 
const circumference = 2 * Math.PI * radius;

// Hamburger Menu Elements
const menuToggle = document.getElementById('menu-toggle');
const mobileOverlay = document.getElementById('mobile-menu-overlay');
const mobileLinks = document.querySelectorAll('.mobile-menu-content a');

// Initialize Progress Circle
if (progressCircle) {
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;
}

// Start with no scroll (prevent browsing until opened)
document.body.classList.add('no-scroll');

// --- 2. Open Invitation Logic ---
openBtn.addEventListener('click', function() {
    overlay.style.opacity = '0';
    
    if (music) {
        music.play().catch(error => console.log("Audio failed: ", error));
    }

    setTimeout(() => {
        overlay.classList.add('opened');
        document.body.classList.remove('no-scroll');
        document.body.classList.add('opened'); 
        
        if (musicControl) musicControl.classList.remove('hidden');
        if (mainNav) mainNav.classList.remove('hidden');

        // START ENCHANTED FIREFLIES
        initFireflies(); 
    }, 500);
});

// --- 3. Hamburger Menu Logic ---
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        
        // Prevent background scrolling when menu is open
        if (mobileOverlay.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
}

// Close menu when a link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// --- 4. Music Toggle Logic ---
if (muteBtn) {
    muteBtn.addEventListener('click', function() {
        const waves = document.getElementById('music-waves');
        const slash = document.getElementById('music-slash');
        
        if (music.paused) {
            music.play();
            waves.style.display = "block";
            slash.style.display = "none";
            muteBtn.classList.add('playing');
        } else {
            music.pause();
            waves.style.display = "none";
            slash.style.display = "block";
            muteBtn.classList.remove('playing');
        }
    });
}

// --- 5. Countdown Timer Logic ---
const weddingDate = new Date("July 3, 2026 14:30:00").getTime();
const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const countdownElement = document.getElementById("countdown");
    if (countdownElement) {
        countdownElement.innerHTML = `${days}D : ${hours}H : ${minutes}M : ${seconds}S`;
    }

    if (distance < 0) {
        clearInterval(timer);
        if (countdownElement) countdownElement.innerHTML = "TODAY IS THE DAY!";
    }
}, 1000);

// --- 6. Unified Scroll Handler ---
const handleScroll = () => {
    const scrollCurrent = window.scrollY;
    const windowHeight = window.innerHeight;

    // A. Reveal elements on scroll
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });

    // B. Navbar & Scroll Badge Logic
    const hero = document.querySelector('.main-hero');
    if (hero) {
        const heroHeight = hero.offsetHeight;
        
        if (scrollCurrent > (heroHeight - 80)) { 
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }

        if (scrollBadge) {
            if (scrollCurrent > 50) {
                scrollBadge.style.opacity = "0";
                scrollBadge.style.pointerEvents = "none";
            } else {
                scrollBadge.style.opacity = "0.8";
                scrollBadge.style.pointerEvents = "auto";
            }
        }
    }

    // C. Back to Top & Progress Ring Logic
    if (backToTop && progressCircle) {
        if (scrollCurrent > 600) {
            backToTop.classList.remove('hidden');
        } else {
            backToTop.classList.add('hidden');
        }

        const scrollTotal = document.documentElement.scrollHeight - windowHeight;
        const scrollPercent = scrollCurrent / scrollTotal;
        const offset = circumference - (scrollPercent * circumference);
        progressCircle.style.strokeDashoffset = offset;
    }
};

// --- 7. Fireflies Initialization ---
function initFireflies() {
    const container = document.createElement('div');
    container.id = 'fireflies-container';
    mainBody.appendChild(container);

    const fireflyCount = 25; 

    for (let i = 0; i < fireflyCount; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        firefly.style.left = posX + '%';
        firefly.style.top = posY + '%';
        const duration = 15 + Math.random() * 20; 
        const delay = Math.random() * 10;
        firefly.style.animationDuration = `${duration}s, 3s`;
        firefly.style.animationDelay = `${delay}s`;
        container.appendChild(firefly);
    }
}

// --- 8. Event Listeners ---
window.addEventListener("scroll", handleScroll);

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Smooth Scroll for All Navigation Links (Desktop + Mobile)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Initial call
handleScroll();
