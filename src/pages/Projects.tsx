
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThreeScene from '@/components/ThreeScene';
import { projects, Project } from '@/data/projects';

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  return (
    <div 
      className="project-card glass dark:glass-dark rounded-xl overflow-hidden animate-scaleUp"
      style={{ animationDelay: `${index * 100 + 200}ms` }}
    >
      <div className="h-48 bg-primary/20 flex items-center justify-center">
        {project.type === 'ai' && <span className="text-6xl">🧠</span>}
        {project.type === 'web3' && <span className="text-6xl">⛓️</span>}
        {project.type === 'fullstack' && <span className="text-6xl">🚀</span>}
        {project.type === 'other' && <span className="text-6xl">💻</span>}
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex items-center space-x-4">
          <Button asChild variant="outline" size="sm">
            <Link to={`/projects/${project.id}`}>
              View Details
            </Link>
          </Button>
          
          <a 
            href={project.codeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-primary transition-colors"
          >
            <Github size={20} />
          </a>
          
          <a 
            href={project.demoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-primary transition-colors"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  
  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.type === filter));
    }
  }, [filter]);
  
  return (
    <div className="min-h-screen relative pt-16">
      <ThreeScene type="projects" />
      
      <section className="py-20 px-4 content-container">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center animate-fadeIn">
            My <span className="text-gradient">Projects</span>
          </h1>
          
          <p className="text-xl text-center mb-12 max-w-3xl mx-auto animate-fadeIn delay-200">
            Explore my portfolio of work spanning AI, Web3, and full-stack development.
            Each project showcases different skills and technologies.
          </p>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fadeIn delay-300">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              onClick={() => setFilter('all')}
              className="flex items-center gap-2"
            >
              <Filter size={16} />
              All Projects
            </Button>
            
            <Button 
              variant={filter === 'ai' ? 'default' : 'outline'} 
              onClick={() => setFilter('ai')}
            >
              AI / ML
            </Button>
            
            <Button 
              variant={filter === 'web3' ? 'default' : 'outline'} 
              onClick={() => setFilter('web3')}
            >
              Web3
            </Button>
            
            <Button 
              variant={filter === 'fullstack' ? 'default' : 'outline'} 
              onClick={() => setFilter('fullstack')}
            >
              Full Stack
            </Button>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                No projects found with the selected filter.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setFilter('all')}
                className="mt-4"
              >
                Show All Projects
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
