const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");

  const leftDiv = document.createElement("div");
  leftDiv.style.flex = "1";

  const span = document.createElement("span");
  span.textContent = taskText;

  const status = document.createElement("p");
  status.textContent = "Status: Pending";
  status.className = "status";

  leftDiv.appendChild(span);
  leftDiv.appendChild(status);

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  completeBtn.className = "completeBtn";
  completeBtn.addEventListener("click", () => {
    span.classList.add("completed");
    status.textContent = "Status: Completed";
    completeBtn.style.display = "none";
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.className = "deleteBtn";
  delBtn.addEventListener("click", () => {
    taskList.removeChild(li);
  });

  li.appendChild(leftDiv);
  li.appendChild(completeBtn);
  li.appendChild(delBtn);
  taskList.appendChild(li);

  taskInput.value = "";
});
