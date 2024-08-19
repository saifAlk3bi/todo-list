class Project {
  constructor(title, id) {
    this.title = title;
    this.id = id;
    this.tasks = [];
  }

  addTaskToProject(task) {
    this.tasks.push(task);
  }

}

export default Project;
