import React, { Component } from 'react';
import Logo from './components/Logo';
import InputForm from './components/InputForm';
import TodoList from './components/TodoList';

class App extends Component {
  
  id = 2
	state = {
		information: [
			{
				id: 0,
				content: 'Make react todo app',
        checked: false
			},
			{
				id: 1,
				content: 'Make Nodap Archive',
        checked: false
			}
		]
	}

  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data, checked: false })
    });
  }
  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
        info => id === info.id
        ? { ...info, ...data }
        : info
      )
    });
  }
  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    });
  }

  render() {
    const { information } = this.state;
    return (
      <div className="App">
        <Logo />
        <hr />
        <InputForm
          onCreate={this.handleCreate}
        />
        <TodoList
          data={information}
          onUpdate={this.handleUpdate}
          onRemove={this.handleRemove}
        />
      </div>
    );
  }
}

export default App;
