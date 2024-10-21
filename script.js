// Function to store tasks in local storage
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        return JSON.parse(storedTasks);
    }
    return [];
}

// Function to remove a task from the list and update local storage
function removeTaskFromLocalStorage(taskText) {
    let tasks = loadTasksFromLocalStorage();
    tasks = tasks.filter(task => task !== taskText); // Remove the specific task
    saveTasksToLocalStorage(tasks); // Update local storage
}

function addTask() {
    // Get data from input 
    const task = document.getElementById("task").value;

    // Only add if there is text available
    if (task) {
        // Create a new List Item
        const newTask = document.createElement("li");

        // Create a checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                newTask.style.textDecoration = "line-through";
            } else {
                newTask.style.textDecoration = "none";
            }
        });

        const list = document.getElementById("task-list");

        // Create a delete button
        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.classList.add('delete-task-button');
        btn.onclick = function () {
            list.removeChild(newTask);
            removeTaskFromLocalStorage(task); // Remove task from local storage
        };

        // Create a text node for the input text
        const textNode = document.createTextNode(' ' + task + ' ');

        newTask.classList.add('task-item'); // Add class to task item

        newTask.appendChild(checkbox);
        newTask.appendChild(textNode);
        newTask.appendChild(btn);

        // Append the new task item to the task list
        list.appendChild(newTask);

        // Save the task to local storage
        let tasks = loadTasksFromLocalStorage();
        tasks.push(task); // Add new task to the array
        saveTasksToLocalStorage(tasks); // Store the updated array

        // Clear the input field
        document.getElementById("task").value = '';
    }
}

// Function to load saved tasks and display them when the page loads
function loadTasksOnPageLoad() {
    const tasks = loadTasksFromLocalStorage();
    tasks.forEach(task => {
        // Same logic for creating tasks from local storage
        const newTask = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                newTask.style.textDecoration = "line-through";
            } else {
                newTask.style.textDecoration = "none";
            }
        });

        const list = document.getElementById("task-list");
        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.classList.add('delete-task-button');
        btn.onclick = function () {
            list.removeChild(newTask);
            removeTaskFromLocalStorage(task); // Remove task from local storage
        };

        const textNode = document.createTextNode(' ' + task + ' ');

        newTask.classList.add('task-item');
        newTask.appendChild(checkbox);
        newTask.appendChild(textNode);
        newTask.appendChild(btn);

        list.appendChild(newTask);
    });
}

// Call the function to load tasks when the page is loaded
document.addEventListener("DOMContentLoaded", loadTasksOnPageLoad);
