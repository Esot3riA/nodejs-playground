import React, { Component } from 'react';
import SimpleInput from './components/SimpleInput';
import TodoList from './components/TodoList';
import axios from 'axios';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AddTooltip from './components/AddTooltip';
import DialogInput from './components/DialogInput';
import CreateSnackbar from './components/CreateSnackbar';

const styles = theme => ({
  main: {
    width: 'auto',
    marginTop: theme.spacing.unit * 2 * 4,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: { padding: theme.spacing.unit * 3 },
  divider: { marginTop: theme.spacing.unit * 2 },
  list: { },
});

class App extends Component {
  
  // todoapp-server url.
  restAPIURL = 'https://esot3ria-server.run.goorm.io';
  
	state = {
		information: [
			{
				_id: 0,
				content: '-',
        detailContent: '-',
        checked: false,
        created: ''
			}
		],
    isDialogOpen: false,
    isSnackbarOpen: false
	};

  reloadInfos = () => {
    axios.get(this.restAPIURL + "/todos").then(response => {
      this.setState({
        ...this.state,
        information: response.data
      });
    });
  };

  handleCreate = (data) => {
    axios.post(this.restAPIURL + "/todos", {
      ...data,
      checked: false
    }).then(response => {
      this.reloadInfos();
      this.handleSnackbarOpen();
    });
  };
  handleUpdate = (_id, data) => {
    axios.put(this.restAPIURL + "/todos/" + _id, {
      checked: data.checked
    }).then(response => {
      this.reloadInfos();
    });
  };
  handleRemove = (_id) => {
    axios.delete(this.restAPIURL + "/todos/" + _id).then(response => {
      this.reloadInfos();
    });
  };

  handleDialogOpen = () => {
    this.setState({
      ...this.state,
      isDialogOpen: true
    });
  };
  handleDialogClose = () => {
    this.setState({
      ...this.state,
      isDialogOpen: false
    });
  };

  handleSnackbarOpen = (message) => {
    this.setState({
      ...this.state,
      isSnackbarOpen: true
    });
  }
  handleSnackbarClose = () => {
    this.setState({
      ...this.state,
      isSnackbarOpen: false
    });
  }

  componentDidMount() {
    this.reloadInfos();
  };

  // TODO lists
  // * Support empty todo message
  // * Change > icon to checkbox icon, and replace check to it
  // * Add todo weight
  render() {
    const { classes } = this.props;
    const { information } = this.state;
    const { isDialogOpen, isSnackbarOpen } = this.state;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="display1" color="inherit" align="center">
            EsoT0D0
          </Typography>
          <Divider className={classes.divider}/>
          <SimpleInput onCreate={this.handleCreate}/>
          <TodoList
            className={classes.list}
            data={information}
            onUpdate={this.handleUpdate}
            onRemove={this.handleRemove}
          />
        </Paper>
        <AddTooltip onOpen={this.handleDialogOpen} />
        <DialogInput
          open={isDialogOpen}
          onCreate={this.handleCreate}
          onClose={this.handleDialogClose}
        />
        <CreateSnackbar
          open={isSnackbarOpen}
          onClose={this.handleSnackbarClose}
        />
      </main>
    );
  }
}

export default withStyles(styles)(App);