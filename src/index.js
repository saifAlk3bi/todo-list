import createTask from './module/taskHandler.js'
import createProject from './module/projectHandler.js'
import Task from './module/task'
import dom from './module/dom'
import Project from './module/project.js';
import Storage from './module/storage.js';

let projects = Storage.getProjects();

projects = projects.map(projectData => { //the projects array is reassigned to a new array
    // where each project is now an instance of the Project class instead of just a plain object.
    const project = new Project(projectData.title, projectData.id);
    project.tasks = projectData.tasks || []; 
    return project;
});

dom()
addProjectInSelector()
addProjectInContainer()
defultProject()

function defultProject() {
    if(projects.length == 0) {
    const projectTitle = "Defult"
    const newProject = createProject({ title: projectTitle, id: Date.now() });
    
    projects.push(newProject);
    addProjectInSelector();
    addProjectInContainer();


    Storage.saveProjects(projects);
    }
}

function renderTasks(tasks) {
    const mainContainer = document.querySelector('.main');
    mainContainer.innerHTML = ''; 

    if (tasks.length === 0) {
        mainContainer.innerHTML = '<p>No tasks to display.</p>';
        return;
    }

    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        mainContainer.appendChild(taskDiv);

        if (task.priority == 1) {
            taskDiv.style.boxShadow = '10px 5px 5px green';
        } else if (task.priority == 2) {
            taskDiv.style.boxShadow = '10px 5px 5px yellow';
        } else if (task.priority == 3) {
            taskDiv.style.boxShadow = '10px 5px 5px red';
        }

        const contentDiv = document.createElement('div');
        contentDiv.classList.add("content");
        taskDiv.appendChild(contentDiv);

        const leftContentDiv = document.createElement('div');
        leftContentDiv.classList.add("left-content");
        contentDiv.appendChild(leftContentDiv);

        const checkBox = document.createElement('input');
        checkBox.type = "checkbox";
        checkBox.classList.add("check-box");
        leftContentDiv.appendChild(checkBox);

        checkBox.addEventListener('click', () => {
            const project = projects.find(proj => proj.id == task.projectId);
            if (project) {
                project.tasks = project.tasks.filter(t => t.id !== task.id);
                Storage.saveProjects(projects);
                renderTasks(project.tasks);
            }
        });

        const dueDate = document.createElement("p");
        dueDate.classList.add("due-date");
        dueDate.textContent = task.dueDate;
        leftContentDiv.appendChild(dueDate);

        const titleDiv = document.createElement('div');
        titleDiv.classList.add("title");
        contentDiv.appendChild(titleDiv);

        const title = document.createElement("h4");
        title.textContent = task.title;
        titleDiv.appendChild(title);

        const description = document.createElement("p");
        description.textContent = task.description;
        titleDiv.appendChild(description);

        const btnDiv = document.createElement('div');
        btnDiv.classList.add("btn");
        taskDiv.appendChild(btnDiv);

        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.textContent = "Edit";
        btnDiv.appendChild(editBtn);

        editBtn.addEventListener('click', () => {
            document.querySelector('#edit-title').value = task.title;
            document.querySelector('#edit-description').value = task.description;
            document.querySelector('#edit-date').value = task.dueDate;
            document.querySelector('#edit-priority').value = task.priority;

            document.querySelector('.edit-form').style.display = 'block';

            document.querySelector('.save-edit-btn').onclick = () => {
                task.title = document.querySelector('#edit-title').value;
                task.description = document.querySelector('#edit-description').value;
                task.dueDate = document.querySelector('#edit-date').value;
                task.priority = document.querySelector('#edit-priority').value;

                Storage.saveProjects(projects);

                renderTasks(tasks);

                document.querySelector('.edit-form').style.display = 'none';
            };
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = "Delete";
        btnDiv.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', () => {
            const project = projects.find(proj => proj.id == task.projectId);
            if (project) {
                project.tasks = project.tasks.filter(t => t.id !== task.id);
                Storage.saveProjects(projects);
                renderTasks(project.tasks);
            }
        });
    });
}

function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0]; 
}

function isWithinCurrentWeek(date) {
    const today = new Date();
    const currentDay = today.getDay();
    const startOfWeek = new Date(today.setDate(today.getDate() - currentDay));
    const endOfWeek = new Date(today.setDate(today.getDate() + 6));

    const taskDate = new Date(date);

    return taskDate >= startOfWeek && taskDate <= endOfWeek;
}

document.querySelector('.today-tasks-tab').addEventListener("click", () => {
    const todayTasks = [];

    projects.forEach(project => {
        todayTasks.push(...project.tasks.filter(task => task.dueDate === getTodayDate()));
    });

    renderTasks(todayTasks);
});

document.querySelector('.week-tasks-tab').addEventListener("click", () => {
    const weekTasks = [];

    projects.forEach(project => {
        weekTasks.push(...project.tasks.filter(task => isWithinCurrentWeek(task.dueDate)));
    });

    renderTasks(weekTasks);
});

document.querySelector('.all-taks-tab').addEventListener("click", () => {
    const allTasks = [];

    projects.forEach(project => {
        allTasks.push(...project.tasks);
        console.log(allTasks)
    });

    renderTasks(allTasks);
});


const submitTaskBtn = document.querySelector('.add-task-btn');
submitTaskBtn.addEventListener("click", () => {
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const dueDate = document.querySelector('#date').value;
    const priority = document.querySelector('#priority').value;
    const projectId = document.querySelector('#project-select').value;

    const newTask = createTask({ id: Date.now(), title, description, dueDate, priority, projectId });

    const project = projects.find(proj => proj.id == projectId);
    if (project) {
        project.addTaskToProject(newTask); 

        Storage.saveProjects(projects);

        console.log('New task added to project:', newTask);


        renderTasks(project.tasks); 
    } else {
        console.error(`Project with ID ${projectId} not found`);
    }
});


const addProjectBtn = document.querySelector('.add-project-btn')
addProjectBtn.addEventListener("click", () => {
    const projectTitle = document.querySelector('#project-name').value;
    const newProject = createProject({ title: projectTitle, id: Date.now() });
    
    projects.push(newProject);
    addProjectInSelector();
    addProjectInContainer();


    Storage.saveProjects(projects);
});


function addProjectInSelector() {
    let select = document.querySelector('.add-task__projects');
    select.innerHTML = '';

    for (let i = 0; i < projects.length; i++) {
        let newProjectOption = document.createElement('option');
        newProjectOption.value = projects[i].id;  
        newProjectOption.textContent = projects[i].title;  
        console.log(newProjectOption.value)
        select.appendChild(newProjectOption);
        console.log(newProjectOption.textContent)
    }
}
function addProjectInContainer() {
    let projectContainer = document.querySelector('.projects');
    projectContainer.innerHTML = '';

    projects.forEach((project, index) => {
        let projectDiv = document.createElement('div');
        projectContainer.appendChild(projectDiv);
        projectDiv.classList.add('project');

        let projectH4 = document.createElement('h4');
        projectH4.textContent = project.title;
        projectDiv.appendChild(projectH4);

        let projectIcon = document.createElement('i');
        projectIcon.classList.add('fa-solid', 'fa-trash');
        projectDiv.appendChild(projectIcon);


        projectDiv.addEventListener('click', () => {
            renderTasks(project.tasks);  
        });

        projectIcon.addEventListener('click', (event) => {
            event.stopPropagation(); 
        
            if (confirm(`Are you sure you want to delete the project "${project.title}"?`)) {
                projects.splice(index, 1);
                
                Storage.saveProjects(projects);

                addProjectInSelector();
                addProjectInContainer();
            }
        });
    });
}

