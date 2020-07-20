import { domVariables } from './domVariables.js';


const {
    todoForm, 
    todoTitle,
    todoDate,

    todoTableBlock,
    todoTable,
    doneTableBlock,
    doneTable,
    addTodoBlock,
        
    doneStatusBar, 
    errorStatusBar,

} = domVariables;


let todoListArray = [];
let doneListArray = [];
let todoToUpdate = null;



export function showAddTodoBlock(){
    clearTodoExists();
    addTodoBlock.style.display = 'block';
    todoTableBlock.style.display = 'none';
}

export function showTodoList(){
    todoToUpdate = null;
    todoForm.removeEventListener('submit', removeFormerVersionOfTodo);
    doneTableBlock.style.display = 'none';
    addTodoBlock.style.display = 'none';
    todoTableBlock.style.display = 'table';
}

export function showDoneList(){
    todoToUpdate = null;
    todoForm.removeEventListener('submit', removeFormerVersionOfTodo);
    todoTableBlock.style.display = 'none';
    addTodoBlock.style.display = 'none';
    doneTableBlock.style.display = 'table';

    (doneListArray.length < 1) ?
        doneStatusBar.style.display = 'block' :
        doneStatusBar.style.display = 'none';
}

export function showTodoExists(){
    errorStatusBar.innerText = "Todo already exist";
}

export function clearTodoExists(){
    errorStatusBar.innerText = '';
}

export function isShowingTodoExists(){
    return (errorStatusBar.innerText !== '');
}

function hasDuplicate(element, array){
    if(array.length < 1) return false;
    let elementIndex = array.findIndex((item) =>{
        return (item.title == element.title && item.date == element.date);
    });

    return elementIndex < 0 ? false : true;
}

export function getTodoData(){
    errorStatusBar.innerText = '';
    let todoObj = {};
    if(todoTitle.value == '' || todoDate.value == '') return;
    todoObj.title = todoTitle.value;
    todoObj.date = todoDate.value;
    hasDuplicate(todoObj, todoListArray) ?
        showTodoExists() :
        todoListArray.push(todoObj);
    return
}

export function resetTodoFormValues(){
    todoTitle.value = "";
    todoDate.value = "";
}

function removeFormerVersionOfTodo(event){
    todoListArray.splice(todoListArray.indexOf(todoToUpdate), 1);
    createTodoTable();
    event.currentTarget.removeEventListener(event.type, removeFormerVersionOfTodo);
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
        });
    });
}

export function createTodoTable(){
    if(todoListArray.length < 1) return;

    todoTable.innerHTML = '';

    todoListArray.map((todoData) =>{
        let row = document.createElement('div');
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        let p3 = document.createElement('p');
        let btn1 = document.createElement('button');
        let btn2 = document.createElement('button');
        btn1.setAttribute('class', 'bg-blue-var tab title-lft');
        btn2.setAttribute('class', 'bg-blue-var tab title-rt');

        let txt1 = document.createTextNode(todoData.title);
        let txt2 = document.createTextNode(`On/Before: ${todoData.date}`);
        let txt3 = document.createTextNode('update Todo');
        let txt4 = document.createTextNode('move to completed');

        p1.appendChild(txt1);
        p2.appendChild(txt2);
        btn1.appendChild(txt3);
        btn2.appendChild(txt4);
        p3.appendChild(btn1);
        p3.appendChild(btn2);

        row.appendChild(p1);
        row.appendChild(p2);
        row.appendChild(p3);
        todoTable.appendChild(row);

        btn1.addEventListener('click', (event)=>{
            todoTitle.value = todoData.title;
            todoDate.value = todoData.date;
            todoToUpdate = todoData;
            showAddTodoBlock();
            todoForm.addEventListener('submit', removeFormerVersionOfTodo);
        })

        btn2.addEventListener('click', (event)=>{
            doneListArray.push(todoData);
            todoListArray.splice(todoListArray.indexOf(todoData), 1);
            row.parentNode.removeChild(row);
            createDoneTable();
        });
    });
}