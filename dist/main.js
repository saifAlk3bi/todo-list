/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _module_taskHandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module/taskHandler.js */ \"./src/module/taskHandler.js\");\n/* harmony import */ var _module_projectHandler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module/projectHandler.js */ \"./src/module/projectHandler.js\");\n/* harmony import */ var _module_task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module/task */ \"./src/module/task.js\");\n/* harmony import */ var _module_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./module/dom */ \"./src/module/dom.js\");\n/* harmony import */ var _module_project_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./module/project.js */ \"./src/module/project.js\");\n/* harmony import */ var _module_storage_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./module/storage.js */ \"./src/module/storage.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nlet projects = _module_storage_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getProjects();\r\n\r\nprojects = projects.map(projectData => { //he projects array is reassigned to a new array\r\n    // where each project is now an instance of the Project class instead of just a plain object.\r\n    const project = new _module_project_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](projectData.title, projectData.id);\r\n    project.tasks = projectData.tasks || []; \r\n    return project;\r\n});\r\n\r\n(0,_module_dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"])()\r\naddProjectInSelector()\r\naddProjectInContainer()\r\n\r\nfunction renderTasks(tasks) {\r\n    const mainContainer = document.querySelector('.main');\r\n    mainContainer.innerHTML = ''; // Clear the main container before rendering\r\n\r\n    if (tasks.length === 0) {\r\n        mainContainer.innerHTML = '<p>No tasks to display.</p>';\r\n        return;\r\n    }\r\n\r\n    tasks.forEach(task => {\r\n        const taskDiv = document.createElement('div');\r\n        taskDiv.classList.add('task');\r\n\r\n        // Create task title\r\n        const taskTitle = document.createElement('h4');\r\n        taskTitle.textContent = task.title;\r\n        taskDiv.appendChild(taskTitle);\r\n\r\n        // Create task description\r\n        const taskDescription = document.createElement('p');\r\n        taskDescription.textContent = `Description: ${task.description}`;\r\n        taskDiv.appendChild(taskDescription);\r\n\r\n        // Create task due date\r\n        const taskDueDate = document.createElement('p');\r\n        taskDueDate.textContent = `Due Date: ${task.dueDate}`;\r\n        taskDiv.appendChild(taskDueDate);\r\n\r\n        // Create task priority\r\n        const taskPriority = document.createElement('p');\r\n        taskPriority.textContent = `Priority: ${task.priority}`;\r\n        taskDiv.appendChild(taskPriority);\r\n\r\n        const editBtn = document.createElement('button')\r\n        editBtn.classList.add('edit-btn')\r\n        editBtn.textContent = \"Edit\"\r\n        taskDiv.appendChild(editBtn)\r\n\r\n        const deleteBtn = document.createElement('button')\r\n        deleteBtn.classList.add('delete-btn')\r\n        deleteBtn.textContent = \"Detelte\"\r\n        taskDiv.appendChild(deleteBtn)\r\n\r\n        // Append the taskDiv to the main container\r\n        mainContainer.appendChild(taskDiv);\r\n    });\r\n}\r\n\r\n\r\ndocument.querySelector('.today-tasks-tab').addEventListener(\"click\",() => {\r\n    // Step 1: Get today's date\r\n    const today = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD\r\n\r\n    // Step 2: Find tasks that are due today\r\n    let todayTasks = [];\r\n    \r\n    projects.forEach(project => {\r\n        project.tasks.forEach(task => {\r\n            if (task.dueDate === today) {\r\n                todayTasks.push(task);\r\n            }\r\n        });\r\n    });\r\n\r\n    // Step 3: Clear the main container (assuming you want to replace the current content)\r\n    const mainContainer = document.querySelector('.main');\r\n    mainContainer.innerHTML = ''; // Clear previous content\r\n\r\n    // Step 4: Render the tasks that are due today\r\n   if (todayTasks.length > 0) {\r\n    todayTasks.forEach((task, taskIndex) => {\r\n        const taskElement = document.createElement('div');\r\n        taskElement.classList.add('task');\r\n        taskElement.innerHTML = `\r\n            <h3>${task.title}</h3>\r\n            <p>${task.description}</p>\r\n            <p>Due: ${task.dueDate}</p>\r\n            <p>Priority: ${task.priority}</p>\r\n            <button class=\"edit-btn\">Edit</button>\r\n            <button class=\"delete-btn\">Delete</button>\r\n        `;\r\n        mainContainer.appendChild(taskElement);\r\n\r\n        // Edit button functionality\r\n        const editBtn = taskElement.querySelector('.edit-btn');\r\n        editBtn.addEventListener('click', () => {\r\n            // Prompt the user to edit the task details\r\n            const newTitle = prompt(\"Edit task title:\", task.title);\r\n            const newDescription = prompt(\"Edit task description:\", task.description);\r\n            const newDueDate = prompt(\"Edit task due date (YYYY-MM-DD):\", task.dueDate);\r\n            const newPriority = prompt(\"Edit task priority:\", task.priority);\r\n\r\n            // Update the task with new values if they are provided\r\n            if (newTitle) task.title = newTitle;\r\n            if (newDescription) task.description = newDescription;\r\n            if (newDueDate) task.dueDate = newDueDate;\r\n            if (newPriority) task.priority = newPriority;\r\n\r\n            // Save the updated projects array to local storage\r\n            _module_storage_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].saveProjects(projects);\r\n\r\n            // Re-render tasks to reflect the changes\r\n            renderTasks(todayTasks);\r\n        });\r\n\r\n        // Delete button functionality\r\n        const deleteBtn = taskElement.querySelector('.delete-btn');\r\n        deleteBtn.addEventListener('click', () => {\r\n            // Find the project that contains this task\r\n            const project = projects.find(proj => proj.tasks.includes(task));\r\n\r\n            if (project) {\r\n                // Remove the task from the project\r\n                project.tasks.splice(taskIndex, 1);\r\n\r\n                // Save the updated projects array to local storage\r\n                _module_storage_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].saveProjects(projects);\r\n\r\n                // Re-render tasks to reflect the changes\r\n                renderTasks(todayTasks);\r\n            }\r\n        });\r\n    });\r\n} else {\r\n    const noTasksMessage = document.createElement('p');\r\n    noTasksMessage.textContent = 'No tasks are due today!';\r\n    mainContainer.appendChild(noTasksMessage);\r\n}\r\n\r\n    } \r\n);\r\n\r\n// Helper function to check if a task is due this week\r\nfunction isTaskDueThisWeek(dueDate) {\r\n    const currentDate = new Date();\r\n    const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));\r\n    const endOfWeek = new Date(currentDate.setDate(currentDate.getDate() + 6));\r\n\r\n    return new Date(dueDate) >= startOfWeek && new Date(dueDate) <= endOfWeek;\r\n}\r\n\r\n// Event listener for the \"This Week\" tab\r\ndocument.querySelector('.week-tasks-tab').addEventListener(\"click\", () => {\r\n    const tasksThisWeek = [];\r\n\r\n    projects.forEach(project => {\r\n        project.tasks.forEach(task => {\r\n            if (isTaskDueThisWeek(task.dueDate)) {\r\n                tasksThisWeek.push(task);\r\n            }\r\n        });\r\n    });\r\n\r\n    // Render the filtered tasks for this week in the main container\r\n    renderTasks(tasksThisWeek);\r\n});\r\n\r\n// Event listener for the \"All Tasks\" tab\r\ndocument.querySelector('.all-taks-tab').addEventListener(\"click\", () => {\r\n    const allTasks = [];\r\n\r\n    projects.forEach(project => {\r\n        allTasks.push(...project.tasks);\r\n    });\r\n\r\n    // Render all tasks in the main container\r\n    renderTasks(allTasks);\r\n});\r\n\r\n\r\nconst submitTaskBtn = document.querySelector('.add-task-btn');\r\nsubmitTaskBtn.addEventListener(\"click\", () => {\r\n    const title = document.querySelector('#title').value;\r\n    const description = document.querySelector('#description').value;\r\n    const dueDate = document.querySelector('input[type=\"date\"]').value;\r\n    const priority = document.querySelector('#priority').value;\r\n    const projectId = document.querySelector('#project-select').value;\r\n\r\n    const newTask = (0,_module_taskHandler_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({ id: Date.now(), title, description, dueDate, priority, projectId });\r\n\r\n    // Find the project and add the task to it\r\n    const project = projects.find(proj => proj.id == projectId);\r\n    if (project) {\r\n        project.addTaskToProject(newTask); // Add task to the project\r\n\r\n        // Save the updated projects array to local storage\r\n        _module_storage_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].saveProjects(projects);\r\n\r\n        console.log('New task added to project:', newTask);\r\n\r\n        // Optionally, update the UI after adding the task\r\n        renderTasks(project.tasks); \r\n    } else {\r\n        console.error(`Project with ID ${projectId} not found`);\r\n    }\r\n});\r\n\r\n\r\nconst addProjectBtn = document.querySelector('.add-project-btn')\r\naddProjectBtn.addEventListener(\"click\", () => {\r\n    const projectTitle = document.querySelector('#project-name').value;\r\n    const newProject = (0,_module_projectHandler_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({ title: projectTitle, id: Date.now() });\r\n    \r\n    projects.push(newProject);\r\n    addProjectInSelector();\r\n    addProjectInContainer();\r\n\r\n    // Save the updated projects array to local storage\r\n    _module_storage_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].saveProjects(projects);\r\n});\r\n\r\n\r\nfunction addProjectInSelector() {\r\n    let select = document.querySelector('.add-task__projects');\r\n    select.innerHTML = '';\r\n\r\n    for (let i = 0; i < projects.length; i++) {\r\n        let newProjectOption = document.createElement('option');\r\n        newProjectOption.value = projects[i].id;  \r\n        newProjectOption.textContent = projects[i].title;  \r\n        console.log(newProjectOption.value)\r\n        select.appendChild(newProjectOption);\r\n        console.log(newProjectOption.textContent)\r\n    }\r\n}\r\nfunction addProjectInContainer() {\r\n    let projectContainer = document.querySelector('.projects');\r\n    projectContainer.innerHTML = '';\r\n\r\n    projects.forEach((project, index) => {\r\n        let projectDiv = document.createElement('div');\r\n        projectContainer.appendChild(projectDiv);\r\n        projectDiv.classList.add('project');\r\n\r\n        let projectH4 = document.createElement('h4');\r\n        projectH4.textContent = project.title;\r\n        projectDiv.appendChild(projectH4);\r\n\r\n        let projectIcon = document.createElement('i');\r\n        projectIcon.classList.add('fa-solid', 'fa-trash');\r\n        projectDiv.appendChild(projectIcon);\r\n\r\n        // Add event listener to each project div\r\n        projectDiv.addEventListener('click', () => {\r\n            renderTasks(project.tasks);  // Render tasks for the clicked project\r\n        });\r\n\r\n        // Add event listener to the trash icon\r\n        projectIcon.addEventListener('click', (event) => {\r\n            event.stopPropagation(); // Prevent the click from triggering the projectDiv click event\r\n            \r\n            // Confirm deletion\r\n            if (confirm(`Are you sure you want to delete the project \"${project.title}\"?`)) {\r\n                // Remove the project from the array\r\n                projects.splice(index, 1);\r\n                \r\n                // Save the updated projects array to local storage\r\n                _module_storage_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].saveProjects(projects);\r\n\r\n                // Update the UI\r\n                addProjectInSelector();\r\n                addProjectInContainer();\r\n            }\r\n        });\r\n    });\r\n}\r\n\r\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/module/dom.js":
/*!***************************!*\
  !*** ./src/module/dom.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction dom() {\r\ndocument.querySelector(\".add-task-tab\").addEventListener(\"click\",() => {\r\n    let addTaskForm = document.querySelector('.add-new-task-form')\r\n    addTaskForm.style.display = \"block\"\r\n})\r\ndocument.querySelector(\".task-form-cancle\").addEventListener(\"click\",() => {\r\n    let addTaskForm = document.querySelector('.add-new-task-form')\r\n    addTaskForm.style.display = \"none\"\r\n})\r\ndocument.querySelector(\".add-new-project\").addEventListener(\"click\",() => {\r\n    let addProjectForm = document.querySelector('.add-project-form')\r\n    addProjectForm.style.display = \"block\"\r\n})\r\ndocument.querySelector(\".project-form-cancle\").addEventListener(\"click\",() => {\r\n    let addProjectForm = document.querySelector('.add-project-form')\r\n    addProjectForm.style.display = \"none\"\r\n})\r\n\r\ndocument.querySelector('.add-task-btn').addEventListener(\"click\",() => {\r\n    let addTaskForm = document.querySelector('.add-new-task-form')\r\n    addTaskForm.style.display = \"none\"\r\n})\r\n\r\ndocument.querySelector('.add-project-btn').addEventListener(\"click\",() => {\r\n    let addProjectForm = document.querySelector('.add-project-form')\r\n    addProjectForm.style.display = \"none\"\r\n})\r\n\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);\n\n//# sourceURL=webpack://todo-list/./src/module/dom.js?");

/***/ }),

/***/ "./src/module/project.js":
/*!*******************************!*\
  !*** ./src/module/project.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Project {\r\n  constructor(title, id) {\r\n    this.title = title;\r\n    this.id = id;\r\n    this.tasks = [];\r\n  }\r\n\r\n  addTaskToProject(task) {\r\n    this.tasks.push(task);\r\n  }\r\n\r\n  removeTask(taskId) {\r\n    this.tasks = this.tasks.filter(task => task.id !== taskId);\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);\r\n\n\n//# sourceURL=webpack://todo-list/./src/module/project.js?");

/***/ }),

/***/ "./src/module/projectHandler.js":
/*!**************************************!*\
  !*** ./src/module/projectHandler.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project.js */ \"./src/module/project.js\");\n/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task.js */ \"./src/module/task.js\");\n\r\n\r\nfunction createProject(projectData) {\r\n  return new _project_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](projectData.title, projectData.id);\r\n}\r\n\r\nfunction deleteProject(projects, projectId) {\r\n  return projects.filter(project => project.id !== projectId);\r\n}\r\n\r\nfunction addTaskToProject(Task) {\r\n\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createProject);\r\n\n\n//# sourceURL=webpack://todo-list/./src/module/projectHandler.js?");

/***/ }),

/***/ "./src/module/storage.js":
/*!*******************************!*\
  !*** ./src/module/storage.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Storage = {\r\n  saveProjects(projects) {\r\n    localStorage.setItem('projects', JSON.stringify(projects));\r\n  },\r\n\r\n  getProjects() {\r\n    const projects = localStorage.getItem('projects');\r\n    return projects ? JSON.parse(projects) : [];\r\n  }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Storage);\r\n\n\n//# sourceURL=webpack://todo-list/./src/module/storage.js?");

/***/ }),

/***/ "./src/module/task.js":
/*!****************************!*\
  !*** ./src/module/task.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Task {\r\n  constructor(id, title, description, dueDate, priority, projectId) {\r\n    this.id = id;\r\n    this.title = title;\r\n    this.description = description;\r\n    this.dueDate = dueDate;\r\n    this.priority = priority;\r\n    this.projectId = projectId;\r\n    this.completed = false;\r\n  }\r\n\r\n  toggleComplete() {\r\n    this.completed = !this.completed;\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Task);\r\n\n\n//# sourceURL=webpack://todo-list/./src/module/task.js?");

/***/ }),

/***/ "./src/module/taskHandler.js":
/*!***********************************!*\
  !*** ./src/module/taskHandler.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task.js */ \"./src/module/task.js\");\n\r\n\r\nfunction createTask(taskData) {\r\n  return new _task_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\r\n    taskData.id,\r\n    taskData.title,\r\n    taskData.description,\r\n    taskData.dueDate,\r\n    taskData.priority,\r\n    taskData.projectId\r\n  );\r\n}\r\n\r\nfunction deleteTask(tasks, taskId) {\r\n  return tasks.filter(task => task.id !== taskId);\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createTask);\r\n\n\n//# sourceURL=webpack://todo-list/./src/module/taskHandler.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;