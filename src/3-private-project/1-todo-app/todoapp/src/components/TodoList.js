import React, { Component } from 'react';
import Todo from './Todo';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

const styles = theme => ({
  list: { marginTop: theme.spacing.unit }
});

class TodoList extends Component {
  
  static defaultProps = {
    data: [],
    onUpdate: () => console.warn('onUpdate is not defined'),
    onRemove: () => console.warn('onRemove is not defined')
  }
  
  render() {
    const { classes } = this.props;
    const { data, onUpdate, onRemove } = this.props;
    const list = data.map(
      todo => (<Todo key={todo._id}
                 information={todo}
                 onUpdate={onUpdate}
                 onRemove={onRemove}/>));
    return (
      <List className={classes.list}>
        {list}
      </List>
    );
  }
  
}

export default withStyles(styles)(TodoList);
