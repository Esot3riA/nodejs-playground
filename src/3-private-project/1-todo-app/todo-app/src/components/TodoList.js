import React, { Component } from 'react';
import './TodoList.css';
import Todo from './Todo';

class TodoList extends Component {
  
  static defaultProps = {
    data: [],
    onUpdate: () => console.warn('onUpdate is not defined'),
    onRemove: () => console.warn('onRemove is not defined')
  }
  
  render() {
    const { data, onUpdate, onRemove } = this.props;
    const list = data.map(
      todo => (<Todo info={todo}
                 onUpdate={onUpdate}
                 onRemove={onRemove}/>));
    return (
      <div id="todolist" className="todolist">
        {list}
      </div>
    );
  }
  
}

export default TodoList;
