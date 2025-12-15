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

// Initialize: Hide all pages except the active one on page load
for (let i = 0; i < pages.length; i++) {
  if (!pages[i].classList.contains("active")) {
    pages[i].style.display = "none";
  }
}

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const pageName = this.innerHTML.toLowerCase().trim();

    // Hide all pages first
    for (let i = 0; i < pages.length; i++) {
      pages[i].classList.remove("active");
      pages[i].style.display = "none";
    }

    // Show the selected page
    for (let i = 0; i < pages.length; i++) {
      if (pageName === pages[i].dataset.page) {
        pages[i].classList.add("active");
        pages[i].style.display = "block";
        window.scrollTo(0, 0);
        break;
      }
    }

    // Remove active from all nav links first
    for (let j = 0; j < navigationLinks.length; j++) {
      navigationLinks[j].classList.remove("active");
    }
    // Add active to clicked link
    this.classList.add("active");

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
  "jaya plafon landing page": {
    title: "Jaya Plafon Landing Page",
    description: "A company profile website built using modern web technologies like Vite, TypeScript, React, shadcn-ui, and Tailwind CSS. Enhanced with lovable.AI for interactive features, this project showcases expertise in frontend development and cutting-edge web architecture.",
    skills: ["Vibe Code", "CSS", "HTML", "React", "typescript"],
    images: ["./assets/images/project-1.png"],
    links: {
      preview: "#",
      github: "#",
      drive: "#"
    }
  },
  "buku bersama": {
    title: "Buku Bersama",
    description: "A collaborative education app that lets students share lecture notes as open learning resources. Integrated an AI pipeline using a public Hugging Face OCR model and an LLM powered by Google Gemini (via LangChain) to analyze uploaded documents and automatically generate quiz reminders and review alerts to reduce knowledge decay. The system features use Pinecone vector database for semantic search, and a backend fully deployed with Supabase on Render’s free tier.",
    skills: ["LLM", "OCR Processing", "Semantic Search", "Pinecone", "Langchain"],
    images: ["./assets/images/project-2.png"],
    links: {
      preview: "#",
      github: "#",
      drive: "#"
    }
  },
  "expert system for maintenance machine": {
    title: "Expert System for Maintenance Machine",
    description: "Developed an expert system with a JSON-based knowledge base and an inference engine using forward chaining and certainty factor scoring. The system identifies the most probable diagnosis based on layered rule evaluation and confidence weighting, delivering clear and explainable output to users.",
    skills: ["Expert System", "Rule-Based Systems", "Forward Chaining Logic", "JSON Knowledge Structuring", "SASS"],
    images: ["./assets/images/project-3.png"],
    links: {
      preview: "#",
      github: "#",
      drive: "#"
    }
  },
  "intergration ai dashboard": {
    title: "Dashboard Business Intelligence",
    description: "built an interactive business-intelligence dashboard using the Reflex full-Python framework to visualize key financial KPIs: total revenue, revenue trends, revenue by category, and other operational metrics.  I also embedded a text-generation feature powered by a pretrained model via the Hugging Face API to produce automated narrative summaries and insights (e.g., weekly highlights, anomaly explanations) that help non-technical stakeholders quickly grasp trends.",
    skills: ["Reflex", "Data Aggregation", "KPI Design", "UX for Data Products", "Python"],
    images: ["./assets/images/project-4.png"],
    links: {
      preview: "#",
      github: "#",
      drive: "#"
    }
  },
  "climate disease analytics": {
    title: "climate disease analytics",
    description: "Built an intelligence dashboard to analyze and visualize climate-related disease spread based on Kaggle epidemiology datasets. Implemented predictive modeling to forecast outbreak trends using climate variables as key indicators. Delivered interactive map visuals, time-series insights, and disease distribution filters to support data-driven public health decisions. End-to-end workflow created fully in Python with Reflex, ensuring modular, scalable, and production-ready architecture.",
    skills: ["Reflex", "Predictive Modeling", "Epidemiological Data Analysis", "Data Visualization", "Python"],
    images: ["./assets/images/project-5.png"],
    links: {
      preview: "#",
      github: "#",
      drive: "#"
    }
  },
  "machine learning faskes prediction": {
    title: "Machine Learning Faskes Prediction",
    description: "Built a machine learning model to predict whether patients should be referred to higher-level BPJS healthcare facilities. The project started with full EDA on nationwide BPJS visit and facility datasets, focusing on patient demographics, service types, and historical referral patterns. The modeling stage applied Random Forest, XGBoost, and Logistic Regression, followed by evaluation and tuning. The final model achieved an average F1-score of 0.2868 (I know its bad)",
    skills: ["Machine Learning Modeling", "EDA & Data Cleaning", "Pandas", "Scikit Learning", "Model Evaluation (F1-Score)"],
    images: ["./assets/images/project-6.png"],
    links: {
      preview: "#",
      github: "#",
      drive: "#"
    }
  },
  "picare": {
    title: "Picare AI Skin Analysis",
    description: "Data visualization and analytics dashboard for business intelligence. Provides insights through interactive charts and reports.",
    skills: ["React", "D3.js", "Python", "Flask", "PostgreSQL"],
    images: ["./assets/images/project-7.png"],
    links: {
      preview: "#",
      github: "#",
      drive: "#"
    }
  },
  "bitcoin simulation": {
    title: "Bitcoin Simulation for Early Investor",
    description: "A beginner-friendly, web-based cryptocurrency investment simulator designed to help users calculate potential profits and losses without risking real money.",
    skills: ["Vue.js", "Node.js", "MongoDB", "Express", "JWT"],
    images: ["./assets/images/project-8.png"],
    links: {
      preview: "#",
      github: "#",
      drive: "#"
    }
  },
  "sandpal": {
    title: "sandpal : AI finance assistant for sandwich generation",
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

// Prevent modal from closing when clicking inside modal content
const projectModal = document.querySelector(".project-modal");
if (projectModal) {
  projectModal.addEventListener("click", function(e) {
    e.stopPropagation();
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
    if (certificateModalContainer && certificateModalContainer.classList.contains("active")) {
      certificateModalFunc();
    }
  }
});



// ============================================
// Certificate Modal Functionality
// ============================================

const certificateImages = document.querySelectorAll(".certificate-img");
const certificateModalContainer = document.querySelector("[data-certificate-modal-container]");
const certificateModalCloseBtn = document.querySelector("[data-certificate-modal-close-btn]");
const certificateOverlay = document.querySelector("[data-certificate-overlay]");
const certificateModalImg = document.querySelector("[data-certificate-modal-img]");

// Certificate modal toggle function
const certificateModalFunc = function () {
  certificateModalContainer.classList.toggle("active");
  certificateOverlay.classList.toggle("active");
  document.body.style.overflow = certificateModalContainer.classList.contains("active") ? "hidden" : "";
}

// Add click event to all certificate images
if (certificateImages.length > 0) {
  certificateImages.forEach(function(img) {
    // Add cursor pointer style
    img.style.cursor = "pointer";
    
    img.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Prevent parent link from being triggered
      const parentLink = this.closest('a');
      if (parentLink) {
        parentLink.style.pointerEvents = 'none';
        setTimeout(() => {
          parentLink.style.pointerEvents = 'auto';
        }, 100);
      }
      
      const imgSrc = this.getAttribute("data-certificate-img") || this.src;
      const imgAlt = this.alt || "Certificate";
      
      if (certificateModalImg) {
        certificateModalImg.src = imgSrc;
        certificateModalImg.alt = imgAlt;
      }
      
      if (certificateModalContainer) {
        certificateModalFunc();
      }
    });
  });
}

// Add click event to modal close button
if (certificateModalCloseBtn) {
  certificateModalCloseBtn.addEventListener("click", certificateModalFunc);
}

// Add click event to overlay
if (certificateOverlay) {
  certificateOverlay.addEventListener("click", function(e) {
    if (e.target === certificateOverlay) {
      certificateModalFunc();
    }
  });
}