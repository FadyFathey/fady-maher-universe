
import React from 'react';
import { Github, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gradient">Fady Fathey Maher</h3>
            <p className="text-muted-foreground">
              Frontend Developer crafting modern, responsive web applications with React.js and TypeScript.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <div className="space-y-2">
              {[
                { label: 'About', href: '#about' },
                { label: 'Projects', href: '#projects' },
                { label: 'Blog', href: '#blog' },
                { label: 'Contact', href: '#contact' }
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(link.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="block text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">Get in Touch</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>Cairo, Egypt</p>
              <a 
                href="mailto:fadyfathymaher3@gmail.com"
                className="block hover:text-foreground transition-colors duration-200"
              >
                fadyfathymaher3@gmail.com
              </a>
              <a 
                href="tel:+201270644733"
                className="block hover:text-foreground transition-colors duration-200"
              >
                +201270644733
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-muted-foreground">
              <span>© {currentYear} Fady Fathey Maher. Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>in Cairo, Egypt</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/FadyFathey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/fady-fathey-maher-72918916b/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
