function GetReminders()
    {
        document.getElementById("myReminder-table").innerHTML = "";
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
                            document.getElementById("reminder-panel").style.overflowY = "scroll";
                        }
                        else{
                            document.getElementById("reminder-panel").style.overflowY = "hidden";
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
                                    let reminderActions = document.createElement('td');
                                    reminderActions.setAttribute('class', 'text-center');
                                        
                                    //remove
                                    let reminderButton = document.createElement('a');
                                    reminderButton.setAttribute('class', 'badge badge-pill save_button badge-secondary disabled btn btn-sm');
                                    reminderButton.innerHTML = "Task completed ";
                                    reminderButton.setAttribute('id', item.id);
                                    reminderButton.style.cursor = "pointer";

                                        let reminderIcon = document.createElement('i');
                                        reminderIcon.setAttribute('class', 'text-light fa fa-bell');
                                        reminderIcon.style.curser = "pointer";
                                    reminderButton.appendChild(reminderIcon);

                                    reminderActions.appendChild(reminderButton);
                                    
                                   
                                    tableRow.appendChild(todoItem);
                                    tableRow.appendChild(reminderActions);

                                    document.getElementById("myReminder-table").appendChild(tableRow);
                                }
                                else{

                                    if((y < year) || (m < month && y == year) || (d < day && (m == month || m < month) && (y == year || y < year)) )
                                    {
                                        let reminderActions = document.createElement('td');
                                    reminderActions.setAttribute('class', 'text-center');
                                        
                                    //remove
                                    let reminderButton = document.createElement('a');
                                    reminderButton.setAttribute('class', 'badge badge-pill save_button badge-secondary disabled btn btn-sm');
                                    reminderButton.innerHTML = "Date Passed ";
                                    reminderButton.setAttribute('id', item.id);
                                    reminderButton.style.cursor = "pointer";

                                        let reminderIcon = document.createElement('i');
                                        reminderIcon.setAttribute('class', 'text-light fa fa-bell');
                                        reminderIcon.style.curser = "pointer";
                                    reminderButton.appendChild(reminderIcon);

                                    reminderActions.appendChild(reminderButton);
                                    
                                   
                                    tableRow.appendChild(todoItem);
                                    tableRow.appendChild(reminderActions);

                                    document.getElementById("myReminder-table").appendChild(tableRow);
                                    }
                                    else{
                                        let reminderActions = document.createElement('td');
                                        reminderActions.setAttribute('class', 'text-center');
                                            
                                        //remove
                                        let reminderButton = document.createElement('a');
                                        reminderButton.setAttribute('class', 'badge badge-pill save_button badge-primary btn btn-sm reminder-btn');
                                        reminderButton.innerHTML = "set a reminder ";
                                        reminderButton.setAttribute('id', item.id);
                                        reminderButton.style.cursor = "pointer";

                                            let reminderIcon = document.createElement('i');
                                            reminderIcon.setAttribute('class', 'text-light fa fa-bell');
                                            reminderIcon.style.curser = "pointer";
                                        reminderButton.appendChild(reminderIcon);

                                        reminderActions.appendChild(reminderButton);
                                        
                                    
                                        tableRow.appendChild(todoItem);
                                        tableRow.appendChild(reminderActions);

                                        document.getElementById("myReminder-table").appendChild(tableRow);
                                    }
                                }
                        }
                    }
                    
                    let reminderBtn = document.querySelectorAll(".reminder-btn");
                   
                    for(let reminderBtnIndex = 0; reminderBtnIndex < reminderBtn.length; reminderBtnIndex++)
                    {
                        reminderBtn[reminderBtnIndex].addEventListener("click", function(e){
                            removeToDo(reminderBtn[reminderBtnIndex].id);
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

    document.getElementById("reminderBtn").addEventListener(('click'), () =>{
        GetReminders();
    });