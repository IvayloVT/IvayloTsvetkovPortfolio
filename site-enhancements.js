(function () {
    var body = document.body;
    if (!body) return;

    body.classList.add("codex-ready");
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        body.classList.add("motion-safe");
    }

    var main = document.querySelector("main") || document.querySelector(".container") || document.querySelector(".article-container");
    if (main && !main.id) {
        main.id = "main-content";
    }

    if (!document.querySelector(".skip-link")) {
        var skip = document.createElement("a");
        skip.className = "skip-link";
        skip.href = "#main-content";
        skip.textContent = "Skip to content";
        body.insertBefore(skip, body.firstChild);
    }

    var path = (window.location.pathname || "").toLowerCase();
    var skipFooter = body.classList.contains("no-site-footer") || path.endsWith("/intro.html") || path === "/intro.html" || path.endsWith("/intro");

    if (!skipFooter && !document.querySelector(".site-footer-shell")) {
        var footer = document.createElement("footer");
        footer.className = "site-footer-shell";
        footer.innerHTML =
            '<div class="site-footer-grid">' +
                '<div class="site-footer-brand">' +
                    '<span class="site-footer-kicker">Premium Portfolio</span>' +
                    '<h2>Ivaylo Tsvetkov</h2>' +
                    '<p>Front-end focused portfolio work shaped by technical awareness, cleaner presentation, and a professional approach to delivery.</p>' +
                    '<div class="site-footer-rule"></div>' +
                    '<p class="site-footer-meta">Built to present case studies, writing, and digital project work with more clarity, structure, and credibility.</p>' +
                '</div>' +
                '<div class="site-footer-column">' +
                    '<h3>Explore</h3>' +
                    '<div class="site-footer-links">' +
                        '<a href="index.html">Home</a>' +
                        '<a href="about.html">About</a>' +
                        '<a href="portfolio.html">Portfolio</a>' +
                        '<a href="blog.html">Blog</a>' +
                        '<a href="news.html">News</a>' +
                        '<a href="contact.html">Contact</a>' +
                    '</div>' +
                '</div>' +
                '<div class="site-footer-column">' +
                    '<h3>Connect</h3>' +
                    '<div class="site-footer-links">' +
                        '<a href="mailto:ivaylovt@gmail.com">ivaylovt@gmail.com</a>' +
                        '<a href="https://www.linkedin.com/in/ivaylo-tsvetkov-576b6699/" target="_blank" rel="noreferrer">LinkedIn</a>' +
                        '<a href="https://github.com/IvayloVT" target="_blank" rel="noreferrer">GitHub</a>' +
                        '<a href="https://www.instagram.com/ivaylo.tsvetkov.1/" target="_blank" rel="noreferrer">Instagram</a>' +
                    '</div>' +
                '</div>' +
            '</div>';
        body.appendChild(footer);
    }

    var header = document.querySelector(".site-header");
    if (header) {
        body.classList.add("header-scroll-enabled");
        var mobileMedia = window.matchMedia("(max-width: 768px)");
        var resizeTimer;

        function syncMobileHeaderOffset() {
            if (mobileMedia.matches) {
                body.style.setProperty("--mobile-header-offset", header.offsetHeight + "px");
            } else {
                body.style.setProperty("--mobile-header-offset", "0px");
                body.classList.remove("header-hidden");
            }
        }

        syncMobileHeaderOffset();

        window.addEventListener("resize", function () {
            clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(syncMobileHeaderOffset, 80);
        });

        window.addEventListener("scroll", function () {
            if (!mobileMedia.matches) {
                body.classList.remove("header-hidden");
                return;
            }

            if (window.scrollY <= 0) {
                body.classList.remove("header-hidden");
                return;
            }

            body.classList.add("header-hidden");
        }, { passive: true });
    }

    var selectors = [
        "main > section",
        ".hero",
        ".section-card",
        ".card",
        ".project-card",
        ".blog-card",
        ".news-card",
        ".proof-card",
        ".profile-point",
        ".skill-category",
        ".info-card",
        ".detail-card",
        ".gallery-card",
        ".mini-panel",
        ".highlight",
        ".stat"
    ];

    var revealNodes = document.querySelectorAll(selectors.join(","));
    revealNodes.forEach(function (node, index) {
        node.setAttribute("data-reveal", "");
        node.style.transitionDelay = Math.min(index % 6, 5) * 60 + "ms";
    });

    var disableRevealOnSmallScreens = window.matchMedia("(max-width: 768px)").matches;

    if ("IntersectionObserver" in window && body.classList.contains("motion-safe") && !disableRevealOnSmallScreens) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

        revealNodes.forEach(function (node) {
            observer.observe(node);
        });
    } else {
        revealNodes.forEach(function (node) {
            node.classList.add("is-visible");
        });
    }
})();
