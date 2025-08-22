const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task");
const dateInput = document.getElementById("date");
const todoList = document.getElementById("todo-list");
const filterDate = document.getElementById("filter-date");

let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // ambil dari localStorage atau kosong

// Render awal saat halaman dimuat
renderTasks(tasks);

// Tambah To-Do
form.addEventListener("submit", function(e) {
  e.preventDefault();
  const task = taskInput.value.trim();
  const date = dateInput.value;
  if(task && date){
    tasks.push({task, date});
    saveTasks();
    renderTasks(tasks);
    form.reset();
  }
});

// Render Daftar To-Do
function renderTasks(list) {
  todoList.innerHTML = "";
  list.forEach((item, index) => {
    const li = document.createElement("li");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("task-info");
    infoDiv.innerHTML = `<strong>${item.task}</strong>
                         <span class="task-date">${item.date}</span>`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Hapus";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => deleteTask(index);

    li.appendChild(infoDiv);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

// Hapus To-Do
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks(tasks);
}

// Hapus Semua To-Do
function clearAllTasks() {
  tasks = []; // kosongkan array
  saveTasks(); // update localStorage
  renderTasks(tasks); // render ulang (kosong)
}


// Filter Berdasarkan Tanggal
function filterTasks() {
  const selectedDate = filterDate.value;
  if(selectedDate){
    const filtered = tasks.filter(item => item.date === selectedDate);
    renderTasks(filtered);
  }
}

// Reset Filter
function resetFilter() {
  filterDate.value = "";
  renderTasks(tasks);
}

// Simpan ke localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
