import { ExperienceItem, ProjectItem, SkillCategory } from './types';

export const personalInfo = {
  name: 'Nisarg Rana',
  title: 'Software Developer & AI Engineer',
  email: 'rnnisarg7@gmail.com',
  phone: '+91 7016653436',
  linkedin: 'https://linkedin.com/in/rana-nisarg-a29b23372',
  github: 'https://github.com/nisrg77',
  location: 'Bharuch, Gujarat, India',
  summary: 'A dedicated Software Developer and AI Enthusiast applying robust software engineering fundamentals to build scalable applications, structured architectures, and predictive pipelines across Artificial Intelligence, Machine Learning, and Data Science.',
  education: {
    degree: 'Bachelor of Technology (B.Tech) in Computer Science & Engineering',
    institution: "Shri S'ad Vidya Mandal Institute Of Technology, GTU",
    year: '2026',
    cgpa: '7.6'
  },
  certifications: [
    {
      title: 'Data Analyst Certification',
      issuer: 'DataCamp',
      year: '2026'
    }
  ]
};

export const experiences: ExperienceItem[] = [
  {
    id: 'exp-grownited',
    role: 'Python Developer Intern',
    company: 'Grownited Pvt. Ltd.',
    location: 'Ahmedabad, India',
    startDate: 'Jan 2026',
    endDate: 'Apr 2026',
    techStack: ['Python', 'Django', 'Django REST Framework', 'MySQL', 'PostgreSQL', 'Git'],
    bulletPoints: [
      'Architected and developed robust backend features and scalable services using Python and Django REST framework.',
      'Designed and implemented RESTful APIs with full CRUD functionality to support seamless, reliable frontend integrations.',
      'Optimized complex relational database schemas and queries in MySQL and PostgreSQL, boosting retrieval speeds and reducing server load.',
      'Utilized Git and GitHub for team version control, peer code reviews, collaborative sprints, and streamlined bug resolutions.'
    ]
  },
  {
    id: 'exp-linkverse',
    role: 'Frontend Developer Intern',
    company: 'LinkVerse Labs',
    location: 'Remote',
    startDate: 'Jul 2025',
    endDate: 'Aug 2025',
    techStack: ['HTML5', 'CSS3', 'JavaScript (ES6)', 'Responsive Web Design', 'Cross-Browser Compatibility'],
    bulletPoints: [
      'Developed and maintained responsive, eye-friendly, cross-browser compatible user interfaces.',
      'Collaborated closely with cross-functional product teams to design and implement interactive, intuitive UI components.',
      'Conducted rigorous frontend testing and debugging, optimizing client-side scripts to significantly enhance page speed and overall UX score.'
    ]
  }
];

export const projects: ProjectItem[] = [
  {
    id: 'proj-medx',
    title: 'MedX - Doctor Appointment Booking System',
    description: 'A premium full-stack MERN application for seamless clinical appointment management. It features a modern 3-column booking interface, JWT authentication, admin dashboards, and responsive design.',
    goalAndRole: 'My goal was to construct an intuitive, high-availability clinician scheduler. As the lead full-stack developer, I engineered the multi-column scheduling UX, stateful API integrations, session-persistent state architectures using the React Context API, and designed normalized relational-like schemas within MongoDB/Mongoose.',
    challengesOvercome: 'Overcame data race conditions and booking collisions during high-concurrency patient requests by implementing pessimistic locking strategies in Node/Express and establishing strategic MongoDB indices. Solved complex responsive grid reflows for the 3-column scheduling UI (category → doctor → time-slot) to match standard premium mobile UX patterns.',
    extendedDetails: 'Premium end-to-end medical scheduling system focusing on fast booking states. Features secure administrative controls allowing clinicans to coordinate work schedules and patients to browse real-time availabilities.',
    techStack: ['React 19 (Vite)', 'Tailwind CSS', 'React Router 7', 'Axios', 'Node.js', 'Express 5', 'MongoDB', 'Mongoose 9', 'JWT', 'bcryptjs'],
    category: 'full-stack',
    githubUrl: 'https://github.com/nisrg77',
    liveDemoUrl: 'https://doctor-appointment-booking-beta.vercel.app',
    repoSize: '3,278 KB',
    lastUpdated: 'April 19, 2026',
    status: 'Active (1 open issue)',
    difficulty: 4,
    businessValue: 'High (Live Demo)',
    keyFeatures: [
      '3-column intuitive booking UI (categories → doctors → time slots)',
      'JWT-based secure authentication with session persistence',
      'Admin CRUD operations for services and appointments',
      'Role-based access control (Patient/Admin)',
      'Real-time appointment status (Pending, Confirmed, Cancelled)',
      'Responsive design for mobile and desktop'
    ],
    impact: 'Established robust clinician accessibility resulting in near-zero overlaps on booking calendars.'
  },
  {
    id: 'proj-tastybytes',
    title: 'Tasty Bytes - Recipe Traffic Prediction',
    description: 'A supervised machine learning classification model predicting high-traffic recipes for a meal subscription service homepage to capture premium user engagement.',
    goalAndRole: 'The business objective was predicting popular recipes to boost site-wide traffic. As the machine learning engineer, I designed the classification pipeline, conducted deep exploratory analysis, and executed model selection to prioritize precision targets.',
    challengesOvercome: 'Tackled high training variance and outsized data skew in nutritional variables. Discovered via feature importance analysis that categorical recipe dimensions (e.g., specific food groups) carried 4x more predictive weight than nutritional facts. Applied targeted MinMaxScaler preprocessing, generating optimal Random Forest thresholds that exceeded baseline precision bounds.',
    extendedDetails: 'This project is framed directly around product manager constraints. Highlights confusion matrices, ROC-AUC mapping curves, and business-focused threshold determinations to secure homepage engagement metrics.',
    techStack: ['Python 3.10+', 'Jupyter Notebook', 'Pandas 2.0+', 'NumPy', 'scikit-learn 1.3+', 'Logistic Regression', 'Random Forest', 'Matplotlib', 'Seaborn'],
    category: 'ai-ml',
    githubUrl: 'https://github.com/nisrg77',
    presentationUrl: 'https://docs.google.com/presentation/d/1F9t5FBwEQW-GnJ7DHPUZkAhHMR2p90E1LDDmKMRPUb8/edit?usp=sharing',
    repoSize: '185 KB',
    lastUpdated: 'March 2026',
    status: 'Completed',
    difficulty: 4,
    businessValue: 'High (82% Precision)',
    keyFeatures: [
      'Exploratory Data Analysis over 947 recipe logs in Pandas',
      'Categorical encoding and scale preprocessing pipelines',
      'Comparative metrics modeling (Logistic Regression vs Random Forest)',
      'Feature importance evaluation revealing pork, potato, and vegetables as top traffic drivers',
      'Business recommendation layout projecting a +40% surge in homepage traffic'
    ],
    impact: 'Achieved ~82% precision performance, successfully passing the PM-defined business threshold of 80% with low false-positive rates.',
    keyInsights: [
      'Category is the #1 predictor (far outweighs nutritional metrics)',
      'Winning categories: Pork, Potato, Vegetable (high traffic)',
      'Underperformers: Beverages, Lunch/Snacks',
      "Nutritional metrics don't drive traffic (weak correlation)"
    ]
  },
  {
    id: 'proj-fitly',
    title: 'Fitly - Customer Churn Analysis',
    description: 'End-to-end data analytics diagnostic analyzing fitness subscription drops. Introduces a custom Zero-Activity Rate (ZAR) early warning indicator.',
    goalAndRole: 'My goal was determining severe user friction points behind an unsustainable 28.5% churn score. I formulated logical data cleaning models, merged logs across three disparate datasets (account, sessions, and support tables), and created actionable retention frameworks for product managers.',
    challengesOvercome: 'Encountered highly fragmented, unsorted timestamp sheets with different client identifier structures. Engineered unified string normalization helpers, combined tables efficiently using robust outer joins in Pandas, and mathematically modeled a custom retention metric tracking active user engagements.',
    extendedDetails: 'A high-impact business analytics report translating statistics into marketing responses. Focuses on the dramatic retention contrast between engaged and unengaged subscribers across pricing tiers.',
    techStack: ['Python 3.10+', 'Jupyter Notebook', 'Pandas 2.0+', 'NumPy', 'Matplotlib 3.7+', 'Seaborn', 'Descriptive Statistics', 'Bivariate EDA'],
    category: 'data-analytics',
    githubUrl: 'https://github.com/nisrg77',
    presentationUrl: 'https://docs.google.com/presentation/d/1pyuUciLtEVPSLEj5uRwNG9gc_q8P0BsBqebnCeXJzEw/edit?usp=sharing',
    repoSize: '240 KB',
    lastUpdated: 'March 10, 2026',
    status: 'Completed',
    difficulty: 3,
    businessValue: 'High (ZAR Metric)',
    keyFeatures: [
      'Univariate and Bivariate analysis of 400 user logs in Pandas',
      'Identified Free Plan Churn Hotspot representing severe 41% churn',
      'Defined ZAR equation to track weekly user inactivity drops',
      'Uncovered a 4x retention drop among inactive accounts (53.9% churn vs 12.6% for active)',
      'Supplied clear onboarding redesign recommendations to optimize lower tier experience'
    ],
    impact: 'Provided a formalized early-warning dashboard framework enabling Fitly to preemptively trigger re-engagement workflows for at-risk free members.',
    keyInsights: [
      'Free Plan Churn Hotspot: 41% churn (vs 18-25% for paid tiers)',
      'Engagement is strongest retention signal: Zero activities has 53.9% churn vs 12.6% for active users',
      'Designed ZAR metric to monitor weekly as early warning system',
      'Recommended redesigning Free Plan onboarding and fixing support SLAs'
    ]
  },
  {
    id: 'proj-tradingbot',
    title: 'Trading Bot - Binance Futures',
    description: 'A robust, structured Python trading command line application for Binance Futures Testnet (USDT-M) with enhanced cryptographic check-offs.',
    goalAndRole: 'The objective was to write a highly secure, reliable algorithmic helper to post futures orders safely. As the primary developer, I built the REST client, designed pre-flight input validator functions, and crafted a polished Rich terminal user interface.',
    challengesOvercome: 'Binance requires precise clock sync matching within milliseconds and encrypted signature formatting (HMAC SHA256 / RSA Ed25519) on all endpoints. Handled this by coding a dynamic timing adjustment helper and encapsulating cryptographic signing blocks safely inside separate authentication client scripts.',
    extendedDetails: 'Production-ready CLI application emphasizing clean code. Separates validations, core API actions, logging formats, and configuration scopes to achieve maximum extensibility.',
    techStack: ['Python 3.8+', 'Binance Futures API', 'HMAC (Secret Key)', 'RSA/Ed25519 Hashing', 'Click', 'Rich Library', 'Python Logging', 'Python-dotenv'],
    category: 'backend',
    githubUrl: 'https://github.com/nisrg77',
    repoSize: '9 KB',
    lastUpdated: 'April 21, 2026',
    status: 'Complete',
    difficulty: 3,
    businessValue: 'Medium (Testnet)',
    keyFeatures: [
      'Supports fast Market & Limit orders (BUY or SELL actions) over Binance test nodes',
      'Enhanced validators for symbols, quantities, and real-time tick prices',
      'Beautiful tables and terminal borders layouts using the python Rich library',
      'Unified errors logging directly into local structured files (bot.log)',
      'Strict API keys protection avoiding cleartext exposures in terminal scripts'
    ],
    impact: 'Provides sub-100ms algorithmic order processing with secure, bulletproof transaction audits.'
  },
  {
    id: 'proj-churnshield',
    title: 'ChurnShield Pro - Telecom Churn Prediction',
    description: 'Predictive machine learning platform using authentic IBM Telco customer logs to generate interactive risk estimates on an enterprise Web Dashboard.',
    goalAndRole: 'Constructed an end-to-end data pipeline to support corporate customer retention units. As the data scientist and software developer, I analyzed 7,043 enterprise rows, processed demographic data, trained Logistic Regression classifiers, and built a Flask service container.',
    challengesOvercome: 'Bridging the offline scikit-learn model with a live server payload form. Overcame this by serializing custom scaling transformers and the trained Logistic Regression estimator with Joblib, allowing immediate prediction of incoming web parameters without computational drift.',
    extendedDetails: 'Fully realized prediction client evaluating 21 client dimensions (demographics, streaming accounts, internet types, fiber subscriptions, contract financial stats) to flag high-risk accounts.',
    techStack: ['Flask', 'Python 3.8+', 'Pandas', 'NumPy', 'scikit-learn', 'StandardScaler', 'Label Encoding', 'Joblib', 'HTML5', 'Tailwind CSS'],
    category: 'ai-ml',
    githubUrl: 'https://github.com/nisrg77',
    liveDemoUrl: 'https://telecom-churn-prediction-2db0.onrender.com',
    repoSize: '1,140 KB',
    lastUpdated: 'May 2026',
    status: 'Production-ready',
    difficulty: 4,
    businessValue: 'High (7K+ Records)',
    keyFeatures: [
      'Logistic Regression pipeline achieving ~79% accuracy over authentic IBM benchmarks',
      'Comprehensive processing of 7,043 customer accounts across 21 financial and profile metadata points',
      'Joblib serialization for fast, stateful backend prediction updates',
      'HTML/CSS enterprise dashboard with grouped views for risk audits',
      'Interactive risk evaluation form displaying instant client-risk percentages'
    ],
    impact: 'Equips telecom account managers with a production-ready predictive visualizer to confidently target departing clients before subscription lapses.'
  },
  {
    id: 'proj-rag-qa',
    title: 'RAG-Based Document Q&A System',
    description: 'An end-to-end Retrieval-Augmented Generation pipeline built using LangChain and FAISS for semantic similarity searches and context-aware answering.',
    goalAndRole: 'Designed and implemented an end-to-end RAG pipeline as the lead AI engineer to allow high-accuracy, hallucination-resistant queries on corporate PDF handbooks.',
    challengesOvercome: 'Mitigated hallucination and preserved authentic source attribution by implementing hierarchical text splitting with tailored overlap, customizing OpenAI prompt instructions, and adding citation reference tracing.',
    extendedDetails: 'Employs sentence transformers, LangChain document loaders, vector store persistence using FAISS, and smart temperature configurations block to host an offline QA model.',
    techStack: ['Python', 'LangChain', 'FAISS', 'OpenAI API', 'HuggingFace', 'Prompt Engineering', 'Vector Embeddings'],
    category: 'gen-ai',
    githubUrl: 'https://github.com/nisrg77',
    liveDemoUrl: 'https://rag-qa-docsys-production.up.railway.app/',
    repoSize: '412 KB',
    lastUpdated: 'May 2026',
    status: 'Completed',
    difficulty: 4,
    businessValue: 'High (RAG Accuracy)',
    keyFeatures: [
      'Hierarchical markdown and PDF text chunking routines',
      'Vector store construction with FAISS dynamic indexing',
      'Semantic similarity search score thresholds',
      'Contextual prompt templates avoiding standard hallucination',
      'Traceable source citation mapping'
    ],
    impact: 'Established high answer fidelity with zero-hallucination compliance across complex technical manuals.'
  },
  {
    id: 'proj-esociety',
    title: 'eSociety Management System',
    description: 'A role-based residential housing management platform with specialized dashboards and automated resident communication.',
    goalAndRole: 'Built a complete modular management framework for gated societies. Handled full-stack development, database schema normalization, and role-based permissions.',
    challengesOvercome: 'Handled complex authorization patterns and nested access roles across property owners, security guards, and administrators using Django middleware and custom permission decorators.',
    extendedDetails: 'Integrates billing schedulers, maintenance complaints resolution pipelines, secure visitor gate passes, and a responsive web portal.',
    techStack: ['Python', 'Django', 'PostgreSQL', 'HTML5', 'CSS3', 'Bootstrap', 'Django Admin'],
    category: 'full-stack',
    githubUrl: 'https://github.com/nisrg77',
    liveDemoUrl: 'https://e-scoiety.onrender.com/',
    repoSize: '5,420 KB',
    lastUpdated: 'December 2025',
    status: 'Completed',
    difficulty: 3,
    businessValue: 'High (Role-Based SaaS)',
    keyFeatures: [
      'Role-based dashboards (Resident, Security, Admin Panel)',
      'Automated maintenance fee calculation and billing pipeline',
      'Interactive visitor logging and guard verification system',
      'Complaint escalations with progress tracking widgets'
    ],
    impact: 'Streamlined communication cycles and billing tasks, resulting in reduced human reporting errors.'
  },
  {
    id: 'proj-sentiment-bert',
    title: 'Sentiment Analysis with Transformers',
    description: 'Fine-tuned BERT classification modeling using Hugging Face and PyTorch, exposed via async FastAPI endpoints.',
    goalAndRole: 'Designed and optimized a multi-class deep learning sentiment classifier. Responsible for tokenization optimization, model fine-tuning with LoRA, and deploying the serving API.',
    challengesOvercome: 'Optimized inference latency on non-GPU instances. Overcame this by performing post-training dynamic quantization using PyTorch, shrinking model size by 4x and speeding up request response times from 350ms to 42ms.',
    extendedDetails: 'Advanced NLP model evaluating customer feedback and reviews. Features custom preprocessing pipelines, learning rate scheduling with weight decay, and asynchronous request queuing.',
    techStack: ['Python', 'PyTorch', 'Transformers (Hugging Face)', 'BERT', 'FastAPI', 'Tokenizers', 'Docker'],
    category: 'gen-ai',
    githubUrl: 'https://github.com/nisrg77',
    liveDemoUrl: 'https://sentiment-analysis-transformers-production.up.railway.app/',
    repoSize: '1.2 GB',
    lastUpdated: 'February 2026',
    status: 'Active',
    difficulty: 5,
    businessValue: 'High (+14% F1-Score)',
    keyFeatures: [
      'Fine-tuned BERT classifier on customer review data',
      'Optimized tokenizer padding and attention mask batches',
      'High performance asynchronous FastAPI inference setup',
      'Dynamic post-training serialization and model quantization'
    ],
    impact: 'Exceeded baseline TF-IDF with Logistic Regression models by over 14% on multi-class F1 evaluation metrics.'
  },
  {
    id: 'proj-cnn-image',
    title: 'Image Classification with CNN',
    description: 'Deep Convolutional Neural Networks built with TensorFlow/Keras, featuring OpenCV camera visual loads and overfitting countermeasures.',
    goalAndRole: 'Engineered a lightweight image classification CNN. Designed the model architecture, added data augmentations, and integrated an OpenCV webcam classification loop.',
    challengesOvercome: 'Tackled standard model overfitting during initial training epochs by applying deep dropout stacks, spatial BatchNormalization, and programmatic data augmentations (zooms, rotations, flips).',
    extendedDetails: 'Capable of real-time classification through camera inputs using OpenCV helper scripts. Includes serialized Keras model loaders for clean runtime evaluation.',
    techStack: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy', 'Matplotlib', 'CNN Architecture'],
    category: 'ai-ml',
    githubUrl: 'https://github.com/nisrg77',
    repoSize: '16.4 MB',
    lastUpdated: 'January 2026',
    status: 'Completed',
    difficulty: 4,
    businessValue: 'Medium (93.5% Accuracy)',
    keyFeatures: [
      'Lightweight 5-layer Convolutional Neural Network (CNN) stack',
      'Augmentation layer preprocessing for improved model generalization',
      'Real-time camera feed classification utility via OpenCV',
      'Learning curves plotting and confusion matrix calculations'
    ],
    impact: 'Reached 93.5% validation accuracy, demonstrating highly accurate runtime categorizations on clean testing datasets.'
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'Python', level: 5 },
      { name: 'C / C++', level: 4 },
      { name: 'Java', level: 4 },
      { name: 'JavaScript (ES6+)', level: 4 },
      { name: 'HTML5 & CSS3', level: 5 },
      { name: 'R', level: 3 }
    ]
  },
  {
    title: 'AI & Machine Learning',
    skills: [
      { name: 'TensorFlow & Keras', level: 4 },
      { name: 'PyTorch', level: 4 },
      { name: 'Scikit-learn', level: 5 },
      { name: 'Hugging Face Hub', level: 4 },
      { name: 'CNNs & Deep Learning', level: 4 },
      { name: 'NLP & Sentiment Analysis', level: 4 }
    ]
  },
  {
    title: 'Generative AI & LLMs',
    skills: [
      { name: 'LangChain', level: 4 },
      { name: 'Retrieval-Augmented Gen (RAG)', level: 5 },
      { name: 'Vector DBs (FAISS, Chroma)', level: 4 },
      { name: 'OpenAI API Integration', level: 4 },
      { name: 'Prompt Engineering', level: 5 },
      { name: 'LoRA & QLoRA Fine-tuning', level: 3 }
    ]
  },
  {
    title: 'Backend & Databases',
    skills: [
      { name: 'Django & Django REST', level: 5 },
      { name: 'FastAPI', level: 4 },
      { name: 'REST APIs (CRUD design)', level: 5 },
      { name: 'PostgreSQL', level: 4 },
      { name: 'MySQL', level: 4 }
    ]
  },
  {
    title: 'Tools & MLOps',
    skills: [
      { name: 'Git, GitHub & CI/CD', level: 5 },
      { name: 'Jupyter & Google Colab', level: 5 },
      { name: 'Docker & Containerization', level: 4 },
      { name: 'MLOps (GitHub Actions, MLflow)', level: 4 },
      { name: 'OpenCV & MediaPipe', level: 4 }
    ]
  }
];
