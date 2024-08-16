const Storage = {
  saveProjects(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
  },

  getProjects() {
    const projects = localStorage.getItem('projects');
    return projects ? JSON.parse(projects) : [];
  }
};

export default Storage;
