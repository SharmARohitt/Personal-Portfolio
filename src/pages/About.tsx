
import React from 'react';
import { Calendar, Code, Briefcase, GraduationCap } from 'lucide-react';
import ThreeScene from '@/components/ThreeScene';
import AnimatedText from '@/components/AnimatedText';

interface TimelineItem {
  id: number;
  title: string;
  period: string;
  description: string;
  icon: React.ReactNode;
}

const education: TimelineItem[] = [
  {
    id: 1,
    title: 'M.Tech in Computer Science',
    period: '2018 - 2020',
    description: 'Specialized in Artificial Intelligence and Machine Learning with a focus on natural language processing.',
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    id: 2,
    title: 'B.Tech in Information Technology',
    period: '2014 - 2018',
    description: 'Studied core computer science subjects with electives in web development and data structures.',
    icon: <GraduationCap className="w-5 h-5" />,
  },
];

const experience: TimelineItem[] = [
  {
    id: 1,
    title: 'Lead Full-Stack Developer',
    period: '2022 - Present',
    description: 'Building innovative web applications with React, Node.js, and MongoDB. Leading a team of developers and implementing best practices.',
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    id: 2,
    title: 'AI Research Engineer',
    period: '2020 - 2022',
    description: 'Developed machine learning models for natural language processing and computer vision applications.',
    icon: <Code className="w-5 h-5" />,
  },
  {
    id: 3,
    title: 'Web3 Developer',
    period: '2019 - 2020',
    description: 'Created decentralized applications using Ethereum, Solidity, and Web3.js. Implemented smart contracts for various use cases.',
    icon: <Calendar className="w-5 h-5" />,
  },
];

const skills = [
  { name: 'JavaScript', level: 90, category: 'frontend' },
  { name: 'React', level: 95, category: 'frontend' },
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'Python', level: 80, category: 'backend' },
  { name: 'Three.js', level: 75, category: 'frontend' },
  { name: 'MongoDB', level: 85, category: 'backend' },
  { name: 'Web3/Blockchain', level: 70, category: 'blockchain' },
  { name: 'Machine Learning', level: 75, category: 'ai' },
];

const About = () => {
  return (
    <div className="min-h-screen relative pt-16">
      <ThreeScene type="about" />
      
      {/* Hero Section */}
      <section className="py-20 px-4 content-container">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">
            <AnimatedText text="About Me" className="text-gradient" />
          </h1>
          
          <div className="glass dark:glass-dark p-8 rounded-xl animate-scaleUp delay-300">
            <p className="text-xl mb-6">
              I'm a full-stack developer with a passion for creating innovative web experiences 
              using cutting-edge technologies. With expertise in React, Node.js, Three.js, and AI/ML,
              I bring creative solutions to complex problems.
            </p>
            
            <p className="text-xl">
              My journey in tech has been driven by curiosity and a desire to build applications that 
              make a difference. I enjoy working at the intersection of design and technology, creating 
              experiences that are both functional and visually stunning.
            </p>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="py-20 px-4 content-container bg-secondary/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div 
                key={skill.name} 
                className="glass dark:glass-dark p-6 rounded-xl animate-scaleUp"
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">{skill.name}</h3>
                  <span className="text-primary font-medium">{skill.level}%</span>
                </div>
                
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary rounded-full h-2" 
                    style={{ width: `${skill.level}%`, transition: 'width 1s ease-in-out' }}
                  />
                </div>
                
                <span className="text-sm text-muted-foreground mt-2 inline-block">
                  {skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-20 px-4 content-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Experience & <span className="text-gradient">Education</span>
          </h2>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Work Experience</h3>
              <div className="space-y-8">
                {experience.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="relative pl-8 border-l-2 border-primary animate-fadeIn"
                    style={{ animationDelay: `${index * 200 + 300}ms` }}
                  >
                    <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white">
                      {item.icon}
                    </div>
                    
                    <div className="glass dark:glass-dark p-6 rounded-xl">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                        <h4 className="text-xl font-bold">{item.title}</h4>
                        <span className="text-sm bg-primary/20 px-3 py-1 rounded-full text-primary inline-block">
                          {item.period}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Education</h3>
              <div className="space-y-8">
                {education.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="relative pl-8 border-l-2 border-accent animate-fadeIn"
                    style={{ animationDelay: `${index * 200 + 300}ms` }}
                  >
                    <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-accent flex items-center justify-center text-black">
                      {item.icon}
                    </div>
                    
                    <div className="glass dark:glass-dark p-6 rounded-xl">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                        <h4 className="text-xl font-bold">{item.title}</h4>
                        <span className="text-sm bg-accent/20 px-3 py-1 rounded-full text-accent-foreground inline-block">
                          {item.period}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Interests & Hobbies */}
      <section className="py-20 px-4 content-container bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Beyond <span className="text-gradient">Coding</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { emoji: '📚', name: 'Reading' },
              { emoji: '🏄‍♂️', name: 'Surfing' },
              { emoji: '🎸', name: 'Music' },
              { emoji: '✈️', name: 'Travel' },
            ].map((item, index) => (
              <div 
                key={item.name}
                className="glass dark:glass-dark p-6 rounded-xl animate-scaleUp transform hover:scale-105 transition-all"
                style={{ animationDelay: `${index * 100 + 400}ms` }}
              >
                <span className="text-4xl block mb-2">{item.emoji}</span>
                <h3 className="text-lg font-medium">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
