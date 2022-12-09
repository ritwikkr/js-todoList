const addTodoElem = document.querySelector(".add-todo input");
const ulElem = document.querySelector("main ul");
let taskList = [];
const taskCountElem = document.querySelector(".task-count span");

addTodoElem.addEventListener("keyup", function (e) {
  const todo = addTodoElem.value;
  if (e.key == "Enter") {
    addTodoElem.value = "";
    taskList.push({ id: Date.now(), todo });
    setToLocalStorage();
    return render();
  }
});

function setToLocalStorage() {
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

function render() {
  ulElem.innerHTML = ""; // this is to be remembered
  taskList.map((todo) => {
    const li = document.createElement("li");
    li.innerHTML = `  <div class="checkbox">
                        <input type="checkbox" />
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
  return render();
}

window.addEventListener("load", function () {
  taskList = JSON.parse(localStorage.getItem("taskList"));
  console.log(taskList);
  return render();
});
