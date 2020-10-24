'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed'),
      headerButton = document.querySelector('.header-button');

let todoData = [];

const render = function () {
  todoList.textContent = '';
  todoCompleted.textContent = '';
  headerInput.value = '';

  let storage = localStorage.getItem('TodoList');
  todoData = JSON.parse(storage);
  todoData.forEach(function(item, i, arr){
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
    '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
    '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoCompleted = li.querySelector('.todo-complete'),
          btnTodoRemove = li.querySelector('.todo-remove');

    btnTodoCompleted.addEventListener('click', function () {
      item.completed = !item.completed;
      localStorage.removeItem('TodoList');
      localStorage.setItem('TodoList', JSON.stringify(arr));
      render();
    });
    btnTodoRemove.addEventListener('click', function () {
      arr.splice((i-1), 1);
      localStorage.removeItem('TodoList');
      localStorage.setItem('TodoList', JSON.stringify(arr));
      render();
    });
  });
};

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();

  const newTodo = {
    value: headerInput.value,
    completed: false,
  };

  if (newTodo.value.trim() === '') {
    headerButton.disabled = true;
    return;
  }

  
  todoData.push(newTodo);
  let list = JSON.stringify(todoData);
  localStorage.setItem('TodoList', list);
  render();
});

todoControl.addEventListener('input', function () {
  if (headerInput.value.trim() !== '') {
    headerButton.disabled = false;
  }
});



render();