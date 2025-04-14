
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThreeScene from '@/components/ThreeScene';
import { Project, projects } from '@/data/projects';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Find the project by ID
    const foundProject = projects.find(p => p.id === id);
    
    if (foundProject) {
      setProject(foundProject);
    }
    
    setLoading(false);
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading project details...</div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="text-xl mb-6">The project you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/projects">Back to Projects</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen relative pt-16">
      <ThreeScene type={project.type === 'ai' ? 'about' : (project.type === 'web3' ? 'projects' : 'contact')} />
      
      <section className="py-20 px-4 content-container">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link 
              to="/projects" 
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Projects
            </Link>
          </div>
          
          <div className="glass dark:glass-dark p-8 rounded-xl animate-scaleUp">
            <div className="flex flex-wrap gap-3 mb-4">
              {project.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="text-sm px-3 py-1 rounded-full bg-primary/20 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
            
            <p className="text-xl mb-8">{project.description}</p>
            
            <div className="h-64 md:h-80 bg-primary/20 rounded-xl flex items-center justify-center mb-8">
              {project.type === 'ai' && <span className="text-8xl">🧠</span>}
              {project.type === 'web3' && <span className="text-8xl">⛓️</span>}
              {project.type === 'fullstack' && <span className="text-8xl">🚀</span>}
              {project.type === 'other' && <span className="text-8xl">💻</span>}
            </div>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Button asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} className="mr-2" />
                  Live Demo
                </a>
              </Button>
              
              <Button asChild variant="outline">
                <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                  <Github size={16} className="mr-2" />
                  View Code
                </a>
              </Button>
            </div>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                <p className="text-foreground/80">{project.details.challenge}</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">The Solution</h2>
                <p className="text-foreground/80">{project.details.solution}</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                <ul className="space-y-2">
                  {project.details.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight size={18} className="text-primary mt-1 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
                <div className="flex flex-wrap gap-3">
                  {project.details.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="text-sm px-3 py-1 rounded-full bg-secondary text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 flex justify-between">
            <Button asChild variant="outline">
              <Link to="/projects">
                <ArrowLeft size={16} className="mr-2" />
                All Projects
              </Link>
            </Button>
            
            <Button asChild>
              <Link to="/contact">
                Get In Touch
                <ChevronRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
