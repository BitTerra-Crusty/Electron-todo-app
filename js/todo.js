const fs = require('fs');
const alertify = require('alertifyjs');

function completeToDo(id)
{
    var xhr = new XMLHttpRequest();
        xhr.open('GET', 'todos/todos.json', true);
    
        xhr.onload = function(a){
            
            a.preventDefault();
            if(this.status == 200)
            {
                try
                {
                    var allJsonTodos = JSON.parse(this.responseText);
                    var todoObj;

                    for(var existingTodo of allJsonTodos)
                    {
                        if(existingTodo.id == id)
                        {
                            todoObj = existingTodo;
                            break;
                        }
                    }

                    //logic
                    var doesExist = false;
                    let todoIndex = 0;
                    for(var existingTodos of allJsonTodos)
                    {
                        if(existingTodos.id == id)
                        {
                            allJsonTodos[todoIndex].isComplete = true;
                            dooesExist = true;
                            break;
                        }
                        todoIndex++;
                    }

                    if(!doesExist)
                    {
                        var combinedObj = JSON.stringify(allJsonTodos);

                        fs.writeFile('todos/todos.json', combinedObj, err => {
                            if (err) {
                                alertify.set('notifier', 'position', 'top-left');
                                alertify.error("Error while trying to add a ToDo");
                            } else {
                                alertify.set('notifier', 'position', 'top-left');
                                alertify.success("ToDo task has been removed successfully");
                                GetToDos();
                            }
                        });
                    }
                }
                catch(exception)
                {
                    console.log(exception);
                    if(exception == "SyntaxError: Unexpected end of JSON input")
                    {
                        var combinedObj = JSON.stringify([]);

                        fs.writeFile('todos/todos.json', combinedObj, err => {
                            if (err) {
                                
                            } else {
                                
                                GetToDos();
                            }
                        })
                        SendTodo(myTodo);
                    }
                    else{
                    alertify.set('notifier', 'position', 'top-left');
                    alertify.error("Opps!, Error while trying to add a ToDo task");
                    GetToDos();
                    }
                }
            }
            else{
                alertify.set('notifier', 'position', 'top-left');
                alertify.error("Error while trying to retrieve ToDos");

                return todos;
            }
        }

    xhr.send();
}

function removeToDo(id)
{
    var xhr = new XMLHttpRequest();
        xhr.open('GET', 'todos/todos.json', true);
    
        xhr.onload = function(a){
            
            a.preventDefault();
            if(this.status == 200)
            {
                try
                {
                    var allJsonTodos = JSON.parse(this.responseText);
                    var todoObj;

                    for(var existingTodo of allJsonTodos)
                    {
                        if(existingTodo.id == id)
                        {
                            todoObj = existingTodo;
                            break;
                        }
                    }

                    alertify.confirm("Remove ToDO", "Are you sure you want to remove this todo task?.", function(){
                        //logic
                        var doesExist = false;
                        let todoIndex = 0;
                        for(var existingTodos of allJsonTodos)
                        {
                            if(existingTodos.id == id)
                            {
                                allJsonTodos.splice(todoIndex, 1);
                                dooesExist = true;
                                break;
                            }
                            todoIndex++;
                        }

                        if(!doesExist)
                        {
                            var combinedObj = JSON.stringify(allJsonTodos);

                            fs.writeFile('todos/todos.json', combinedObj, err => {
                                if (err) {
                                    alertify.set('notifier', 'position', 'top-left');
                                    alertify.error("Error while trying to add a ToDo");
                                } else {
                                    alertify.set('notifier', 'position', 'top-left');
                                    alertify.success("ToDo task has been removed successfully");
                                    GetToDos();
                                }
                            });
                        }

                    }, function(){alertify.error("Canceled")});
                }
                catch(exception)
                {
                    console.log(exception);
                    if(exception == "SyntaxError: Unexpected end of JSON input")
                    {
                        var combinedObj = JSON.stringify([]);

                        fs.writeFile('todos/todos.json', combinedObj, err => {
                            if (err) {
                                
                            } else {
                                
                                GetToDos();
                            }
                        })
                        SendTodo(myTodo);
                    }
                    else{
                    alertify.set('notifier', 'position', 'top-left');
                    alertify.error("Opps!, Error while trying to add a ToDo task");
                    GetToDos();
                    }
                }
            }
            else{
                alertify.set('notifier', 'position', 'top-left');
                alertify.error("Error while trying to retrieve ToDos");

                return todos;
            }
        }

    xhr.send();
}
function editToDo(id)
{
    var xhr = new XMLHttpRequest();
        xhr.open('GET', 'todos/todos.json', true);
    
        xhr.onload = function(a){
            
            a.preventDefault();
            if(this.status == 200)
            {
                try
                {
                    var allJsonTodos = JSON.parse(this.responseText);
                    var todoObj;

                    for(var existingTodo of allJsonTodos)
                    {
                        if(existingTodo.id == id)
                        {
                            todoObj = existingTodo;
                            break;
                        }
                    }

                    alertify.prompt("ToDO", "Edit ToDO", todoObj.todo, function(evt, value){
                        //logic
                        var dooesExist = false;
                        for(var existingTodos of allJsonTodos)
                        {
                            if(existingTodos.todo.toLowerCase() == value.toLowerCase() && existingTodos.id != id)
                            {
                                dooesExist = true;
                                alertify.set('notifier', 'position', 'top-left');
                                alertify.error("Opps, todo "+todoObj.todo+" already exists");
                                break;
                            }
                        }

                        if(!dooesExist)
                        {
                            var count = 0;
                            for(var existingTodos of allJsonTodos)
                            {
                                if(existingTodos.id == id)
                                {
                                    allJsonTodos[count].todo = value;
                                    break;
                                }

                                count++;
                            }

                            var combinedObj = JSON.stringify(allJsonTodos);

                            fs.writeFile('todos/todos.json', combinedObj, err => {
                                if (err) {
                                    alertify.set('notifier', 'position', 'top-left');
                                    alertify.error("Error while trying to add a ToDo task");
                                } else {
                                    alertify.set('notifier', 'position', 'top-left');
                                    alertify.success("ToDo task has been added successfully");
                                    GetToDos();
                                }
                            });
                        }

                    }, function(){alertify.error("Canceled")});
                }
                catch(exception)
                {
                    console.log(exception);
                    if(exception == "SyntaxError: Unexpected end of JSON input")
                    {
                        var combinedObj = JSON.stringify([]);

                        fs.writeFile('todos/todos.json', combinedObj, err => {
                            if (err) {
                                
                            } else {
                                
                                GetToDos();
                            }
                        })
                        SendTodo(myTodo);
                    }
                    else{
                    alertify.set('notifier', 'position', 'top-left');
                    alertify.error("Opps!, Error while trying to add a ToDo");
                    GetToDos();
                    }
                }
            }
            else{
                alertify.set('notifier', 'position', 'top-left');
                alertify.error("Error while trying to retrieve ToDos");

                return todos;
            }
        }

    xhr.send();
}
function SendTodo(myTodo, PassedtodoDate)
{
    var todoObj = {
        id : randomUUID(),
        todo: myTodo,
        isComplete: false,
        todoDate: PassedtodoDate
    };
    var xhr = new XMLHttpRequest();
        xhr.open('GET', 'todos/todos.json', true);
    
        xhr.onload = function(a){
            
            a.preventDefault();
            if(this.status == 200)
            {
                try
                {
                    var allJsonTodos = JSON.parse(this.responseText);
                    var dooesExist = false;

                    for(var existingTodos of allJsonTodos)
                    {
                        if(existingTodos.todo.toLowerCase() == todoObj.todo.toLowerCase() && PassedtodoDate == existingTodos.todoDate && existingTodos.isComplete == false)
                        {
                            dooesExist = true;
                            alertify.set('notifier', 'position', 'top-left');
                            alertify.error("Opps, todo "+todoObj.todo+" already exists");
                            break;
                        }
                    }
                    if(!dooesExist)
                    {
                        allJsonTodos.push(todoObj);

                        var combinedObj = JSON.stringify(allJsonTodos);

                        fs.writeFile('todos/todos.json', combinedObj, err => {
                            if (err) {
                                alertify.set('notifier', 'position', 'top-left');
                                alertify.error("Error while trying to add a ToDo");
                            } else {
                                alertify.set('notifier', 'position', 'top-left');
                                alertify.success("ToDo has been added successfully");
                                GetToDos();
                            }
                        })
                    }
                }
                catch(exception)
                {
                    console.log(exception);
                    if(exception == "SyntaxError: Unexpected end of JSON input")
                    {
                        var combinedObj = JSON.stringify([]);

                        fs.writeFile('todos/todos.json', combinedObj, err => {
                            if (err) {
                                
                            } else {
                                
                                GetToDos();
                            }
                        })
                        SendTodo(myTodo);
                    }
                    else{
                    alertify.set('notifier', 'position', 'top-left');
                    alertify.error("Opps!, Error while trying to add a ToDo");
                    GetToDos();
                    }
                }
            }
            else{
                alertify.set('notifier', 'position', 'top-left');
                alertify.error("Error while trying to retrieve ToDos");

                return todos;
            }
        }

        xhr.send();
}
function GetToDos()
    {
        document.getElementById("myTodo-table").innerHTML = "";
        var xhr = new XMLHttpRequest();
            xhr.open('GET', 'todos/todos.json', false);

            xhr.onload = function(a){
                a.preventDefault();
                if(this.status == 200)
                {
                    var todos;
                    var pass = false;
                    if(this.responseText == null || this.responseText == "")
                    {
                        pass = false;
                    }
                    else{
                        pass = true;
                         todos = JSON.parse(this.responseText);
                    }
              
                    if(pass)
                    {
                        if(todos.length > 5)
                        {
                            document.getElementById("todo-panel").style.overflowY = "scroll";
                        }
                        else{
                            document.getElementById("todo-panel").style.overflowY = "hidden";
                        }
                        var output = '';
                        for(var item of todos)
                        {
                            let tableRow = document.createElement("tr");
                                if(item.isComplete)
                                {
                                    tableRow.setAttribute("class", "strikeout");
                                }
                            let todoItem = document.createElement('td');
                               
                                var theDate = new Date();

                                var day = String(theDate.getDate()).padStart(2,'0');
                                var month = String(theDate.getMonth() + 1).padStart(2,'0');
                                var year = theDate.getFullYear();

                                var theTodoDate = String(item.todoDate);

                                var d = theTodoDate.substring(0, theTodoDate.indexOf('-')).trim();
                                theTodoDate = theTodoDate.substring(theTodoDate.indexOf('-') + 1, theTodoDate.length).trim();
                                var m = theTodoDate.substring(0, theTodoDate.indexOf('-')).trim();
                                theTodoDate = theTodoDate.substring(theTodoDate.indexOf('-') + 1, theTodoDate.length).trim();
                                var y = theTodoDate.substring(0, theTodoDate.length).trim();

                                if(d == day && m == month && y == year)
                                {
                                   todoItem.innerHTML = item.todo +' <small class="text-primary"> Today </small>';
                                }
                                else if(d == parseInt(day) + 1 && m == month && y == year)
                                {
                                    todoItem.innerHTML = item.todo +' <small class="text-primary"> Tomorrow </small>';
                                }
                                else if(y < year)
                                {
                                    todoItem.innerHTML = item.todo +' <small class="text-primary"> '+item.todoDate+' </small"> <small class="text-danger font-weight-bold"> date due </small>';
                                }
                                else if(m < month && y == year)
                                {
                                    todoItem.innerHTML = item.todo +' <small class="text-primary"> '+item.todoDate+' </small> <small class="text-danger font-weight-bold"> date due </small>';
                                }
                                else if(d < day && (m == month || m < month) && (y == year || y < year) )
                                {
                                    todoItem.innerHTML = item.todo +' <small class="text-primary"> '+item.todoDate+' </small> <small class="text-danger font-weight-bold"> date due </small>';
                                }
                                else{
                                    todoItem.innerHTML = item.todo +' <small class="text-primary"> '+item.todoDate+' </small>';
                                }

                                if(item.isComplete)
                                {
                                        let todoActions = document.createElement('td');
                                        todoActions.setAttribute('class', 'text-center');
                                        
                                    //remove
                                        let removeButton = document.createElement('a');
                                        removeButton.setAttribute('class', 'badge badge-pill save_button badge-danger btn btn-sm remove-btn');
                                        removeButton.innerHTML = "remove ";
                                        removeButton.setAttribute('id', item.id);
                                        removeButton.style.cursor = "pointer";

                                            let removeIcon = document.createElement('i');
                                            removeIcon.setAttribute('class', 'text-light fa fa-trash-alt');
                                            removeIcon.style.curser = "pointer";
                                        removeButton.appendChild(removeIcon);

                                        todoActions.appendChild(removeButton);
                                    
                                    let editButton = document.createElement('a');
                                        editButton.setAttribute('class', 'badge badge-pill badge-secondary save_button disabled btn btn-sm text-black');
                                        editButton.innerHTML = "edit ";
                                        editButton.setAttribute('id', item.id);
                                        editButton.style.marginLeft = "5px";
                                        editButton.style.cursor = "pointer";


                                            let editIcon = document.createElement('i');
                                            editIcon.setAttribute('class', ' text-light fa fa-edit');
                                            editIcon.style.curser = "pointer";
                                            editButton.appendChild(editIcon);

                                        todoActions.appendChild(editButton);
                                    let completeButton = document.createElement('a');
                                        completeButton.setAttribute('class', 'badge badge-pill save_button badge-secondary disabled btn btn-sm');
                                        completeButton.innerHTML = "completed ";
                                        completeButton.setAttribute('id', item.id);
                                        completeButton.style.marginLeft = "5px";
                                        completeButton.style.cursor = "pointer";

                                            let completeIcon = document.createElement('i');
                                            completeIcon.setAttribute('class', 'text-light fa fa-thumbs-up');
                                            completeIcon.style.curser = "pointer";
                                            completeIcon.style.color = "rgb(97, 248, 9)";
                                            completeButton.appendChild(completeIcon);

                                        todoActions.appendChild(completeButton);

                                    tableRow.appendChild(todoItem);
                                    tableRow.appendChild(todoActions);

                                    document.getElementById("myTodo-table").appendChild(tableRow);
                                }
                                else if((y < year) || (m < month && y == year) || (d < day && (m == month || m < month) && (y == year || y < year)) )
                                {
                                    let todoActions = document.createElement('td');
                                        todoActions.setAttribute('class', 'text-center');
                                        
                                    //remove
                                        let removeButton = document.createElement('a');
                                        removeButton.setAttribute('class', 'badge badge-pill save_button badge-danger btn btn-sm remove-btn');
                                        removeButton.innerHTML = "remove ";
                                        removeButton.setAttribute('id', item.id);
                                        removeButton.style.cursor = "pointer";

                                            let removeIcon = document.createElement('i');
                                            removeIcon.setAttribute('class', 'text-light fa fa-trash-alt');
                                            removeIcon.style.curser = "pointer";
                                        removeButton.appendChild(removeIcon);

                                        todoActions.appendChild(removeButton);
                                    
                                    let editButton = document.createElement('a');
                                        editButton.setAttribute('class', 'badge badge-pill badge-secondary save_button disabled btn btn-sm text-black');
                                        editButton.innerHTML = "edit ";
                                        editButton.setAttribute('id', item.id);
                                        editButton.style.marginLeft = "5px";
                                        editButton.style.cursor = "pointer";


                                            let editIcon = document.createElement('i');
                                            editIcon.setAttribute('class', ' text-light fa fa-edit');
                                            editIcon.style.curser = "pointer";
                                            editButton.appendChild(editIcon);

                                        todoActions.appendChild(editButton);
                                    let completeButton = document.createElement('a');
                                        completeButton.setAttribute('class', 'badge badge-pill save_button badge-secondary disabled btn btn-sm');
                                        completeButton.innerHTML = "Date Passed ";
                                        completeButton.setAttribute('id', item.id);
                                        completeButton.style.marginLeft = "5px";
                                        completeButton.style.cursor = "pointer";

                                            let completeIcon = document.createElement('i');
                                            completeIcon.setAttribute('class', 'text-light fa fa-times');
                                            completeIcon.style.curser = "pointer";
                                            completeIcon.style.color = "rgb(97, 248, 9)";
                                            completeButton.appendChild(completeIcon);

                                        todoActions.appendChild(completeButton);

                                    tableRow.appendChild(todoItem);
                                    tableRow.appendChild(todoActions);

                                    document.getElementById("myTodo-table").appendChild(tableRow);
                                }
                                else{

                                    if(!(d == day && m == month && y == year)){
                                        let todoActions = document.createElement('td');
                                        todoActions.setAttribute('class', 'text-center');
                                        
                                    //remove
                                        let removeButton = document.createElement('a');
                                        removeButton.setAttribute('class', 'badge badge-pill save_button badge-danger btn btn-sm remove-btn');
                                        removeButton.innerHTML = "remove ";
                                        removeButton.setAttribute('id', item.id);
                                        removeButton.style.cursor = "pointer";

                                            let removeIcon = document.createElement('i');
                                            removeIcon.setAttribute('class', 'text-light fa fa-trash-alt');
                                            removeIcon.style.curser = "pointer";
                                        removeButton.appendChild(removeIcon);

                                        todoActions.appendChild(removeButton);
                                    
                                    let editButton = document.createElement('a');
                                        editButton.setAttribute('class', 'badge badge-pill save_button badge-primary btn btn-sm text-black edit-btn');
                                        editButton.innerHTML = "edit ";
                                        editButton.setAttribute('id', item.id);
                                        editButton.style.marginLeft = "5px";
                                        editButton.style.cursor = "pointer";

                                            let editIcon = document.createElement('i');
                                            editIcon.setAttribute('class', ' text-light fa fa-edit');
                                            editIcon.style.curser = "pointer";
                                            editButton.appendChild(editIcon);

                                        todoActions.appendChild(editButton);
                                    let completeButton = document.createElement('a');
                                        completeButton.setAttribute('class', 'badge badge-pill save_button badge-warning btn btn-sm disabled');
                                        completeButton.innerHTML = "to be completed <i class='text-primary fa fa smile'></i>";
                                        completeButton.setAttribute('id', item.id);
                                        completeButton.style.marginLeft = "5px";
                                        completeButton.style.cursor = "pointer";

                                            let completeIcon = document.createElement('i');
                                            completeIcon.setAttribute('class', 'text-light fa fa-check');
                                            completeIcon.style.curser = "pointer";
                                            completeIcon.style.color = "rgb(97, 248, 9)";
                                            completeButton.appendChild(completeIcon);

                                        todoActions.appendChild(completeButton);

                                    tableRow.appendChild(todoItem);
                                    tableRow.appendChild(todoActions);

                                    document.getElementById("myTodo-table").appendChild(tableRow);
                                    }
                                    else{
                                        let todoActions = document.createElement('td');
                                        todoActions.setAttribute('class', 'text-center');
                                        
                                    //remove
                                        let removeButton = document.createElement('a');
                                        removeButton.setAttribute('class', 'badge badge-pill save_button badge-danger btn btn-sm remove-btn');
                                        removeButton.innerHTML = "remove ";
                                        removeButton.setAttribute('id', item.id);
                                        removeButton.style.cursor = "pointer";

                                            let removeIcon = document.createElement('i');
                                            removeIcon.setAttribute('class', 'text-light fa fa-trash-alt');
                                            removeIcon.style.curser = "pointer";
                                        removeButton.appendChild(removeIcon);

                                        todoActions.appendChild(removeButton);
                                    
                                    let editButton = document.createElement('a');
                                        editButton.setAttribute('class', 'badge badge-pill badge-primary save_button btn btn-sm text-black edit-btn');
                                        editButton.innerHTML = "edit ";
                                        editButton.setAttribute('id', item.id);
                                        editButton.style.marginLeft = "5px";
                                        editButton.style.cursor = "pointer";

                                            let editIcon = document.createElement('i');
                                            editIcon.setAttribute('class', ' text-light fa fa-edit');
                                            editIcon.style.curser = "pointer";
                                            editButton.appendChild(editIcon);

                                        todoActions.appendChild(editButton);
                                    let completeButton = document.createElement('a');
                                        completeButton.setAttribute('class', 'badge badge-pill save_button badge-success btn btn-sm complete-btn');
                                        completeButton.innerHTML = "complete ";
                                        completeButton.setAttribute('id', item.id);
                                        completeButton.style.marginLeft = "5px";
                                        completeButton.style.cursor = "pointer";

                                            let completeIcon = document.createElement('i');
                                            completeIcon.setAttribute('class', 'text-light fa fa-check');
                                            completeIcon.style.curser = "pointer";
                                            completeIcon.style.color = "rgb(97, 248, 9)";
                                            completeButton.appendChild(completeIcon);

                                        todoActions.appendChild(completeButton);

                                    tableRow.appendChild(todoItem);
                                    tableRow.appendChild(todoActions);

                                    document.getElementById("myTodo-table").appendChild(tableRow);
                                }
                            }
                        }
                    }
                    
                    let removeBtn = document.querySelectorAll(".remove-btn");
                    let editBtn = document.querySelectorAll(".edit-btn");
                    let completeBtn = document.querySelectorAll(".complete-btn");

                    for(let removeBtnIndex = 0; removeBtnIndex < removeBtn.length; removeBtnIndex++)
                    {
                        removeBtn[removeBtnIndex].addEventListener("click", function(e){
                            removeToDo(removeBtn[removeBtnIndex].id);
                        });
                    }

                    for(let editBtnIndex = 0; editBtnIndex < editBtn.length; editBtnIndex++)
                    {
                        editBtn[editBtnIndex].addEventListener("click", function(e){
                            editToDo(editBtn[editBtnIndex].id);
                        });
                    }

                    for(let completeBtnIndex = 0; completeBtnIndex < completeBtn.length; completeBtnIndex++)
                    {
                        completeBtn[completeBtnIndex].addEventListener("click", function(e){
                            completeToDo(completeBtn[completeBtnIndex].id);
                        });
                    }
                }
            }
            xhr.onerror = function(b)
            {
                b.preventDefault();
                alertify.set('notifier', 'position', 'top-left');
                alertify.error("some error occured");
            }

            xhr.send();
    }
    
    GetToDos();
    let todoSubmit = document.getElementById("toDo-submit");

    todoSubmit.addEventListener("click",(e) =>
    {
        e.preventDefault();

        var todo = document.getElementById('todo');
   
        var todoDate = document.getElementById('datepicker').value;

        if(todo.value == null || todo.value == "")
        {
            todo.style.borderColor = "red";
            todo.style.borderWidth = "5px";
            todo.setAttribute("placeholder", "ToDo value is required");

            alertify.set('notifier', 'position', 'top-left');
            alertify.error("Todo value is required");
        }
        else{
            todo.style.borderColor = "green";
            todo.style.borderWidth = "0";
      
            SendTodo(todo.value, todoDate);
           
            GetToDos();
        }
    });
    
function randomUUID() {
var s = [], itoh = '0123456789ABCDEF';
for (var i = 0; i < 36; i++) s[i] = Math.floor(Math.random() * 0x10);
s[14] = 4;
s[19] = (s[19] & 0x3) | 0x8;
for (var i = 0; i < 36; i++) s[i] = itoh[s[i]];
s[8] = s[13] = s[18] = s[23] = '_';
return s.join('');
}  