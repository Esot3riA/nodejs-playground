import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  }
});

class AddTooltip extends Component {
  static defaultProps = {
    onOpen: () => { console.warn('onOpen is not defined'); }
  }
  
  handleClick = () => {
    const { onOpen } = this.props;
    onOpen();
  }

  render() {
    const { classes } = this.props;
    return (
      <Tooltip title="New T0D0">
        <Button
          variant="fab"
          color="primary"
          className={classes.absolute}
          onClick={this.handleClick}>
          <AddIcon />
        </Button>
      </Tooltip>
    );
  }
}

export default withStyles(styles)(AddTooltip);