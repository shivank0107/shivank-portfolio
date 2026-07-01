/* ==========================================================
   main.js
   PART 1A
   Mobile Menu + Sticky Navbar + Active Link +
   Scroll To Top + Scroll Reveal
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       SELECTORS
    ========================================== */

    const header = document.querySelector(".header");

    const menuBtn = document.querySelector(".menu-toggle");

    const navLinks = document.querySelector(".nav-links");

    const scrollBtn = document.getElementById("scrollTopBtn");

    const navItems = document.querySelectorAll(".nav-links a");

    const revealElements = document.querySelectorAll(
        ".fade-up,.zoom,.card,.project-card,.skill-card,.timeline-item,.education-card,.contact-card"
    );

    /* ==========================================
       MOBILE MENU
    ========================================== */

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            menuBtn.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (icon) {

                if (navLinks.classList.contains("active")) {

                    icon.classList.remove("fa-bars");

                    icon.classList.add("fa-xmark");

                } else {

                    icon.classList.remove("fa-xmark");

                    icon.classList.add("fa-bars");

                }

            }

        });

    }

    /* ==========================================
       CLOSE MENU ON CLICK
    ========================================== */

    navItems.forEach(link => {

        link.addEventListener("click", () => {

            if (navLinks) {

                navLinks.classList.remove("active");

            }

            if (menuBtn) {

                menuBtn.classList.remove("active");

                const icon = menuBtn.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");

                    icon.classList.add("fa-bars");

                }

            }

        });

    });

    /* ==========================================
       ACTIVE NAVIGATION
    ========================================== */

    const currentPage = window.location.pathname;

    navItems.forEach(link => {

        if (link.getAttribute("href") === currentPage) {

            link.classList.add("active");

        }

    });

    /* ==========================================
       SCROLL EVENTS
    ========================================== */

    window.addEventListener("scroll", () => {

        /* Sticky Shadow */

        if (header) {

            if (window.scrollY > 20) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        }

        /* Scroll Button */

        if (scrollBtn) {

            if (window.scrollY > 400) {

                scrollBtn.classList.add("show");

            } else {

                scrollBtn.classList.remove("show");

            }

        }

        /* Scroll Reveal */

        revealElements.forEach(el => {

            const top = el.getBoundingClientRect().top;

            const trigger = window.innerHeight - 100;

            if (top < trigger) {

                el.classList.add("show");

            }

        });

    });

    /* ==========================================
       SCROLL TO TOP
    ========================================== */

    if (scrollBtn) {

        scrollBtn.addEventListener("click", () => {

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        });

    }

    /* ==========================================
       INITIAL REVEAL
    ========================================== */

    revealElements.forEach(el => {

        const top = el.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {

            el.classList.add("show");

        }

    });

});

/* ==========================================================
   main.js
   PART 1B
   Smooth Scroll + Navbar Hide/Show +
   Ripple Effect + Loader + Utilities
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       SMOOTH SCROLL
    ========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });

    /* ==========================================
       NAVBAR SHOW / HIDE
    ========================================== */

    const header = document.querySelector(".header");

    let lastScroll = 0;

    window.addEventListener("scroll", () => {

        const current = window.pageYOffset;

        if (!header) return;

        if (current <= 0) {

            header.style.transform = "translateY(0)";

            return;

        }

        if (current > lastScroll && current > 120) {

            header.style.transform = "translateY(-100%)";

        }

        else {

            header.style.transform = "translateY(0)";

        }

        lastScroll = current;

    });

    /* ==========================================
       BUTTON RIPPLE EFFECT
    ========================================== */

    document.querySelectorAll(".btn").forEach(button => {

        button.addEventListener("click", function (e) {

            const circle = document.createElement("span");

            const diameter = Math.max(

                this.clientWidth,

                this.clientHeight

            );

            circle.style.width = diameter + "px";

            circle.style.height = diameter + "px";

            circle.style.position = "absolute";

            circle.style.borderRadius = "50%";

            circle.style.background = "rgba(255,255,255,.4)";

            circle.style.pointerEvents = "none";

            circle.style.transform = "scale(0)";

            circle.style.animation = "ripple .6s linear";

            circle.style.left =

                e.clientX -

                this.getBoundingClientRect().left -

                diameter / 2 + "px";

            circle.style.top =

                e.clientY -

                this.getBoundingClientRect().top -

                diameter / 2 + "px";

            this.appendChild(circle);

            setTimeout(() => {

                circle.remove();

            }, 600);

        });

    });

    /* ==========================================
       LOADER
    ========================================== */

    window.addEventListener("load", () => {

        const loader = document.querySelector(".loader-wrapper");

        if (loader) {

            loader.style.opacity = "0";

            loader.style.visibility = "hidden";

            loader.style.transition = ".6s";

        }

    });

    /* ==========================================
       CURRENT YEAR
    ========================================== */

    const year = document.getElementById("year");

    if (year) {

        year.textContent = new Date().getFullYear();

    }

    /* ==========================================
       ACTIVE BUTTON
    ========================================== */

    document.querySelectorAll(".filter-buttons button").forEach(btn => {

        btn.addEventListener("click", () => {

            document

                .querySelectorAll(".filter-buttons button")

                .forEach(b => b.classList.remove("active"));

            btn.classList.add("active");

        });

    });

    /* ==========================================
       IMAGE HOVER
    ========================================== */

    document.querySelectorAll(".project-card").forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.classList.add("hover");

        });

        card.addEventListener("mouseleave", () => {

            card.classList.remove("hover");

        });

    });

    /* ==========================================
       FLOATING CARDS
    ========================================== */

    document.querySelectorAll(".floating-card").forEach(card => {

        card.style.animationDelay =

            Math.random() * 2 + "s";

    });

});

/* ==========================================================
   UTILITY FUNCTIONS
========================================================== */

function addClass(element, className){

    if(element){

        element.classList.add(className);

    }

}

function removeClass(element, className){

    if(element){

        element.classList.remove(className);

    }

}

function toggleClass(element, className){

    if(element){

        element.classList.toggle(className);

    }

}

function scrollTopSmooth(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/* ==========================================================
   main.js
   PART 2
   Typing Effect + Counter + Skill Progress +
   Number Counter + Hero Animations
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       TYPING EFFECT
    ========================================== */

    const typingElement = document.querySelector(".typing");

    if (typingElement) {

        const words = [

            "Database Developer",

            "MySQL Developer",

            "SQL Server Developer",

            "Python Developer",

            "ETL Developer"

        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {

            const currentWord = words[wordIndex];

            if (!deleting) {

                typingElement.textContent =
                    currentWord.substring(0, charIndex++);

                if (charIndex > currentWord.length) {

                    deleting = true;

                    setTimeout(typeEffect, 1500);

                    return;

                }

            } else {

                typingElement.textContent =
                    currentWord.substring(0, charIndex--);

                if (charIndex < 0) {

                    deleting = false;

                    wordIndex++;

                    if (wordIndex >= words.length) {

                        wordIndex = 0;

                    }

                }

            }

            setTimeout(typeEffect, deleting ? 50 : 100);

        }

        typeEffect();

    }

    /* ==========================================
       COUNTER ANIMATION
    ========================================== */

    const counters = document.querySelectorAll(".counter");

    const startCounter = (counter) => {

        const target = +counter.dataset.target;

        let current = 0;

        const increment = Math.max(1, target / 120);

        const update = () => {

            current += increment;

            if (current < target) {

                counter.innerText = Math.floor(current);

                requestAnimationFrame(update);

            }

            else {

                counter.innerText = target;

            }

        };

        update();

    };

    /* ==========================================
       INTERSECTION OBSERVER
    ========================================== */

    const counterObserver = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    startCounter(entry.target);

                    counterObserver.unobserve(entry.target);

                }

            });

        },

        {

            threshold:0.4

        }

    );

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

    /* ==========================================
       SKILL PROGRESS BAR
    ========================================== */

    const progressBars = document.querySelectorAll(".progress span");

    const progressObserver = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const progress = entry.target;

                    const width = progress.className
                        .match(/w\d+/);

                    if (width) {

                        progress.style.width =
                            width[0].replace("w","") + "%";

                    }

                    progressObserver.unobserve(progress);

                }

            });

        },

        {

            threshold:.4

        }

    );

    progressBars.forEach(bar => {

        bar.style.width = "0";

        progressObserver.observe(bar);

    });

    /* ==========================================
       HERO FADE
    ========================================== */

    const heroContent = document.querySelector(".hero-content");

    const heroImage = document.querySelector(".hero-image");

    if(heroContent){

        heroContent.style.opacity = "0";

        heroContent.style.transform = "translateY(40px)";

        setTimeout(()=>{

            heroContent.style.transition=".8s";

            heroContent.style.opacity="1";

            heroContent.style.transform="translateY(0)";

        },300);

    }

    if(heroImage){

        heroImage.style.opacity="0";

        heroImage.style.transform="translateX(80px)";

        setTimeout(()=>{

            heroImage.style.transition=".9s";

            heroImage.style.opacity="1";

            heroImage.style.transform="translateX(0)";

        },600);

    }

    /* ==========================================
       FLOATING CARDS
    ========================================== */

    const floatingCards =
        document.querySelectorAll(".floating-card");

    floatingCards.forEach((card,index)=>{

        card.style.animationDelay =
            index * .4 + "s";

    });

    /* ==========================================
       HERO BUTTON ANIMATION
    ========================================== */

    const heroButtons =
        document.querySelectorAll(".hero-buttons .btn");

    heroButtons.forEach((btn,index)=>{

        btn.style.opacity="0";

        btn.style.transform="translateY(20px)";

        setTimeout(()=>{

            btn.style.transition=".6s";

            btn.style.opacity="1";

            btn.style.transform="translateY(0)";

        },900 + index*250);

    });

    /* ==========================================
       SOCIAL ICON ANIMATION
    ========================================== */

    const socialIcons =
        document.querySelectorAll(".social-links a");

    socialIcons.forEach((icon,index)=>{

        icon.style.opacity="0";

        icon.style.transform="scale(.6)";

        setTimeout(()=>{

            icon.style.transition=".5s";

            icon.style.opacity="1";

            icon.style.transform="scale(1)";

        },1600 + index*150);

    });

});

/* ==========================================================
   main.js
   PART 3 (FINAL)
   Project Search + Project Filter +
   Contact Validation + Toast +
   Utilities
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       PROJECT SEARCH
    ========================================== */

    const searchInput = document.getElementById("searchInput");

    const projectCards = document.querySelectorAll(".project-card");

    if (searchInput) {

        searchInput.addEventListener("keyup", () => {

            const value = searchInput.value.toLowerCase();

            projectCards.forEach(card => {

                const text = card.innerText.toLowerCase();

                if (text.includes(value)) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }

            });

        });

    }

    /* ==========================================
       PROJECT FILTER
    ========================================== */

    const filterButtons = document.querySelectorAll(
        ".filter-buttons button"
    );

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter = button.dataset.filter;

            projectCards.forEach(card => {

                if (
                    filter === "all" ||
                    card.classList.contains(filter)
                ) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }

            });

        });

    });

    /* ==========================================
       CONTACT FORM VALIDATION
    ========================================== */

    const form = document.querySelector(".contact-form form");

    if (form) {

        form.addEventListener("submit", function (e) {

            const name =
                form.querySelector("input[name='name']");

            const email =
                form.querySelector("input[name='email']");

            const subject =
                form.querySelector("input[name='subject']");

            const message =
                form.querySelector("textarea[name='message']");

            if (
                !name.value.trim() ||
                !email.value.trim() ||
                !subject.value.trim() ||
                !message.value.trim()
            ) {

                e.preventDefault();

                showToast("Please fill all fields.", "error");

                return;

            }

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email.value)) {

                e.preventDefault();

                showToast("Invalid email address.", "error");

                return;

            }

            showToast("Message Sent Successfully!", "success");

        });

    }

    /* ==========================================
       TOAST
    ========================================== */

    function showToast(message, type) {

        const toast = document.createElement("div");

        toast.className = "toast";

        toast.innerHTML = message;

        if (type === "success") {

            toast.style.background = "#10b981";

        }

        if (type === "error") {

            toast.style.background = "#ef4444";

        }

        document.body.appendChild(toast);

        setTimeout(() => {

            toast.classList.add("show");

        }, 100);

        setTimeout(() => {

            toast.classList.remove("show");

            setTimeout(() => {

                toast.remove();

            }, 300);

        }, 3000);

    }

    /* ==========================================
       IMAGE LAZY ANIMATION
    ========================================== */

    const images = document.querySelectorAll("img");

    const imageObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },

        {

            threshold:.2

        }

    );

    images.forEach(img => {

        imageObserver.observe(img);

    });

    /* ==========================================
       CARD HOVER SHADOW
    ========================================== */

    document.querySelectorAll(".card").forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform =

                "translateY(-10px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =

                "translateY(0px)";

        });

    });

    /* ==========================================
       BUTTON LOADING
    ========================================== */

    document.querySelectorAll(".btn").forEach(button => {

        button.addEventListener("click", () => {

            if (button.classList.contains("loading"))
                return;

            button.classList.add("loading");

            const original = button.innerHTML;

            button.innerHTML =

                '<i class="fa-solid fa-spinner fa-spin"></i>';

            setTimeout(() => {

                button.innerHTML = original;

                button.classList.remove("loading");

            }, 1000);

        });

    });

});

/* ==========================================================
   UTILITIES
========================================================== */

function qs(selector) {

    return document.querySelector(selector);

}

function qsa(selector) {

    return document.querySelectorAll(selector);

}

function addClass(element, className) {

    if (element) {

        element.classList.add(className);

    }

}

function removeClass(element, className) {

    if (element) {

        element.classList.remove(className);

    }

}

function toggleClass(element, className) {

    if (element) {

        element.classList.toggle(className);

    }

}

function scrollToSection(id) {

    const section = document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({

        behavior: "smooth"

    });

}

function debounce(callback, delay = 300) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}