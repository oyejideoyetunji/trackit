import { domVariables } from './domVariables.js';
import * as eventHandlers from './eventHandlers.js';



const {

    todoForm,
    todoTab,
    doneTab,
    addTodoTab

} = domVariables;


const {
    showTodoList,
    showDoneList,
    showAddTodoBlock,
    getTodoData,
    isShowingTodoExists,
    resetTodoFormValues,
    createTodoTable,
    clearTodoExists
} = eventHandlers;



window.onload = function(){
    showTodoList();
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
    if( isShowingTodoExists() ) return;
    resetTodoFormValues();
    createTodoTable();
});

todoForm.addEventListener('reset', (event) => {
    clearTodoExists();
});
