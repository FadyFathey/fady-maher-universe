
import React from 'react';
import { Github, Linkedin, Mail, Heart, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gradient">Fady Fathey</h3>
            <p className="text-sm text-muted-foreground">
              Frontend Developer passionate about creating exceptional user experiences with modern web technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
            <div className="space-y-2">
              <a href="#about" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="#projects" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </a>
              <a href="#blog" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </a>
              <a href="#contact" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Technologies */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Technologies</h4>
            <div className="space-y-2">
              <span className="block text-sm text-muted-foreground">React.js</span>
              <span className="block text-sm text-muted-foreground">TypeScript</span>
              <span className="block text-sm text-muted-foreground">Next.js</span>
              <span className="block text-sm text-muted-foreground">Tailwind CSS</span>
            </div>
          </div>

          {/* Social & Admin */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Connect</h4>
            <div className="flex flex-col space-y-3">
              <div className="flex space-x-3">
                <Button variant="ghost" size="sm" asChild>
                  <a href="https://github.com/fadyfathey" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href="https://linkedin.com/in/fady-fathey" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href="mailto:fadyfathymaher3@gmail.com">
                    <Mail className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              
              {/* Admin Access Button */}
              <Button variant="outline" size="sm" asChild className="w-fit">
                <Link to="/admin-login">
                  <Shield className="h-4 w-4 mr-2" />
                  Admin Access (Only)
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" fill="currentColor" /> by Fady Fathey Maher
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
