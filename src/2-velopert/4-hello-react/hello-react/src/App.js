import React, { Component } from 'react';
import Counter from './Counter';

class App extends Component {
  render() {
	const style = {
		backgroundColor: 'black',
		padding: '16px',
		color: 'white',
		fontSize: '12px'
	};
    return (
		<Counter name="리액트" />
    );
  }
}

export default App;
