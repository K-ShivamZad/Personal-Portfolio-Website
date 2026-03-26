// 1. Navigation background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. Typewriter Effect for Hero Section
// FIX: Changed from 'const' to 'let' so it can be updated when the language changes
let textArray = ["Insights.", "Decisions.", "Solutions."];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeTarget = document.querySelector('.text-type');
// Add this near the top of your script with your other element selections
const langSelect = document.getElementById('lang-select');

// Add this function anywhere in your script (preferably above the Event Listeners)
function setLanguage(lang) {
    // 1. Save preference
    localStorage.setItem('portfolioLang', lang);
    
    // 2. Update all text elements with data-i18n attributes
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            // Check if it's the hero title (which contains the typewriter span)
            if (key === 'hero_title') {
                el.innerHTML = translations[lang][key] + ' <br><span class="highlight text-type"></span>';
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });

    // 3. Update Typewriter arrays to match the selected language
    if (typewriterTexts[lang]) {
        textArray = typewriterTexts[lang];
        // Reset typing variables to start fresh with new language
        textIndex = 0;
        charIndex = 0;
        isDeleting = false;
        if(typeTarget) typeTarget.textContent = ''; 
    }
}

// 3. Mobile Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 4. Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check if user previously saved a theme preference in localStorage
const savedTheme = localStorage.getItem('portfolioTheme');

// If they saved 'dark', apply it immediately on load
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

// Toggle functionality on click
themeToggle.addEventListener('click', () => {
    // Toggle the dark-mode class on the body
    body.classList.toggle('dark-mode');
    
    // Check if dark mode is now active
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun'); // Change icon to sun
        localStorage.setItem('portfolioTheme', 'dark');   // Save preference
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon'); // Change icon to moon
        localStorage.setItem('portfolioTheme', 'light');  // Save preference
    }
});

// 5. Scroll Animations (Intersection Observer)
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15, // Fire when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px" // Fire slightly before the element hits the very bottom of the screen
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target); // Stop observing once it has appeared so it doesn't animate repeatedly
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

function type() {
    // Safety check in case typeTarget doesn't exist
    if (!typeTarget) return;

    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typeTarget.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeTarget.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 100 : 200;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
}

// ==========================================
// 6. GLOBAL MULTI-LANGUAGE SUPPORT (i18n)
// ==========================================

const translations = {
    en: {
        // Navigation & Hero
        nav_home: "Home", nav_about: "About", nav_exp: "Experience", nav_proj: "Projects", nav_contact: "Contact Us",
        hero_sub: "Aspiring Data Researcher", hero_title: "Turning Data into", hero_desc: "Passionate about transforming raw data into meaningful insights to support data-driven decision-making.", btn_view_proj: "View Projects", btn_linkedin: "LinkedIn",
        
        // About & Skills
        about_title: "Academic Journey & Skills",
        edu_mca: "MCA (Data Science)", edu_mca_desc: "Gautam Buddha University, Greater Noida | 2025-2027(Expected)",
        edu_bca: "BCA", edu_bca_desc: "United University, Prayagraj | 2022-2025",
        edu_inter: "Intermediate", edu_inter_desc: "Completed in 2021",
        edu_high: "High School", edu_high_desc: "Completed in 2019",
        skill_py_title: "Python & R", skill_py_desc: "Pandas, NumPy, EDA",
        skill_db_title: "Databases", skill_db_desc: "MySQL, PostgreSQL",
        skill_vis_title: "Visualization", skill_vis_desc: "Power BI, Excel",
        skill_web_title: "Web Basics", skill_web_desc: "HTML5, CSS3, JS",
        
        // Experience
        exp_title: "Internship Experience", exp_role: "Data Science Intern", exp_date: "Nov 2025 - Dec 2025", exp_comp: "Cognifyz Technologies | Remote",
        exp_b1: "Cleaned and preprocessed datasets using Python (Pandas, NumPy).", exp_b2: "Performed Exploratory Data Analysis (EDA) to identify trends and patterns.", exp_b3: "Created visual summaries and reports to communicate insights.",
        
        // Capabilities
        cap_title: "Practical Application of My Learning", cap_desc: "My academic journey across comprehensive computing and advanced data science modules equips me to handle the complete data lifecycle—from raw data extraction to deploying intelligent web applications.",
        cap_derived: "Derived from:",
        cap1_title: "1. Predictive Modeling & AI", cap1_src: "Machine Learning, NLP, Probability & Statistics.", cap1_desc: "I don't just use APIs; my foundation in multivariable calculus and linear algebra allows me to understand algorithms under the hood. I can build, tune, and evaluate models for classification, forecasting, and text analysis.",
        cap2_title: "2. Scalable Data Architecture", cap2_src: "DBMS, Data Warehousing, Data Structures, OS.", cap2_desc: "I design optimized database schemas and write efficient queries. I understand how to structure and store data securely so that analytical queries run fast, even on large datasets.",
        cap3_title: "3. End-to-End Deployment", cap3_src: "Python, Web Technology, Software Engineering.", cap3_desc: "An ML model is only useful if people can use it. I can wrap data insights into interactive web applications and dashboards, bridging the gap between data science and software engineering.",
        cap4_title: "4. Business Intelligence", cap4_src: "Data Visualization, Management Concepts, Business Communications.", cap4_desc: "I translate complex analytical findings into clear, actionable business strategies. I focus on creating visual summaries that help stakeholders make data-driven decisions quickly.",
        
        // Projects
        proj_title: "Academic Projects",
        proj1_title: "Gym Management System", proj1_desc: "- Developed a database-driven system to manage gym members, plans, and attendance. Implemented SQL-based data storage and automated reporting.",
        proj2_title: "FinBot Advisor", proj2_desc: "A financial chatbot built using Streamlit to provide market insights and interactive data analytics.",
        proj3_title: "Personal Portfolio Website", proj3_desc: "A responsive and interactive web portfolio featuring a dynamic dark mode toggle, modern UI/UX design, and an open-source collaboration showcase.",
        proj4_title: "Web-Based Quiz Application", proj4_desc: "Built a web-based quiz platform with real-time scoring, performance tracking, and interactive UI components.",
        
        // Open Source
        os_title: "Open Source & Collaboration", os_desc: "I strongly believe in building together. Whether you are a beginner looking to make your first pull request or an experienced developer wanting to optimize algorithms, I would love to collaborate!",
        os1_badge: "Actively Seeking Contributors", os1_title: "FinBot Advisor", os1_desc: "A financial chatbot built with Python and Streamlit providing market insights.",
        os_help_wanted: "Help Wanted:", os1_l1: "UI/UX design improvements for the Streamlit interface", os1_l2: "Integration of real-time financial market APIs", os1_l3: "Bug fixes and code refactoring",
        os_btn_fork: "Fork Repo", os_btn_issues: "View Issues",
        os2_badge: "Research Initiative", os2_title: "Global Transparent Exchange Infrastructure (GTEI)", os2_desc: "An open-research conceptual framework and commercial strategy for coordinating economic, technological, and institutional data exchanges.",
        os_collab_needed: "Collaboration Needed:", os2_l1: "Researchers: Co-authoring the foundational whitepaper and system architecture.", os2_l2: "Data Architects: Designing transparent, scalable ledger models for institutional exchange.", os2_l3: "Developers: Building the initial proof-of-concept API infrastructure.",
        os_btn_abstract: "Read Abstract", os_btn_repo: "View Repo", os_btn_explore: "Explore My GitHub Profile",
        
        // Footer
        footer_title: "Let's Connect", footer_desc: "Currently open to data science and analytics opportunities.", footer_copy: "© 2026 KSA.iko PRIVATE LTD. All rights reserved."
    },
    zh: {
        nav_home: "主页", nav_about: "关于我", nav_exp: "经验", nav_proj: "项目", nav_contact: "联系我们",
        hero_sub: "有抱负的数据研究员", hero_title: "将数据转化为", hero_desc: "热衷于将原始数据转化为有意义的见解，以支持数据驱动的决策。", btn_view_proj: "查看项目", btn_linkedin: "领英",
        about_title: "学术历程与技能",
        edu_mca: "计算机应用硕士 (数据科学)", edu_mca_desc: "Gautam Buddha University, 大诺伊达 | 2025-2027 (预计)",
        edu_bca: "计算机应用学士", edu_bca_desc: "United University, 普拉亚格拉吉 | 2022-2025",
        edu_inter: "高中阶段", edu_inter_desc: "2021年完成",
        edu_high: "初中阶段", edu_high_desc: "2019年完成",
        skill_py_title: "Python 和 R", skill_py_desc: "Pandas, NumPy, 探索性数据分析", skill_db_title: "数据库", skill_db_desc: "MySQL, PostgreSQL", skill_vis_title: "数据可视化", skill_vis_desc: "Power BI, Excel", skill_web_title: "网络基础", skill_web_desc: "HTML5, CSS3, JS",
        exp_title: "实习经历", exp_role: "数据科学实习生", exp_date: "2025年11月 - 2025年12月", exp_comp: "Cognifyz Technologies | 远程",
        exp_b1: "使用 Python (Pandas, NumPy) 清洗和预处理数据集。", exp_b2: "执行探索性数据分析 (EDA) 以识别趋势和模式。", exp_b3: "创建可视化摘要和报告以传达见解。",
        cap_title: "我的学习的实际应用", cap_desc: "我在综合计算和高级数据科学模块的学术历程使我能够处理从原始数据提取到部署智能Web应用程序的完整数据生命周期。", cap_derived: "衍生于:",
        cap1_title: "1. 预测建模与人工智能", cap1_src: "机器学习，自然语言处理，概率与统计。", cap1_desc: "我不仅使用API；我在多变量微积分和线性代数方面的基础让我了解算法的核心。我可以构建、调整和评估分类、预测和文本分析模型。",
        cap2_title: "2. 可扩展的数据架构", cap2_src: "数据库管理系统，数据仓库，数据结构，操作系统。", cap2_desc: "我设计优化的数据库模式并编写高效的查询。我了解如何安全地构建和存储数据，以便分析查询能够快速运行，即使在大型数据集上也是如此。",
        cap3_title: "3. 端到端部署", cap3_src: "Python，Web技术，软件工程。", cap3_desc: "机器学习模型只有在人们可以使用它时才有用。我可以将数据见解封装到交互式Web应用程序和仪表板中，从而弥合数据科学和软件工程之间的差距。",
        cap4_title: "4. 商业智能", cap4_src: "数据可视化，管理概念，商业传播。", cap4_desc: "我将复杂的分析结果转化为清晰、可操作的业务策略。我专注于创建有助于利益相关者快速做出数据驱动决策的视觉摘要。",
        proj_title: "学术项目",
        proj1_title: "健身房管理系统", proj1_desc: "- 开发了一个数据库驱动的系统来管理健身房会员、计划和出勤。实施了基于SQL的数据存储和自动化报告。",
        proj2_title: "FinBot 顾问", proj2_desc: "一个使用 Streamlit 构建的金融聊天机器人，提供市场见解和交互式数据分析。",
        proj3_title: "个人作品集网站", proj3_desc: "一个响应式交互式网页作品集，具有动态深色模式切换、现代 UI/UX 设计和开源协作展示。",
        proj4_title: "基于Web的测验应用程序", proj4_desc: "构建了一个基于Web的测验平台，具有实时评分、表现跟踪和交互式UI组件。",
        os_title: "开源与协作", os_desc: "我坚信共同建设。无论您是想发出第一个拉取请求的初学者，还是想优化算法的经验丰富的开发人员，我都非常乐意合作！",
        os1_badge: "积极寻找贡献者", os1_title: "FinBot 顾问", os1_desc: "一个使用 Python 和 Streamlit 构建的提供市场见解的金融聊天机器人。",
        os_help_wanted: "需要帮助:", os1_l1: "Streamlit 界面的 UI/UX 设计改进", os1_l2: "整合实时金融市场 API", os1_l3: "错误修复和代码重构",
        os_btn_fork: "派生仓库", os_btn_issues: "查看问题",
        os2_badge: "研究倡议", os2_title: "全球透明交换基础设施 (GTEI)", os2_desc: "一个协调经济、技术和机构数据交换的开放研究概念框架和商业战略。",
        os_collab_needed: "需要协作:", os2_l1: "研究人员：合著基础白皮书和系统架构。", os2_l2: "数据架构师：为机构交换设计透明、可扩展的分类账模型。", os2_l3: "开发人员：构建初始的 API 基础设施概念验证。",
        os_btn_abstract: "阅读摘要", os_btn_repo: "查看仓库", os_btn_explore: "探索我的 GitHub 个人资料",
        footer_title: "联系我们", footer_desc: "目前正在寻找数据科学和分析方面的机会。", footer_copy: "© 2026 KSA.iko 私人有限公司。版权所有。"
    },
    es: {
        nav_home: "Inicio", nav_about: "Sobre Mí", nav_exp: "Experiencia", nav_proj: "Proyectos", nav_contact: "Contacto",
        hero_sub: "Aspirante a Investigador de Datos", hero_title: "Transformando Datos en", hero_desc: "Apasionado por transformar datos sin procesar en conocimientos significativos para respaldar la toma de decisiones basada en datos.", btn_view_proj: "Ver Proyectos", btn_linkedin: "LinkedIn",
        about_title: "Trayectoria Académica y Habilidades",
        edu_mca: "MCA (Ciencia de Datos)", edu_mca_desc: "Gautam Buddha University, Greater Noida | 2025-2027(Esperado)",
        edu_bca: "BCA", edu_bca_desc: "United University, Prayagraj | 2022-2025", edu_inter: "Intermedio", edu_inter_desc: "Completado en 2021", edu_high: "Escuela Secundaria", edu_high_desc: "Completado en 2019",
        skill_py_title: "Python y R", skill_py_desc: "Pandas, NumPy, EDA", skill_db_title: "Bases de Datos", skill_db_desc: "MySQL, PostgreSQL", skill_vis_title: "Visualización", skill_vis_desc: "Power BI, Excel", skill_web_title: "Bases Web", skill_web_desc: "HTML5, CSS3, JS",
        exp_title: "Experiencia de Pasantía", exp_role: "Pasante de Ciencia de Datos", exp_date: "Nov 2025 - Dic 2025", exp_comp: "Cognifyz Technologies | Remoto",
        exp_b1: "Limpieza y preprocesamiento de conjuntos de datos usando Python (Pandas, NumPy).", exp_b2: "Realización de Análisis Exploratorio de Datos (EDA) para identificar tendencias.", exp_b3: "Creación de resúmenes visuales y reportes para comunicar hallazgos.",
        cap_title: "Aplicación Práctica de mi Aprendizaje", cap_desc: "Mi trayectoria académica a través de módulos integrales de computación y ciencia de datos avanzada me capacita para manejar el ciclo de vida completo de los datos, desde la extracción hasta la implementación.", cap_derived: "Derivado de:",
        cap1_title: "1. Modelado Predictivo e IA", cap1_src: "Machine Learning, PNL, Probabilidad y Estadística.", cap1_desc: "No solo uso APIs; mi base en cálculo multivariable y álgebra lineal me permite comprender los algoritmos internamente. Puedo construir, ajustar y evaluar modelos.",
        cap2_title: "2. Arquitectura de Datos Escalable", cap2_src: "SGBD, Almacenamiento de Datos, Estructuras de Datos, SO.", cap2_desc: "Diseño esquemas de bases de datos optimizados y escribo consultas eficientes. Entiendo cómo estructurar y almacenar datos de forma segura para que las consultas analíticas se ejecuten rápidamente.",
        cap3_title: "3. Implementación de Extremo a Extremo", cap3_src: "Python, Tecnología Web, Ingeniería de Software.", cap3_desc: "Un modelo de ML solo es útil si la gente puede usarlo. Puedo integrar conocimientos de datos en aplicaciones web interactivas y paneles de control.",
        cap4_title: "4. Inteligencia Empresarial", cap4_src: "Visualización de Datos, Conceptos de Gestión, Comunicaciones Comerciales.", cap4_desc: "Traduzco hallazgos analíticos complejos en estrategias comerciales claras y procesables. Me enfoco en crear resúmenes visuales.",
        proj_title: "Proyectos Académicos",
        proj1_title: "Sistema de Gestión de Gimnasio", proj1_desc: "- Desarrollé un sistema basado en bases de datos para administrar miembros, planes y asistencia. Implementé almacenamiento SQL y reportes automáticos.",
        proj2_title: "FinBot Advisor", proj2_desc: "Un chatbot financiero creado con Streamlit para proporcionar información del mercado y análisis de datos interactivos.",
        proj3_title: "Sitio Web de Portafolio", proj3_desc: "Un portafolio web interactivo con diseño moderno y un escaparate de colaboración de código abierto.",
        proj4_title: "Aplicación de Cuestionario Web", proj4_desc: "Plataforma de cuestionarios basada en la web con puntuación en tiempo real y seguimiento del rendimiento.",
        os_title: "Código Abierto y Colaboración", os_desc: "Creo firmemente en construir juntos. ¡Me encantaría colaborar contigo!",
        os1_badge: "Buscando Colaboradores", os1_title: "FinBot Advisor", os1_desc: "Chatbot financiero creado con Python y Streamlit.",
        os_help_wanted: "Se Busca Ayuda:", os1_l1: "Mejoras de diseño UI/UX para Streamlit", os1_l2: "Integración de APIs de mercado financiero", os1_l3: "Corrección de errores y refactorización",
        os_btn_fork: "Bifurcar Repo", os_btn_issues: "Ver Problemas",
        os2_badge: "Iniciativa de Investigación", os2_title: "Infraestructura Global de Intercambio Transparente", os2_desc: "Estrategia comercial y marco conceptual de investigación abierta.",
        os_collab_needed: "Colaboración Necesaria:", os2_l1: "Investigadores: Coautoría del informe técnico.", os2_l2: "Arquitectos de Datos: Diseño de modelos de contabilidad transparentes.", os2_l3: "Desarrolladores: Construcción de la infraestructura API inicial.",
        os_btn_abstract: "Leer Resumen", os_btn_repo: "Ver Repo", os_btn_explore: "Explorar mi GitHub",
        footer_title: "Conectemos", footer_desc: "Actualmente abierto a oportunidades en ciencia de datos y análisis.", footer_copy: "© 2026 KSA.iko PRIVATE LTD. Todos los derechos reservados."
    },
    hi: {
        nav_home: "होम", nav_about: "परिचय", nav_exp: "अनुभव", nav_proj: "प्रोजेक्ट्स", nav_contact: "संपर्क करें",
        hero_sub: "आकांक्षी डेटा शोधकर्ता", hero_title: "डेटा को बदलें", hero_desc: "डेटा-संचालित निर्णय लेने का समर्थन करने के लिए कच्चे डेटा को सार्थक अंतर्दृष्टि में बदलने का जुनून।", btn_view_proj: "प्रोजेक्ट्स देखें", btn_linkedin: "लिंक्डइन",
        about_title: "शैक्षणिक यात्रा और कौशल",
        edu_mca: "एमसीए (डेटा साइंस)", edu_mca_desc: "गौतम बुद्ध विश्वविद्यालय, ग्रेटर नोएडा | 2025-2027 (अपेक्षित)",
        edu_bca: "बीसीए", edu_bca_desc: "यूनाइटेड यूनिवर्सिटी, प्रयागराज | 2022-2025", edu_inter: "इंटरमीडिएट", edu_inter_desc: "2021 में पूर्ण", edu_high: "हाई स्कूल", edu_high_desc: "2019 में पूर्ण",
        skill_py_title: "पायथन और आर", skill_py_desc: "पांडा, नम्पाय, ईडीए", skill_db_title: "डेटाबेस", skill_db_desc: "MySQL, PostgreSQL", skill_vis_title: "डेटा विज़ुअलाइज़ेशन", skill_vis_desc: "Power BI, Excel", skill_web_title: "वेब बेसिक्स", skill_web_desc: "HTML5, CSS3, JS",
        exp_title: "इंटर्नशिप अनुभव", exp_role: "डेटा साइंस इंटर्न", exp_date: "नवंबर 2025 - दिसंबर 2025", exp_comp: "कॉग्निफाइज़ टेक्नोलॉजीज | रिमोट",
        exp_b1: "पायथन (पांडा, नम्पाय) का उपयोग करके डेटासेट को साफ और प्रीप्रोसेस किया।", exp_b2: "रुझानों और पैटर्न की पहचान करने के लिए खोजपूर्ण डेटा विश्लेषण (EDA) किया।", exp_b3: "अंतर्दृष्टि संप्रेषित करने के लिए दृश्य सारांश और रिपोर्ट तैयार की।",
        cap_title: "मेरे सीखने का व्यावहारिक अनुप्रयोग", cap_desc: "व्यापक कंप्यूटिंग और उन्नत डेटा विज्ञान मॉड्यूल में मेरी शैक्षणिक यात्रा मुझे कच्चे डेटा निष्कर्षण से लेकर बुद्धिमान वेब एप्लिकेशन तैनात करने तक संपूर्ण डेटा जीवनचक्र को संभालने के लिए सुसज्जित करती है।", cap_derived: "से प्राप्त:",
        cap1_title: "1. प्रेडिक्टिव मॉडलिंग और एआई", cap1_src: "मशीन लर्निंग, एनएलपी, संभाव्यता और सांख्यिकी।", cap1_desc: "मैं केवल एपीआई का उपयोग नहीं करता; मल्टीवेरिएबल कैलकुलस और लीनियर अल्जेब्रा में मेरी नींव मुझे एल्गोरिदम को गहराई से समझने की अनुमति देती है।",
        cap2_title: "2. स्केलेबल डेटा आर्किटेक्चर", cap2_src: "डीबीएमएस, डेटा वेयरहाउसिंग, डेटा स्ट्रक्चर्स, ओएस।", cap2_desc: "मैं अनुकूलित डेटाबेस स्कीमा डिज़ाइन करता हूं और कुशल क्वेरी लिखता हूं। मैं समझता हूं कि डेटा को सुरक्षित रूप से कैसे संरचित और संग्रहीत किया जाए।",
        cap3_title: "3. एंड-टू-एंड डिप्लॉयमेंट", cap3_src: "पायथन, वेब टेक्नोलॉजी, सॉफ्टवेयर इंजीनियरिंग।", cap3_desc: "एक एमएल मॉडल तभी उपयोगी है जब लोग इसका उपयोग कर सकें। मैं डेटा विज्ञान और सॉफ्टवेयर इंजीनियरिंग के बीच की खाई को पाटने के लिए इंटरैक्टिव वेब एप्लिकेशन बना सकता हूं।",
        cap4_title: "4. बिजनेस इंटेलिजेंस", cap4_src: "डेटा विज़ुअलाइज़ेशन, प्रबंधन अवधारणाएं, व्यावसायिक संचार।", cap4_desc: "मैं जटिल विश्लेषणात्मक निष्कर्षों को स्पष्ट, कार्रवाई योग्य व्यावसायिक रणनीतियों में अनुवाद करता हूं।",
        proj_title: "अकादमिक प्रोजेक्ट्स",
        proj1_title: "जिम प्रबंधन प्रणाली", proj1_desc: "- जिम सदस्यों, योजनाओं और उपस्थिति का प्रबंधन करने के लिए डेटाबेस-संचालित प्रणाली विकसित की।",
        proj2_title: "फिनबॉट एडवाइजर", proj2_desc: "बाजार की अंतर्दृष्टि और इंटरैक्टिव डेटा एनालिटिक्स प्रदान करने के लिए स्ट्रीमलिट का उपयोग करके बनाया गया एक वित्तीय चैटबॉट।",
        proj3_title: "व्यक्तिगत पोर्टफोलियो वेबसाइट", proj3_desc: "एक उत्तरदायी और इंटरैक्टिव वेब पोर्टफोलियो जिसमें आधुनिक UI/UX डिज़ाइन है।",
        proj4_title: "वेब-आधारित क्विज़ एप्लिकेशन", proj4_desc: "रीयल-टाइम स्कोरिंग और प्रदर्शन ट्रैकिंग के साथ वेब-आधारित क्विज़ प्लेटफॉर्म बनाया।",
        os_title: "ओपन सोर्स और सहयोग", os_desc: "मैं एक साथ निर्माण करने में दृढ़ता से विश्वास करता हूं। मैं सहयोग करना पसंद करूंगा!",
        os1_badge: "सक्रिय रूप से योगदानकर्ताओं की तलाश", os1_title: "फिनबॉट एडवाइजर", os1_desc: "पायथन और स्ट्रीमलिट के साथ निर्मित एक वित्तीय चैटबॉट।",
        os_help_wanted: "मदद चाहिए:", os1_l1: "स्ट्रीमलिट इंटरफ़ेस के लिए UI/UX डिज़ाइन सुधार", os1_l2: "रीयल-टाइम वित्तीय बाज़ार API का एकीकरण", os1_l3: "बग फिक्स और कोड रीफैक्टरिंग",
        os_btn_fork: "फोर्क रेपो", os_btn_issues: "समस्याएं देखें",
        os2_badge: "अनुसंधान पहल", os2_title: "ग्लोबल ट्रांसपेरेंट एक्सचेंज इंफ्रास्ट्रक्चर", os2_desc: "संस्थागत डेटा विनिमय के समन्वय के लिए एक खुली-अनुसंधान अवधारणात्मक रूपरेखा।",
        os_collab_needed: "सहयोग की आवश्यकता:", os2_l1: "शोधकर्ता: आधारभूत श्वेतपत्र का सह-लेखन।", os2_l2: "डेटा आर्किटेक्ट: पारदर्शी बहीखाता मॉडल डिजाइन करना।", os2_l3: "डेवलपर्स: प्रारंभिक एपीआई बुनियादी ढांचे का निर्माण।",
        os_btn_abstract: "सार पढ़ें", os_btn_repo: "रेपो देखें", os_btn_explore: "मेरा गिटहब प्रोफ़ाइल देखें",
        footer_title: "आइए जुड़ें", footer_desc: "वर्तमान में डेटा साइंस और एनालिटिक्स के अवसरों के लिए उपलब्ध हूँ।", footer_copy: "© 2026 KSA.iko प्राइवेट लिमिटेड। सर्वाधिकार सुरक्षित।"
    },
    fr: {
        nav_home: "Accueil", nav_about: "À Propos", nav_exp: "Expérience", nav_proj: "Projets", nav_contact: "Contact",
        hero_sub: "Aspirant Chercheur en Données", hero_title: "Transformer les données en", hero_desc: "Passionné par la transformation de données brutes en informations significatives pour soutenir la prise de décision.", btn_view_proj: "Voir les Projets", btn_linkedin: "LinkedIn",
        about_title: "Parcours Académique et Compétences",
        edu_mca: "MCA (Science des Données)", edu_mca_desc: "Gautam Buddha University, Greater Noida | 2025-2027 (Prévu)",
        edu_bca: "BCA", edu_bca_desc: "United University, Prayagraj | 2022-2025", edu_inter: "Intermédiaire", edu_inter_desc: "Terminé en 2021", edu_high: "Lycée", edu_high_desc: "Terminé en 2019",
        skill_py_title: "Python & R", skill_py_desc: "Pandas, NumPy, EDA", skill_db_title: "Bases de Données", skill_db_desc: "MySQL, PostgreSQL", skill_vis_title: "Visualisation", skill_vis_desc: "Power BI, Excel", skill_web_title: "Bases du Web", skill_web_desc: "HTML5, CSS3, JS",
        exp_title: "Expérience de Stage", exp_role: "Stagiaire en Science des Données", exp_date: "Nov 2025 - Déc 2025", exp_comp: "Cognifyz Technologies | À distance",
        exp_b1: "Nettoyage et prétraitement des jeux de données avec Python (Pandas, NumPy).", exp_b2: "Analyse exploratoire des données (EDA) pour identifier les tendances.", exp_b3: "Création de résumés visuels et de rapports pour communiquer les résultats.",
        cap_title: "Application Pratique de mon Apprentissage", cap_desc: "Mon parcours académique me permet de gérer le cycle de vie complet des données, de l'extraction à l'application web.", cap_derived: "Dérivé de:",
        cap1_title: "1. Modélisation Prédictive & IA", cap1_src: "Machine Learning, NLP, Probabilités et Statistiques.", cap1_desc: "Je n'utilise pas seulement des API ; mes bases me permettent de comprendre le fonctionnement des algorithmes.",
        cap2_title: "2. Architecture de Données", cap2_src: "SGBD, Entrepôt de Données, Structures de Données, OS.", cap2_desc: "Je conçois des schémas de bases de données optimisés et j'écris des requêtes efficaces.",
        cap3_title: "3. Déploiement de Bout en Bout", cap3_src: "Python, Technologies Web, Génie Logiciel.", cap3_desc: "Un modèle ML n'est utile que si les gens peuvent l'utiliser. Je peux créer des applications web interactives.",
        cap4_title: "4. Informatique Décisionnelle", cap4_src: "Visualisation de Données, Gestion, Communication.", cap4_desc: "Je traduis des résultats analytiques complexes en stratégies commerciales claires.",
        proj_title: "Projets Académiques",
        proj1_title: "Système de Gestion de Salle de Sport", proj1_desc: "- Développement d'un système basé sur une base de données pour gérer les membres.",
        proj2_title: "Conseiller FinBot", proj2_desc: "Un chatbot financier construit avec Streamlit pour l'analyse interactive des données.",
        proj3_title: "Site Web Portfolio", proj3_desc: "Un portfolio web réactif et interactif présentant un design moderne.",
        proj4_title: "Application de Quiz Web", proj4_desc: "Plateforme de quiz avec notation en temps réel et suivi des performances.",
        os_title: "Open Source & Collaboration", os_desc: "Je crois fermement à la construction collective. J'aimerais collaborer avec vous !",
        os1_badge: "Recherche de Contributeurs", os1_title: "Conseiller FinBot", os1_desc: "Chatbot financier construit avec Python et Streamlit.",
        os_help_wanted: "Aide Demandée:", os1_l1: "Améliorations du design UI/UX pour Streamlit", os1_l2: "Intégration d'API de marchés financiers", os1_l3: "Correction de bugs",
        os_btn_fork: "Forker le Dépôt", os_btn_issues: "Voir les Problèmes",
        os2_badge: "Initiative de Recherche", os2_title: "Infrastructure d'Échange Transparente", os2_desc: "Stratégie commerciale et cadre conceptuel pour l'échange de données.",
        os_collab_needed: "Collaboration Nécessaire:", os2_l1: "Chercheurs : Co-rédaction du livre blanc.", os2_l2: "Architectes : Conception de modèles de registres transparents.", os2_l3: "Développeurs : Construction de l'API initiale.",
        os_btn_abstract: "Lire le Résumé", os_btn_repo: "Voir le Dépôt", os_btn_explore: "Explorer mon GitHub",
        footer_title: "Restons en Contact", footer_desc: "Actuellement ouvert aux opportunités en science des données et analytique.", footer_copy: "© 2026 KSA.iko PRIVATE LTD. Tous droits réservés."
    }
};

const typewriterTexts = {
    en: ["Insights.", "Decisions.", "Solutions."],
    zh: ["洞察.", "决策.", "解决方案."],
    es: ["Perspectivas.", "Decisiones.", "Soluciones."],
    hi: ["अंतर्दृष्टि।", "निर्णय।", "समाधान।"],
    fr: ["Perspectives.", "Décisions.", "Solutions."]
};

// ==========================================
// 7. Contact Form Handler
// ==========================================
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent page reload
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // UI Feedback: Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // SIMULATION: This mimics an API request taking 1.5 seconds.
        // To make this work in real life, you'll need a service like Formspree.
        setTimeout(() => {
            formStatus.textContent = "Message sent successfully! I'll get back to you soon.";
            formStatus.style.color = "#22c55e"; // Success green
            
            // Reset form
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Clear success message after 5 seconds
            setTimeout(() => { formStatus.textContent = ""; }, 5000);
        }, 1500);
    });
}

// Ensure elements exist before adding listeners and initializing
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Typewriter
    if(typeTarget) {
        setTimeout(type, 1000);
    }

    // 2. Initialize Language
    if (langSelect) {
        const savedLang = localStorage.getItem('portfolioLang') || 'en';
        langSelect.value = savedLang;
        setLanguage(savedLang);

        // Event listener for the dropdown
        langSelect.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }
});