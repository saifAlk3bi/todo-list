import Task from './task.js';

function createTask(taskData) {
  return new Task(
    taskData.id,
    taskData.title,
    taskData.description,
    taskData.dueDate,
    taskData.priority,
    taskData.projectId
  );
}

function deleteTask(tasks, taskId) {
  return tasks.filter(task => task.id !== taskId);
}

export default createTask
