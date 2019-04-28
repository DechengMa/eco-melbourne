import { combineReducers } from 'redux';
import currentInfoReducer from './currentInfoReducer';
import loadingReducer from './loadingReducer';
export default combineReducers({
	info: currentInfoReducer,
	loading: loadingReducer
});
