
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useSiteSections } from '@/hooks/useSiteSections';

const Navigation = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: sections } = useSiteSections();

  const cvSection = sections?.find(section => section.section_key === 'cv');
  const cvUrl = cvSection?.content ? (cvSection.content as any).cv_url : null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Technologies', href: '#technologies' },
    { label: 'Projects', href: '#projects', route: '#projects' },
    { label: 'Blog', href: '#blog', route: '#blog' },
    { label: 'CV', href: cvUrl, isDownload: true },
    { label: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href: string, route?: string, isDownload?: boolean) => {
    if (isDownload && href) {
      // Direct download
      const link = document.createElement('a');
      link.href = href;
      link.download = '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsMenuOpen(false);
      return;
    }
    
    if (route) {
      window.location.href = route;
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a 
              href="/" 
              className="text-xl font-bold text-gradient hover:opacity-80 transition-opacity"
            >
              Fady Fathey
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.route || item.href}
                  onClick={(e) => {
                    if (!item.route && !item.isDownload) {
                      e.preventDefault();
                      scrollToSection(item.href);
                    } else if (item.isDownload) {
                      e.preventDefault();
                      scrollToSection(item.href, item.route, item.isDownload);
                    }
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 p-0"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-9 h-9 p-0"
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-md rounded-lg mt-2 border border-border">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.route || item.href}
                  onClick={(e) => {
                    if (!item.route && !item.isDownload) {
                      e.preventDefault();
                      scrollToSection(item.href);
                    } else if (item.isDownload) {
                      e.preventDefault();
                      scrollToSection(item.href, item.route, item.isDownload);
                    } else {
                      setIsMenuOpen(false);
                    }
                  }}
                  className="text-muted-foreground hover:text-foreground block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
