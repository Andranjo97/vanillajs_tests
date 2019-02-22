class ToDo {
  //add comment to tag
  constructor() {
    this.todo = [];
  }

  addTodo(item) {
    this.todo.push(item);
  }

  getItems() {
    return this.todo;
  }

  delete(id) {
    this.todo = this.todo.filter(item => item.id !== id);
  }

  complete(id) {
    this.todo.find(item => item.id === id).complete = true;
  }
}

class DomManipulation {
  init() {
    const form = document.createElement("form");
    const input = document.createElement("input");
    const ul = document.createElement("ul");
    input.id = "AddItemInput";
    form.id = "addItemForm";
    form.appendChild(input);

    return {
      form,
      ul
    };
  }

  displayItem(item) {
    const li = document.createElement("li");
    li.innerText = item.title;
    return li;
  }

  addTodoEvent(form, createTodo, unorderedList) {
    const displayItem = this.displayItem;
    const id = new Date().getUTCMilliseconds();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const input = document.querySelector("input").value;
      const item = { complete: false, id: id, title: input };
      createTodo(item);
      unorderedList.appendChild(displayItem(item));
    });
  }
}
