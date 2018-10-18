import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class DialogInput extends Component {
  static defaultProps = {
    open: false,
    onCreate: () => { console.warn('onCreate is not defined'); },
    onClose: () => { console.warn('onClose is not defined'); }
  }
  state = {
    content: '',
    detailContent: ''
  }
  
  handleChange = (e) => {
    const data = this.state;
    this.setState({
      ...data,
      [e.target.name]: e.target.value
    });
  };
  handleCreate = () => {
    const { onCreate } = this.props;
    const data = this.state;
    onCreate(data);
    this.handleClose();
  };
  handleClose = () => {
    const { onClose } = this.props;
    onClose();
  };
  
  render() {
    return (
      <Dialog
        aria-labelledby="add-todo-dialog"
        open={this.props.open}
        onClose={this.handleClose}>
        <DialogTitle>Add New TODO</DialogTitle>
        <DialogContent>
          <TextField
            name="content"
            label="Todo name"
            variant="outlined"
            fullWidth
            margin="normal"
            autoFocus
            onChange={this.handleChange}
          />
          <TextField
            name="detailContent"
            label="Details"
            variant="outlined"
            multiline
            rows="10"
            fullWidth
            onChange={this.handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={this.handleCreate}>
            Add
          </Button>
          <Button
            color="secondary"
            onClick={this.handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DialogInput;
