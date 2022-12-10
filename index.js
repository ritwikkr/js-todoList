// Elements
const addTodoElem = document.querySelector(".add-todo input");
const ulElem = document.querySelector("main ul");
let taskList = [];
const taskCountElem = document.querySelector(".task-count span");
const allElem = document.querySelector(".all");
const uncompletedElem = document.querySelector(".uncompleted");
const completedElem = document.querySelector(".completed");

// Event Listeners
window.addEventListener("load", function () {
  taskList = JSON.parse(localStorage.getItem("taskList")) || [];
  return render(taskList);
});

addTodoElem.addEventListener("keyup", function (e) {
  const todo = addTodoElem.value;
  if (e.key == "Enter") {
    addTodoElem.value = "";
    taskList.push({ id: Date.now(), todo, complete: false });
    setToLocalStorage();
    return render(taskList);
  }
});

allElem.addEventListener("click", function () {
  return render(taskList);
});

uncompletedElem.addEventListener("click", function () {
  const newtaskList = taskList.filter((task) => task.complete === false);
  return render(newtaskList);
});

completedElem.addEventListener("click", function () {
  const newTaskList = taskList.filter((task) => task.complete === true);
  return render(newTaskList);
});

// Functions
function setToLocalStorage() {
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

function render(taskList) {
  ulElem.innerHTML = ""; // this is to be remembered
  taskList.map((todo) => {
    const li = document.createElement("li");
    li.innerHTML = `  <div class="checkbox">
                        <input type="checkbox" onclick="toggleTodo(${
                          todo.id
                        })" ${todo.complete && `checked`}>
                    </div>
                    <div class="todo-title">
                        <p>${todo.todo}</p>
                    </div>
                    <div class="delete-icon" onclick="deleteTodo(${todo.id})">
                        <i class="fa-regular fa-circle-xmark"></i>
                    </div>
                `;
    ulElem.append(li);
  });
  taskCountElem.innerHTML = taskList.length;
}

function deleteTodo(id) {
  taskList = taskList.filter((task) => task.id !== id);
  localStorage.setItem("taskList", JSON.stringify(taskList));
  return render(taskList);
}

function toggleTodo(id) {
  taskList.map((task) => {
    if (task.id === id) {
      task.complete = !task.complete;
    }
  });
  console.log(taskList);
  return setToLocalStorage();
}
