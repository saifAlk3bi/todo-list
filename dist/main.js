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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _module_taskHandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module/taskHandler.js */ \"./src/module/taskHandler.js\");\n/* harmony import */ var _module_projectHandler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module/projectHandler.js */ \"./src/module/projectHandler.js\");\n/* harmony import */ var _module_task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module/task */ \"./src/module/task.js\");\n/* harmony import */ var _module_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./module/dom */ \"./src/module/dom.js\");\n/* harmony import */ var _module_project_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./module/project.js */ \"./src/module/project.js\");\n/* harmony import */ var _module_storage_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./module/storage.js */ \"./src/module/storage.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nlet projects = _module_storage_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getProjects();\r\n\r\nprojects = projects.map(projectData => { //the projects array is reassigned to a new array\r\n    // where each project is now an instance of the Project class instead of just a plain object.\r\n    const project = new _module_project_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](projectData.title, projectData.id);\r\n    project.tasks = projectData.tasks || []; \r\n    return project;\r\n});\r\n\r\n(0,_module_dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"])()\r\naddProjectInSelector()\r\naddProjectInContainer()\r\ndefultProject()\r\n\r\nfunction defultProject() {\r\n    if(projects.length == 0) {\r\n    const projectTitle = \"Defult\"\r\n    const newProject = (0,_module_projectHandler_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({ title: projectTitle, id: Date.now() });\r\n    \r\n    projects.push(newProject);\r\n    addProjectInSelector();\r\n    addProjectInContainer();\r\n\r\n\r\n    _module_storage_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].saveProjects(projects);\r\n    }\r\n}\r\n\r\nfunction renderTasks(tasks) {\r\n    const mainContainer = document.querySelector('.main');\r\n    mainContainer.innerHTML = ''; \r\n\r\n    if (tasks.length === 0) {\r\n        mainContainer.innerHTML = '<p>No tasks to display.</p>';\r\n        return;\r\n    }\r\n\r\n    tasks.forEach(task => {\r\n        const taskDiv = document.createElement('div');\r\n        taskDiv.classList.add('task');\r\n        mainContainer.appendChild(taskDiv);\r\n\r\n        if (task.priority == 1) {\r\n            taskDiv.style.boxShadow = '10px 5px 5px green';\r\n        } else if (task.priority == 2) {\r\n            taskDiv.style.boxShadow = '10px 5px 5px yellow';\r\n        } else if (task.priority == 3) {\r\n            taskDiv.style.boxShadow = '10px 5px 5px red';\r\n        }\r\n\r\n        const contentDiv = document.createElement('div');\r\n        contentDiv.classList.add(\"content\");\r\n        taskDiv.appendChild(contentDiv);\r\n\r\n        const leftContentDiv = document.createElement('div');\r\n        leftContentDiv.classList.add(\"left-content\");\r\n        contentDiv.appendChild(leftContentDiv);\r\n\r\n        const checkBox = document.createElement('input');\r\n        checkBox.type = \"checkbox\";\r\n        checkBox.classList.add(\"check-box\");\r\n        leftContentDiv.appendChild(checkBox);\r\n\r\n        checkBox.addEventListener('click', () => {\r\n            const project = projects.find(proj => proj.id == task.projectId);\r\n            if (project) {\r\n                project.tasks = project.tasks.filter(t => t.id !== task.id);\r\n                _module_storage_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].saveProjects(projects);\r\n                renderTasks(project.tasks);\r\n            }\r\n        });\r\n\r\n        const dueDate = document.createElement(\"p\");\r\n        dueDate.classList.add(\"due-date\");\r\n        dueDate.textContent = task.dueDate;\r\n        leftContentDiv.appendChild(dueDate);\r\n\r\n        const titleDiv = document.createElement('div');\r\n        titleDiv.classList.add(\"title\");\r\n        contentDiv.appendChild(titleDiv);\r\n\r\n        const title = document.createElement(\"h4\");\r\n        title.textContent = task.title;\r\n        titleDiv.appendChild(title);\r\n\r\n        const description = document.createElement(\"p\");\r\n        description.textContent = task.description;\r\n        titleDiv.appendChild(description);\r\n\r\n        const btnDiv = document.createElement('div');\r\n        btnDiv.classList.add(\"btn\");\r\n        taskDiv.appendChild(btnDiv);\r\n\r\n        const editBtn = document.createElement('button');\r\n        editBtn.classList.add('edit-btn');\r\n        editBtn.textContent = \"Edit\";\r\n        btnDiv.appendChild(editBtn);\r\n\r\n        editBtn.addEventListener('click', () => {\r\n            document.querySelector('#edit-title').value = task.title;\r\n            document.querySelector('#edit-description').value = task.description;\r\n            document.querySelector('#edit-date').value = task.dueDate;\r\n            document.querySelector('#edit-priority').value = task.priority;\r\n\r\n            document.querySelector('.edit-form').style.display = 'block';\r\n\r\n            document.querySelector('.save-edit-btn').onclick = () => {\r\n                task.title = document.querySelector('#edit-title').value;\r\n                task.description = document.querySelector('#edit-description').value;\r\n                task.dueDate = document.querySelector('#edit-date').value;\r\n                task.priority = document.querySelector('#edit-priority').value;\r\n\r\n                _module_storage_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].saveProjects(projects);\r\n\r\n                renderTasks(tasks);\r\n\r\n                document.querySelector('.edit-form').style.display = 'none';\r\n            };\r\n        });\r\n\r\n        const deleteBtn = document.createElement('button');\r\n        deleteBtn.classList.add('delete-btn');\r\n        deleteBtn.textContent = \"Delete\";\r\n        btnDiv.appendChild(deleteBtn);\r\n\r\n        deleteBtn.addEventListener('click', () => {\r\n            const project = projects.find(proj => proj.id == task.projectId);\r\n            if (project) {\r\n                project.tasks = project.tasks.filter(t => t.id !== task.id);\r\n                _module_storage_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].saveProjects(projects);\r\n                renderTasks(project.tasks);\r\n            }\r\n        });\r\n    });\r\n}\r\n\r\nfunction getTodayDate() {\r\n    const today = new Date();\r\n    return today.toISOString().split('T')[0]; \r\n}\r\n\r\nfunction isWithinCurrentWeek(date) {\r\n    const today = new Date();\r\n    const currentDay = today.getDay();\r\n    const startOfWeek = new Date(today.setDate(today.getDate() - currentDay));\r\n    const endOfWeek = new Date(today.setDate(today.getDate() + 6));\r\n\r\n    const taskDate = new Date(date);\r\n\r\n    return taskDate >= startOfWeek && taskDate <= endOfWeek;\r\n}\r\n\r\ndocument.querySelector('.today-tasks-tab').addEventListener(\"click\", () => {\r\n    const todayTasks = [];\r\n\r\n    projects.forEach(project => {\r\n        todayTasks.push(...project.tasks.filter(task => task.dueDate === getTodayDate()));\r\n    });\r\n\r\n    renderTasks(todayTasks);\r\n});\r\n\r\ndocument.querySelector('.week-tasks-tab').addEventListener(\"click\", () => {\r\n    const weekTasks = [];\r\n\r\n    projects.forEach(project => {\r\n        weekTasks.push(...project.tasks.filter(task => isWithinCurrentWeek(task.dueDate)));\r\n    });\r\n\r\n    renderTasks(weekTasks);\r\n});\r\n\r\ndocument.querySelector('.all-taks-tab').addEventListener(\"click\", () => {\r\n    const allTasks = [];\r\n\r\n    projects.forEach(project => {\r\n        allTasks.push(...project.tasks);\r\n        console.log(allTasks)\r\n    });\r\n\r\n    renderTasks(allTasks);\r\n});\r\n\r\n\r\nconst submitTaskBtn = document.querySelector('.add-task-btn');\r\nsubmitTaskBtn.addEventListener(\"click\", () => {\r\n    const title = document.querySelector('#title').value;\r\n    const description = document.querySelector('#description').value;\r\n    const dueDate = document.querySelector('#date').value;\r\n    const priority = document.querySelector('#priority').value;\r\n    const projectId = document.querySelector('#project-select').value;\r\n\r\n    const newTask = (0,_module_taskHandler_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({ id: Date.now(), title, description, dueDate, priority, projectId });\r\n\r\n    const project = projects.find(proj => proj.id == projectId);\r\n    if (project) {\r\n        project.addTaskToProject(newTask); \r\n\r\n        _module_storage_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].saveProjects(projects);\r\n\r\n        console.log('New task added to project:', newTask);\r\n\r\n\r\n        renderTasks(project.tasks); \r\n    } else {\r\n        console.error(`Project with ID ${projectId} not found`);\r\n    }\r\n});\r\n\r\n\r\nconst addProjectBtn = document.querySelector('.add-project-btn')\r\naddProjectBtn.addEventListener(\"click\", () => {\r\n    const projectTitle = document.querySelector('#project-name').value;\r\n    const newProject = (0,_module_projectHandler_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({ title: projectTitle, id: Date.now() });\r\n    \r\n    projects.push(newProject);\r\n    addProjectInSelector();\r\n    addProjectInContainer();\r\n\r\n\r\n    _module_storage_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].saveProjects(projects);\r\n});\r\n\r\n\r\nfunction addProjectInSelector() {\r\n    let select = document.querySelector('.add-task__projects');\r\n    select.innerHTML = '';\r\n\r\n    for (let i = 0; i < projects.length; i++) {\r\n        let newProjectOption = document.createElement('option');\r\n        newProjectOption.value = projects[i].id;  \r\n        newProjectOption.textContent = projects[i].title;  \r\n        console.log(newProjectOption.value)\r\n        select.appendChild(newProjectOption);\r\n        console.log(newProjectOption.textContent)\r\n    }\r\n}\r\nfunction addProjectInContainer() {\r\n    let projectContainer = document.querySelector('.projects');\r\n    projectContainer.innerHTML = '';\r\n\r\n    projects.forEach((project, index) => {\r\n        let projectDiv = document.createElement('div');\r\n        projectContainer.appendChild(projectDiv);\r\n        projectDiv.classList.add('project');\r\n\r\n        let projectH4 = document.createElement('h4');\r\n        projectH4.textContent = project.title;\r\n        projectDiv.appendChild(projectH4);\r\n\r\n        let projectIcon = document.createElement('i');\r\n        projectIcon.classList.add('fa-solid', 'fa-trash');\r\n        projectDiv.appendChild(projectIcon);\r\n\r\n\r\n        projectDiv.addEventListener('click', () => {\r\n            renderTasks(project.tasks);  \r\n        });\r\n\r\n        projectIcon.addEventListener('click', (event) => {\r\n            event.stopPropagation(); \r\n        \r\n            if (confirm(`Are you sure you want to delete the project \"${project.title}\"?`)) {\r\n                projects.splice(index, 1);\r\n                \r\n                _module_storage_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].saveProjects(projects);\r\n\r\n                addProjectInSelector();\r\n                addProjectInContainer();\r\n            }\r\n        });\r\n    });\r\n}\r\n\r\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/module/dom.js":
/*!***************************!*\
  !*** ./src/module/dom.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction dom() {\r\ndocument.querySelector(\".add-task-tab\").addEventListener(\"click\",() => {\r\n    let addTaskForm = document.querySelector('.add-new-task-form')\r\n    addTaskForm.style.display = \"block\"\r\n})\r\ndocument.querySelector(\".task-form-cancle\").addEventListener(\"click\",() => {\r\n    let addTaskForm = document.querySelector('.add-new-task-form')\r\n    addTaskForm.style.display = \"none\"\r\n    let editForm = document.querySelector('.edit-form')\r\n    editForm.style.display = \"none\"\r\n})\r\ndocument.querySelector(\".add-new-project\").addEventListener(\"click\",() => {\r\n    let addProjectForm = document.querySelector('.add-project-form')\r\n    addProjectForm.style.display = \"block\"\r\n})\r\ndocument.querySelector(\".project-form-cancle\").addEventListener(\"click\",() => {\r\n    let addProjectForm = document.querySelector('.add-project-form')\r\n    addProjectForm.style.display = \"none\"\r\n})\r\n\r\ndocument.querySelector('.add-task-btn').addEventListener(\"click\",() => {\r\n    let addTaskForm = document.querySelector('.add-new-task-form')\r\n    addTaskForm.style.display = \"none\"\r\n})\r\n\r\ndocument.querySelector('.add-project-btn').addEventListener(\"click\",() => {\r\n    let addProjectForm = document.querySelector('.add-project-form')\r\n    addProjectForm.style.display = \"none\"\r\n\r\n})\r\ndocument.querySelector('.task-edit-cancle').addEventListener(\"click\",() => {\r\n    let taskEditTask = document.querySelector('.edit-form')\r\n    taskEditTask.style.display = \"none\"\r\n})\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);\n\n//# sourceURL=webpack://todo-list/./src/module/dom.js?");

/***/ }),

/***/ "./src/module/project.js":
/*!*******************************!*\
  !*** ./src/module/project.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Project {\r\n  constructor(title, id) {\r\n    this.title = title;\r\n    this.id = id;\r\n    this.tasks = [];\r\n  }\r\n\r\n  addTaskToProject(task) {\r\n    this.tasks.push(task);\r\n  }\r\n\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);\r\n\n\n//# sourceURL=webpack://todo-list/./src/module/project.js?");

/***/ }),

/***/ "./src/module/projectHandler.js":
/*!**************************************!*\
  !*** ./src/module/projectHandler.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project.js */ \"./src/module/project.js\");\n\r\nfunction createProject(projectData) {\r\n  return new _project_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](projectData.title, projectData.id);\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createProject);\r\n\n\n//# sourceURL=webpack://todo-list/./src/module/projectHandler.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task.js */ \"./src/module/task.js\");\n\r\n\r\nfunction createTask(taskData) {\r\n  return new _task_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\r\n    taskData.id,\r\n    taskData.title,\r\n    taskData.description,\r\n    taskData.dueDate,\r\n    taskData.priority,\r\n    taskData.projectId\r\n  );\r\n}\r\n\r\nfunction deleteTask(tasks, taskId) {\r\n  return tasks.filter(task => task.id !== taskId);\r\n  document.q\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createTask);\r\n\n\n//# sourceURL=webpack://todo-list/./src/module/taskHandler.js?");

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