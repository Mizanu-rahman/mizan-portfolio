export const resumeData = {
  name: "Mizanur Rahman",
  role: "Full-Stack .NET Developer",
  location: "Chattogram, Bangladesh",
  email: "mixanurahman@yahoo.com",
  phone: "+8801680232852",
  github: "https://github.com/Mizanur-Rahmann",
  linkedin: "https://www.linkedin.com/in/mizanur-rahman-developer",
  website: "https://mizanur-rahmann.github.io/",

  taglines: [
    "Building robust .NET systems step by step 🛰️",
    "Turning Business needs into clean code solutions 🧩",
    "Clean code. Real results 💻",
    "Growing as a developer 🚀",
    "From Physics to Programming⚡",
  ],

  about:
    "Developer who turns ideas into functioning applications — from concept to working interface. Comfortable across the stack. Writes clean code and solves practical problems. Ready to join a team, tackle real business challenges, and keep growing.",

  skills: {
    backend: [
      "C#",
      "ASP.NET Core MVC",
      "Web API",
      "Entity Framework Core",
      "ADO.NET",
      "Node.js",
      "Express.js",
      "Authentication & Authorization",
      "JWT",
    ],
    frontend: [
      "React",
      "TypeScript",
      "Angular",
      "Next.js",
      "JavaScript",
      "jQuery",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "Tailwind CSS",
      ".NET MAUI",
    ],
    database: ["MS SQL Server", "MongoDB", "Entity Framework Core", "Dapper"],
    tools: [
      "Git",
      "GitHub",
      "Visual Studio",
      "VS Code",
      "Postman",
      "Swagger",
      "Crystal Reports",
      "FastReport",
      "Cloudinary",
      "Socket.IO",
    ],
  },

  projects: [
    {
      id: "library",
      title: "Smart Library Management System",
      demo: "/demos/library.gif",
      emoji: "📚",
      description:
        "Full-stack library platform with book borrowing & reservation, admin approval workflow, PDF preview, shelf location hierarchy with capacity enforcement, purchase-order → GRN → shelve flow, permission-based authorization, fine auto-calculation, and admin/user reports.",
      stack: [
        "React",
        "TypeScript",
        "EF Core",
        ".NET 8 Web API",
        "Angular",

        "EF Core",
        "SQL Server",
        "JWT",
        "Angular",
        "Tailwind",
        "PdfSharpCore",
      ],
      github: "https://github.com/Mizanur-Rahmann/FinalProject_API",
      githubLinks: [
        {
          label: "API Repo",
          url: "https://github.com/Mizanur-Rahmann/FinalProject_API",
        },
        {
          label: "Angular UI",
          url: "https://github.com/Mizanur-Rahmann/Library_UI",
        },
        {
          label: "React UI",
          url: "https://github.com/Mizanur-Rahmann/myLibraryUI",
        },
      ],
      live: "",
      type: "Group Project",
    },
    {
      id: "orders",
      title: "Order Management System",
      demo: "/demos/orders.gif",
      emoji: "🔐",
      description:
        "Full-featured web app for managing products, customers, and orders with custom claims-based permission authorization and intelligent order processing with transaction management.",
      stack: [
        "ASP.NET Core 8 MVC",
        "MSSQL",
        "Entity Framework",
        "Bootstrap",
        "jQuery/AJAX",
      ],
      github: "https://github.com/Mizanur-Rahmann/MVC_Core_Project",
      githubLinks: [
        {
          label: "GitHub",
          url: "https://github.com/Mizanur-Rahmann/MVC_Core_Project",
        },
      ],
      live: "",
      type: "Full Stack",
    },
    {
      id: "course",
      title: "Course Management System",
      demo: "/demos/course.gif",
      emoji: "🖥️",
      description:
        "Desktop application for educational institutions to manage courses, students, and instructors with complete CRUD, real-time search, referential integrity, and Crystal Reports.",
      stack: ["C#", "WinForms", "ADO.NET", "SQL Server", "Crystal Reports"],
      github: "https://github.com/Mizanur-Rahmann/ADO.Net_WindowsForm",
      githubLinks: [
        {
          label: "GitHub",
          url: "https://github.com/Mizanur-Rahmann/ADO.Net_WindowsForm",
        },
      ],
      live: "",
      type: "Desktop App",
    },
    {
      id: "ecommerce-realtime",
      title: "Real-Time E-Commerce Website",
      demo: "/demos/ecommerce.gif",
      emoji: "🛒",
      description:
        "Full-stack e-commerce platform with responsive UI, dynamic product management, and live updates using WebSockets (Socket.IO). Full-stack JavaScript with NoSQL database.",
      stack: [
        "HTML5",
        "CSS3",
        "Bootstrap",
        "JavaScript",
        "jQuery",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Socket.IO",
        "Multer",
      ],
      github: "https://github.com/Mizanur-Rahmann/Realtime-E-Commerce-Website",
      githubLinks: [
        {
          label: "GitHub",
          url: "https://github.com/Mizanur-Rahmann/Realtime-E-Commerce-Website",
        },
      ],
      live: "",
      type: "Full Stack",
    },
    {
      id: "ecommerce-store",
      title: "E-Commerce Store Management",
      demo: "/demos/store.gif",
      emoji: "🏪",
      description:
        "Full-featured management system with cascading category-type-brand relationships, automated product naming, order processing with stock validation, and real-time reorder alerts.",
      stack: [
        "ASP.NET MVC 5",
        "EF Code First",
        "SQL Server",
        "Bootstrap 5",
        "jQuery/AJAX",
      ],
      github: "https://github.com/Mizanur-Rahmann/MVC-CodeFirst-Project",
      githubLinks: [
        {
          label: "GitHub",
          url: "https://github.com/Mizanur-Rahmann/MVC-CodeFirst-Project",
        },
      ],
      live: "",
      type: "Full Stack",
    },
    {
      id: "mern",
      title: "MERN E-Commerce Project",
      demo: "/demos/mern.gif",
      emoji: "🛍️",
      description:
        "Online shopping system with cart, wishlist, pre-order, real-time order tracking, JWT auth, Cloudinary image upload, Nodemailer email templates, admin dashboard with Recharts, PWA support, and PDF invoice generation.",
      stack: [
        "React",
        "TypeScript",
        "Vite",
        "Node.js",
        "Express",
        "MongoDB",
        "Mongoose",
        "JWT",
        "Cloudinary",
        "Nodemailer",
        "Recharts",
        "pdfkit",
      ],
      github: "https://github.com/Mizanur-Rahmann/backend",
      githubLinks: [
        { label: "Backend", url: "https://github.com/Mizanur-Rahmann/backend" },
        {
          label: "Frontend",
          url: "https://github.com/Mizanur-Rahmann/project-mern-frontend",
        },
      ],
      live: "",
      type: "MERN Stack",
    },
  ],

  training: {
    title: "IsDB-BISEW IT Scholarship Programme – Round 67",
    subtitle: "Intensive 10-month full-stack development training (2025–2026)",
    provider: "Show & Tell Consulting Ltd.",
    points: [
      "700+ hours of hands-on coding in C#, ASP.NET Core, Angular, React, MSSQL",
      "Built multiple real-world projects individually and in teams",
      "Focus areas: authentication, REST APIs, database design, frontend integration",
      "Covered: Web API, MVC, EF Core, ADO.NET, WinForms, MAUI",
      "Frontend modules: HTML5, CSS3, Bootstrap, Tailwind, JavaScript, jQuery, Angular, React, TypeScript",
    ],

    modules: [
      "Module-01-Introduction to Computing-40 Hours",
      "Module-02-Design and implement databases with MS SQL Server 2019 EE-100 Hours",
      "Module-03-Programming with C# 10 and .Net 6-136 Hours",
      "Module-04-Programming in HTML5 with CSS3, JavaScript, jQuery, NodeJS & ExpressJS-100 Hours",
      "Module-05-Introduction to XML, ADO.NET & Reporting-28 Hours",
      "Module-06-Developing ASP.NET MVC 5 Web Applications-60 Hours",
      "Module-07-Entity Framework 6 Code First using ASP.NET MVC 5-20 Hours",
      "Module-08-Developing Web APIs, Windows Azure and Web Services using ASP.NET MVC 5-48 Hours",
      "Module-09-Developing ASP.NET Core Web Applications-60 Hours",
      "Module-10-Entity Framework Core Code First using ASP.NET Core-16 Hours",
      "Module-11-Developing Web APIs, Windows Azure and Web Services using ASP.NET Core-36 Hours",
      "Module-12-Advanced Web Application Development with Angular-52 Hours",
      "Module-13-Advanced Web Application Development with React-40 Hours",
      "Module-14-Developing Cross Platform Mobile Applications using Blazor & MAUI-40 Hours",
      "Module-15-Final Course Project-12 Hours",
    ],
    references: [
      {
        name: "Syed Zahidul Hassan",
        role: "Consultant, Show & Tell Consulting Ltd. · IsDB BISEW IT Scholarship",
        phone: "+8801535110014",
        email: "jewelmir81@gmail.com",
      },
      {
        name: "Md. Foysal Wahid",
        role: "Faculty at IsDB BISEW & Sr. Technical Trainer, New Vision IT Ltd.",
        phone: "+8801747193694",
        email: "fwrasel87@gmail.com",
      },
    ],
  },

  education: [
    {
      degree: "Master of Science in Physics",
      institution: "Chittagong College",
    },
    {
      degree: "Bachelor of Science in Physics",
      institution: "Chittagong College",
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "CoxsBazar Govt. College",
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "CoxsBazar Govt. High School",
    },
  ],
};
