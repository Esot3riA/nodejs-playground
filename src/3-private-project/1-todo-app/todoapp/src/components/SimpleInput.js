import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';

const styles = theme => ({
  inputForm: {
    marginTop: theme.spacing.unit * 3,
    textAlign: "center"
  },
  textField: {
    width: '72%',
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 400
    }
  }
});

class SimpleInput extends Component {
  
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
    const { classes } = this.props;
    return (
      <form className={classes.inputForm} onSubmit={this.handleSubmit}>
        <Input
          name="content"
          placeholder="Input new T0D0..."
          value={this.state.content}
          className={classes.textField}
          onChange={this.handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Input new todo"
                onClick={this.handleSubmit}>
                <Add />
              </IconButton>
            </InputAdornment>
          }
          />
      </form>
    );
  }
  
}

export default withStyles(styles)(SimpleInput);
