function dom() {
document.querySelector(".add-task-tab").addEventListener("click",() => {
    let addTaskForm = document.querySelector('.add-new-task-form')
    addTaskForm.style.display = "block"
})
document.querySelector(".task-form-cancle").addEventListener("click",() => {
    let addTaskForm = document.querySelector('.add-new-task-form')
    addTaskForm.style.display = "none"
})
document.querySelector(".add-new-project").addEventListener("click",() => {
    let addProjectForm = document.querySelector('.add-project-form')
    addProjectForm.style.display = "block"
})
document.querySelector(".project-form-cancle").addEventListener("click",() => {
    let addProjectForm = document.querySelector('.add-project-form')
    addProjectForm.style.display = "none"
})

document.querySelector('.add-task-btn').addEventListener("click",() => {
    let addTaskForm = document.querySelector('.add-new-task-form')
    addTaskForm.style.display = "none"
})

document.querySelector('.add-project-btn').addEventListener("click",() => {
    let addProjectForm = document.querySelector('.add-project-form')
    addProjectForm.style.display = "none"
})

}
export default dom