const newTask = document.querySelector('#taskInput');
const addTask = document.querySelector('#addTaskButton');
const totalSpan = document.querySelector('#totalSpan');
const checkedSpan = document.querySelector('#checkedSpan');
const ulListTask = document.querySelector('ul');

const tasks = [
    { id: 00001, name: "Make a coofe", state: false },
    { id: 00002, name: "Make a cigarrete", state: false },
    { id: 00003, name: "Sit to code", state: false }
]

renderTask();

function getFinishedClass(state) {
  if (state) {
    return 'class="finished_task"';
  }
  return '';
}

function getCompletionButton(task) {
  if(task.state) {
    return `<button onclick='uncompleteTask(${task.id})'>Uncomplete Task</button>`
  }
  return `<button onclick='checkTask(${task.id})'>Complete task</button>`
}

function renderTask() {
  let html = ''
  for (let task of tasks){
    html += `
    <li id="task_${ task.id }"> 
      <div ${ getFinishedClass(task.state) }> ${ task.name } - ${ task.id } </div> 
      <button onclick='erase(${ task.id })'>borrar</button> 
      ${ getCompletionButton(task) }
    </li>`
  }
  ulListTask.innerHTML = html;
  totalSpan.innerHTML = tasks.length;
  checkedSpan.innerHTML = tasks.filter((task) => task.state).length;
}

addTask.addEventListener('click', () => {
  const inputValue = newTask.value;
  if (inputValue) {
    tasks.push({
      id: Date.now(), name: inputValue, state: false
    });
    newTask.value = '';
    renderTask();
  }
})

taskInput.addEventListener('keypress', (event) => {
  const inputValue = newTask.value;
  if (event.key === 'Enter') {
    tasks.push({
      id: Date.now(), name: inputValue, state: false
    });
    newTask.value = '';
    renderTask();
  }
})

function erase(id){
  const index = tasks.findIndex((task) => task.id == id);
  tasks.splice(index, 1);
  renderTask();
}

function checkTask(id){
  const index = tasks.findIndex((task) => task.id == id);
  tasks[index].state = true;
  renderTask();
}

function uncompleteTask(id) {
  const index = tasks.findIndex((task) => task.id == id);
  tasks[index].state = false;
  renderTask();
}
