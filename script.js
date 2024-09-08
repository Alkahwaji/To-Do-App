document.addEventListener("DOMContentLoaded", loadTasks);
document.getElementById("addTaskBtn").addEventListener("click", addTask);
document
  .getElementById("taskList")
  .addEventListener("click", handleTaskActions);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    createTaskElement(task.text, task.completed);
  });
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  createTaskElement(taskText, false);
  saveTaskToLocalStorage(taskText, false);
  taskInput.value = "";
}

function createTaskElement(text, completed) {
  const li = document.createElement("li");
  li.className = completed ? "completed" : "";
  li.innerHTML = `
        <span>${text}</span>
        <div>
            <button class="removeBtn">Delete</button>
            <input type="checkbox" ${completed ? "checked" : ""}>
        </div>
    `;
  document.getElementById("taskList").appendChild(li);
}

function handleTaskActions(event) {
  if (event.target.tagName === "BUTTON") {
    deleteTask(event.target);
  } else if (
    event.target.tagName === "INPUT" &&
    event.target.type === "checkbox"
  ) {
    toggleTaskCompletion(event.target);
  }
}

function deleteTask(button) {
  const li = button.parentElement.parentElement;
  const taskText = li.querySelector("span").textContent;
  li.remove();
  removeTaskFromLocalStorage(taskText);
}

function toggleTaskCompletion(checkbox) {
  const li = checkbox.parentElement.parentElement;
  const taskText = li.querySelector("span").textContent;
  li.classList.toggle("completed");
  updateTaskInLocalStorage(taskText, li.classList.contains("completed"));
}

function saveTaskToLocalStorage(text, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskInLocalStorage(text, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find((task) => task.text === text);
  if (task) {
    task.completed = completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}
