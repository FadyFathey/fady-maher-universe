import React, { useState } from 'react';

const ProjectsManager = () => {
    const [projects, setProjects] = useState([]); // assuming you have a way to fetch your projects
    const [showProjects, setShowProjects] = useState(true);

    const toggleProjects = () => {
        setShowProjects(prevState => !prevState);
    };

    return (
        <div>
            <button onClick={toggleProjects}>{showProjects ? 'Hide' : 'Show'} Projects</button>
            {showProjects && ( 
                <div>
                    {/* Assuming `projects` is an array of project objects with a visibility field */}
                    {projects.map(project => (
                        project.visibility && (
                            <div key={project.id}>{project.name}</div>
                        )
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectsManager;