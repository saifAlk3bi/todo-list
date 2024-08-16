class Project {
  constructor(title, id) {
    this.title = title;
    this.id = id;
    this.tasks = [];
  }

  addTaskToProject(task) {
    this.tasks.push(task);
  }

  removeTask(taskId) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }
}

export default Project;
