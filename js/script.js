$(document).ready(function () {
  // CRUD Todos
  // [1]
  createTodo();
});

// CRUD
//[1]
function createTodo() {
  $('.add-todo .btn').click(function (event) {
    event.preventDefault();
    const todo = $('.template--todo').children().clone();
    $('.todos').prepend(todo);

    createInput(todo.children('.text'));
  });
}

//[2]
function createInput(todo) {
  const textTodo = $(todo).children('.todotext').text();
  const input = $('.template--text').children().clone();
  todo.children('.todo__text').html(input);
  input.val(textTodo).focus().focusout(function (event){
    console.log(event.currentTarget);
    const input = $(this);
    if(textTodo.trim().length > 0){

    } 

  })
}
