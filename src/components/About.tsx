
import React from 'react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

const About = () => {
  const technologies = [
    'React.js', 'TypeScript', 'JavaScript', 'Redux', 'Tailwind CSS',
    'HTML5', 'CSS3', 'Bootstrap', 'Angular', 'Firebase', 'Axios',
    'React Router', 'Git', 'Postman', 'Chrome DevTools', 'Jira'
  ];

  const experience = [
    {
      title: 'Frontend Developer',
      company: 'Digitalize for Business Services',
      period: 'Jan 2024 - Present',
      location: 'Cairo, Egypt'
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Profile Image */}
          <div className="relative animate-slide-up">
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=500&fit=crop&crop=face"
                  alt="Fady Fathey Maher - Frontend Developer"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 dark:ring-white/10"></div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gradient">
                About Me
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Proficient Frontend Developer with a strong foundation in building responsive, 
                user-centric web applications using React.js and modern JavaScript frameworks. 
                Skilled in optimizing performance, enhancing SEO, and ensuring accessibility compliance.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Committed to delivering scalable and maintainable solutions that drive client success 
                and organizational growth. I excel at transforming complex requirements into intuitive, 
                performant user interfaces.
              </p>
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Experience</h3>
              {experience.map((exp, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="space-y-1">
                      <h4 className="font-semibold">{exp.title}</h4>
                      <p className="text-muted-foreground">{exp.company}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{exp.period}</span>
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Education */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Education</h3>
              <p className="text-muted-foreground">Bachelor's in Commerce, Ain Shams University</p>
              <p className="text-muted-foreground">Web Development Certification (EFE)</p>
            </div>

            {/* Technologies */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Technologies & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <Badge 
                    key={tech} 
                    variant="secondary" 
                    className="px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
