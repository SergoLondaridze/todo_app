"use strict";

const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList=document.querySelector('#tasksList');
const emptyList=document.querySelector('#emptyList');

form.addEventListener('submit', addTask);

tasksList.addEventListener('click',deleteTask);

function addTask(event) {

    event.preventDefault();

    const taskText = taskInput.value;

    const taskHTML = `
        <li class="list-group-item d-flex justify-content-between task-item">
            <span class="task-title">${taskText}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
        </li>`;

    tasksList.insertAdjacentHTML('beforeend',taskHTML);

    if(tasksList.children.length>1){
        emptyList.classList.add('none');
    }

    taskInput.value="";
    taskInput.focus();
  
}

function deleteTask(event){
    
    if(event.target.dataset.action==='delete'){
        event.target.closest('li').remove();
 
    }

    if(tasksList.children.length===1){
        emptyList.classList.remove('none');
    }
}
