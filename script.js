const input = document.querySelector("#task-input");
const addBtn = document.querySelector("#add-task");
const listTodo = document.querySelector("#listTodo");
const deleteBtn = document.querySelector(".delete-button");
const divTasks = document.querySelector(".task-list"); // Тут завернуты кнопки, строка и чекбокс
const form = document.querySelector("#form");

todoList = [];

addBtn.addEventListener("click", addFunc);

// Добаление задач в список
function addFunc() {
  let todo = {};
  todo.name = input.value;
  todo.id = Date.now();
  listTodo.innerHTML += `<div id="${todo.id}" class="task-list"> 
  <input type="checkbox" />
  <div class="todo-text">${todo.name}</div>
  <button class="edit-button">Редактировать</button>
  <button data-action="delete" class="delete-button">Удалить</button> 
</div>`; // Редактирование при добавлении тег div текста contenteditable="true"
  input.value = "";
  todoList.push(todo);
  console.log(todoList);
}

//  Удаление задач из списка
function deleteFunc(arr) {
  function btnClickHandler(btnEvent) {
    const findId = parseInt(btnEvent.parentElement.id, 10);
    const findIndex = arr.findIndex((item) => item.id === findId);
    btnEvent.parentElement.remove();
    arr.splice(findIndex, 1);
  }
  listTodo.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-button")) {
      btnClickHandler(event.target);
    }
  });
}

deleteFunc(todoList);

// Запрещаем отправлять форму на Enter и привязываем Enter к кнопке "Добавить"
document.addEventListener("DOMContentLoaded", function () {
  form.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addBtn.click();
    }
  });
});

// ========================== МОЖНО РЕДАКТИРОВАТЬ ================================
// contenteditable="true"

// ЗАКРАШИВАНИЕ КНОПОК! РАБОТАЕТ И ВЫВОДИТ В КОНСОЛЬ
// function init() {
//   const btnClickHandler = (btnb) => {
//     btnb.style.background = "yellow";
//     console.log("Вы нажали на какую-то кнопку");
//   };
//   listTodo.addEventListener("click", (event) => {
//     if (event.target.classList.contains("delete-button")) {
//       btnClickHandler(event.target);
//     } else {
//       console.log("Нажал на ");
//     }
//   });
// }
// init();
