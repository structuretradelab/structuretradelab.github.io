
    // ============================================
    // DARK MODE FUNCTIONALITY
    // ============================================
    
    (function() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        const toggleIcon = darkModeToggle ? darkModeToggle.querySelector('.toggle-icon') : null;
        const toggleText = darkModeToggle ? darkModeToggle.querySelector('.toggle-text') : null;
        
        // Check for saved preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Set initial theme
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-mode');
            if (toggleIcon) toggleIcon.textContent = '☀️';
            if (toggleText) toggleText.textContent = 'Light';
        } else {
            document.body.classList.remove('dark-mode');
            if (toggleIcon) toggleIcon.textContent = '🌙';
            if (toggleText) toggleText.textContent = 'Dark';
        }
        
        // Toggle function
        function toggleDarkMode() {
            if (document.body.classList.contains('dark-mode')) {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
                if (toggleIcon) toggleIcon.textContent = '🌙';
                if (toggleText) toggleText.textContent = 'Dark';
            } else {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
                if (toggleIcon) toggleIcon.textContent = '☀️';
                if (toggleText) toggleText.textContent = 'Light';
            }
        }
        
        // Add event listener
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', toggleDarkMode);
        }
        
        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    document.body.classList.add('dark-mode');
                    if (toggleIcon) toggleIcon.textContent = '☀️';
                    if (toggleText) toggleText.textContent = 'Light';
                } else {
                    document.body.classList.remove('dark-mode');
                    if (toggleIcon) toggleIcon.textContent = '🌙';
                    if (toggleText) toggleText.textContent = 'Dark';
                }
            }
        });
    })();
    
    // ============================================
    // SMART HEADER (Hide on scroll down, show on scroll up)
    // ============================================
    
    (function() {
        const header = document.querySelector('header');
        if (!header) return;
        
        let lastScrollY = window.scrollY;
        let ticking = false;
        let headerHeight = header.offsetHeight;
        
        header.style.transition = 'transform 0.3s ease-in-out';
        
        function handleScroll() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY <= 10) {
                header.style.transform = 'translateY(0)';
                lastScrollY = currentScrollY;
                ticking = false;
                return;
            }
            
            if (currentScrollY > lastScrollY && currentScrollY > headerHeight) {
                header.style.transform = 'translateY(-100%)';
            } else if (currentScrollY < lastScrollY) {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(handleScroll);
                ticking = true;
            }
        });
        
        window.addEventListener('resize', function() {
            headerHeight = header.offsetHeight;
        });
    })();
    
    // ============================================
    // HAMBURGER MENU
    // ============================================
    
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mainNav = document.getElementById('mainNav');
    const menuOverlay = document.getElementById('menuOverlay');
    
    function toggleMenu() {
        if (hamburgerBtn) hamburgerBtn.classList.toggle('active');
        if (mainNav) mainNav.classList.toggle('active');
        if (menuOverlay) menuOverlay.classList.toggle('active');
        if (mainNav && mainNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleMenu);
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', toggleMenu);
    }
    
    if (mainNav) {
        document.querySelectorAll('#mainNav a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }
    
    // Set current year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

