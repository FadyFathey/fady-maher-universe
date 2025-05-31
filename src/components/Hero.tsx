
import React from 'react';
import { ArrowRight, Download, Github, Linkedin } from 'lucide-react';
import { Button } from './ui/button';
import { useSiteSections } from '@/hooks/useSiteSections';

const Hero = () => {
  const { data: sections } = useSiteSections();
  const heroSection = sections?.find(s => s.section_key === 'hero');
  
  // Fallback to original content if no data from database
  const content = heroSection?.content || {
    heading: "Crafting Interfaces with Precision & Purpose",
    subheading: "Frontend Developer specializing in React.js, TypeScript, and modern web technologies. Building responsive, user-centric applications that drive business success.",
    location: "Cairo, Egypt",
    cta_primary: "Explore My Work",
    cta_secondary: "Get In Touch",
    status: "Available for Work"
  };

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="hero-gradient absolute inset-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Status Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              {content.status}
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gradient leading-tight">
              {content.heading.split('\n').map((line, index) => (
                <span key={index} className={index > 0 ? "block" : ""}>
                  {line}
                </span>
              ))}
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {content.subheading}
            </p>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="font-medium">{content.location}</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              onClick={scrollToProjects}
              className="w-full sm:w-auto group"
            >
              {content.cta_primary}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={scrollToContact}
              className="w-full sm:w-auto"
            >
              {content.cta_secondary}
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center space-x-6 pt-8">
            <a 
              href="https://github.com/FadyFathey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Github className="h-6 w-6" />
            </a>
            <a 
              href="https://www.linkedin.com/in/fady-fathey-maher-72918916b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-8 bg-gradient-to-b from-muted-foreground to-transparent rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero;
