"use strict";

const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');
const removeDoneTasks= document.querySelector('#removeDoneTasks');



form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);
removeDoneTasks.addEventListener('click',removeDone);

let tasks = [];

if (localStorage.getItem('tasks')) {

    tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks.forEach(task => {
        renderTask(task);
    });

}



checkEmptyList();

function addTask(event) {

    event.preventDefault();

    const taskText = taskInput.value;

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    };

    tasks.push(newTask);

    renderTask(newTask);

    checkEmptyList();

    taskInput.value = "";
    taskInput.focus();

    saveToLocalStorage();
}

function deleteTask(event) {

    if (event.target.dataset.action === 'delete') {

        const parentNode = event.target.closest('li');

        const id = Number(parentNode.id);

        const index = tasks.findIndex(task => task.id === id);

        tasks.splice(index, 1);

        parentNode.remove();

        checkEmptyList();

        saveToLocalStorage();
    }

}
function doneTask(event) {

    if (event.target.dataset.action === 'done') {

        const parentNode = event.target.closest('li');

        const id = Number(parentNode.id);

        const task = tasks.find((task) => task.id === id);
        task.done = !task.done;

        const taskTitle = parentNode.querySelector('.task-title');

        taskTitle.classList.toggle('task-title--done');

        saveToLocalStorage();

    }


}

function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `
         <li id="emptyList" class="list-group-item empty-list">
             <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
             <div class="empty-list__title">To-Do list is empty</div>
          </li>
        `;
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
    } else {
        const emptyListEl = document.querySelector('#emptyList');

        if (emptyListEl) {
            emptyListEl.remove();
        }
    }
}

function saveToLocalStorage() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

function renderTask(task) {

    const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

    const taskHTML = `
        <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${task.text}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
        </li>`;

    tasksList.insertAdjacentHTML('beforeend', taskHTML);
}

function removeDone(){

    let tempArr=[...tasks];

    tempArr.forEach(task=>{

       if(task.done){
        // console.log(document.getElementById(`${task.id}`));
        document.getElementById(`${task.id}`).remove();

        const id = Number(task.id);
        const index = tasks.findIndex(task => task.id === id);
        tasks.splice(index, 1);

       }
      
    })

    saveToLocalStorage();
    checkEmptyList();
}
