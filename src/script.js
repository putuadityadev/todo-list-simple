const inputTask = document.getElementById('input-js');
const buttonSubmit = document.getElementById('button-submit');
const listUl = document.getElementById('list-ul');

if(!localStorage.getItem('tasks')) {
    localStorage.setItem('tasks', JSON.stringify([]));
}

function loadTask() {
    listUl.innerHTML = '';

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToList(task);
    });
}

function addTaskToList(taskValue) {
    const taskList = document.createElement('li');
    taskList.className = 'flex items-center gap-3';

    taskList.innerHTML = `
        <img src="/dist/img/unchecked.png" alt="" class="h-5">
        <p>${taskValue}</p>
        <button class="delete-button ml-auto">x</button>
    `

    listUl.append(taskList);
    
    const deleteButton = taskList.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        removeTask(taskValue);
        taskList.remove();
    });

    taskList.addEventListener('click', () => {
        const paragraph = taskList.querySelector('p');
        const image = taskList.querySelector('img');

        paragraph.classList.toggle('task-completed');
        image.src = paragraph.classList.contains('task-completed')
            ? '/dist/img/checked.png'
            : '/dist/img/unchecked.png'
        
        paragraph.classList.contains('task-completed')
            ? paragraph.classList.add('line-through')
            : paragraph.classList.remove('line-through')
    })
}

function saveTask(taskValue) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskValue);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function removeTask(taskValue) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updateTask = tasks.filter(task => task !== taskValue);
    localStorage.setItem('tasks', JSON.stringify(updateTask));
}

buttonSubmit.addEventListener('click', () => {
    const taskValue = inputTask.value.trim();

    if (taskValue !== '') {
        addTaskToList(taskValue);
        saveTask(taskValue);
        inputTask.value = '';
    } else {
        inputTask.classList.add('shadow-rxl','placeholder-orange-600','placeholder-opacity-30');
        inputTask.placeholder = 'Please enter a task!'
    }
});

inputTask.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        const taskValue = inputTask.value.trim();

        if (taskValue !== '') {
            addTaskToList(taskValue);
            saveTask(taskValue);
            inputTask.value = '';
        } else {
            inputTask.classList.add('shadow-rxl','placeholder-orange-600','placeholder-opacity-30');
            inputTask.placeholder = 'Please enter a task!'
        }
    }
});

inputTask.addEventListener('input', () => {
    inputTask.classList.remove('shadow-rxl', 'placeholder-orange-600', 'placeholder-opacity-30');
    inputTask.placeholder = 'Add yur task...'; 
});


document.addEventListener('DOMContentLoaded', loadTask);