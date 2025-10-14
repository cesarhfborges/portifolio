// import crefin from '../../assets/images/crefin.png';
// import travel from '../../assets/images/travel.png';
// import realEstate from '../../assets/images/realEstate.png';
// import ayla from '../../assets/images/ayla.png';

interface Project {
  id: number;
  name: string;
  description: string;
  tools: string[];
  code: string;
  demo?: string;
  image?: string;
  role: string;
}

export const projects: Project[] = [
  {
    id: 1,
    name: "Seguros Residencial, Empresarial, Consórcio",
    description: "Sistema web para contratação de seguros nas agências do banco do brasil, com Angular, java EE, quarkus, com uso de recursos complexos, integração de API`s e consumo dados oriundos de sistemas cobol java e python, os sistemas em questão objetivam permitir a simulçõa, venda, cancelamentos, alterações diversas nas cotações e contratos dos clientes.",
    tools: ["Angular", "Java EE", "Quarkus", "PLSql"],
    code: "",
    role: "Desenvolvedor Sênior",
    // demo: "https://apps.apple.com/us/app/crunch-africa/id1537297077",
    // image: "assets/images/projects/crunch-africa.webp",
  },
  {
    id: 2,
    name: "Brasal",
    description: "Sistema web de gestão de contratos da construtora de imóveis, atuei fazendo melhorias, evoluções e correções, visando garantir a melhor experiencia ao usuario final, proporcionando um canal centralizado com todos principais necessidades, tais como boleto atualizado, solicitação de assistências, aprovação do imóvel e envio de documentações.",
    tools: ["Angular", "Vue", "Lumen API", "Node"],
    code: "",
    // demo: "https://apps.apple.com/us/app/akyurt-online/id1542598367",
    // image: "assets/images/projects/akyurt-online.webp",
    role: "Desenvolvedor Sênior",
  },
  {
    id: 3,
    name: "Maquininha PIX Brasal combustiveis",
    description: "Este é um dos projetos que tenho mais orgulho, pela simplicidade e pelo beneficio, este foi um projeto que permitiu a rede de postos de combustiveis ofertar o recebimento via PIX em primeira mão, quando na epoca ainda não haviam maquininhas com suporte a esse metodo de pagamento, era oferecido tambem acumulo de km para trocar posteriormente por combutivel.",
    tools: ["Ionic", "NODEjs", "SqlServer", "Socket"],
    code: "",
    // demo: "https://play.google.com/store/apps/details?id=com.mocowi.mocowi",
    // image: "assets/images/projects/mocowi.webp",
    role: "Desenvolvedor Sênior",
  },
  {
    id: 4,
    name: "CNEC",
    description: "Nesta empresa atuei em todas as frentes possíveis, e varios sistemas desde os muito legados aos mais novos, um dos sistemas que gosto de citar é o sistema juridico da empresa, onde centralizamos todos os processos da empresa, permitindo a todos os stakeholders estar cientes do andamento de cada processo, anexando documentos, etapas, envolvidos tudo permissionado e diretamente ligado ao sistema de RH da empresa.",
    tools: ["Angular", "Lumen API", "SQLServer"],
    code: "",
    // demo: "https://play.google.com/store/apps/details?id=com.breadex.app",
    // image: "assets/images/projects/baredex.webp",
    role: "Desenvolvedor Pleno",
  },
  // {
  //   id: 5,
  //   name: "Sabroso",
  //   description: "E-commerce application with comprehensive cart and payment system. Implemented Bloc pattern for state management and created extensive testing suite including unit, widget, and integration tests.",
  //   tools: ["Flutter", "Bloc", "Payment Integration", "Unit Testing", "Widget Testing"],
  //   code: "",
  //   demo: "",
  //   image: "assets/images/projects/sabroso-logo.jpg",
  //   role: "Senior Flutter Developer",
  // },
  // {
  //   id: 6,
  //   name: "Sigma Math Quiz App",
  //   description: "Educational game application featuring interactive math quizzes. Implemented complex animations and sound effects using Flutter. Used Bloc pattern for state management to handle game logic and user progress.",
  //   tools: ["Flutter", "Bloc", "Animations", "Game Development"],
  //   code: "",
  //   demo: "",
  //   image: "assets/images/projects/sigma-app.png",
  //   role: "Game Developer",
  // },
  // {
  //   id: 7,
  //   name: "Daily Expense Manager",
  //   description: "Personal finance management application utilizing Firebase Firestore for data storage and Google Authentication for user management. Implemented Provider pattern for state management.",
  //   tools: ["Flutter", "Provider", "Firebase", "Google Auth"],
  //   code: "",
  //   demo: "https://play.google.com/store/apps/details?id=com.aqua.regalsystem.pocket.manager",
  //   image: "assets/images/projects/daily-expense-manager.png",
  //   role: "Flutter Developer",
  // },
  // {
  //   id: 8,
  //   name: "ABC Delivery",
  //   description: "Delivery management application featuring Google Maps integration, Firebase Firestore for data storage, and Google Authentication. Implemented Provider pattern for state management and location tracking features.",
  //   tools: ["Flutter", "Provider", "Google Maps", "Firebase", "Google Auth"],
  //   code: "",
  //   demo: "https://play.google.com/store/apps/details?id=com.eeizo.abcdelivery",
  //   image: "assets/images/projects/abcd.png",
  //   role: "Full Stack Developer",
  // }
];
