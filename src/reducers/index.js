import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import MessagesReducer from './messages-reducer';

const rootReducer = combineReducers({
  messages: MessagesReducer,
  form: formReducer
});

export default rootReducer;