const input = document.querySelector("#task-input");
const addBtn = document.querySelector("#add-task");
let listTodo = document.querySelector("#listTodo");
const deleteBtn = document.querySelector(".delete-button");
const editBtn = document.querySelector(".edit-button");
const divTasks = document.querySelector(".task-list"); // Тут завернуты кнопки, строка и чекбокс
const form = document.querySelector("#form");
let isEditing = false; // Открыта кнопка редактирования

todoList = [];

if (localStorage.getItem("todoList")) {
  todoList = JSON.parse(localStorage.getItem("todoList"));
  todoList.forEach((todo) => (listTodo.innerHTML += addToTodo(todo)));
}

addBtn.addEventListener("click", addFunc);

input.focus();

function addToTodo(todo) {
  return `<div id="${todo.id}" class="task-list"> 
     <input type="checkbox" />
     <div class="todo-text" >${todo.name}</div>
     <button class="edit-button">Редактировать</button>
     <button data-action="delete" class="delete-button">Удалить</button> 
   </div>`;
}
function saveLocalStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

// Добаление задач в список
function addFunc() {
  let todo = {};
  todo.name = input.value;
  todo.id = Date.now();
  if (input.value == "") return;
  listTodo.innerHTML += addToTodo(todo);
  input.value = "";
  todoList.push(todo);
  saveLocalStorage();
}

//  Удаление задач из списка
function deleteFunc(arr) {
  isEditing = true;
  function btnClickHandler(btnEvent) {
    const findId = parseInt(btnEvent.parentElement.id, 10);
    const findIndex = arr.findIndex((item) => item.id === findId);
    btnEvent.parentElement.remove();
    arr.splice(findIndex, 1);
    saveLocalStorage();
  }
  // Редактирование
  function editFunc(btnEvent) {
    const findId = parseInt(btnEvent.parentElement.id, 10);
    const findIndex = arr.findIndex((item) => item.id === findId);
    const parentElement = btnEvent.parentElement;
    const textElement = parentElement.querySelector(".todo-text");
    const inputElement = document.createElement("input");

    inputElement.type = "text";
    inputElement.value = textElement.textContent;
    parentElement.replaceChild(inputElement, textElement);
    inputElement.focus();

    inputElement.addEventListener("blur", function () {
      textElement.textContent;
      textElement.textContent = this.value;
      parentElement.replaceChild(textElement, this);
      arr[findIndex].name = textElement.textContent;
      saveLocalStorage();
    });
  }
  listTodo.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-button")) {
      btnClickHandler(event.target);
    } else if (event.target.classList.contains("edit-button")) {
      editFunc(event.target);
    }
  });
}

deleteFunc(todoList);

document.addEventListener("DOMContentLoaded", function () {
  form.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && isEditing) {
      event.preventDefault();
      addBtn.click();
    }
  });
});
