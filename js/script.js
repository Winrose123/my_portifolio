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
      description:
        "Visual content and branding for social media engagement and marketing impact.",
      image: "images/Social Media Campaign.jpg",
      category: "graphic",
      tags: ["Canva", "Photoshop", "Branding"],
      github: "",
      live: "",
    },
  ];

  const portfolioData = [
    {
      title: "Brand Launch Poster",
      description: "Graphic design piece for a product launch campaign.",
      image: "images/Brand Launch Poster.jpg",
      filter: "graphic",
    },
    {
      title: "Dashboard UI",
      description: "Web application dashboard for system monitoring.",
      image: "images/Dashboard UI.jpg",
      filter: "web",
    },
    {
      title: "Mobile UX Flow",
      description: "User experience screens and interface design.",
      image: "images/Mobile UX Flow.jpg",
      filter: "uiux",
    },
    {
      title: "Event Poster Design",
      description: "Marketing collateral for a creative event.",
      image: "images/Event Poster Design.jpg",
      filter: "graphic",
    },
    {
      title: "Responsive Site Mockup",
      description:
        "Website design and development for a responsive experience.",
      image: "images/Responsive Site Mockup.jpg",
      filter: "web",
    },
    {
      title: "UI Concept Kit",
      description: "Interface components and style guide for a product.",
      image: "images/UI Concept Kit.jpg",
      filter: "uiux",
    },
  ];

  function renderProjects() {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = "";
    projectData.forEach((project) => {
      const card = document.createElement("article");
      card.className = "project-card";
      card.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <div>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-meta">
                        ${project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join("")}
                    </div>
                    <div class="project-links">
                        ${project.github ? `<a href="${project.github}" target="_blank">GitHub</a>` : ""}
                        ${project.live ? `<a href="${project.live}" target="_blank">Live Demo</a>` : ""}
                    </div>
                </div>
            `;
      projectsGrid.appendChild(card);
    });
  }

  function renderPortfolio(filter = "all") {
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
        const result = await response.json();
        const icon = result.success
          ? "fa-check-circle"
          : "fa-exclamation-circle";
        notification.className = `notification ${result.success ? "success" : "error"} show`;
        notification.innerHTML = `<i class="fas ${icon}"></i><span class="notification-message">${result.message}</span>`;
        if (result.success) this.reset();
      } catch (err) {
        notification.className = "notification error show";
        notification.innerHTML =
          '<i class="fas fa-exclamation-circle"></i><span class="notification-message">An error occurred. Please try again later.</span>';
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
});
