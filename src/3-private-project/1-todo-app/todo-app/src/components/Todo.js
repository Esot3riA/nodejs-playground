import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  
  static defaultProps = {
		info: {
			id: 0,
      content: 'content',
      checked: false
    }
	}

  handleToggleCheck = () => {
    const { onUpdate } = this.props;
    const { id, checked } = this.props.info;
    onUpdate(id, {
      checked: !checked
    });
  }
  handleRemove = () => {
    const { onRemove } = this.props;
    const { id } = this.props.info;
    onRemove(id);
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    // Check content is changed.
    if (this.props.info.id !== nextProps.info.id)
      return true;
    // Check 'checked' property is changed.
    if (this.props.info.checked !== nextProps.info.checked)
      return true;
    return false;
  }

  render() {
    const { id } = this.props.info;
    console.log('component ' + id + ' is rendered.');
    const { content, checked } = this.props.info;
    return (
      <div className="todo-element-wrap">
        {
          !checked
          ? (<span className="todo-content">* {content}</span>)
          : (<span className="todo-content checked">* {content}</span>)
        }
        <button onClick={this.handleToggleCheck}>체크</button>
        <button onClick={this.handleRemove}>삭제</button>
      </div>
    );
  }
  
}

export default Todo;
