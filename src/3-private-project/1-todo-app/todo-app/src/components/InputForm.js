import React, { Component } from 'react';
import './InputForm.css';

class InputForm extends Component {
  
  static defaultProps = {
    onCreate: () => { console.log('onCreate is not defined'); }
  }
  
  state = {
    content: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { onCreate } = this.props;
    onCreate(this.state);
    this.setState({
      content: ''
		});
  }

  render () {
    return (
      <div id="inputForm-wrap" className="form-inputbox">
        <form id="inputForm" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="content"
            value={this.state.content}
            onChange={this.handleChange}
            placeholder="Please input new TODO..." />
          <button type="submit">추가</button>
        </form>
      </div>
    );
  }
  
}

export default InputForm;
