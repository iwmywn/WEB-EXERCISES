const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
renderTodoList();

document.querySelector('.js-add')
  .addEventListener('click', () => {
    addTodo();
  });

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

  todoList.forEach((todoObject) => {
    const { name, dueDate } = todoObject;
    const newTodo = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <div>
        <button class="js-delete-btn delete-btn">Delete</button>
      </div>
    `;
    todoListHTML += newTodo;
  });

  displayTodoList
    .innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-btn')
    .forEach((deleteElement, index) => {
      deleteElement.addEventListener('click', () => {
        todoList.splice(index, 1);
        renderTodoList();
        saveToStorage();
      });
    });
}

function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}