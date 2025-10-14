import crefin from '../../assets/images/crefin.png';
import travel from '../../assets/images/travel.png';
import realEstate from '../../assets/images/realEstate.png';
import ayla from '../../assets/images/ayla.png';

interface Project {
    id: number;
    name: string;
    description: string;
    tools: string[];
    code: string;
    demo: string;
    image: string;
    role: string;
}

export const projects: Project[] = [
    {
        id: 1,
        name: "Crunch Africa",
        description: "Fintech App developed with Flutter. Implemented complex features including QR code scanning, Firebase authentication, and comprehensive testing suite including unit, widget, and integration tests. Used Bloc for state management and integrated Sentry for error tracking.",
        tools: ["Flutter", "Bloc", "Firebase", "Sentry", "Unit Testing", "Widget Testing"],
        code: "",
        demo: "https://apps.apple.com/us/app/crunch-africa/id1537297077",
        image: "assets/images/projects/crunch-africa.webp",
        role: "Mobile App Architect",
    },
    {
        id: 2,
        name: "Akyurt Online",
        description: "E-commerce mobile application built for both iOS and Android platforms. Implemented complex UI components, integrated backend API services, and implemented secure payment processing systems using Provider pattern for state management.",
        tools: ["Flutter", "Provider", "REST API", "Payment Integration"],
        code: "",
        demo: "https://apps.apple.com/us/app/akyurt-online/id1542598367",
        image: "assets/images/projects/akyurt-online.webp",
        role: "Flutter Developer",
    },
    {
        id: 3,
        name: "Baredex",
        description: "Mobile application with focus on REST API integration and data management. Implemented Provider pattern for efficient state management and created a robust architecture for API communication.",
        tools: ["Flutter", "Provider", "REST API"],
        code: "",
        demo: "https://play.google.com/store/apps/details?id=com.breadex.app",
        image: "assets/images/projects/baredex.webp",
        role: "Flutter Developer",
    },
    {
        id: 4,
        name: "Mocowi",
        description: "IoT-based mobile application for card device management. Implemented real-time data synchronization and device communication through REST APIs. Created an intuitive interface for device monitoring and control.",
        tools: ["Flutter", "IoT", "REST API", "Real-time Data"],
        code: "",
        demo: "https://play.google.com/store/apps/details?id=com.mocowi.mocowi",
        image: "assets/images/projects/mocowi.webp",
        role: "IoT App Developer",
    },
    {
        id: 5,
        name: "Sabroso",
        description: "E-commerce application with comprehensive cart and payment system. Implemented Bloc pattern for state management and created extensive testing suite including unit, widget, and integration tests.",
        tools: ["Flutter", "Bloc", "Payment Integration", "Unit Testing", "Widget Testing"],
        code: "",
        demo: "",
        image: "assets/images/projects/sabroso-logo.jpg",
        role: "Senior Flutter Developer",
    },
    {
        id: 6,
        name: "Sigma Math Quiz App",
        description: "Educational game application featuring interactive math quizzes. Implemented complex animations and sound effects using Flutter. Used Bloc pattern for state management to handle game logic and user progress.",
        tools: ["Flutter", "Bloc", "Animations", "Game Development"],
        code: "",
        demo: "",
        image: "assets/images/projects/sigma-app.png",
        role: "Game Developer",
    },
    {
        id: 7,
        name: "Daily Expense Manager",
        description: "Personal finance management application utilizing Firebase Firestore for data storage and Google Authentication for user management. Implemented Provider pattern for state management.",
        tools: ["Flutter", "Provider", "Firebase", "Google Auth"],
        code: "",
        demo: "https://play.google.com/store/apps/details?id=com.aqua.regalsystem.pocket.manager",
        image: "assets/images/projects/daily-expense-manager.png",
        role: "Flutter Developer",
    },
    {
        id: 8,
        name: "ABC Delivery",
        description: "Delivery management application featuring Google Maps integration, Firebase Firestore for data storage, and Google Authentication. Implemented Provider pattern for state management and location tracking features.",
        tools: ["Flutter", "Provider", "Google Maps", "Firebase", "Google Auth"],
        code: "",
        demo: "https://play.google.com/store/apps/details?id=com.eeizo.abcdelivery",
        image: "assets/images/projects/abcd.png",
        role: "Full Stack Developer",
    }
];