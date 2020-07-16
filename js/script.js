/**
 * DOM Variables
 */

const todoForm = document.forms['todo-frm'];
const todoTitle = todoForm['title'];
const todoDate = todoForm['date'];

const todoTab = document.getElementById('todo-tab');
const doneTab = document.getElementById('done-tab');
const addTodoTab = document.getElementById('add-todo-tab');

const todoTableBlock = document.getElementById('todo-table-wrp');
const todoTable = document.getElementById('todo-table');
const doneTableBlock = document.getElementById('done-table-wrp');
const doneTable = document.getElementById('done-table');
const addTodoBlock = document.getElementById('add-todo-block');
const doneStatusBar = document.getElementById('done-staus');


let todoListArray = [];
let doneListArray = [];

window.onload = function(){
    todoTableBlock.style.display = 'table';
};

todoTab.addEventListener('click', (event)=>{
    showTodoList();
});

doneTab.addEventListener('click', (event)=>{
    showDoneList();
});

addTodoTab.addEventListener('click', (event)=>{
    showAddTodoBlock();
});

todoForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    getTodoData();
    resetTodoFormValues();
    createTodoTable();
});



function showAddTodoBlock(){
    addTodoBlock.style.display = 'block';
    todoTableBlock.style.display = 'none';
}

function showTodoList(){
    doneTableBlock.style.display = 'none'
    addTodoBlock.style.display = 'none';
    todoTableBlock.style.display = 'table';
}

function showDoneList(){
    todoTableBlock.style.display = 'none';
    addTodoBlock.style.display = 'none';
    doneTableBlock.style.display = 'table';

    (doneListArray.length < 1) ?
        doneStatusBar.style.display = 'block' :
        doneStatusBar.style.display = 'none';
}

function getTodoData(){
    let todoObj = {};
    if(todoTitle.value == '' || todoDate.value == '') return;
    todoObj.title = todoTitle.value;
    todoObj.date = todoDate.value;
    todoListArray.push(todoObj);
}

function resetTodoFormValues(){
    todoTitle.value = "";
    todoDate.value = "";
}

function createDoneTable(){
    if(doneListArray.length < 1) return;

    doneTable.innerHTML = '';

    doneListArray.map((doneData) =>{
        let row = document.createElement('div');
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        let p3 = document.createElement('p');
        let btn = document.createElement('button');
        btn.setAttribute('class', 'bg-blue-var');

        let txt1 = document.createTextNode(doneData.title);
        let txt2 = document.createTextNode(`Expired at: ${doneData.date}`);
        let txt3 = document.createTextNode('delete');

        p1.appendChild(txt1);
        p2.appendChild(txt2);
        btn.appendChild(txt3);
        p3.appendChild(btn);

        row.appendChild(p1);
        row.appendChild(p2);
        row.appendChild(p3);
        doneTable.appendChild(row);

        btn.addEventListener('click', (event)=>{
            doneListArray.splice(doneListArray.indexOf(doneData), 1);
            row.parentNode.removeChild(row);

            (doneListArray.length < 1) ?
            doneStatusBar.style.display = 'block' :
            doneStatusBar.style.display = 'none';

            console.log(todoListArray, doneListArray);
        });
    });
}

function createTodoTable(){
    if(todoListArray.length < 1) return;

    todoTable.innerHTML = '';

    todoListArray.map((todoData) =>{
        let row = document.createElement('div');
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        let p3 = document.createElement('p');
        let btn = document.createElement('button');
        btn.setAttribute('class', 'bg-blue-var tab');

        let txt1 = document.createTextNode(todoData.title);
        let txt2 = document.createTextNode(`On/Before: ${todoData.date}`);
        let txt3 = document.createTextNode('move to done');

        p1.appendChild(txt1);
        p2.appendChild(txt2);
        btn.appendChild(txt3);
        p3.appendChild(btn);

        row.appendChild(p1);
        row.appendChild(p2);
        row.appendChild(p3);
        todoTable.appendChild(row);

        btn.addEventListener('click', (event)=>{
            doneListArray.push(todoData);
            todoListArray.splice(todoListArray.indexOf(todoData), 1);
            row.parentNode.removeChild(row);
            createDoneTable()
        });
    });
}

