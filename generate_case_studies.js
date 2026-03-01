const fs = require('fs');
const path = require('path');
const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const urls = [
    "https://www.vrume.com/blog/dating-traffic-conversions-case-study/",
    "https://www.vrume.com/blog/norway-dating-case-study-xflirt-zone-1776/",
    "https://www.vrume.com/blog/uk-dating-traffic-case-study/",
    "https://www.vrume.com/blog/france-dating-traffic-case-study/",
    "https://www.vrume.com/blog/onlyfans-high-intent-traffic-case-study/",
    "https://www.vrume.com/blog/usa-email-passing-dating-traffic-case-study/",
    "https://www.vrume.com/blog/germany-cpl-email-traffic-case-study/",
    "https://www.vrume.com/blog/usa-shemale-dating-traffic-case-study/",
    "https://www.vrume.com/blog/nordics-bbw-dating-traffic-case-study/",
    "https://www.vrume.com/blog/swiss-dating-traffic-case-study/",
    "https://www.vrume.com/blog/bdsm-dating-traffic-case-study-us/",
    "https://www.vrume.com/blog/avventureinzona-italy-mobile-case-study/",
    "https://www.vrume.com/blog/case-study-affsub-germany-high-cvr/",
    "https://www.vrume.com/blog/vxcash-german-dating-offer-case-study/",
    "https://www.vrume.com/blog/swedish-dating-traffic-case-study/",
    "https://www.vrume.com/blog/nordics-dating-traffic-case-study/",
    "https://www.vrume.com/blog/live-cams-traffic-case-study/",
    "https://www.vrume.com/blog/onlyfans-traffic-case-study/",
    "https://www.vrume.com/blog/sweden-dating-traffic-case-study/"
];

// Reusable premium HTML template
const getTemplate = (title, metaDescription, bodyContent, slug) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | Vrume Case Studies</title>
    <meta name="description" content="${metaDescription}">
    <meta name="keywords" content="${title.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ').join(', ')}, performance marketing case study, vrume traffic">
    <meta property="og:title" content="${title} | Vrume Case Studies">
    <meta property="og:description" content="${metaDescription}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://vrume.app/case-studies/${slug}/">
    <link rel="stylesheet" href="/case-studies/index.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-7V0KBWG26W"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag("js", new Date());
      gtag("config", "G-7V0KBWG26W");
    </script>
    <style>
        .study-content {
            background: rgba(30, 30, 35, 0.5);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-lg);
            padding: 3rem;
            max-width: 800px;
            margin: 0 auto;
            color: #ccc;
            line-height: 1.8;
            font-size: 1.1rem;
        }
        .study-content h2, .study-content h3 {
            color: #fff;
            margin-top: 2rem;
            margin-bottom: 1rem;
            font-family: 'Inter', sans-serif;
        }
        .study-content h2 { font-size: 1.8rem; }
        .study-content h3 { font-size: 1.4rem; color: var(--accent); }
        .study-content ul {
            margin-bottom: 1.5rem;
            padding-left: 1.5rem;
        }
        .study-content li { margin-bottom: 0.5rem; }
        .study-content p { margin-bottom: 1.5rem; }
        .study-content img {
            max-width: 100%;
            border-radius: var(--radius-md);
            margin: 2rem 0;
            border: 1px solid var(--border-color);
        }
        .study-header {
            text-align: center;
            margin-bottom: 3rem;
        }
    </style>
</head>
<body>
    <div class="glow-bg"></div>

    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-content">
            <a href="/" class="logo">VRUME<span class="dot">.</span></a>
            <div class="nav-links">
                <a href="/partners">Partners</a>
                <a href="/case-studies">Case Studies</a>
                <a href="/buytraffic">Buy Traffic</a>
                <a href="/selltraffic">Sell Traffic</a>
                <a href="/#cta" class="btn btn-secondary">Get Started</a>
            </div>
        </div>
    </nav>

    <main>
        <section class="hero container animate" style="padding-top: 10rem; padding-bottom: 4rem;">
            <div class="study-header">
                <div class="hero-badge">Case Study</div>
                <h1 style="max-width: 900px; margin: 1rem auto; font-size: clamp(2.5rem, 5vw, 4rem);">${title}</h1>
            </div>

            <div class="study-content">
                ${bodyContent}
            </div>
            
            <div class="text-center" style="margin-top: 4rem;">
                <a href="/case-studies/" class="btn btn-outline glow-btn">← Back to All Case Studies</a>
                <a href="/buytraffic" class="btn btn-primary glow-btn" style="margin-left: 1rem;">Apply as Advertiser</a>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem;">
                <div class="logo">VRUME<span class="dot">.</span></div>
                <div class="nav-links" style="display: flex; gap: 2rem;">
                    <a href="/">Home</a>
                    <a href="/case-studies">Case Studies</a>
                    <a href="/buytraffic">Buy Traffic</a>
                    <a href="/selltraffic">Sell Traffic</a>
                    <a href="/terms">Terms</a>
                    <a href="/privacy">Privacy</a>
                    <a href="/ccpa">CCPA</a>
                    <a href="/gdpr">GDPR</a>
                </div>
            </div>
            <div class="footer-bottom" style="text-align: center; padding-top: 2rem; border-top: 1px solid var(--border-color); font-size: 0.85rem; color: var(--secondary);">
                &copy; 2026 Vrume. Private Performance Network. All Rights Reserved.
            </div>
        </div>
    </footer>

    <script>
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.animate').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    </script>
</body>
</html>`;

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    const baseDir = path.join(__dirname, 'case-studies');
    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, { recursive: true });
    }

    const unqiueUrls = [...new Set(urls)];

    for (const url of unqiueUrls) {
        try {
            console.log("Fetching: " + url);
            const slug = url.split('/').filter(Boolean).pop();
            const response = await axios.get(url);

            const dom = new JSDOM(response.data);
            const document = dom.window.document;

            // Extract the actual blog post title
            const titleElement = document.querySelector('h1.entry-title');
            let title = titleElement ? titleElement.textContent.trim() : slug.replace(/-/g, ' ').toUpperCase();

            // Extract the core post content body
            const contentElement = document.querySelector('.entry-content');
            let bodyContent = "";
            let metaDescription = "Detailed performance marketing case study breakdown and ROI analysis from Vrume.";

            if (contentElement) {
                // Remove elements we don't want like giant share buttons or meta wrappers
                const shareBox = contentElement.querySelector('.sharedaddy');
                if (shareBox) shareBox.remove();

                // Strip style tags or scripts if any got caught
                contentElement.querySelectorAll('script, style').forEach(el => el.remove());

                bodyContent = contentElement.innerHTML;

                // Try grabbing the first clean paragraph for the meta desc
                const firstP = contentElement.querySelector('p');
                if (firstP && firstP.textContent.length > 20) {
                    metaDescription = firstP.textContent.trim().substring(0, 155) + "...";
                }
            } else {
                bodyContent = "<p>Content could not be parsed automatically. Please verify source markup.</p>";
            }

            // Create output directory for this slug
            const slugDir = path.join(baseDir, slug);
            if (!fs.existsSync(slugDir)) {
                fs.mkdirSync(slugDir, { recursive: true });
            }

            // Generate HTML
            const generatedHtml = getTemplate(title, metaDescription, bodyContent, slug);
            const outPath = path.join(slugDir, 'index.html');

            fs.writeFileSync(outPath, generatedHtml);
            console.log("-> Saved to: " + outPath);

            await delay(1000); // polite delay

        } catch (err) {
            console.error("Failed on " + url, err.message);
        }
    }
    console.log("Done generating case studies.");
}

run();
