const $right_card = document.getElementsByClassName("right-card")[0];

let isRightOpen = 1;

document.addEventListener("keydown", function(e) {
    if(e.target.tagName == "INPUT" || e.target.id == "terminal-body") return;
    if(e.keyCode == 39 || e.keyCode == 68) {
        if(isRightOpen){
            $right_card.style.width = "0%";
            $right_card.innerHTML = "";
        }
        else{
            $right_card.style.width = "27%";
            fillTodos();
        }
        isRightOpen = 1 - isRightOpen;
    }
});

let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];

const toggleTodo = (e)=>{
    let todoId = e.id;
    let id = todoId.split("-")[1];
    todos = todos.map(todo=>{
        console.log(todo);
        if(todo.id == id){
            todo.done = !todo.done;
        }
        return todo;
    });
    localStorage.setItem("todos", JSON.stringify(todos));
    fillTodos();
}

const fillTodos = () => {
    $right_card.innerHTML="";
    const $todo_box = document.createElement("div");
    $todo_box.classList = "m-1 shadow-2xl bg-yellow-200 p-2 rounded-lg";
    $todo_box.innerHTML = "";
    $todo_box.id = "todo-box";
    const $todos_list = document.createElement("div");
    $todos_list.id = "todos-list";
    let unfinishedTodos = [], finishedTodos = [];
    todos.forEach((todo,index)=>{
        const $todo_item = document.createElement("div");
        $todo_item.classList = `todo-item flex items-center p-2 ${todo.done?"line-through":""}`;
        $todo_item.id = `${todo.id}`;
        $todo_item.innerHTML = `
            <div class="round z-10">
                <input type="checkbox" id="checkbox-${todo.id}" 
                    ${todo.done?"checked":""}
                    onclick="toggleTodo(this)"
                />
                <label for="checkbox-${todo.id}"></label>
            </div>
            <div class="w-2/3 pl-8 text-xl">${todo.name}</div>
            <div class="w-1/3">${todo.deadline==undefined?"Not Set":todo.deadline}</div>
            <button class="close-btn rounded-lg p-1" onClick="deleteTodo(${todo.id})">
                <i class="fa fa-trash text-red-500" aria-hidden="true"></i>
            </button>
        `
        if(todo.done){
            finishedTodos.push($todo_item);
        }
        else{
            unfinishedTodos.push($todo_item);
        }
    });
    unfinishedTodos.forEach(todo => {
        $todos_list.appendChild(todo);        
    });
    finishedTodos.forEach(todo => {
        $todos_list.appendChild(todo);        
    });
    $todo_box.appendChild($todos_list);

    const $todo_form = document.createElement("div");
    $todo_form.id = "todo-form";
    $todo_form.classList = "flex p-2";
    $todo_form.innerHTML = `
        <input
            class="w-full rounded-l-lg p-3 py-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200
            transform bg-white"
            id="todo-input"
            placeholder="Do CP deadline 9 : 00"
        />
    `

    $todo_form.querySelector("input").addEventListener("keydown", (e) => {
        if(e.keyCode == 13) addNewTodo($todo_form.querySelector("input").value);
    });

    $todo_box.appendChild($todo_form);
    $right_card.appendChild($todo_box);
    const currTheme = JSON.parse(localStorage.getItem("currTheme"));
    applyTheme(currTheme);
}

const addNewTodo = (todoText)=>{
    if(todoText == "") return;
    let deadline = todoText.split("deadline")[1];
    todoText = todoText.split("deadline")[0];
    const now = Date.now();
    let newTodo = {id: now,name:todoText,deadline:deadline,done:false,priority:1};
    todos.push(newTodo);
    const $todo_form = document.getElementById("todo-form");
    $todo_form.querySelector("input").value = "";
    localStorage.setItem("todos", JSON.stringify(todos));
    fillTodos();
}

const deleteTodo = (id)=>{
    todos = todos.filter(todo=>{
        if(todo.id != id) return todo;
    });
    localStorage.setItem("todos", JSON.stringify(todos));
    fillTodos();
};

fillTodos();