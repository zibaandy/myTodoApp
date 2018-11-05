import { action, observable, computed, autorun } from "mobx";
import TodoModel from "./TodoModel";

class TodoStore {
  @observable
  todos = [];
  lastId = 0;

  @observable
  todosA = [];

  @action
  addTodo(title) {
    this.todos = this.todosA;
    // this.lastId=this.lastId+1
    this.todos.push(new TodoModel(this, title, false, this.lastId++, false));

  //  console.log("lastId: " + this.lastId);
    this.todosA = this.todos;
    this.todosA.forEach(todo => {
    //  console.log(" id: " + todo.id + " => title: " + todo.title);
    });
  }

  @action
  //روش اول
  // for (let i = 0; i < this.todosA.length; i++) {
  //   if (this.todosA[i].destroy === true) {

  //     this.todosA.remove(this.todosA[i]);

  //     this.todosA.forEach(todo => {
  //       if (todo.id > i) {
  //         console.log(todo.id)
  //         todo.id = todo.id - 1;
  //       } else if (todo.id < i) {

  //         todo.id = todo.id;
  //       }
  //       this.lastId = this.lastId--;
  //     });

  //     i = i - 1;
  //   }
  //   else{

  //   }
  //   this.todos=this.todosA
  // }

  //  }

  //روش دوم
  removeTodo(myid) {
    console.log("destroy id: " + myid);
    this.todosA.remove(this.todosA[myid]);
    this.lastId = this.lastId - 1;
    this.todosA.forEach(todo => {
      if (todo.id > myid) {
        todo.id = todo.id - 1;
      } else if (todo.id < myid) {
        todo.id = todo.id;
      }
    });

    //  console.log("newlastId: " + this.lastId);

    this.todos = this.todosA;
  }

  @action
  All() {
    autorun(() => {
      this.todos = this.todosA.filter(todo => todo.completed !== "");
    });
  }
  @action
  Active() {
    autorun(() => {
      this.todos = this.todosA.filter(todo => todo.completed === false);
    });
  }

  @action
  Complete() {
    autorun(() => {
      this.todos = this.todosA.filter(todo => todo.completed === true);
    });
  }

  @action
  Clear() {
    for (let i = 0; i < this.todosA.length; i++) {
      if (this.todosA[i].completed === true) {
        this.todosA.remove(this.todosA[i]);
        this.todosA.forEach(todo => {
          if (todo.id > i) {
            todo.id = todo.id - 1;
          } else if (todo.id < i) {
            todo.id = todo.id;
          }
        });
        this.lastId--;
        i--;
      }
    }

    this.todos = this.todosA;
  }

  // @computed
  // get numOfTodos() {
  //   return this.todosA.length;
  // }
}
const todoStore = new TodoStore();
export default todoStore;
