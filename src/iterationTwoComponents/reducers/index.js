import { combineReducers } from 'redux';
import currentInfoReducer from './currentInfoReducer';

export default combineReducers({
	info: currentInfoReducer
});
