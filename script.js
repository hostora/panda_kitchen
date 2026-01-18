document.addEventListener('DOMContentLoaded', () => {

    /* -----------------------------------------------
       1. Mobile Navigation Toggle
    ----------------------------------------------- */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const navContainer = document.querySelector('.nav-links-container');
    const overlay = document.querySelector('.nav-overlay');
    const body = document.body;

    function openMenu() {
        navContainer.classList.add('nav-active');
        body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navContainer.classList.remove('nav-active');
        body.style.overflow = 'auto';
    }

    if (mobileToggle) mobileToggle.addEventListener('click', openMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    /* -----------------------------------------------
       2. Sticky Navbar Effect
    ----------------------------------------------- */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* -----------------------------------------------
       3. Intersection Observer for Scroll Animations
    ----------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* -----------------------------------------------
       4. Hero Parallax Effect
    ----------------------------------------------- */
    const heroBg = document.querySelector('.hero-bg');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        // Limit the calculation to top of page to save performance
        if (scrollPosition < 800) {
            heroBg.style.transform = `translateZ(0) translateY(${scrollPosition * 0.4}px)`;
        }
    });

    /* -----------------------------------------------
       5. Reviews Carousel
    ----------------------------------------------- */
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const dotsNav = document.querySelector('.carousel-nav');
    const dots = Array.from(dotsNav.children);

    const slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange the slides next to one another
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
        // We aren't using absolute positioning for flex layout, 
        // but we need to translate the track. 
        // Actually, with flex, we just need to translate the track container.
    };

    // Simple index-based approach for flexibility
    let currentIndex = 0;

    const updateCarousel = (index) => {
        // Move track
        const amountToMove = -100 * index;
        track.style.transform = `translateX(${amountToMove}%)`;

        // Update dots
        dots.forEach(d => d.classList.remove('current-slide'));
        dots[index].classList.add('current-slide');

        currentIndex = index;
    };

    // Click events
    nextButton.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        updateCarousel(nextIndex);
        resetAutoPlay();
    });

    prevButton.addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel(prevIndex);
        resetAutoPlay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateCarousel(index);
            resetAutoPlay();
        });
    });

    // Auto Play
    let autoPlayInterval;

    const startAutoPlay = () => {
        autoPlayInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % slides.length;
            updateCarousel(nextIndex);
        }, 5000); // Change slide every 5 seconds
    };

    const resetAutoPlay = () => {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    };

    startAutoPlay();

});
