import number from './number';
import color from './color';
import { combineReducers } from 'redux';

/*
  Structure of store:
  ```
  {
    numberData: {
        number: 0
    },
    colorData: {
        color: 'black'
    }
  }
  ```
*/

const reducers = combineReducers({
  numberData: number,
  colorData: color
});

export default reducers;