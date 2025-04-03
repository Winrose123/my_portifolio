document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const notification = document.getElementById('form-notification');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            
            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();
                
                // Show notification
                notification.className = 'notification ' + (result.success ? 'success' : 'error');
                notification.querySelector('i').className = 'fas ' + 
                    (result.success ? 'fa-check-circle' : 'fa-exclamation-circle');
                notification.querySelector('.notification-message').textContent = result.message;
                notification.classList.add('show');

                // Reset form if successful
                if (result.success) {
                    contactForm.reset();
                }

                // Auto-hide notification after 5 seconds
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 5000);

            } catch (error) {
                notification.className = 'notification error';
                notification.querySelector('i').className = 'fas fa-exclamation-circle';
                notification.querySelector('.notification-message').textContent = 
                    'An error occurred. Please try again later.';
                notification.classList.add('show');
            } finally {
                // Reset button state
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            }
        });
    }

    // Skills Data
    const skills = [
        { name: 'C/C++', icon: 'fas fa-code' },
        { name: 'Java', icon: 'fab fa-java' },
        { name: 'Python', icon: 'fab fa-python' },
        { name: 'HTML5', icon: 'fab fa-html5' },
        { name: 'CSS3', icon: 'fab fa-css3-alt' },
        { name: 'JavaScript', icon: 'fab fa-js' },
        { name: 'MongoDB', icon: 'fas fa-database' },
        { name: 'MySQL', icon: 'fas fa-database' },
        { name: 'PHP', icon: 'fab fa-php' },
        { name: 'Android', icon: 'fab fa-android' },
        { name: 'Git', icon: 'fab fa-git-alt' },
        { name: 'System Architecture', icon: 'fas fa-sitemap' }
    ];

    // Project Data
    const projects = [
        {
            title: 'Dairy Milk Management System',
            description: 'Full-stack e-commerce solution with secure payment integration',
            image: 'images/milk.png',
            tags: ['PHP', 'MySQL', 'JavaScript']
        },
        {
            title: 'Android App',
            description: 'Android application for efficient task organization',
            image: 'images/android.jpeg',
            tags: ['Java', 'Android', 'SQLite']
        },
        {
            title: 'Portfolio Website',
            description: 'Responsive personal portfolio website',
            image: 'images/portfolio.png',
            tags: ['HTML', 'CSS', 'JavaScript']
        }
    ];

    // Populate Skills
    const skillsGrid = document.querySelector('.skills-grid');
    skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `
            <i class="${skill.icon}"></i>
            <h3>${skill.name}</h3>
        `;
        skillsGrid.appendChild(skillItem);
    });

    // Populate Projects
    const projectsGrid = document.querySelector('.projects-grid');
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });


});
