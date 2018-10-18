import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class CreateSnackbar extends Component {
  
  static defaultProps = {
    open: false,
    onClose: () => { console.log('onClose is not defined'); } 
  };

  handleClose = () => {
    const { onClose } = this.props;
    onClose();
  }

  render() {
    const { open } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={1500}
        onClose={this.handleClose}
        message={'New T0D0 Created.'}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>]}
      />
    );
  };
  
}

export default CreateSnackbar;