class Task {
  constructor(id, title, description, dueDate, priority, projectId) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.projectId = projectId;
    this.completed = false;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}

export default Task;
