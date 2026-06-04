document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");
  const notification = document.getElementById("form-notification");
  const themeToggle = document.getElementById("theme-toggle");
  const navLinks = document.querySelector(".nav-links");
  const burger = document.querySelector(".burger");
  const projectsGrid = document.getElementById("projects-grid");
  const portfolioGrid = document.getElementById("portfolio-grid");
  const filters = document.querySelectorAll(".filter-btn");

  const projectData = [
    {
      title: "POS System",
      description:
        "Custom point-of-sale system for retail operations, inventory tracking, and sales reporting.",
      image: "images/webdeveloper.JPG",
      category: "development",
      tags: ["PHP", "MySQL", "JavaScript"],
      github: "https://github.com/winnie-/pos-system",
      live: "#",
    },
    {
      title: "Dairy Milk Management System",
      description:
        "Full-stack management platform for dairy operations with analytics and inventory control.",
      image: "images/milk.png",
      category: "development",
      tags: ["PHP", "MySQL", "Node.js"],
      github: "https://github.com/winnie-/dairy-management",
      live: "#",
    },
    {
      title: "School Management Portal",
      description:
        "Educational portal with student enrollment, attendance tracking, and admin dashboards.",
      image: "images/Dashboard UI.jpg",
      category: "development",
      tags: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/winnie-/school-portal",
      live: "#",
    },
    {
      title: "Lost & Found App",
      description:
        "Android app for managing lost and found requests, with item tracking and notifications.",
      image: "images/android.jpeg",
      category: "development",
      tags: ["Android", "Java", "SQLite"],
      github: "https://github.com/winnie-/lost-found-app",
      live: "#",
    },
    {
      title: "Brand Identity Campaign",
      description:
        "Branding, logo design, and marketing materials for a creative launch campaign.",
      image: "images/Brand Launch Poster.jpg",
      category: "graphic",
      tags: ["Illustrator", "Photoshop", "Figma"],
      github: "",
      live: "",
    },
    {
      title: "Social Media Campaign",
        downloadBtn.addEventListener("click", async (e) => {
          e.preventDefault();
          const cv = document.getElementById("cv-content");
          if (!cv) return alert("CV content not found");

          // Build CV content dynamically from page
          const nameEl = document.querySelector("header .hero-copy h1");
          const titleEl = document.querySelector(".hero-title");
          const profileImg = document.querySelector(".hero-card-photo img");
          const aboutEl = document.querySelector("#about .about-copy p");
          const skillEls = document.querySelectorAll("#skills .skills-card ul li");

          const name = nameEl ? nameEl.textContent.trim() : "Winrose Kiriswa";
          const title = titleEl ? titleEl.textContent.trim() : "Graphic Designer & Web Developer";
          const profileSrc = profileImg ? profileImg.src : null;
          const about = aboutEl ? aboutEl.textContent.trim() : "";
          const skills = Array.from(skillEls).map((s) => s.textContent.trim());

          // Use projectData array (in this file) for project highlights if available
          const projectsList = (typeof projectData !== "undefined" && Array.isArray(projectData))
            ? projectData.slice(0, 4).map(p => `<li><strong>${p.title}</strong>: ${p.description}</li>`).join("")
            : "";

          // Compose HTML
          let html = "";
          html += `<div style=\"max-width:780px; padding:20px; font-family: Arial, Helvetica, sans-serif; color:#111;\">`;
          if (profileSrc) {
            html += `<div style=\"float:right; width:110px; height:110px; overflow:hidden; border-radius:6px; margin-left:12px;\"><img src=\"${profileSrc}\" style=\"width:100%;height:100%;object-fit:cover;\"></div>`;
          }
          html += `<h1 style=\"margin:0 0 6px 0; font-size:24px;\">${name}</h1>`;
          html += `<p style=\"margin:0 0 12px 0; color:#555;\">${title}</p>`;
          html += `<hr style=\"border:none;border-top:1px solid #e6e6e6;margin:12px 0;\">`;
          html += `<section><h2 style=\"font-size:16px;margin-bottom:6px;\">About</h2><p style=\"margin:0 0 10px 0;\">${about}</p></section>`;

          if (skills.length) {
            html += `<section><h2 style=\"font-size:16px;margin-bottom:6px;\">Skills</h2><ul style=\"margin:0 0 10px 18px;\">`;
            skills.forEach(s => { html += `<li>${s}</li>`; });
            html += `</ul></section>`;
          }

          if (projectsList) {
            html += `<section><h2 style=\"font-size:16px;margin-bottom:6px;\">Selected Projects</h2><ul style=\"margin:0 0 10px 18px;\">${projectsList}</ul></section>`;
          }

          // Contact details from page
          const contactEmail = document.querySelector('.contact-details a[href^="mailto:"]');
          const contactPhone = document.querySelector('.contact-details a[href^="tel:"]');
          html += `<section><h2 style=\"font-size:16px;margin-bottom:6px;\">Contact</h2><p style=\"margin:0;\">${contactEmail ? contactEmail.textContent.trim() : 'kiriswawinrose@gmail.com'}${contactPhone ? ' • ' + contactPhone.textContent.trim() : ''}</p></section>`;

          html += `<div style=\"margin-top:20px;font-size:11px;color:#666;\">Generated from portfolio site</div>`;
          html += `</div>`;

          cv.innerHTML = html;
          cv.style.display = "block";

          const opt = {
            margin: 0.4,
            filename: "Winrose_Kiriswa_CV.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
          };

          try {
            if (typeof window.html2pdf !== "function") {
              await ensureHtml2Pdf();
            }
            await window.html2pdf().set(opt).from(cv).save();
          } catch (err) {
            console.error("PDF generation error", err);
            alert("Failed to generate PDF. Check console for details or try again.");
          } finally {
            cv.style.display = "none";
          }
        });
    if (!portfolioGrid) return;
    portfolioGrid.innerHTML = "";
    const items = portfolioData.filter(
      (item) => filter === "all" || item.filter === filter,
    );
    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "portfolio-card";
      card.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-card-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
      portfolioGrid.appendChild(card);
    });
  }

  function setActiveFilter(button) {
    filters.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      const filterValue = button.dataset.filter;
      setActiveFilter(button);
      renderPortfolio(filterValue);
    });
  });

  function toggleTheme() {
    const theme =
      document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("preferred-theme", theme);
    themeToggle.innerHTML =
      theme === "dark"
        ? '<i class="fas fa-moon"></i>'
        : '<i class="fas fa-sun"></i>';
  }

  function applySavedTheme() {
    const savedTheme = localStorage.getItem("preferred-theme");
    const theme = savedTheme || "dark";
    document.documentElement.dataset.theme = theme;
    themeToggle.innerHTML =
      theme === "dark"
        ? '<i class="fas fa-moon"></i>'
        : '<i class="fas fa-sun"></i>';
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
    applySavedTheme();
  }

  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
    document.addEventListener("click", (event) => {
      if (!navLinks.contains(event.target) && !burger.contains(event.target)) {
        navLinks.classList.remove("active");
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      const submitButton = this.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Sending...';

      try {
        const response = await fetch(this.action, {
          method: "POST",
          body: formData,
        });

        const responseText = await response.text();
        let result;
        try {
          result = JSON.parse(responseText);
        } catch (parseError) {
          throw new Error(`Invalid server response: ${responseText}`);
        }

        if (!response.ok || result.success === false) {
          throw new Error(result.message || `Server error ${response.status}`);
        }

        notification.className = `notification success show`;
        notification.innerHTML = `<i class="fas fa-check-circle"></i><span class="notification-message">${result.message}</span>`;
        this.reset();
      } catch (err) {
        notification.className = "notification error show";
        notification.innerHTML = `<i class="fas fa-exclamation-circle"></i><span class="notification-message">${err.message}</span>`;
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML =
          '<i class="fas fa-paper-plane"></i> Send Message';
        setTimeout(() => notification.classList.remove("show"), 5000);
      }
    });
  }

  renderProjects();
  renderPortfolio();

  // Download CV as PDF
  const downloadBtn = document.getElementById("download-cv");
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(s);
    });
  }

  async function ensureHtml2Pdf() {
    if (typeof window.html2pdf === "function") return;
    const cdn =
      "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    await loadScript(cdn);
    if (typeof window.html2pdf !== "function")
      throw new Error("html2pdf failed to initialize");
  }

  if (downloadBtn) {
    downloadBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const cv = document.getElementById("cv-content");
      if (!cv) return alert("CV content not found");
      cv.style.display = "block";

      const opt = {
        margin: 0.4,
        filename: "Winrose_Kiriswa_CV.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };

      try {
        if (typeof window.html2pdf !== "function") {
          await ensureHtml2Pdf();
        }
        await window.html2pdf().set(opt).from(cv).save();
      } catch (err) {
        console.error("PDF generation error", err);
        alert(
          "Failed to generate PDF. Check console for details or try again.",
        );
      } finally {
        cv.style.display = "none";
      }
    });
  }
});
