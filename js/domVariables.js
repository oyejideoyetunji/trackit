const todoForm = document.forms['todo-frm'];

export const domVariables = {

    todoForm: todoForm,
    todoTitle : todoForm['title'],
    todoDate : todoForm['date'],

    todoTab : document.getElementById('todo-tab'),
    doneTab : document.getElementById('done-tab'),
    addTodoTab : document.getElementById('add-todo-tab'),

    todoTableBlock : document.getElementById('todo-table-wrp'),
    todoTable : document.getElementById('todo-table'),
    doneTableBlock : document.getElementById('done-table-wrp'),
    doneTable : document.getElementById('done-table'),
    addTodoBlock : document.getElementById('add-todo-block'),

    doneStatusBar : document.getElementById('done-status'),
    errorStatusBar : document.getElementById('error-status')

};