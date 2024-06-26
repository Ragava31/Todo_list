document.addEventListener("DOMContentLoaded", function() {

let todoitemcontainer = document.getElementById("todoitemcontainer");

let addbutton = document.getElementById("addbutton"); //5th to add the new todo

let savebutton = document.getElementById("savebutton"); //last step

function getlocalstorageTodo(){
    let stringifieddata = localStorage.getItem("todolist");
    let parseddata = JSON.parse(stringifieddata);
    if(parseddata === null){
        return [];
    }
    else{
        return parseddata;
    }
}

let todolist = getlocalstorageTodo();

savebutton.onclick = function(){            // last step
    localStorage.setItem("todolist",JSON.stringify(todolist));
}

let todoCount = todolist.length;

function onTodoStatusChange(checkboxId,labelId){ // 3rd edit after down one declared

    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);

    if(checkboxElement.checked === true){               // or we can write labelElement.classList.toggle("boxchechked"); without this if and else [this is written in codepen see]
        labelElement.classList.add("boxchecked");
    }
    else{
        labelElement.classList.remove("boxchecked");
    }
}

function onDeleteTodo(todoId){                          //4th edit to delete the toto when we clicked
    let todoElement = document.getElementById(todoId);
    todoitemcontainer.removeChild(todoElement);

    let deleteElementIndex = todolist.findIndex(function(eachTodo){  /// last last  --> Delete and save in localhost
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if(eachTodoId === todoId){
            return true;
        }
        else{
            return false;
        }
    });
    todolist.splice(deleteElementIndex,1);
}

function createandappendtodo(todo){

let checkboxId = "checkbox" + todo.uniqueNo; //1st -edit after code

let labelId = "label" + todo.uniqueNo;  //2nd - edit afer code

let todoId = "todo" + todo.uniqueNo; //4th edit to delete the toto when we clicked
    
let li = document.createElement("li");
li.classList.add("todo-item","d-flex","flex-row");

li.id = todoId;  //4th edit to delete the toto when we clicked

todoitemcontainer.appendChild(li);

let inputElement = document.createElement("input");
inputElement.classList.add("checkboxx");
inputElement.type = "checkbox";
inputElement.id = checkboxId;  //1st -edit after code

inputElement.onclick = function(){  //3rd edit after code
    onTodoStatusChange(checkboxId,labelId);
}

li.appendChild(inputElement);

let div = document.createElement("div");
div.classList.add("label-container","d-flex","flex-row");
li.appendChild(div);

let label = document.createElement("label");
label.setAttribute("for",checkboxId); //1st -edit after code
label.id = labelId;
label.textContent = todo.text;
label.classList.add("checkboxlabel");
div.appendChild(label);

let deletediv = document.createElement("div");
deletediv.classList.add("delete-icon-container");
div.appendChild(deletediv);

let icon = document.createElement("i")
icon.classList.add("fa-solid", "fa-trash","deleteicon",);

icon.onclick = function(){
    onDeleteTodo(todoId);  ////4th edit to delete the toto when we clicked
}

deletediv.appendChild(icon);

}

for(let eachtodo of todolist){
    createandappendtodo(eachtodo);
}

function onAddTodo(){       //5th to add the new todo
    todoCount = todoCount + 1;

    let userInputElement = document.getElementById("todoUserInput");
    let userEnteredValue = userInputElement.value;

    let newTodo = {
        text : userEnteredValue,
        uniqueNo : todoCount
    };

    todolist.push(newTodo); //last one

    createandappendtodo(newTodo);
    userInputElement.value = "";
    
}

addbutton.onclick= function(){   //5th to add the new todo
    onAddTodo();
}
});
