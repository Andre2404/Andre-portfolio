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
const projectModalMainVideo = document.querySelector("[data-project-modal-main-video]");
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
  },
  "automatic rice weighing system": {
    title: "Automatic Rice Weighing System",
    description: "Close Loop Control and IoT Project. A smart system designed to automate rice weighing with high precision using load cells and ESP32 microcontroller, featuring real-time monitoring and control.",
    skills: ["IoT", "ESP32", "Load Cell", "Control Systems", "C++", "Automation"],
    images: ["./assets/images/project-10.png"],
    links: {
      preview: "https://youtu.be/v72xuCXyyV0?si=R-y_TOnzI_9kcfp7",
      github: "https://github.com/Andre2404/Dispenser-Beras-Cerdas",
      drive: "#"
    }
  },
  "automatic robotic arm simulation": {
    title: "Automatic Robotic Arm Simulation",
    description: "Industrial Robotic Simulation. A comprehensive simulation of a robotic arm for industrial applications, demonstrating kinematics and automated control sequences.",
    skills: ["Robotics", "Simulation", "Kinematics", "Automation", "Visualisation"],
    images: ["./assets/images/arm.mp4"],
    links: {
      preview: "#",
      github: "#",
      drive: "#"
    }
  },
  "autonomous line follower fire-fighting chassis & system design": {
    title: "Autonomous Line Follower Fire-Fighting Chassis & System Design",
    description: "Robotics & Mechatronic Fire Alarm system. An autonomous robot chassis designed to follow lines and detect/extinguish fires, integrating sensor fusion for navigation and hazard response. Features custom 3D-printed chassis, infrared line sensors, flame detection module, and water pump extinguishing system.",
    skills: ["Robotics", "Mechatronics", "Sensors", "Arduino", "System Design", "3D Printing", "SketchUp"],
    images: ["./assets/images/project-12.jpeg", "./assets/images/firefight-1.mp4"],
    links: {
      preview: "https://grabcad.com/library/chassis-line-follower-robot-fire-fighting-system-1",
      github: "https://github.com/MuzakkiAlAarif/RoboT-Line-Follower-Fighting-System",
      youtube: "#"
    }
  },
  "smart predictive maintenance system for digital twin motor health monitoring": {
    title: "Smart Predictive Maintenance System for Digital Twin Motor Health Monitoring",
    description: "Developed an intelligent predictive maintenance system for electric motors using ESP32-based multi-sensor monitoring with PZEM-004T for power analysis, MPU6050 for vibration detection, MLX90614 for thermal imaging, and DS18B20 for temperature tracking. The system transmits real-time operational data via MQTT to a web dashboard while storing metrics in Firebase Realtime Database. Implemented a hybrid analytics engine combining anomaly detection algorithms for health scoring, bearing fault classification, and a fuzzy logic expert system for fault diagnosis and maintenance recommendations.",
    skills: ["IoT Sensor Integration", "Node-red", "Real-Time Data Pipeline (MQTT, Firebase)", "Machine Learning (Anomaly Detection)", "Dashboard Digital Twin", "Fuzzy Logic Systems", "Predictive Maintenance", "Rule Based Knowledge", "Industrial Monitoring"],
    images: ["./assets/images/Project-13.PNG", "./assets/images/Mechasense-1.PNG", "./assets/images/Mechasense-2.PNG", "./assets/images/mechasense-3.jpeg"],
    links: {
      preview: "https://mechasenses-tw2u.vercel.app/",
      github: "https://github.com/Andre2404/Digital_Twin_Predictive_Maintenance_for_electric_motors",
      youtube: "https://youtu.be/BjRDWnmDT9M?si=vSkHuWMWKyAJdCWD"
    }
  },
  "battery cell machine safety design": {
    title: "Battery Cell Machine Safety Design",
    description: "Lithium-ion batteries play a pivotal role in a wide range of applications, from electronic devices to large-scale electrified transportation systems and grid-scale energy storage. Nevertheless, they are vulnerable to both progressive aging and unexpected failures, which can result in catastrophic events such as explosions or fires. Given their expanding global presence, the safety of these batteries and potential hazards from serious malfunctions are now major public concerns.<br><br>Over the past decade, scholars and industry experts are intensively exploring methods to monitor battery safety, spanning from materials to cell, pack and system levels and across various spectral, spatial, and temporal scopes. This project explores the intricacies in predicting battery system evolution and delves into the specialized knowledge essential for data-driven, machine learning models.<br><br>Key areas covered include: (1) supervised and reinforcement learning integrated with battery models, apt for predicting faults/failures and probing into failure causes and safety protocols at the cell level; (2) unsupervised, semi-supervised, and self-supervised learning, advantageous for harnessing vast data sets from battery modules/packs; (3) few-shot learning tailored for gleaning insights from scarce examples, alongside physics-informed machine learning to bolster model generalization and optimize training in data-scarce settings.",
    skills: ["Battery Management System", "Safety-Critical Design", "Pneumatic Control", "FluidSim", "ISO Safety Standards", "PLC Programming", "Machine Learning", "Fault Diagnosis"],
    images: ["./assets/images/project-6.png", "./assets/images/bms.jpg", "./assets/images/bms-2.jpg"],
    links: {
      paper: "https://www.sciencedirect.com/topics/engineering/battery-safety-issue",
      article: "https://www.ayaatech.com/news/how-battery-pack-design-for-electric-vehicle-impacts-performance-safety-and-lifecycle/",
      video: "https://www.mathworks.com/videos/designing-supervisory-control-for-safety-critical-systems-101650.html"
    }
  },
  "labguard smart door lock": {
    title: "Labguard Smart Door Lock",
    description: "Developed a remote laboratory access monitoring system using an infrared sensor-based smart door lock to enhance security and oversight. The system detects door status (open/closed) through infrared beam interruption and transmits real-time data to a Firebase Realtime Database, enabling administrators to monitor lab access from any location via a web or mobile dashboard.<br><br>The project focused on creating a reliable, low-power IoT solution that provides instant notifications upon unauthorized entry or unexpected door activity, improving lab security and operational transparency.",
    skills: ["IoT System Design", "ESP32 Programming", "Sensor Integration (Infrared)", "Firebase Realtime Database", "Real-Time Monitoring", "Embedded Systems", "Web Dashboard Development", "Access Control Systems"],
    images: ["./assets/images/Lab-1.jpg", "./assets/images/Lab-2.jpg"],
    links: {}
  },
  "plc control: double acting cylinder": {
    title: "PLC Control: Double Acting Cylinder",
    description: "Designed and implemented a comprehensive PLC training system using an Omron CP1E module to simulate real-world industrial automation scenarios. Programmed complex control logic for double-acting cylinders using ladder diagrams, integrating multiple industrial components including relays, timers, counters, comparators, and PID controllers.<br><br>Developed sequential operations with structured programming methods to replicate manufacturing processes such as material handling, sorting systems, and automated assembly lines.",
    skills: ["PLC Programming (CX-Programmer)", "Ladder Logic", "Industrial Automation", "PID Control", "Sequential Control", "Timer/Counter Logic", "Relay Systems", "Process Simulation"],
    images: ["./assets/images/cx2.png", "./assets/images/cx.mp4"],
    links: {
      video: "https://drive.google.com/drive/folders/1fWiQZ1JEnrMQnfoYN1gWqJq-6sTxx2vu"
    }
  },
  "wifi rc car teleoperation": {
    title: "WiFi RC Car Teleoperation",
    description: "Engineered a wireless remote-controlled robotic vehicle leveraging the ESP8266 microcontroller for seamless smartphone connectivity. The system features a hybrid motor control architecture, utilizing an L298N driver for high-current load management while interfacing with the ESP8266 for signal processing and direct control. The vehicle is operated via a dedicated mobile application (Bluino), allowing for real-time maneuvering and speed adjustments.<br><br>The development process focused on hardware-software integration, starting with circuit design to manage power distribution between the microcontroller and motors. I programmed the ESP8266 using C++ to establish a stable wireless communication link, parsing data packets from the mobile app into precise PWM signals.",
    skills: ["IoT (Internet of Things)", "ESP8266", "C++ Programming", "L298N Motor Driver", "Wireless Communication", "Hardware Prototyping", "Mobile App Integration", "Pulse Width Modulation (PWM)"],
    images: ["./assets/images/Cartel-1.jpeg", "./assets/images/Cartel-2.jpeg", "./assets/images/Cartel-3.jpeg", "./assets/images/Cartel-4.jpeg"],
    links: {}
  },
  "solar pv end-to-end design & digital twin": {
    title: "Solar PV End-to-End Design & Digital Twin",
    description: "Developed a solution for rooftop solar PV systems, integrating technical design, costing, and financial analysis into a unified simulation environment. The platform enables end-to-end project lifecycle management through virtual site assessment, energy yield modeling using Helioscope and PVsyst, and automated Bill of Materials (BoM) generation with design-driven logic.<br><br>A custom Python engine powers predictive financial modeling for ROI, LCOE, and payback period analysis, while a modern Next.js interface provides stakeholders with interactive visualization and scenario comparison capabilities.",
    skills: ["Solar PV Design & Simulation (PVsyst, Helioscope)", "Financial Modeling", "Digital Twin Development", "Python Automation", "Next.js Frontend", "EPC Workflow Integration", "Energy Yield Analysis"],
    images: ["./assets/images/solar1.jpeg", "./assets/images/solar2.jpeg", "./assets/images/solar3.jpeg"],
    links: {}
  },
  "ultrasonic robot avoider": {
    title: "Ultrasonic Robot Avoider",
    description: "Developed an autonomous robot car capable of navigating complex environments without human intervention. The system integrates an ESP32 with a TB6612FNG Motor Driver Shield for precise motor control and utilizes a servo-mounted ultrasonic sensor to create a scanning mechanism.<br><br>This setup allows the robot to actively detect obstacles in the front, left, and right directions, processing spatial data in real-time to avoid collisions.",
    skills: ["Robotics", "Sensor Integration (Ultrasonic)", "Motor Control (TB6612FNG)", "Logic Algorithms", "Embedded Systems", "Servo Mechanism"],
    images: ["./assets/images/Ultrasonic-1.jpeg", "./assets/images/Ultrasonic-2.png"],
    links: {}
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
  const trimmedName = projectName.trim().toLowerCase();
  console.log("Looking for project:", trimmedName);
  console.log("Available keys:", Object.keys(projectData));
  const project = projectData[trimmedName];
  if (!project) {
    console.log("Project not found for:", trimmedName);
    return;
  }

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

  // Set images/video
  if (project.images && project.images.length > 0) {
    const mainSrc = project.images[0];
    const isVideo = mainSrc.toLowerCase().endsWith('.mp4');

    if (isVideo) {
      projectModalMainImg.style.display = 'none';
      if (projectModalMainVideo) {
        projectModalMainVideo.src = mainSrc;
        projectModalMainVideo.style.display = 'block';
        projectModalMainVideo.load();
        projectModalMainVideo.play().catch(e => console.log("Autoplay prevented:", e));
      }
    } else {
      if (projectModalMainVideo) {
        projectModalMainVideo.pause();
        projectModalMainVideo.style.display = 'none';
      }
      projectModalMainImg.src = mainSrc;
      projectModalMainImg.alt = project.title;
      projectModalMainImg.style.display = 'block';
    }

    // Set thumbnails
    projectGalleryThumbnails.innerHTML = "";
    project.images.forEach((imgSrc, index) => {
      const thumbnail = document.createElement("div");
      thumbnail.className = "project-thumbnail" + (index === 0 ? " active" : "");

      if (imgSrc.toLowerCase().endsWith('.mp4')) {
        // Create video thumbnail (or use a placeholder icon)
        thumbnail.innerHTML = `<div class="video-thumbnail-indicator">▶</div><video muted src="${imgSrc}" style="width:100%; height:100%; object-fit:cover;"></video>`;
      } else {
        thumbnail.innerHTML = `<img src="${imgSrc}" alt="${project.title} thumbnail ${index + 1}">`;
      }

      thumbnail.addEventListener("click", function () {
        const isThumbVideo = imgSrc.toLowerCase().endsWith('.mp4');

        if (isThumbVideo) {
          projectModalMainImg.style.display = 'none';
          if (projectModalMainVideo) {
            projectModalMainVideo.src = imgSrc;
            projectModalMainVideo.style.display = 'block';
            projectModalMainVideo.load();
            projectModalMainVideo.play().catch(e => console.log("Play error:", e));
          }
        } else {
          if (projectModalMainVideo) {
            projectModalMainVideo.pause();
            projectModalMainVideo.style.display = 'none';
          }
          projectModalMainImg.src = imgSrc;
          projectModalMainImg.style.display = 'block';
        }

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
projectItems.forEach(function (projectItem) {
  const projectImg = projectItem.querySelector("[data-project-img]");
  if (projectImg) {
    projectImg.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const projectTitle = projectItem.querySelector(".project-title").textContent;
      console.log("Clicked project title:", projectTitle);
      loadProjectModal(projectTitle, projectItem);
      projectModalFunc();
    });
  }

  // Prevent modal from opening when clicking project links
  const projectLinks = projectItem.querySelectorAll(".project-link-btn");
  projectLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.stopPropagation();
      // Allow link to work normally
    });
  });
});

// add click event to modal close button
if (projectModalCloseBtn) {
  projectModalCloseBtn.addEventListener("click", projectModalFunc);
}

if (projectOverlay) {
  projectOverlay.addEventListener("click", function (e) {
    // Only close if clicking directly on overlay, not on modal content
    if (e.target === projectOverlay) {
      projectModalFunc();
    }
  });
}

// Prevent modal from closing when clicking inside modal content
const projectModal = document.querySelector(".project-modal");
if (projectModal) {
  projectModal.addEventListener("click", function (e) {
    e.stopPropagation();
  });
}

// image zoom functionality
const projectGalleryMain = document.querySelector(".project-gallery-main");
if (projectGalleryMain) {
  projectGalleryMain.addEventListener("click", function () {
    this.classList.toggle("zoomed");
    if (this.classList.contains("zoomed")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });
}

// Close zoomed image on escape key
document.addEventListener("keydown", function (e) {
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
  certificateImages.forEach(function (img) {
    // Add cursor pointer style
    img.style.cursor = "pointer";

    img.addEventListener("click", function (e) {
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
  certificateOverlay.addEventListener("click", function (e) {
    if (e.target === certificateOverlay) {
      certificateModalFunc();
    }
  });
}