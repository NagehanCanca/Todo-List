const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelector(".card-body")[0];
const secondCardBody = document.querySelector(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    clearButton.addEventListener("click",clearAllTodos);

}
function clearAllTodos(e) {
    if (confirm("Hepsini silmek istediğinizden emin misiniz?")) {
        //Arayüzden todoları temizleme

        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstelementChild)
        }
        localStorage.removeItem("todos");

    }
   

}
function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("sucsess","Todo başarıyla silindi.");
    }
}
function deleteTodoFromStorage(deleteTodo) {
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if (todo === deleteTodo) {
            todos.splice(index,1); //Arrayden değeri silebiliriz.
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));

}
function loadAllTodosToUI() {
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);

    });
}
function addTodo(e) {
    const newTodo = todoInput.value.trim(); //Cümlenin başındaki ve sonundaki boşlukları siler(trim)
    if (newTodo === "") {
        showAlert("danger","Lütfen bir todo girin...");
    }
    else {
        addTodoUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("sucsess", "Todo başarıyla eklendi.")
    }
    console.log(newTodo);

    e.preventDefault();
}
function getTodosFromStorage() { //Storagedan bütün todoları alma
    let todos;

    if (localStorage.getItem("todos")=== null) {
        todos =[];
    }
    else {
        todos =JSON.parse(localStorage.getItem("todos"));
    }
}
function addTodoToStorage(newTodo) {
   let todos = getTodosFromStorage();

   todos.push(newTodo);

   localStorage.setItem("todos", JSON.stringify(todos));
}
function showAlert(type,message) {
    const firstCardBody = null;
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    setTimeout(function () {
        alert.remove();
    },2000);
}

function addTodoUI(newTodo) {
    //List Item oluşturma
    const listItem = document.createElement("li");
    //Link Oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";


    //Text Node Ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //Todo Liste'e List Item'ı Ekleme
    todoList.appendChild(listItem);
    todoInput.value = "";





}
