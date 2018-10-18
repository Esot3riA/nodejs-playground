import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ArrowRight from '@material-ui/icons/ArrowRight';
import Done from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  deleteIcon: { color: "Crimson" },
  done: { color: 'green' },
  todoText: { 
    overflowX: 'hidden',
    textOverflow: 'ellipsis'
  },
  doneText: { textDecoration: "line-through" }
});

class Todo extends Component {
  
  static defaultProps = {
    key: 0,
		information: {
			_id: 0,
      content: 'content',
      checked: false,
      created: ''
    }
	}

  handleToggleCheck = () => {
    const { onUpdate } = this.props;
    const { _id, checked } = this.props.information;
    onUpdate(_id, {
      checked: !checked
    });
  }
  handleRemove = () => {
    const { onRemove } = this.props;
    const { _id } = this.props.information;
    onRemove(_id);
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    // Check content is changed.
    if (this.props.information._id !== nextProps.information._id)
      return true;
    // Check 'checked' property is changed.
    if (this.props.information.checked !== nextProps.information.checked)
      return true;
    return false;
  }

  render() {
    const { classes } = this.props;
    const { key } = this.props;
    const { content, detailContent, checked } = this.props.information;
    return (
      <React.Fragment>
        <ListItem
          key={key}
          button
          onClick={this.handleToggleCheck}
          >
          {
            !checked
            ? (<React.Fragment>
                <ArrowRight />
                <ListItemText
                  className={classes.todoText}
                  primary={content}
                  secondary={detailContent} />
              </React.Fragment>
            )
            : (<React.Fragment>
                <Done className={classes.done} />
                <ListItemText
                  className={`${classes.doneText} ${classes.todoText}`}
                  primary={content}
                  secondary={detailContent} />
              </React.Fragment>
            )
          }
          <ListItemSecondaryAction>
            <IconButton onClick={this.handleRemove}>
              <DeleteIcon className={classes.deleteIcon} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </React.Fragment>
    );
  }
  
}

export default withStyles(styles)(Todo);
