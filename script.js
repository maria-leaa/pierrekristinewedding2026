// --- 1. Selection of Elements ---
const mainBody = document.body;
const overlay = document.getElementById('invitation-overlay');
const openBtn = document.getElementById('open-invitation-btn');
const music = document.getElementById('wedding-music');
const musicControl = document.getElementById('music-control');
const muteBtn = document.getElementById('mute-btn');
const mainNav = document.getElementById('main-nav');
const scrollBadge = document.querySelector('.hero-scroll-badge'); 
const rsvpGuide = document.getElementById('rsvp-guide');

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
// openBtn.addEventListener('click', function() {
//     overlay.style.opacity = '0';
    
//     if (music) {
//         music.play().catch(error => console.log("Audio failed: ", error));
//     }

//     setTimeout(() => {
//         overlay.classList.add('opened');
//         document.body.classList.remove('no-scroll');
//         document.body.classList.add('opened'); 
        
//         if (musicControl) musicControl.classList.remove('hidden');
//         if (mainNav) mainNav.classList.remove('hidden');

//         initFireflies(); 
//     }, 500);
// });

openBtn.addEventListener('click', function() {
    overlay.classList.add('opened'); // Triggers the CSS fade
    
    if (music) {
        music.play().catch(e => console.log("Music error: ", e));
    }

    setTimeout(() => {
        overlay.style.display = 'none';
        document.body.classList.remove('no-scroll');
        document.body.classList.add('opened'); 
        
        if (musicControl) musicControl.classList.remove('hidden');
        if (mainNav) mainNav.classList.remove('hidden');
        initFireflies(); 
    }, 1500); // 1.5s delay to match the fade animation
});



// --- 3. Hamburger Menu Logic ---
if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        // Toggle 'active' on the button (for the X animation)
        this.classList.toggle('active');
        
        // Toggle 'active' on the overlay (to slide it in and show links)
        mobileOverlay.classList.toggle('active');
        
        // Prevent background scrolling
        if (mobileOverlay.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// Close menu when a link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
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

    if (rsvpGuide) {
        if (scrollCurrent > 500) {
            rsvpGuide.classList.remove('hidden');
        } else {
            rsvpGuide.classList.add('hidden');
        }
    }
};

// --- 7. Fireflies Initialization ---
// function initFireflies() {
//     const container = document.createElement('div');
//     container.id = 'fireflies-container';
//     mainBody.appendChild(container);

//     const fireflyCount = 25; 

//     for (let i = 0; i < fireflyCount; i++) {
//         const firefly = document.createElement('div');
//         firefly.className = 'firefly';
//         const posX = Math.random() * 100;
//         const posY = Math.random() * 100;
//         firefly.style.left = posX + '%';
//         firefly.style.top = posY + '%';
//         const duration = 15 + Math.random() * 20; 
//         const delay = Math.random() * 10;
//         firefly.style.animationDuration = `${duration}s, 3s`;
//         firefly.style.animationDelay = `${delay}s`;
//         container.appendChild(firefly);
//     }
// }

// --- 7. Fireflies Initialization (Rising from Bottom) ---
function initFireflies() {
    // Prevent duplicates
    if (document.getElementById('fireflies-container')) return;

    const container = document.createElement('div');
    container.id = 'fireflies-container';
    document.body.appendChild(container);

    const fireflyCount = 40; // Total number of fireflies

    for (let i = 0; i < fireflyCount; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';
        
        // Random horizontal position (0% to 100%)
        firefly.style.left = Math.random() * 100 + 'vw';
        
        // Random travel speed (12s to 25s for a slow, graceful rise)
        const duration = 12 + Math.random() * 13;
        
        // Random start delay (up to 20s) so they don't all start at once
        const delay = Math.random() * 20;

        // Apply animations
        // 1. riseUp: handles the bottom-to-top movement
        // 2. firefly-twinkle: handles the flickering light effect
        firefly.style.animation = `
            riseUp ${duration}s linear infinite, 
            firefly-twinkle ${2 + Math.random() * 2}s ease-in-out infinite
        `;
        
        firefly.style.animationDelay = `${delay}s`;

        // Randomize size slightly
        const size = 2 + Math.random() * 3;
        firefly.style.width = size + 'px';
        firefly.style.height = size + 'px';

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


// --- 9. RSVP Form Logic (Live Connection + Thank You UI) ---
const rsvpForm = document.getElementById('rsvp-form');
const rsvpHeader = document.getElementById('rsvp-header');
const thankYouMessage = document.getElementById('rsvp-thank-you');
const scriptURL = 'https://script.google.com/macros/s/AKfycbw-QpP4o48zMMdgNfEA0Lj03g3X20LbRrPnAPRKA-RUmDbQKfF9H9nk2sE_LOaE4J8KmA/exec';

if (rsvpForm) {
    rsvpForm.addEventListener('submit', e => {
        e.preventDefault();
        
        const btn = rsvpForm.querySelector('button');
        btn.innerText = "SENDING...";
        btn.disabled = true;

        fetch(scriptURL, { 
            method: 'POST', 
            body: new FormData(rsvpForm)
        })
        .then(response => {
            console.log('Success!', response);
            
            // ANIMATION: Hide form and show Thank You UI
            rsvpForm.style.transition = "opacity 0.5s ease";
            rsvpForm.style.opacity = "0";
            rsvpHeader.style.transition = "opacity 0.5s ease";
            rsvpHeader.style.opacity = "0";

            setTimeout(() => {
                rsvpForm.style.display = "none";
                rsvpHeader.style.display = "none"; 
                thankYouMessage.style.display = "block";
                
                // Scroll slightly to center the thank you message if needed
                thankYouMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
        })
        .catch(error => {
            console.error('Error!', error.message);
            btn.innerText = "TRY AGAIN";
            btn.disabled = false;
            alert("Oops! There was an error. Please check your internet and try again.");
        });
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
