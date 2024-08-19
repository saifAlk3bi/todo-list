import Project from './project.js';
function createProject(projectData) {
  return new Project(projectData.title, projectData.id);
}

export default createProject
