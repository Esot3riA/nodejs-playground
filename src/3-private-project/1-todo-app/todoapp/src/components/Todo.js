import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  
  static defaultProps = {
    key: 0,
		info: {
			_id: 0,
      content: 'content',
      checked: false,
      created: ''
    }
	}

  handleToggleCheck = () => {
    const { onUpdate } = this.props;
    const { _id, checked } = this.props.info;
    onUpdate(_id, {
      checked: !checked
    });
  }
  handleRemove = () => {
    const { onRemove } = this.props;
    const { _id } = this.props.info;
    onRemove(_id);
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    // Check content is changed.
    if (this.props.info._id !== nextProps.info._id)
      return true;
    // Check 'checked' property is changed.
    if (this.props.info.checked !== nextProps.info.checked)
      return true;
    return false;
  }

  render() {
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
