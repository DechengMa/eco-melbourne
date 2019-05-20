import {
	FETCH_DEFAULT_RESULT,
	FETCH_COMPARISON_RESULT,
	SET_CURRENT_PARAM,
	SET_PERIOD
} from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case FETCH_DEFAULT_RESULT:
			return { ...state, currentInfo: action.payload };
		case SET_CURRENT_PARAM:
			return { ...state, currentParam: action.payload };
		case FETCH_COMPARISON_RESULT:
			return { ...state, comparisonInfo: action.payload };
		case SET_PERIOD:
			return { ...state, periodNow: action.payload };
		default:
			return state;
	}
};
