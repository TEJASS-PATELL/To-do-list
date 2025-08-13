// Element references
var input = document.getElementById("input-box");
var list = document.getElementById("list");
var button = document.querySelector("#button");
var popupButton = document.querySelector("#popup");
var notification = document.getElementById("show");

// Array to store tasks (load from localStorage if exists)
var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render the list
function renderList() {
    list.innerHTML = '';
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerText = task.text;

        if (task.completed) {
            li.classList.add("checked");
        }

        // Delete button (span with close icon)
        let span = document.createElement("span");
        span.style.backgroundImage = `url(close.png)`;
        span.addEventListener("click", function (e) {
            e.stopPropagation(); // prevent toggling when deleting
            removeTask(index);
        });

        // Toggle task completion on click
        li.addEventListener("click", function () {
            toggleTask(index);
        });

        li.appendChild(span);
        list.appendChild(li);
    });
}

// Add task
button.addEventListener("click", function () {
    if (input.value.trim() === "") {
        notification.classList.add("open-popup");
    } else {
        tasks.push({ text: input.value.trim(), completed: false });
        input.value = '';
        saveData();
        renderList();
    }
});

// Toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveData();
    renderList();
}

// Remove task
function removeTask(index) {
    tasks.splice(index, 1);
    saveData();
    renderList();
}

// Save tasks to localStorage
function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Close popup
popupButton.addEventListener("click", function () {
    notification.classList.remove("open-popup");
});

// Initial render
renderList();
