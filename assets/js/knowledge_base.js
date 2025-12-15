// Enhanced Knowledge Base for Portfolio Chatbot
// Sources: CV Andre PV.pdf, CV Andre AU.pdf, and expanded technical context

const knowledgeBase = [
    {
        id: "intro",
        keywords: ["who are you", "hello", "hi", "hey", "intro", "introduction", "about", "name"],
        response: "Hi! I'm Andre Saputra's AI Assistant. I'm here to tell you about his work in Mechatronics, AI, Renewable Energy, IoT, Automation, and Robotics. What would you like to know?"
    },
    {
        id: "about",
        keywords: ["background", "summary", "profile", "bio", "yourself", "overview"],
        response: "Andre Saputra is a passionate third-year undergraduate student majoring in Mechatronics and Artificial Intelligence at Universitas Pendidikan Indonesia. He has a strong focus on **Energy Conversion, Photovoltaic Systems, IoT Automation, Robotics, and Industrial Control Systems**. He’s based in Tangerang, Indonesia, and is actively building his career through hands-on projects in renewable energy, automation, and AI-driven systems."
    },
    {
        id: "skills",
        keywords: ["skills", "expertise", "competencies", "strengths", "tech stack", "technologies", "tools", "software", "languages", "programming"],
        response: "Andre’s technical skills span across multiple domains:\n\n" +
            "**Automation & Control:**\n" +
            "- PLC Programming (Omron CP2E, CX-Programmer, Siemens TIA Portal V17)\n" +
            "- Ladder Logic, PID Control, Timer/Counter Logic\n" +
            "- Industrial Simulation (Fluidsim Festo)\n" +
            "- Robotic Control (Dobot Studio, Python Scripting)\n\n" +
            "**IoT & Embedded Systems:**\n" +
            "- ESP32, LoRaWAN, MQTT, Firebase\n" +
            "- Sensor Integration (INA219, BH1750, GP2Y101AUOF, PZEM-004T, MPU6050, MLX90614, DS18B20)\n" +
            "- Motor Control (NEMA 17 Stepper)\n\n" +
            "**Renewable Energy & Simulation:**\n" +
            "- PVsyst, Helioscope, ETAP\n" +
            "- Solar PV Design, Energy Yield Analysis, Financial Modeling (LCOE, ROI)\n" +
            "- Digital Twin Development\n\n" +
            "**Software & Development:**\n" +
            "- Python, MATLAB, Google Colab\n" +
            "- Next.js, Web Dashboard Development\n" +
            "- Circuit Design (Proteus, Eagle, Cirkit Designer)\n\n" +
            "**Design & Prototyping:**\n" +
            "- SketchUp, 3D Printing (OrcaSlicer), Precision Measurement\n" +
            "- Additive Manufacturing, Prototype Development"
    },
    {
        id: "education",
        keywords: ["education", "university", "school", "degree", "study", "gpa", "major", "college"],
        response: "Andre is currently pursuing a **Bachelor’s degree in Mechatronics and Artificial Intelligence** at **Universitas Pendidikan Indonesia** (June 2023 – Present).\n" +
            "- GPA: 3.45\n" +
            "- Extracurricular: Lembaga Penelitian dan Pengkajian Intelektual Mahasiswa\n" +
            "- Student Association: Himpunan Mahasiswa Mekatronika dan Kecerdasan Buatan (Himatronika-AI)\n\n" +
            "Previous Education:\n" +
            "- **SMA Negeri 1 Tangerang** (2020 – 2022), Social Sciences\n" +
            "- Extracurriculars: Nitracivic Debating School, Paskibra, Fiesta Teater"
    },
    {
        id: "experience",
        keywords: ["experience", "work", "job", "career", "internship", "college copilot", "himatronika", "organization", "role"],
        response: "Andre’s organizational and professional experience includes:\n\n" +
            "**HIMATRONIKA-AI** (Jun 2019 – Jun 2022)\n" +
            "- **Supervisor Committee (Second Period):** Oversaw departments, monitored strategic direction, and provided assessments to improve collaboration.\n" +
            "- **Research & Development Associate (First Period):** Researched educational content for @mkb.studycenter, designed visual posts, and developed IoT projects for events.\n\n" +
            "**College Copilot at Creative Associates** (2025 – Present)\n" +
            "- Designed visual content and analyzed AI strategies."
    },
    {
        id: "projects",
        keywords: ["project", "portfolio", "work", "creation", "app", "website", "iot", "automation", "robotics", "solar", "pv", "digital twin"],
        response: "Andre has worked on a variety of hands-on projects across IoT, automation, renewable energy, and robotics. You can ask about:\n" +
            "- Solar PV Digital Twin Simulation\n" +
            "- Autonomous PV Cleaning & Monitoring System\n" +
            "- Automatic Rice Weighing System\n" +
            "- Autonomous Line Follower Fire-Fighting Robot\n" +
            "- Smart Predictive Maintenance System for Motors\n" +
            "- PLC Trainer Simulation (Omron CP2E)\n" +
            "- Automatic Robotic Arm Simulation (Dobot)\n\n" +
            "Feel free to ask for details on any specific project!"
    },
    {
        id: "project_solar_digital_twin",
        keywords: ["solar pv digital twin", "digital twin", "pv simulation", "helioscope", "pvsyst", "renewable energy simulation"],
        response: "**Solar PV Digital Twin Simulation**\n" +
            "A comprehensive platform for designing, costing, and analyzing rooftop solar PV systems. Features include:\n" +
            "- Virtual site assessment & energy yield modeling (PVsyst, Helioscope)\n" +
            "- Automated Bill of Materials (BoM) generation\n" +
            "- Python-based financial modeling (ROI, LCOE, payback period)\n" +
            "- Interactive Next.js dashboard for stakeholder visualization\n" +
            "Skills: PV Design, Financial Modeling, Python, Next.js, EPC Workflow"
    },
    {
        id: "project_pv_cleaning",
        keywords: ["pv cleaning", "autonomous cleaning", "solar maintenance", "lora", "esp32", "dust detection", "ina219"],
        response: "**Autonomous PV Cleaning & Monitoring System**\n" +
            "An IoT-enabled solar panel maintenance solution featuring:\n" +
            "- ESP32 + LoRaWAN for wireless communication\n" +
            "- Sensors: INA219 (power), BH1750 (irradiance), GP2Y101AUOF (dust)\n" +
            "- Mechanized cleaning assembly with NEMA 17 stepper motors & linear rails\n" +
            "- Predictive cleaning algorithms based on soiling levels\n" +
            "Skills: IoT, Embedded Systems, Sensor Integration, Motor Control"
    },
    {
        id: "project_predictive_maintenance",
        keywords: ["predictive maintenance", "motor health", "fuzzy logic", "anomaly detection", "mqtt", "firebase", "pzem", "mlx90614"],
        response: "**Smart Predictive Maintenance System**\n" +
            "A multi-sensor IoT system for electric motor health monitoring:\n" +
            "- Sensors: PZEM-004T (power), MPU6050 (vibration), MLX90614 (thermal), DS18B20 (temperature)\n" +
            "- Data pipeline: MQTT → Firebase → Web Dashboard\n" +
            "- Hybrid analytics: Anomaly detection + Fuzzy logic expert system\n" +
            "- Real-time fault diagnosis & maintenance recommendations\n" +
            "Skills: IoT, Machine Learning, Real-time Data, Fuzzy Logic, Dashboard Dev"
    },
    {
        id: "project_plc_trainer",
        keywords: ["plc", "omron", "cx-programmer", "ladder logic", "industrial automation", "pid", "timer", "counter"],
        response: "**PLC Trainer Simulation using Omron CP2E**\n" +
            "A hands-on training system for industrial automation:\n" +
            "- Simulated double-acting cylinders with ladder logic\n" +
            "- Integrated relays, timers, counters, comparators, PID controllers\n" +
            "- Sequential control for material handling & assembly lines\n" +
            "Skills: PLC Programming, Ladder Logic, Process Simulation, Industrial Control"
    },
    {
        id: "project_robotic_arm",
        keywords: ["robotic arm", "dobot", "conveyor", "color sensor", "pick and place", "automation logic"],
        response: "**Automatic Robotic Arm Simulation**\n" +
            "A fully automated pick-and-place system using Dobot Magician:\n" +
            "- Integrated conveyor, color sensor, and infrared detection\n" +
            "- Python scripting in Dobot Studio for real-time control\n" +
            "- Precision gripping & trajectory planning\n" +
            "Skills: Robotics, Python, Sensor Integration, Automation Logic"
    },
    {
        id: "project_rice_weighing",
        keywords: ["rice weighing", "iot household", "load sensor", "esp32", "web control", "automation"],
        response: "**Automatic Rice Weighing System**\n" +
            "An IoT-based smart dispenser for precise rice portioning:\n" +
            "- ESP32 + load sensor + infrared sensor\n" +
            "- Web-based interface for remote quantity setting\n" +
            "- Real-time data handling & control\n" +
            "Skills: IoT Design, ESP32, Web Control, Sensor Integration"
    },
    {
        id: "project_line_follower",
        keywords: ["line follower", "fire fighting", "sketchup", "3d printing", "chassis", "prototyping"],
        response: "**Autonomous Line Follower Fire-Fighting Robot**\n" +
            "Custom chassis design and prototyping for a fire-distinguishing robot:\n" +
            "- Designed in SketchUp for heat resistance & component protection\n" +
            "- Precision measurement & tolerance analysis\n" +
            "- 3D printed using Creality K1 Max & OrcaSlicer\n" +
            "Skills: SketchUp, 3D Printing, Prototyping, Robotics Design"
    },
    {
        id: "contact",
        keywords: ["contact", "email", "phone", "reach", "hire", "address", "location", "get in touch"],
        response: "You can reach Andre via:\n" +
            "- 📧 Email: andresaputra8986@gmail.com\n" +
            "- 📞 Phone: +62 851-7524-0440\n" +
            "- 📍 Location: Tangerang, Indonesia"
    },
    {
        id: "social",
        keywords: ["github", "linkedin", "instagram", "social media", "profile", "portfolio link"],
        response: "Connect with Andre online:\n" +
            "- GitHub: github.com/Andre2404\n" +
            "- LinkedIn: linkedin.com/in/andre-saputra-tangerang\n" +
            "- Instagram: @artiast24"
    },
    {
        id: "cv",
        keywords: ["cv", "resume", "download", "pdf", "document"],
        response: "You can download Andre’s CV from the sidebar or the Resume section in his portfolio website."
    },
    {
        id: "interests",
        keywords: ["interests", "passion", "focus", "future", "goals", "career direction"],
        response: "Andre is deeply interested in:\n" +
            "- Renewable Energy Systems (PV, Energy Conversion)\n" +
            "- Industrial Automation & Robotics\n" +
            "- IoT & Embedded Intelligence\n" +
            "- AI-Driven Predictive Maintenance\n" +
            "- Digital Twins for Energy & Automation"
    },
    {
        id: "tools",
        keywords: ["tools used", "software used", "platforms", "development environment"],
        response: "Andre regularly uses:\n" +
            "- **Automation:** CX-Programmer, TIA Portal, Fluidsim, Dobot Studio\n" +
            "- **Energy Simulation:** PVsyst, Helioscope, ETAP\n" +
            "- **Design & CAD:** SketchUp, Proteus, Eagle, Cirkit Designer\n" +
            "- **Programming:** Python, MATLAB, Google Colab\n" +
            "- **IoT Platforms:** ESP32, LoRaWAN, MQTT, Firebase"
    }
];

// Fallback response
const fallbackResponse = "I’m not sure I understand. Try asking about 'skills', 'projects', 'education', 'contact', or specific tools like 'PLC', 'IoT', 'Solar PV', or 'Robotics'.";