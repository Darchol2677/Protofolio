document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. Sticky Header scroll effects
    // ==========================================================================
    const header = document.querySelector('.header');
    const scrollProgressBar = document.getElementById('scroll-progress');
    
    const handleScroll = () => {
        // Sticky header logic
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Scroll progress bar logic
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (window.scrollY / totalHeight) * 100;
            scrollProgressBar.style.width = `${progress}%`;
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger on load in case of page refresh down the page

    // ==========================================================================
    // 2. Mobile Nav Drawer Toggle
    // ==========================================================================
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    const toggleMenu = () => {
        const isOpen = mobileMenu.classList.contains('open');
        
        if (isOpen) {
            mobileMenu.classList.remove('open');
            mobileMenu.setAttribute('aria-hidden', 'true');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = ''; // Restore scroll
        } else {
            mobileMenu.classList.add('open');
            mobileMenu.setAttribute('aria-hidden', 'false');
            menuToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden'; // Prevent scroll when drawer open
        }
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Close mobile drawer when clicking links
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // Close mobile drawer when resizing back to desktop sizes
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('open')) {
            toggleMenu();
        }
    });

    // ==========================================================================
    // 3. Interactive Cursor Spotlight Effect
    // ==========================================================================
    const mouseSpotlight = document.createElement('div');
    mouseSpotlight.className = 'mouse-spotlight';
    document.body.appendChild(mouseSpotlight);

    window.addEventListener('mousemove', (e) => {
        mouseSpotlight.style.opacity = '1';
        // Adjust for element coordinates
        mouseSpotlight.style.left = `${e.clientX}px`;
        mouseSpotlight.style.top = `${e.clientY}px`;
    });

    document.addEventListener('mouseleave', () => {
        mouseSpotlight.style.opacity = '0';
    });

    // ==========================================================================
    // 4. Scroll Reveal (Intersection Observer)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal-fade-in, .reveal-slide-in, .reveal-scale-in');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after revealing to prevent repetitive triggering
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before it hits the visible view
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================================================
    // 4b. Bidirectional Section Scroll-wipe (Exit/Entry) transitions
    // ==========================================================================
    const mainSections = document.querySelectorAll('.hero-section, .section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const rect = entry.boundingClientRect;
            
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.classList.remove('exit-up');
            } else {
                if (rect.top < 0) {
                    // Exited out of the top of viewport (scrolled down past it)
                    entry.target.classList.add('exit-up');
                    entry.target.classList.remove('active');
                } else {
                    // Exited out of the bottom of viewport (scrolled up past it)
                    entry.target.classList.remove('active');
                    entry.target.classList.remove('exit-up');
                }
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '-5% 0px -5% 0px' // Trigger transitions slightly within boundaries
    });

    mainSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ==========================================================================
    // 5. Active Nav Highlight on Scroll
    // ==========================================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const highlightNav = () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            // Get scroll position centered on window height for better accuracy
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', highlightNav);
    highlightNav();
});
