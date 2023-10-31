const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
renderTodoList();

function addTodo() {
  const todoNameElement = document.querySelector('.js-input');
  const name = todoNameElement.value;
  const dueDateElement = document.querySelector('.js-due-date');
  const dueDate = dueDateElement.value;

  todoList.push({
    name,
    dueDate
  });
  renderTodoList();
  saveToStorage();

  todoNameElement.value = '';
}

function renderTodoList() {
  const displayTodoList = document.querySelector('.js-list');
  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    const { name, dueDate } = todoObject;
    const newTodo = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <div>
        <button class="delete-btn" onclick="
          todoList.splice(${i}, 1);
          renderTodoList();
          saveToStorage();
        ">Delete</button>
      </div>
    `;
    todoListHTML += newTodo;
  }

  displayTodoList
    .innerHTML = todoListHTML;
}

function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}