// ============================================
// COMMON.JS - Shared Across ALL Pages
// ============================================
// Includes: Dark Mode, Smart Header, Hamburger Menu,
// Current Year, Smooth Scroll, Google Analytics
// ============================================

(function() {
    'use strict';

    // ============================================
    // DARK MODE FUNCTIONALITY
    // Uses document.documentElement (html tag) to prevent flash
    // ============================================

    //     <!-- PREVENT FLASH OF LIGHT IN DARK MODE add this script in the <head> -->
    // <script>
    //     (function() {
    //         const savedTheme = localStorage.getItem('theme');
    //         const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    //         if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    //             document.documentElement.classList.add('dark-mode');
    //         }
    //     })();
    // </script>


    (function() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        const toggleIcon = darkModeToggle ? darkModeToggle.querySelector('.toggle-icon') : null;
        const toggleText = darkModeToggle ? darkModeToggle.querySelector('.toggle-text') : null;

        // Check for saved preference (already applied in head, but sync toggle state)
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Set toggle button state based on current theme
        if (document.documentElement.classList.contains('dark-mode')) {
            if (toggleIcon) toggleIcon.textContent = '☀️';
            if (toggleText) toggleText.textContent = 'Light';
        } else {
            if (toggleIcon) toggleIcon.textContent = '🌙';
            if (toggleText) toggleText.textContent = 'Dark';
        }

        // Toggle function
        window.toggleDarkMode = function() {
            if (document.documentElement.classList.contains('dark-mode')) {
                document.documentElement.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
                if (toggleIcon) toggleIcon.textContent = '🌙';
                if (toggleText) toggleText.textContent = 'Dark';
            } else {
                document.documentElement.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
                if (toggleIcon) toggleIcon.textContent = '☀️';
                if (toggleText) toggleText.textContent = 'Light';
            }
        };

        // Add event listener
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', window.toggleDarkMode);
        }

        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    document.documentElement.classList.add('dark-mode');
                    if (toggleIcon) toggleIcon.textContent = '☀️';
                    if (toggleText) toggleText.textContent = 'Light';
                } else {
                    document.documentElement.classList.remove('dark-mode');
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
    (function() {
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const mainNav = document.getElementById('mainNav');
        const menuOverlay = document.getElementById('menuOverlay');

        if (!hamburgerBtn || !mainNav) return;

        function toggleMenu() {
            hamburgerBtn.classList.toggle('active');
            mainNav.classList.toggle('active');
            if (menuOverlay) menuOverlay.classList.toggle('active');
            
            if (mainNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }

        hamburgerBtn.addEventListener('click', toggleMenu);

        if (menuOverlay) {
            menuOverlay.addEventListener('click', toggleMenu);
        }

        document.querySelectorAll('#mainNav a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    })();

    // ============================================
    // SET CURRENT YEAR IN FOOTER
    // ============================================
    (function() {
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    })();

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    (function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    })();

    // ============================================
    // GOOGLE ANALYTICS INJECTION (only if not already loaded)
    // ============================================
    (function() {
        // Check if GA already exists
        if (typeof gtag !== 'function') {
            var gTagScript = document.createElement('script');
            gTagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-9HB3LHNF2W";
            gTagScript.async = true;
            document.head.appendChild(gTagScript);

            window.dataLayer = window.dataLayer || [];
            window.gtag = function() { dataLayer.push(arguments); };
            gtag('js', new Date());
            gtag('config', 'G-9HB3LHNF2W');
        }
    })();

})();