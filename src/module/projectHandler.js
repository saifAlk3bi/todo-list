import Project from './project.js';
import Task from './task.js'
function createProject(projectData) {
  return new Project(projectData.title, projectData.id);
}

function deleteProject(projects, projectId) {
  return projects.filter(project => project.id !== projectId);
}

function addTaskToProject(Task) {

}
export default createProject
