document.addEventListener("DOMContentLoaded", function() {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    todoForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const todoText = todoInput.value;
        if (todoText.trim() !== "") {
            addTodoItem(todoText);
            todoInput.value = "";
        }
    });
    function addTodoItem(todoText) {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        const span = document.createElement("span");
        span.textContent = todoText;
        const button = document.createElement("button");
        button.textContent = "X";
        button.addEventListener("click", function() {
            const now = new Date();
            const hour = now.getHours().toString().padStart(2, '0');
            const minute = now.getMinutes().toString().padStart(2, '0');
            ("Time: " + hour + ":" + minute);
            li.remove();
        });

        checkbox.addEventListener("change", function() {
            if (checkbox.checked) {
                span.style.textDecoration = "line-through";
            } else {
                span.style.textDecoration = "none";
            }
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(button);
        todoList.appendChild(li);
    }
});
