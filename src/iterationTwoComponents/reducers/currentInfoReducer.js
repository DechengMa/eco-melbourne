import { FETCH_DEFAULT_RESULT } from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case FETCH_DEFAULT_RESULT:
			return { ...state, currentInfo: action.payload };
		default:
			return state;
	}
};
