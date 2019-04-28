import { FETCH_LOADING } from '../actions/types';
export default (state = {}, action) => {
	switch (action.type) {
		case FETCH_LOADING:
			return { ...state, fetchDefaultloading: action.payload };
		default:
			return state;
	}
};
