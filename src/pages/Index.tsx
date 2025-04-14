
import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThreeScene from '@/components/ThreeScene';
import AnimatedText from '@/components/AnimatedText';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ThreeScene type="home" />
      
      {/* Hero Section */}
      <section className="h-screen relative flex flex-col justify-center items-center px-4 content-container">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 opacity-0 animate-fadeIn">
            <AnimatedText 
              text="Hey, I'm Rohit Sharma" 
              className="text-gradient" 
              speed={80}
            />
          </h1>
          
          <p className="text-xl md:text-2xl mt-6 mb-8 opacity-0 animate-fadeIn delay-300">
            <AnimatedText 
              text="I build innovative web experiences with cutting-edge technology" 
              delay={1800}
            />
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 opacity-0 animate-fadeIn delay-500">
            <Button asChild className="btn-primary">
              <Link to="/projects">View My Projects</Link>
            </Button>
            
            <Button asChild variant="outline" className="btn-outline">
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-primary" />
        </div>
      </section>
      
      {/* Featured Projects Preview */}
      <section className="py-20 px-4 content-container bg-secondary/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Project Preview */}
            <div className="card-3d glass dark:glass-dark p-6 rounded-xl">
              <div className="h-48 rounded-lg mb-4 bg-primary/20 flex items-center justify-center">
                <span className="text-5xl">🧠</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Neural Style Transfer</h3>
              <p className="text-muted-foreground mb-4">AI-powered artistic style transfer application</p>
              <Link 
                to="/projects" 
                className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
              >
                Learn more
                <ChevronDown className="w-4 h-4 ml-1 rotate-270" />
              </Link>
            </div>
            
            {/* Web3 Project Preview */}
            <div className="card-3d glass dark:glass-dark p-6 rounded-xl">
              <div className="h-48 rounded-lg mb-4 bg-primary/20 flex items-center justify-center">
                <span className="text-5xl">⛓️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">DeFi Dashboard</h3>
              <p className="text-muted-foreground mb-4">Comprehensive analytics for DeFi investments</p>
              <Link 
                to="/projects" 
                className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
              >
                Learn more
                <ChevronDown className="w-4 h-4 ml-1 rotate-270" />
              </Link>
            </div>
            
            {/* Fullstack Project Preview */}
            <div className="card-3d glass dark:glass-dark p-6 rounded-xl">
              <div className="h-48 rounded-lg mb-4 bg-primary/20 flex items-center justify-center">
                <span className="text-5xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold mb-2">SaaS Platform</h3>
              <p className="text-muted-foreground mb-4">Full-stack marketing solution for agencies</p>
              <Link 
                to="/projects" 
                className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
              >
                Learn more
                <ChevronDown className="w-4 h-4 ml-1 rotate-270" />
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild>
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Skills Overview */}
      <section className="py-20 px-4 content-container">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: 'React', emoji: '⚛️' },
              { name: 'Node.js', emoji: '🟢' },
              { name: 'Python', emoji: '🐍' },
              { name: 'MongoDB', emoji: '🍃' },
              { name: 'Web3', emoji: '⛓️' },
              { name: 'AI / ML', emoji: '🧠' },
              { name: 'Three.js', emoji: '🕹️' },
              { name: 'DevOps', emoji: '🚀' },
            ].map((skill, index) => (
              <div 
                key={skill.name}
                className="card-3d glass dark:glass-dark p-6 rounded-xl text-center transition-all transform hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-4xl block mb-2">{skill.emoji}</span>
                <h3 className="text-lg font-medium">{skill.name}</h3>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild>
              <Link to="/about">More About Me</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Contact CTA */}
      <section className="py-20 px-4 content-container bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Build <span className="text-gradient">Something Amazing</span>
          </h2>
          <p className="text-xl mb-8">
            Have a project in mind? I'd love to hear about it and see how we can work together.
          </p>
          <Button asChild size="lg" className="btn-primary">
            <Link to="/contact">Get In Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
