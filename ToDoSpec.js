describe('Testing the functionality,  this is the checklist', () => {
    let todo, item, item2;
    beforeEach(() => {
        todo = new ToDo();
        item = {
            id: 1,
            title: 'get milk 1',
            complete: false
        };
        item2 = {
            id: 2,
            title: 'get milk 2',
            complete: false
        };
    });

    it('should add an item', () => {
        todo.addTodo(item);
        expect(todo.getItems().length).toBe(1);
    });

    it('should delete an item', () => {
        todo.addTodo(item);
        todo.addTodo(item2);
        todo.delete(2);
        expect(todo.getItems()[todo.getItems().length-1].id).toBe(1)
    });

    it('should mark item as complete', () =>{
        todo.addTodo(item);
        todo.addTodo(item2);
        todo.complete(2);
        expect(todo.getItems().find(item => item.id == 2).complete).toBe(true);
    });
});

describe('Testing DOM manipulation', () => {
    let Dom, item, todo;
    beforeEach(() => {
        todo = new ToDo();
        Dom = new DomManipulation();
        item = {
            complete: false,
            id : 1,
            title: 'some Title'
        }
    });

    it('should initialise HTML', () => {
        const form = document.createElement('form');
        const input = document.createElement('input');
        const ul = document.createElement('ul');
        input.id = "AddItemInput";
        form.id = "addItemForm";
        form.appendChild(input);
        expect(Dom.init().form).toEqual(form);
        expect(Dom.init().ul).toEqual(ul);
    });

    it('should create item', () => {
        const element = Dom.displayItem(item);
        const result = document.createElement('li');
        result.innerText = item.title;
        expect(element).toEqual(result);
    });

    it('should trigger form and add item to todo array', function(){
        const form = document.createElement('form');
        form.innerHTML= `<input value="get milk" />
      <button type="submit" />`;
        document.body.appendChild(form);
        const ul = document.createElement('ul');
        Dom.addTodoEvent(
            form,
            todo.addTodo.bind(todo),
            ul);
        form.getElementsByTagName('button')[0].click();
        document.body.removeChild(form);
        expect(todo.todo[0].title).toEqual('get milk')
    });
});
