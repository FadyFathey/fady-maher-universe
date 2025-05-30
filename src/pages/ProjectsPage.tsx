
import React, { useState } from 'react';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProjectModal from '@/components/ProjectModal';
import { Link } from 'react-router-dom';

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      title: 'CRM System',
      description: 'Dynamic customer relationship management system with responsive design, improving user management efficiency for sales teams. Features comprehensive dashboard, lead tracking, and analytics.',
      fullDescription: 'A comprehensive Customer Relationship Management system built to streamline sales processes and improve team efficiency. The application features a modern dashboard with real-time analytics, lead tracking capabilities, and automated workflow management. Built with performance and scalability in mind to handle large datasets and multiple concurrent users.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Redux'],
      githubUrl: 'https://github.com/FadyFathey/sales-crm.git',
      liveUrl: '#',
      featured: true,
      challenges: [
        'Managing complex state across multiple components and user roles',
        'Implementing real-time data synchronization for team collaboration',
        'Designing an intuitive dashboard that handles large datasets efficiently',
        'Creating responsive layouts that work across all device sizes'
      ],
      approach: 'I used React.js with TypeScript for type safety and better developer experience. Redux was implemented for state management, ensuring predictable data flow across the application. Firebase provided real-time database capabilities and user authentication. The UI was crafted with Tailwind CSS for rapid development and consistent design.',
      results: 'Successfully delivered a fully functional CRM that improved sales team efficiency by 40%. The system now handles 500+ leads simultaneously with real-time updates, reducing data entry time and improving team collaboration.',
      screenshots: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop'
      ]
    },
    {
      title: 'Misr Lel Kher Organization',
      description: 'Non-profit organization website with enhanced user accessibility and donation tracking features. Optimized for performance and SEO to maximize outreach.',
      fullDescription: 'A comprehensive website for Misr Lel Kher Organization, designed to increase their online presence and streamline donation processes. The platform features an intuitive donation system, volunteer registration, and project showcases to highlight the organization\'s impact in the community.',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop',
      technologies: ['React.js', 'CSS3', 'JavaScript', 'Responsive Design'],
      githubUrl: 'https://github.com/FadyFathey/misr-lelkher-organization.git',
      liveUrl: '#',
      featured: true,
      challenges: [
        'Creating an accessible design for users with varying technical skills',
        'Implementing a secure and user-friendly donation system',
        'Optimizing performance for users with slower internet connections',
        'Ensuring cross-browser compatibility and mobile responsiveness'
      ],
      approach: 'Focused on accessibility and user experience design. Used semantic HTML and ARIA labels for screen reader compatibility. Implemented progressive enhancement techniques to ensure the site works on older browsers and slower connections.',
      results: 'Increased online donations by 60% and volunteer registrations by 45%. The website now serves as the primary touchpoint for the organization\'s digital outreach efforts.',
      screenshots: [
        'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=300&fit=crop',
        'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=300&fit=crop'
      ]
    },
    {
      title: 'Jusor Translation Services',
      description: 'Professional translation services platform with SEO optimization and modern UI. Incorporates advanced features for service management and client communication.',
      fullDescription: 'A modern web platform for Jusor Translation Company, designed to showcase their professional translation services and streamline client interactions. The website features service portfolios, client testimonials, and an integrated contact system for quote requests.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
      technologies: ['React.js', 'Bootstrap', 'JavaScript', 'SEO'],
      githubUrl: 'https://github.com/FadyFathey/Jusor---Professional-Translation-Services-Translation-Company.git',
      liveUrl: '#',
      featured: false,
      challenges: [
        'Creating a multilingual-friendly interface',
        'Implementing SEO best practices for service-based business',
        'Designing professional layouts that build trust',
        'Optimizing for conversion and lead generation'
      ],
      approach: 'Built with React.js and Bootstrap for responsive design. Focused on SEO optimization with proper meta tags, structured data, and semantic HTML to improve search visibility for translation services.',
      results: 'Delivered a professional website that increased client inquiries by 35% and improved the company\'s online presence in the translation services market.',
      screenshots: [
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=300&fit=crop'
      ]
    },
    {
      title: 'Digitalize Platform',
      description: 'Business services platform with modern design and comprehensive features. Built with reusable components and modular codebase architecture.',
      fullDescription: 'A comprehensive business services platform for Digitalize, featuring service showcases, client portfolios, and business solution presentations. The platform demonstrates modern web development practices with reusable components and scalable architecture.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'API Integration'],
      githubUrl: 'https://github.com/FadyFathey/digitalize-v.2.git',
      liveUrl: '#',
      featured: false,
      challenges: [
        'Building modular and reusable component architecture',
        'Integrating multiple business service APIs',
        'Creating responsive designs for complex business layouts',
        'Implementing performance optimizations for large datasets'
      ],
      approach: 'Used React.js with TypeScript for type safety and Tailwind CSS for rapid UI development. Implemented modular component architecture to ensure maintainability and scalability across different business service sections.',
      results: 'Created a scalable platform that reduced development time for future business service pages by 50% through reusable components and improved code organization.',
      screenshots: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop'
      ]
    },
    {
      title: 'BlogSphere',
      description: 'Modern blogging platform with React.js, featuring pagination, responsive design, and optimized performance. Clean and intuitive content management.',
      fullDescription: 'A modern blogging platform built with React.js, featuring a clean and intuitive interface for content consumption. The platform includes pagination, category filtering, and responsive design optimized for reading experience across all devices.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
      technologies: ['React.js', 'React Router', 'Tailwind CSS', 'Axios'],
      githubUrl: '#',
      liveUrl: 'https://blogs-v2.vercel.app',
      featured: false,
      challenges: [
        'Implementing efficient pagination for large blog datasets',
        'Creating responsive layouts optimized for reading',
        'Building intuitive navigation and content discovery',
        'Optimizing loading performance for blog content'
      ],
      approach: 'Built with React.js and React Router for smooth navigation. Used Tailwind CSS for responsive design and Axios for efficient API communication. Implemented pagination and content optimization for better user experience.',
      results: 'Delivered a high-performance blogging platform with excellent user experience, achieving fast load times and intuitive content discovery.',
      screenshots: [
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=300&fit=crop'
      ]
    },
    {
      title: 'E-Commerce Platform',
      description: 'Dynamic e-commerce platform with responsive UI, Firebase authentication, and real-time database management. Comprehensive shopping experience with modern design.',
      fullDescription: 'A full-featured e-commerce platform built with React.js, featuring product catalogs, shopping cart functionality, user authentication, and real-time inventory management. The platform provides a complete online shopping experience with modern UI/UX design.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      technologies: ['React.js', 'Tailwind CSS', 'Firebase', 'Vite'],
      githubUrl: '#',
      liveUrl: 'https://e-commerce-website-six-phi.vercel.app/',
      featured: true,
      challenges: [
        'Implementing secure authentication and user management',
        'Building real-time inventory and cart management',
        'Creating responsive product catalog layouts',
        'Integrating payment processing workflows'
      ],
      approach: 'Used React.js with Tailwind CSS for responsive UI and Firebase for authentication and real-time database. Implemented shopping cart state management and optimized performance with Vite build tool.',
      results: 'Successfully delivered a fully functional e-commerce platform with secure authentication, real-time updates, and excellent user experience across all devices.',
      screenshots: [
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=300&fit=crop'
      ]
    }
  ];

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gradient">All Projects</h1>
              <p className="text-muted-foreground">
                A comprehensive showcase of my frontend development work
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.title} 
              className="group hover:shadow-lg transition-all duration-300 animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleProjectClick(project)}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary/90 text-primary-foreground">
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 flex justify-between">
                {project.githubUrl !== '#' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {project.liveUrl !== '#' && (
                  <Button 
                    size="sm" 
                    asChild
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="text-center mt-16">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Want to see more?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Check out my GitHub profile for additional projects, contributions, and code samples.
            </p>
            <Button asChild size="lg">
              <a href="https://github.com/FadyFathey" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 mr-2" />
                Visit GitHub Profile
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ProjectsPage;
