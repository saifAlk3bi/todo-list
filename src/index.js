import createTask from './module/taskHandler.js'
import createProject from './module/projectHandler.js'
import Task from './module/task'
import dom from './module/dom'
import Project from './module/project.js';
import Storage from './module/storage.js';

let projects = Storage.getProjects();

projects = projects.map(projectData => { //he projects array is reassigned to a new array
    // where each project is now an instance of the Project class instead of just a plain object.
    const project = new Project(projectData.title, projectData.id);
    project.tasks = projectData.tasks || []; 
    return project;
});

dom()
addProjectInSelector()
addProjectInContainer()

function renderTasks(tasks) {
    const mainContainer = document.querySelector('.main');
    mainContainer.innerHTML = ''; // Clear the main container before rendering

    if (tasks.length === 0) {
        mainContainer.innerHTML = '<p>No tasks to display.</p>';
        return;
    }

    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        // Create task title
        const taskTitle = document.createElement('h4');
        taskTitle.textContent = task.title;
        taskDiv.appendChild(taskTitle);

        // Create task description
        const taskDescription = document.createElement('p');
        taskDescription.textContent = `Description: ${task.description}`;
        taskDiv.appendChild(taskDescription);

        // Create task due date
        const taskDueDate = document.createElement('p');
        taskDueDate.textContent = `Due Date: ${task.dueDate}`;
        taskDiv.appendChild(taskDueDate);

        // Create task priority
        const taskPriority = document.createElement('p');
        taskPriority.textContent = `Priority: ${task.priority}`;
        taskDiv.appendChild(taskPriority);

        const editBtn = document.createElement('button')
        editBtn.classList.add('edit-btn')
        editBtn.textContent = "Edit"
        taskDiv.appendChild(editBtn)

        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete-btn')
        deleteBtn.textContent = "Detelte"
        taskDiv.appendChild(deleteBtn)

        // Append the taskDiv to the main container
        mainContainer.appendChild(taskDiv);
    });
}


document.querySelector('.today-tasks-tab').addEventListener("click",() => {
    // Step 1: Get today's date
    const today = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD

    // Step 2: Find tasks that are due today
    let todayTasks = [];
    
    projects.forEach(project => {
        project.tasks.forEach(task => {
            if (task.dueDate === today) {
                todayTasks.push(task);
            }
        });
    });

    // Step 3: Clear the main container (assuming you want to replace the current content)
    const mainContainer = document.querySelector('.main');
    mainContainer.innerHTML = ''; // Clear previous content

    // Step 4: Render the tasks that are due today
   if (todayTasks.length > 0) {
    todayTasks.forEach((task, taskIndex) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Due: ${task.dueDate}</p>
            <p>Priority: ${task.priority}</p>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;
        mainContainer.appendChild(taskElement);

        // Edit button functionality
        const editBtn = taskElement.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => {
            // Prompt the user to edit the task details
            const newTitle = prompt("Edit task title:", task.title);
            const newDescription = prompt("Edit task description:", task.description);
            const newDueDate = prompt("Edit task due date (YYYY-MM-DD):", task.dueDate);
            const newPriority = prompt("Edit task priority:", task.priority);

            // Update the task with new values if they are provided
            if (newTitle) task.title = newTitle;
            if (newDescription) task.description = newDescription;
            if (newDueDate) task.dueDate = newDueDate;
            if (newPriority) task.priority = newPriority;

            // Save the updated projects array to local storage
            Storage.saveProjects(projects);

            // Re-render tasks to reflect the changes
            renderTasks(todayTasks);
        });

        // Delete button functionality
        const deleteBtn = taskElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            // Find the project that contains this task
            const project = projects.find(proj => proj.tasks.includes(task));

            if (project) {
                // Remove the task from the project
                project.tasks.splice(taskIndex, 1);

                // Save the updated projects array to local storage
                Storage.saveProjects(projects);

                // Re-render tasks to reflect the changes
                renderTasks(todayTasks);
            }
        });
    });
} else {
    const noTasksMessage = document.createElement('p');
    noTasksMessage.textContent = 'No tasks are due today!';
    mainContainer.appendChild(noTasksMessage);
}

    } 
);

// Helper function to check if a task is due this week
function isTaskDueThisWeek(dueDate) {
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
    const endOfWeek = new Date(currentDate.setDate(currentDate.getDate() + 6));

    return new Date(dueDate) >= startOfWeek && new Date(dueDate) <= endOfWeek;
}

// Event listener for the "This Week" tab
document.querySelector('.week-tasks-tab').addEventListener("click", () => {
    const tasksThisWeek = [];

    projects.forEach(project => {
        project.tasks.forEach(task => {
            if (isTaskDueThisWeek(task.dueDate)) {
                tasksThisWeek.push(task);
            }
        });
    });

    // Render the filtered tasks for this week in the main container
    renderTasks(tasksThisWeek);
});

// Event listener for the "All Tasks" tab
document.querySelector('.all-taks-tab').addEventListener("click", () => {
    const allTasks = [];

    projects.forEach(project => {
        allTasks.push(...project.tasks);
    });

    // Render all tasks in the main container
    renderTasks(allTasks);
});


const submitTaskBtn = document.querySelector('.add-task-btn');
submitTaskBtn.addEventListener("click", () => {
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const dueDate = document.querySelector('input[type="date"]').value;
    const priority = document.querySelector('#priority').value;
    const projectId = document.querySelector('#project-select').value;

    const newTask = createTask({ id: Date.now(), title, description, dueDate, priority, projectId });

    // Find the project and add the task to it
    const project = projects.find(proj => proj.id == projectId);
    if (project) {
        project.addTaskToProject(newTask); // Add task to the project

        // Save the updated projects array to local storage
        Storage.saveProjects(projects);

        console.log('New task added to project:', newTask);

        // Optionally, update the UI after adding the task
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

    // Save the updated projects array to local storage
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

        // Add event listener to each project div
        projectDiv.addEventListener('click', () => {
            renderTasks(project.tasks);  // Render tasks for the clicked project
        });

        // Add event listener to the trash icon
        projectIcon.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the click from triggering the projectDiv click event
            
            // Confirm deletion
            if (confirm(`Are you sure you want to delete the project "${project.title}"?`)) {
                // Remove the project from the array
                projects.splice(index, 1);
                
                // Save the updated projects array to local storage
                Storage.saveProjects(projects);

                // Update the UI
                addProjectInSelector();
                addProjectInContainer();
            }
        });
    });
}

