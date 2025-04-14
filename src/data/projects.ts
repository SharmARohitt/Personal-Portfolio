
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  codeUrl: string;
  type: 'ai' | 'web3' | 'fullstack' | 'other';
  details: {
    challenge: string;
    solution: string;
    features: string[];
    technologies: string[];
  };
}

export const projects: Project[] = [
  {
    id: 'neural-style-transfer',
    title: 'Neural Style Transfer App',
    description: 'An AI-powered web application that applies artistic styles to images using neural networks.',
    image: '/placeholder.svg',
    tags: ['AI', 'Python', 'React', 'Flask'],
    demoUrl: 'https://example.com/demo',
    codeUrl: 'https://github.com/username/neural-style-transfer',
    type: 'ai',
    details: {
      challenge: 'Creating a user-friendly interface for complex AI models while ensuring fast processing and high-quality results.',
      solution: 'Implemented a scalable backend using Flask and TensorFlow, with an optimized model for quick style transfers. Added a React frontend with real-time previews.',
      features: [
        'Multiple artistic style presets',
        'Custom style upload',
        'Adjustable parameters',
        'High-resolution output',
        'Gallery of past transformations'
      ],
      technologies: [
        'PyTorch',
        'React',
        'Flask',
        'Docker',
        'AWS Lambda',
        'S3'
      ]
    }
  },
  {
    id: 'defi-dashboard',
    title: 'DeFi Analytics Dashboard',
    description: 'A comprehensive dashboard for tracking DeFi investments, yields, and market trends across multiple blockchains.',
    image: '/placeholder.svg',
    tags: ['Web3', 'Blockchain', 'React', 'Ethers.js'],
    demoUrl: 'https://example.com/demo',
    codeUrl: 'https://github.com/username/defi-dashboard',
    type: 'web3',
    details: {
      challenge: 'Aggregating data from multiple blockchains and protocols while providing real-time updates and a seamless user experience.',
      solution: 'Built a modular architecture with dedicated adapters for each blockchain and protocol, with an event-driven system for real-time updates.',
      features: [
        'Multi-chain portfolio tracking',
        'Yield farming analytics',
        'Impermanent loss calculator',
        'Gas fee optimization',
        'Price alerts'
      ],
      technologies: [
        'React',
        'Ethers.js',
        'Web3.js',
        'The Graph',
        'Material UI',
        'Redux'
      ]
    }
  },
  {
    id: 'saas-platform',
    title: 'SaaS Marketing Platform',
    description: 'A full-stack SaaS platform for digital marketing agencies to manage campaigns, analytics, and client reporting.',
    image: '/placeholder.svg',
    tags: ['Full Stack', 'MERN', 'SaaS', 'API'],
    demoUrl: 'https://example.com/demo',
    codeUrl: 'https://github.com/username/saas-platform',
    type: 'fullstack',
    details: {
      challenge: 'Building a scalable, multi-tenant system with complex permissions, real-time data processing, and white-label capabilities.',
      solution: 'Developed a microservices architecture with dedicated services for authentication, analytics, reporting, and notifications, using MongoDB for flexible data modeling.',
      features: [
        'White-label client dashboards',
        'Automated report generation',
        'Multi-channel campaign tracking',
        'ROI analytics',
        'API integrations with major ad platforms'
      ],
      technologies: [
        'MongoDB',
        'Express',
        'React',
        'Node.js',
        'Docker',
        'Redis',
        'AWS'
      ]
    }
  },
  {
    id: 'ai-chatbot',
    title: 'AI Customer Service Chatbot',
    description: 'An intelligent chatbot built with natural language processing to handle customer queries for e-commerce businesses.',
    image: '/placeholder.svg',
    tags: ['AI', 'NLP', 'Node.js', 'React'],
    demoUrl: 'https://example.com/demo',
    codeUrl: 'https://github.com/username/ai-chatbot',
    type: 'ai',
    details: {
      challenge: 'Creating a conversational AI that could understand context, handle complex customer inquiries, and seamlessly integrate with existing customer service systems.',
      solution: 'Implemented a hybrid approach combining intent classification, entity extraction, and a retrieval-based system, with a feedback loop for continuous improvement.',
      features: [
        'Natural language understanding',
        'Context-aware conversations',
        'Sentiment analysis',
        'Handoff to human agents',
        'Multi-language support'
      ],
      technologies: [
        'TensorFlow.js',
        'BERT',
        'Node.js',
        'MongoDB',
        'React',
        'WebSockets'
      ]
    }
  },
  {
    id: 'smart-inventory-system',
    title: 'Smart Inventory Management System',
    description: 'An IoT-powered inventory management system for warehouses that provides real-time tracking and predictive analytics.',
    image: '/placeholder.svg',
    tags: ['IoT', 'Python', 'React', 'TensorFlow'],
    demoUrl: 'https://example.com/demo',
    codeUrl: 'https://github.com/username/smart-inventory',
    type: 'ai',
    details: {
      challenge: 'Developing a system that can accurately track inventory in real-time while providing meaningful insights for inventory optimization.',
      solution: 'Created a network of IoT sensors integrated with a machine learning backend that predicts inventory needs and optimizes stock levels.',
      features: [
        'Real-time inventory tracking',
        'Predictive stock level optimization',
        'Automated reordering',
        'Anomaly detection',
        'Mobile companion app'
      ],
      technologies: [
        'Raspberry Pi',
        'TensorFlow',
        'Python',
        'React Native',
        'AWS IoT',
        'MongoDB'
      ]
    }
  },
  {
    id: 'nft-marketplace',
    title: 'NFT Marketplace with Social Features',
    description: 'A decentralized marketplace for NFTs with integrated social networking features for collectors and creators.',
    image: '/placeholder.svg',
    tags: ['Web3', 'NFT', 'Solidity', 'React'],
    demoUrl: 'https://example.com/demo',
    codeUrl: 'https://github.com/username/nft-social',
    type: 'web3',
    details: {
      challenge: 'Building a platform that combines NFT trading functionality with social features while ensuring security and decentralization.',
      solution: 'Implemented smart contracts for secure NFT transactions with a responsive frontend that includes social networking features like profiles, follows, and activity feeds.',
      features: [
        'NFT minting and trading',
        'Social profiles for creators',
        'Follow system for collectors',
        'Activity feed and notifications',
        'Integrated wallet connections'
      ],
      technologies: [
        'Solidity',
        'IPFS',
        'React',
        'Next.js',
        'Ethers.js',
        'Hardhat',
        'Firebase'
      ]
    }
  },
  {
    id: 'mern-fitness-tracker',
    title: 'MERN Fitness Tracking Platform',
    description: 'A comprehensive fitness tracking application built with the MERN stack that helps users monitor workouts and nutrition.',
    image: '/placeholder.svg',
    tags: ['Full Stack', 'MERN', 'TypeScript', 'API'],
    demoUrl: 'https://example.com/demo',
    codeUrl: 'https://github.com/username/fitness-tracker',
    type: 'fullstack',
    details: {
      challenge: 'Creating an intuitive, feature-rich application that syncs across devices and provides meaningful insights while maintaining performance.',
      solution: 'Developed a responsive MERN stack application with TypeScript that includes real-time data synchronization and visualization tools for progress tracking.',
      features: [
        'Workout plan creation and tracking',
        'Nutrition and meal logging',
        'Progress visualization',
        'Social sharing capabilities',
        'Personalized recommendations'
      ],
      technologies: [
        'MongoDB',
        'Express',
        'React',
        'Node.js',
        'TypeScript',
        'Chart.js',
        'Redux Toolkit'
      ]
    }
  }
];
