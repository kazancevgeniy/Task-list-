//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners(){
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add task
  form.addEventListener('submit', addTask);
  //Remove task
  taskList.addEventListener('click', removeTask);
  //Clear task list
  clearBtn.addEventListener('click', clearTaskList);
  //Filter tasks
  filter.addEventListener('keyup', filterTasks);
}

//Get tasks
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    //create text node and append child
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
  });
}


//Add Task
function addTask(e){
  if(taskInput.value === ''){
    alert('Add a task');
  } else {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    //create text node and append child
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);

    //Store in LS
    storeTaskInLocalStorage(taskInput.value);
    //Clear input
    taskInput.value = '';

    e.preventDefault();
  }
}

//Store task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove task

function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm("Are you sure?")){
      e.target.parentElement.parentElement.remove();
      
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//Remove task from LS
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
//clear task list

function clearTaskList(){
  //taskList.innerHTML = '';
  //Faster
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  //Clear from LS
  clearTasksFromLocalStorage();
}

//Clear tasks from LS
function clearTasksFromLocalStorage(){
  localStorage.clear(); 
}

//filter tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();
  const tasksArr = document.querySelectorAll('.collection-item');
  tasksArr.forEach(function(tasksArrItem){
    const task = tasksArrItem.textContent.toLowerCase();
    if (task.indexOf(text)!= -1){
      tasksArrItem.style.display = "block";
    } else {
      tasksArrItem.style.display = "none";
    }
  });
  //document.querySelectorAll('.collection-item').forEach(function(task){
    //const item = task/*.firstChild*/.textContent;
    //if(item.toLowerCase().indexOf(text) != -1){
      //task.style.display = 'block';
    //}else{
     // task.style.display = 'none';
    //}
  //});
}