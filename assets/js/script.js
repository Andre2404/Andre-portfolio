'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// project modal variables
const projectItems = document.querySelectorAll("[data-project-item]");
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
const projectOverlay = document.querySelector("[data-project-overlay]");
const projectModalMainImg = document.querySelector("[data-project-modal-main-img]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalDescription = document.querySelector("[data-project-modal-description]");
const projectModalSkills = document.querySelector("[data-project-modal-skills]");
const projectGalleryThumbnails = document.querySelector("[data-project-gallery-thumbnails]");
const projectModalLinks = document.querySelectorAll("[data-project-modal-link]");

// project data (you can customize this for each project)
const projectData = {
  "finance": {
    title: "Finance",
    description: "A comprehensive financial management web application with advanced features for tracking expenses, income, and investments. Built with modern web technologies to provide a seamless user experience.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
    images: ["./assets/images/project-1.jpg"],
    links: {
      preview: "#",
      github: "#",
      drive: "#"
    }
  },
  "orizon": {
    title: "Orizon",
    description: "Modern web development project showcasing responsive design and interactive user interfaces. Features include dynamic content loading and real-time updates.",
    skills: ["HTML", "CSS", "JavaScript", "Vue.js", "Firebase"],
    images: ["./assets/images/project-2.png"],
    links: {
      preview: "#",
      github: "#",
      drive: "#"
    }
  },
  "fundo": {
    title: "Fundo",
    description: "Creative web design project with focus on user experience and visual appeal. Includes custom animations and modern UI components.",
    skills: ["HTML", "CSS", "JavaScript", "GSAP", "SASS"],
    images: ["./assets/images/project-3.jpg"],
    links: {
      preview: "#",
      github: "#",
      drive: "#"
    }
  },
  "brawlhalla": {
    title: "Brawlhalla",
    description: "Gaming application with interactive features and real-time multiplayer capabilities. Built for performance and user engagement.",
    skills: ["JavaScript", "WebSocket", "Node.js", "Express", "MongoDB"],
    images: ["./assets/images/project-4.png"],
    links: {
      preview: "#",
      github: "#",
      drive: "#"
    }
  },
  "dsm.": {
    title: "DSM.",
    description: "Design system management platform with component library and documentation. Streamlines design workflow and ensures consistency.",
    skills: ["React", "TypeScript", "Storybook", "CSS Modules"],
    images: ["./assets/images/project-5.png"],
    links: {
      preview: "#",
      github: "#",
      drive: "#"
    }
  },
  "metaspark": {
    title: "MetaSpark",
    description: "Social media platform with advanced features for content creation and sharing. Includes real-time notifications and analytics.",
    skills: ["React", "Node.js", "Socket.io", "PostgreSQL", "AWS"],
    images: ["./assets/images/project-6.png"],
    links: {
      preview: "#",
      github: "#",
      drive: "#"
    }
  },
  "summary": {
    title: "Summary",
    description: "Data visualization and analytics dashboard for business intelligence. Provides insights through interactive charts and reports.",
    skills: ["React", "D3.js", "Python", "Flask", "PostgreSQL"],
    images: ["./assets/images/project-7.png"],
    links: {
      preview: "#",
      github: "#",
      drive: "#"
    }
  },
  "task manager": {
    title: "Task Manager",
    description: "Productivity application for managing tasks and projects. Features include drag-and-drop, team collaboration, and deadline tracking.",
    skills: ["Vue.js", "Node.js", "MongoDB", "Express", "JWT"],
    images: ["./assets/images/project-8.jpg"],
    links: {
      preview: "#",
      github: "#",
      drive: "#"
    }
  },
  "arrival": {
    title: "Arrival",
    description: "Travel booking platform with integrated payment system and real-time availability. Provides seamless booking experience for users.",
    skills: ["React", "Redux", "Node.js", "Stripe API", "MongoDB"],
    images: ["./assets/images/project-9.png"],
    links: {
      preview: "#",
      github: "#",
      drive: "#"
    }
  }
};

// project modal toggle function
const projectModalFunc = function () {
  projectModalContainer.classList.toggle("active");
  projectOverlay.classList.toggle("active");
  document.body.style.overflow = projectModalContainer.classList.contains("active") ? "hidden" : "";
}

// function to load project data into modal
const loadProjectModal = function (projectName, projectItemElement) {
  const project = projectData[projectName.toLowerCase()];
  if (!project) return;

  // Set title
  projectModalTitle.textContent = project.title;

  // Set description
  projectModalDescription.innerHTML = `<p>${project.description}</p>`;

  // Set skills
  projectModalSkills.innerHTML = "";
  project.skills.forEach(skill => {
    const skillTag = document.createElement("span");
    skillTag.className = "skill-tag";
    skillTag.textContent = skill;
    projectModalSkills.appendChild(skillTag);
  });

  // Set images
  if (project.images && project.images.length > 0) {
    projectModalMainImg.src = project.images[0];
    projectModalMainImg.alt = project.title;

    // Set thumbnails
    projectGalleryThumbnails.innerHTML = "";
    project.images.forEach((imgSrc, index) => {
      const thumbnail = document.createElement("div");
      thumbnail.className = "project-thumbnail" + (index === 0 ? " active" : "");
      thumbnail.innerHTML = `<img src="${imgSrc}" alt="${project.title} thumbnail ${index + 1}">`;
      thumbnail.addEventListener("click", function() {
        projectModalMainImg.src = imgSrc;
        document.querySelectorAll(".project-thumbnail").forEach(thumb => thumb.classList.remove("active"));
        this.classList.add("active");
      });
      projectGalleryThumbnails.appendChild(thumbnail);
    });
  }

  // Get links from project item buttons if available, otherwise use default data
  const projectItemLinks = projectItemElement ? projectItemElement.querySelectorAll(".project-link-btn") : null;
  
  // Set links
  projectModalLinks.forEach(linkBtn => {
    const linkType = linkBtn.dataset.projectModalLink;
    
    // Try to get link from project item first
    if (projectItemLinks) {
      const itemLink = Array.from(projectItemLinks).find(link => link.dataset.linkType === linkType);
      if (itemLink && itemLink.href && itemLink.href !== "#") {
        linkBtn.href = itemLink.href;
        linkBtn.style.display = "flex";
        return;
      }
    }
    
    // Fallback to project data
    if (project.links && project.links[linkType]) {
      linkBtn.href = project.links[linkType];
      linkBtn.style.display = "flex";
    } else {
      linkBtn.style.display = "none";
    }
  });
}

// add click event to all project items
for (let i = 0; i < projectItems.length; i++) {
  const projectImg = projectItems[i].querySelector("[data-project-img]");
  if (projectImg) {
    projectImg.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const projectTitle = projectItems[i].querySelector(".project-title").textContent;
      loadProjectModal(projectTitle, projectItems[i]);
      projectModalFunc();
    });
  }

  // Prevent modal from opening when clicking project links
  const projectLinks = projectItems[i].querySelectorAll(".project-link-btn");
  projectLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      e.stopPropagation();
      // Allow link to work normally
    });
  });
}

// add click event to modal close button
if (projectModalCloseBtn) {
  projectModalCloseBtn.addEventListener("click", projectModalFunc);
}

if (projectOverlay) {
  projectOverlay.addEventListener("click", function(e) {
    // Only close if clicking directly on overlay, not on modal content
    if (e.target === projectOverlay) {
      projectModalFunc();
    }
  });
}

// image zoom functionality
const projectGalleryMain = document.querySelector(".project-gallery-main");
if (projectGalleryMain) {
  projectGalleryMain.addEventListener("click", function() {
    this.classList.toggle("zoomed");
    if (this.classList.contains("zoomed")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });
}

// Close zoomed image on escape key
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    if (projectGalleryMain && projectGalleryMain.classList.contains("zoomed")) {
      projectGalleryMain.classList.remove("zoomed");
      document.body.style.overflow = "";
    }
    if (projectModalContainer && projectModalContainer.classList.contains("active")) {
      projectModalFunc();
    }
  }
});