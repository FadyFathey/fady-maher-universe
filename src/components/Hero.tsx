
import React from 'react';
import { ArrowRight, Clock, Github, Linkedin } from 'lucide-react';
import { Button } from './ui/button';
import { useSiteSections } from '@/hooks/useSiteSections';

const Hero = () => {
  const { data: sections } = useSiteSections();
  const heroSection = sections?.find(s => s.section_key === 'hero');
  
  // Fallback to original content if no data from database
  const content = heroSection?.content || {
    heading: "I Build High-Converting React Apps That Ship Faster.",
    subheading: "Frontend engineer focused on performance, conversion, and delivery speed. I build production-ready interfaces that help products launch faster and grow engagement.",
    location: "Cairo, Egypt",
    cta_primary: "View Case Studies",
    cta_secondary: "Book a 15-Min Call",
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
        <div className="text-center space-y-6 animate-fade-in">
          {/* Status Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              {content.status}
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gradient leading-tight tracking-tight">
              {content.heading.split('\n').map((line, index) => (
                <span key={index} className={index > 0 ? "block" : ""}>
                  {line}
                </span>
              ))}
            </h1>
            
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {content.subheading}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
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

          <p className="text-sm text-muted-foreground">Replies within 24 hours</p>

          {/* Proof Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
              20+ Projects Shipped
            </span>
            <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
              React + TypeScript Specialist
            </span>
            <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
              Available for New Work
            </span>
          </div>

          {/* Secondary Meta */}
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground pt-1">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>Fast turnaround</span>
            </div>
            <span className="text-border">|</span>
            <span className="font-medium">{content.location}</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center space-x-6 pt-2">
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
    </section>
  );
};

export default Hero;
