import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useSiteSections } from '@/hooks/useSiteSections';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: sections } = useSiteSections();
  const location = useLocation();

  const cvSection = sections?.find(section => section.section_key === 'cv');
  const cvUrl = cvSection?.content ? (cvSection.content as any).cv_url : null;

  useEffect(() => {
    // Initialize theme based on saved preference or system setting
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Technologies', href: '#technologies' },
    { label: 'Projects', href: '/projects', isRoute: true }, // Changed to route
    { label: 'Blog', href: '/blog', isRoute: true },         // Changed to route
    { label: 'CV', href: cvUrl, isDownload: true },
    { label: 'Contact', href: '#contact' },
    { label: 'Admin Access (Only)', href: '/admin-login', isRoute: true }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isRoute?: boolean, isDownload?: boolean) => {
    setIsMenuOpen(false);

    // If it's a route, the Link component will handle it.
    if (isRoute) {
      return;
    }

    e.preventDefault();
    
    // If it's a link to a section on a different page
    if (location.pathname !== '/' && href.startsWith('#')) {
       window.location.href = `/${href}`;
       return;
    }

    if (isDownload && href) {
      const link = document.createElement('a');
      link.href = href;
      link.download = `Fady_Fathey_CV.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const renderNavItem = (item: any, isMobile: boolean) => {
    const commonProps = {
      key: item.label,
      className: isMobile 
        ? "text-muted-foreground hover:text-foreground block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
        : "text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
    };

    if (item.isRoute) {
      return (
        <Link
          to={item.href || '#'}
          {...commonProps}
          onClick={(e) => handleLinkClick(e as any, item.href, item.isRoute)}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <a
        href={item.href || '#'}
        {...commonProps}
        onClick={(e) => handleLinkClick(e, item.href || '', item.isRoute, item.isDownload)}
      >
        {item.label}
      </a>
    );
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gradient hover:opacity-80 transition-opacity">
              Fady Fathey
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map(item => renderNavItem(item, false))}
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
              {navItems.map(item => renderNavItem(item, true))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
