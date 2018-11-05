import React, { Component } from "react";
import TodoItem from "./TodoItem";
import todoStore from "../stores/TodoStore";
import { observer } from "mobx-react";

@observer
class TodoItems extends Component {

  render() {
    return (
      <section className="main">

      {/* <input className='toggle-all' type='check-box'></input>
      <label></label> */}

        <ul className="todo-list">
          {todoStore.todos.map(todo => {
            return <TodoItem todo={todo}   />;
          })}
        </ul>
      </section>
    );
  }
}
export default TodoItems;
