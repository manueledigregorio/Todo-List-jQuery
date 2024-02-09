$(document).ready(function () {
  //Dropdown Todos
  //[4]a
  dropdown();

  // CRUD Todos
  //[1]
  createTodo();
  //[6]
  updateTodo();
  //[3]
  saveTodo();
  //[5]
  doneTodo();
  //[4]b
  deleteTodo();
  // [7]
  searchTodo();
});

// CRUD
//[1] clone, preventDefault
function createTodo() {
  $('.add-todo .btn').click(function (event) {
    event.preventDefault();
    //clone
    let todo = $('.template--todo').children().clone();
    $('.todos').prepend(todo);
    createInput(todo.children('.text'));
  });
}

//[3] save document.on end events
function saveTodo() {
  //save on enter
  $(document).on('keypress', '.todo__text__input', (function (event) {
    if (event.keyCode === 13) {
      let input = $(event.target);
      if (input.val().trim().length > 0) {
        $(input).parent().html(input.val());
      } else {
        $(this).parents('li').remove();
      }
    }
  }));
}

//[4b] delete remove
function deleteTodo() {
  $(document).on('click', '.button-todo--delete', function () {
    $(this).parents('.todos__item').remove();
  });
}

//[5] document.on for dynamic elements
function doneTodo() {
  $(document).on('click', '.button--done', function () {
    let parent = $(this).parents('li');
    let todosContainer = $('.todos');

    if (parent.hasClass('todo--done')) {
      parent.removeClass('todo--done');
      todosContainer.prepend(parent);
    } else {
      parent.addClass('todo--done');
      todosContainer.append(parent);
    }
  });
}

//[6] Update
// Now we update todo
function updateTodo() {
  $(document).on('dblclick', '.todos__item .text', function () {
    const todoText = $(this);
    if (!todoText.parents('.todos__item').hasClass('.todo--done')) {
      createInput(todoText);
    }
  });

  $(document).on('click', '.button-todo--modify', function () {
    const todoText = $(this).parents('.todos__item').children('.text');
    createInput(todoText);
    $(this).parents('.todo__item__menu__dropdown').removeClass('active');
    $(this).parents('.todo__item__menu').removeClass('active');
  });
}

// Other functions
//[4a] document.on
function dropdown() {
  //traversing
  $(document).on('click', '.other-items', function () {
    $(this).parent('.todo__item__menu').toggleClass('active');
    $(this).next('.todo__item__menu__dropdown').toggleClass('active');
  });

  //are we on dropdown area?
  $(document).on('mouseup', function (event) {
    const isOnDropDown =
      $(event.target).parents('.todo__item__menu').hasClass('active')
      ||
      $(event.target).parents('.todo__item__menu__dropdown').hasClass('active');

    if (!isOnDropDown) {
      $('.todo__item__menu').removeClass('active');
      $('.todo__item__menu__dropdown').removeClass('active');
    }
  });
}


//[2] traversing and events concatenation
function createInput(todo) {
  // we save into a variable actual text, we will use later also for updating
  let text = $(todo).children('.todo__text').text();
  //we delete html content of this todo
  $(todo).children('.todo__text').html('');

  //clone the input template
  let input = $('.template--text').children().clone();
  //and append into todo active
  $(todo).children('.todo__text').append(input);

  // events on input with concatenation
  // now we insert into the input the saved text
  input
    .val(text)
    //focus on input
    .focus()
    //when we focusout with mouse
    .focusout(function (event) {
      let input = $(event.target);
      //we check if input is empty
      if (input.val().trim().length === 0 || text.trim().length === 0) {
        //in this case we remove
        $(this).parents('li').remove();
      } else if (input.val().trim().length > 0 || text.trim().length > 0) {
        //else we insert the old text into the todo
        $(input).parent().html(text);
      }
    })
    //if we press esc and no text remove, else reset
    .keyup(function (event) {
      const input = $(this);
      if (
        (event.keyCode === 27 && input.val().trim().length === 0)
        ||
        (event.keyCode === 27 && text.trim().length === 0)
      ) {
        input.parents('.todos__item').remove();
      } else if (event.keyCode === 27 && input.val().trim().length > 0) {
        input.parent().text(text);
      }
    })
}

//[7] each and on with object
//Now we search for todos in list
function searchTodo() {
  const searchBar = $('.header__search');

  searchBar.on({
    'click': function () {
      $(this).addClass('active').children('.search').focus();
    },
    'focusout': function () {
      $(this).removeClass('active');
    }
  });

  searchBar.children('.search').on('keyup', function () {
    const text = $(this).val().toLowerCase();
    const todos = $('.todos .todos__item');

    todos.each(function (index) {
      const textTodo = $(this).find('.todo__text');
      const textTodoValue = textTodo.text();
      const position = textTodoValue.toLowerCase().indexOf(text);

      if (position !== -1) {
        $(this).removeClass('hidden');
        const before = textTodoValue.slice(0, position);
        const after = textTodoValue.slice(position + text.length);
        const textToHighlight = textTodoValue.slice(position, position + text.length);

        const newText = `${before}<span class="highlights">${textToHighlight}</span>${after}`;

        textTodo.html(newText);

      } else {
        $(this).addClass('hidden');
      }
    });
  });
}