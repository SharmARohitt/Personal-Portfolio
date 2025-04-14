
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
    title: 'B.Tech in Computer Science',
    period: '2022 - 2026',
    description: 'Pursuing Computer Science at Guru Gobind Singh Indraprastha University with a CGPA of 8.5, focusing on AI, web technologies, and data engineering.',
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    id: 2,
    title: 'Higher Secondary Education',
    period: '2020 - 2022',
    description: 'Completed 12th grade from Laxmi Public School with an \'A\' grade, with a focus on science and mathematics.',
    icon: <GraduationCap className="w-5 h-5" />,
  },
];

const experience: TimelineItem[] = [
  {
    id: 1,
    title: 'Internship Trainee',
    period: 'Jan - Mar 2025',
    description: 'Worked at Inventronics in Gurugram, utilizing Python, Flask, and related technologies for software development projects.',
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    id: 2,
    title: 'Software Development Intern',
    period: 'Nov - Dec 2024',
    description: 'Remote internship at Prodigy InfoTech focusing on full-stack development using the MERN stack and modern web technologies.',
    icon: <Code className="w-5 h-5" />,
  },
  {
    id: 3,
    title: 'Mentor',
    period: 'Dec 2024 - Mar 2025',
    description: 'Served as a Mentor at Social Winter of Code (SWOC), guiding contributors in areas like LLMs and data engineering projects.',
    icon: <Calendar className="w-5 h-5" />,
  },
];

const skills = [
  { name: 'JavaScript', level: 90, category: 'frontend' },
  { name: 'React', level: 95, category: 'frontend' },
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'Python', level: 80, category: 'backend' },
  { name: 'MongoDB', level: 85, category: 'backend' },
  { name: 'TypeScript', level: 80, category: 'frontend' },
  { name: 'Express.js', level: 85, category: 'backend' },
  { name: 'Flask', level: 75, category: 'backend' },
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
              I'm a B.Tech Computer Science student with a passion for building innovative web experiences 
              using modern technologies. Skilled in the MERN stack, TypeScript, and over 50 technologies,
              I bring a strong mix of backend and AI expertise.
            </p>
            
            <p className="text-xl">
              My journey in tech has been fueled by hands-on experience through internships
              and mentoring opportunities. I enjoy solving complex problems and creating applications
              that blend functionality with stunning visuals.
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
              { emoji: '🎮', name: 'Gaming' },
              { emoji: '💪', name: 'Fitness' },
              { emoji: '🎵', name: 'Music' },
              { emoji: '📚', name: 'Reading' },
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
