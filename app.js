class TodoList {
    constructor() {
        this.todoForm = document.getElementById("todo-form");
        this.todoInput = document.getElementById("todo-input");
        this.todoList = document.getElementById("todo-list");
        this.todoForm.addEventListener("submit", this.addTodo.bind(this));
    }

    addTodo(event) {
        event.preventDefault();
        const todoText = this.todoInput.value.trim();
        if (todoText !== "") {
            this.addTodoItem(todoText);
            this.todoInput.value = "";
        }
    }

    addTodoItem(text) {
        const user = new User(text, new Date().getTime());
        DATA.push(user);
        this.createTable(DATA);
    }

    createTable(DATA) {
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild);
        }
        let fragment = document.createDocumentFragment();
        DATA.forEach((user) => {
            let ul = document.createElement("ul");
            ul.innerHTML = `
                <li>
                    <input type="checkbox" required>
                    <span>${user.text}</span>
                    <button>X</button>
                </li>
            `;
            fragment.appendChild(ul);
        });
        this.todoList.appendChild(fragment);
    }
}

class User {
    constructor(text, time) {
        this.id = `id-${new Date().getTime()}`;
        this.text = text;
        this.time = time;
    }
}

const DATA = [
    {
        id: "id-1",
        text: "Banan",
        time: '17:50'
    },
];

const todoList = new TodoList();

todoList.todoList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    }
});
