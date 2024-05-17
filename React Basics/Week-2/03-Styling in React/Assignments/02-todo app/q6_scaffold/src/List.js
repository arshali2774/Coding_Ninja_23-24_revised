import { Component } from 'react';
import { Todo } from './Todo';

export class List extends Component {
  render() {
    return (
      <div className='list'>
        {/* Render the todo here from the props*/}
        {this.props.todos.map((todo) => (
          <Todo key={todo.id} todo={todo} onRemove={this.props.onRemove} />
        ))}
      </div>
    );
  }
}
