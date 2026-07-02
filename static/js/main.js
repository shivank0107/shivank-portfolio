/* ==========================================================
   PORTFOLIO MAIN.JS
   Version : 3.0 (Cleaned)
   Author  : Shivank Rastogi
========================================================== */

/* ==========================================================
   CONFIG
========================================================== */

const CONFIG = {

    typingSpeed: 100,
    deletingSpeed: 60,
    typingDelay: 1500,
    counterDuration: 1500,
    counterSteps: 100,
    progressDuration: 1200,

    typingWords: [
        "Database Developer",
        "MySQL Developer",
        "SQL Server Developer",
        "Python Developer",
        "ETL Developer"
    ]

};

/* ==========================================================
   DOM CACHE
========================================================== */

const DOM = {
    header: null,
    menuBtn: null,
    navLinks: null,
    navItems: [],
    scrollBtn: null,
    typing: null,
    counters: [],
    progressBars: [],
    projectCards: [],
    filterButtons: [],
    searchInput: null,
    contactForm: null
};

/* ==========================================================
   HELPERS
========================================================== */

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

const addClass = (element, className) => { if (element) element.classList.add(className); };
const removeClass = (element, className) => { if (element) element.classList.remove(className); };
const toggleClass = (element, className) => { if (element) element.classList.toggle(className); };

/* ==========================================================
   CACHE DOM
========================================================== */

function cacheDOM() {
    DOM.header = $(".header");
    DOM.menuBtn = $(".menu-toggle");
    DOM.navLinks = $(".nav-links");
    DOM.navItems = $$(".nav-links a");
    DOM.scrollBtn = $("#scrollTopBtn");
    DOM.typing = $(".typing");
    DOM.counters = $$(".counter");
    DOM.progressBars = $$(".progress span");
    DOM.projectCards = $$(".project-card");
    DOM.filterButtons = $$(".filter-buttons button");
    DOM.searchInput = $("#searchInput");
    DOM.contactForm = $(".contact-form form");
}

/* ==========================================================
   NAVBAR (sticky shadow + active link highlight)
========================================================== */

function initNavbar() {
    highlightCurrentPage();
    window.addEventListener("scroll", handleNavbarScroll, { passive: true });
}

function handleNavbarScroll() {
    if (!DOM.header) return;

    if (window.scrollY > 20) {
        addClass(DOM.header, "scrolled");
    } else {
        removeClass(DOM.header, "scrolled");
    }
}

function highlightCurrentPage() {
    const current = window.location.pathname;

    DOM.navItems.forEach(link => {
        const href = link.getAttribute("href");

        if (href === current) {
            addClass(link, "active");
        } else {
            removeClass(link, "active");
        }
    });
}

/* ==========================================================
   MOBILE MENU
========================================================== */

function initMobileMenu() {
    if (!DOM.menuBtn || !DOM.navLinks) return;

    DOM.menuBtn.addEventListener("click", toggleMenu);

    DOM.navItems.forEach(item => {
        item.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", outsideMenuClick);
    document.addEventListener("keydown", escClose);
}

function toggleMenu(e) {
    e.stopPropagation();
    toggleClass(DOM.menuBtn, "active");
    toggleClass(DOM.navLinks, "active");
}

function closeMenu() {
    removeClass(DOM.menuBtn, "active");
    removeClass(DOM.navLinks, "active");
}

function outsideMenuClick(e) {
    if (!DOM.navLinks.contains(e.target) && !DOM.menuBtn.contains(e.target)) {
        closeMenu();
    }
}

function escClose(e) {
    if (e.key === "Escape") {
        closeMenu();
    }
}

/* ==========================================================
   SCROLL TO TOP BUTTON
========================================================== */

function initScrollTop() {
    if (!DOM.scrollBtn) return;

    window.addEventListener("scroll", scrollTopButton, { passive: true });

    DOM.scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function scrollTopButton() {
    if (!DOM.scrollBtn) return;

    if (window.scrollY > 300) {
        addClass(DOM.scrollBtn, "show");
    } else {
        removeClass(DOM.scrollBtn, "show");
    }
}

/* ==========================================================
   REVEAL ENGINE (fade-up, fade-left, fade-right, zoom)
========================================================== */

function initReveal() {

    const elements = $$(
        ".fade-up, .fade-left, .fade-right, .zoom, .card, .project-card, .skill-card, .timeline-item"
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                addClass(entry.target, "show");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -80px 0px"
        }
    );

    elements.forEach(element => observer.observe(element));
}

/* ==========================================================
   TYPING EFFECT
========================================================== */

function initTyping() {

    if (!DOM.typing) return;

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {

        const word = CONFIG.typingWords[wordIndex];

        if (!deleting) {

            DOM.typing.textContent = word.substring(0, charIndex++);

            if (charIndex > word.length) {
                deleting = true;
                setTimeout(type, CONFIG.typingDelay);
                return;
            }

        } else {

            DOM.typing.textContent = word.substring(0, charIndex--);

            if (charIndex < 0) {
                deleting = false;
                wordIndex++;

                if (wordIndex >= CONFIG.typingWords.length) {
                    wordIndex = 0;
                }
            }
        }

        setTimeout(type, deleting ? CONFIG.deletingSpeed : CONFIG.typingSpeed);
    }

    type();
}

/* ==========================================================
   COUNTER ENGINE
========================================================== */

function initCounters() {

    if (!DOM.counters.length) return;

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.30 }
    );

    DOM.counters.forEach(counter => observer.observe(counter));
}

function animateCounter(counter) {

    const target = Number(counter.dataset.target);
    let current = 0;

    const increment = target / CONFIG.counterSteps;
    const interval = CONFIG.counterDuration / CONFIG.counterSteps;

    const timer = setInterval(() => {

        current += increment;

        if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
            return;
        }

        counter.textContent = Math.floor(current);

    }, interval);
}

/* ==========================================================
   SKILL PROGRESS BARS
========================================================== */

function initSkillBars() {

    if (!DOM.progressBars.length) return;

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                animateProgress(entry.target);
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.30 }
    );

    DOM.progressBars.forEach(bar => observer.observe(bar));
}

function animateProgress(bar) {

    const target = Number(bar.dataset.width);
    if (!target) return;

    let current = 0;
    bar.style.width = "0%";

    const interval = CONFIG.progressDuration / target;

    const timer = setInterval(() => {

        current++;
        bar.style.width = current + "%";

        if (current >= target) {
            clearInterval(timer);
        }

    }, interval);
}

/* ==========================================================
   PROJECTS FILTER + SEARCH
========================================================== */

function initProjectFilters() {

    if (!DOM.projectCards.length) return;

    DOM.filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            DOM.filterButtons.forEach(btn => removeClass(btn, "active"));
            addClass(button, "active");

            const filter = button.dataset.filter;

            DOM.projectCards.forEach(card => {

                const category = card.dataset.category;

                if (filter === "all" || filter === category) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }

            });

        });

    });

    if (DOM.searchInput) {

        DOM.searchInput.addEventListener("input", () => {

            const query = DOM.searchInput.value.toLowerCase();

            DOM.projectCards.forEach(card => {

                const title = card.querySelector("h2").textContent.toLowerCase();
                card.style.display = title.includes(query) ? "block" : "none";

            });

        });

    }

}

/* ==========================================================
   SMOOTH SCROLL (for in-page anchor links like #about)
========================================================== */

function initSmoothScroll() {

    $$('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const target = $(targetId);

            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }

        });

    });

}

/* ==========================================================
   BUTTON RIPPLE EFFECT
========================================================== */

function initRipple() {

    $$(".btn").forEach(button => {

        button.addEventListener("click", function (e) {

            const circle = document.createElement("span");
            const diameter = Math.max(this.clientWidth, this.clientHeight);

            circle.style.width = circle.style.height = diameter + "px";
            circle.style.left = e.offsetX - diameter / 2 + "px";
            circle.style.top = e.offsetY - diameter / 2 + "px";
            circle.classList.add("ripple");

            const existingRipple = this.querySelector(".ripple");
            if (existingRipple) existingRipple.remove();

            this.appendChild(circle);

        });

    });

}

/* ==========================================================
   INIT — runs once DOM is ready
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    cacheDOM();

    initNavbar();
    initMobileMenu();
    initScrollTop();
    initReveal();
    initTyping();
    initCounters();
    initSkillBars();
    initProjectFilters();
    initSmoothScroll();
    initRipple();

    console.log("Portfolio Loaded Successfully 🚀");

});