import React, { Component } from 'react';
import Logo from './components/Logo';
import InputForm from './components/InputForm';
import TodoList from './components/TodoList';
import axios from 'axios';

class App extends Component {
  
	state = {
		information: [
			{
				_id: 0,
				content: '-',
        checked: false,
        created: ''
			}
		]
	}

  refreshInfos = () => {
    const apiURL = 'https://esot3ria-server.run.goorm.io';
    axios.get(apiURL + "/todos").then(response => {
      this.setState({
        information: response.data
      });
    });
  }
  handleCreate = (data) => {
    const apiURL = 'https://esot3ria-server.run.goorm.io';
    axios.post(apiURL + "/todos", {
      content: data.content,
      checked: false
    }).then(response => {
      this.refreshInfos();
    });
  }
  handleUpdate = (_id, data) => {
    const apiURL = 'https://esot3ria-server.run.goorm.io';
    axios.put(apiURL + "/todos/" + _id, {
      checked: data.checked
    }).then(response => {
      this.refreshInfos();
    });
  }
  handleRemove = (_id) => {
    const apiURL = 'https://esot3ria-server.run.goorm.io';
    axios.delete(apiURL + "/todos/" + _id).then(response => {
      this.refreshInfos();
    });
  }

  componentDidMount() {
    this.refreshInfos();
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
