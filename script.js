const todoForm = document.querySelector("form");
const todoInput = document.getElementById("new-task");
const todoList = document.querySelector(".todo-list");
const errorContainer = document.querySelector(".error-container");

let allTodos = loadTodos();
updateTodoList();

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const text = todoInput.value.trim();

  if (text !== "") {
    const object = {
      text: text,
      completed: false,
    };
    allTodos.push(object);
    updateTodoList();
    saveTodos();
    restoreInput();
  } else {
    displayError();
  }
}

function updateTodoList() {
  todoList.innerHTML = "";
  allTodos.forEach((todo, index) => {
    const item = createTodoItem(todo, index);
    todoList.append(item);
  });
}

function createTodoItem(object, index) {
  const id = `todo-${index}`;
  const item = document.createElement("li");
  const text = object.text;

  item.innerHTML = `
    <input type="checkbox" name="todo-1" id="${id}">
    <label for="${id}" class="custom-checkbox">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
            fill="#e8eaed">
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
        </svg>
    </label>
    <label for="${id}" class="todo-text">${text}</label>
    <button class="delete-button">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
            fill="#e8eaed">
            <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
    </button>
  `;
  item.classList.add("todo");

  const deleteButton = item.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTodoItem(index);
  });

  const checkBox = item.querySelector("input");
  checkBox.addEventListener("change", () => {
    allTodos[index].completed = checkBox.checked;
    saveTodos();
  });
  checkBox.checked = object.completed;

  return item;
}

function deleteTodoItem(index) {
  allTodos = allTodos.filter((_, i) => i !== index);
  saveTodos();
  updateTodoList();
}

function saveTodos() {
  const todosJSON = JSON.stringify(allTodos);
  localStorage.setItem("todos", todosJSON);
}

function loadTodos() {
  const todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
}

function displayError() {
  const errorMessage = errorContainer.querySelector("span");
  errorMessage.innerText = "ERROR: PLEASE WRITE SOME TEXT";
  errorContainer.classList.remove("hidden");
}

function restoreInput() {
  todoInput.value = "";
  errorContainer.classList.add("hidden");
}
