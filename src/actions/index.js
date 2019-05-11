import apis from '../apis';
import {
	FETCH_DEFAULT_RESULT,
	SET_CURRENT_PARAM,
	FETCH_COMPARISON_RESULT,
	FETCH_LOADING,
	FETCH_COMPARISON_RESULT_I3
} from './types';

export const setDefaultLoading = isLoading => dispatch => {
	console.log('setDefaultLoading', isLoading);
	dispatch({ type: FETCH_LOADING, payload: isLoading });
};

export const setCurrentValue = (
	livingSuburb,
	workingSuburb,
	distance,
	days,
	congestion,
	period,
	carTime,
	bicycleTime,
	walkingTime,
	ptvTime
) => dispatch => {
	const currentParam = {
		livingSuburb,
		workingSuburb,
		distance,
		days,
		congestion,
		period,
		carTime,
		bicycleTime,
		walkingTime,
		ptvTime
	};
	dispatch({ type: SET_CURRENT_PARAM, payload: currentParam });
};

export const fetchDefaultResult = (
	distance,
	days,
	congestion,
	period = 'Month',
	carTime,
	bicycleTime,
	walkingTime,
	ptvTime,
	history
) => async dispatch => {
	var url = `https://cors-anywhere.herokuapp.com/https://ecomelbourneiteration2.azurewebsites.net/Compare/calculate?distance=${distance}&days=${days}&period=${period}&congestion=${congestion}&carTime=${carTime}&bicycleTime=${bicycleTime}&walkingTime=${walkingTime}&ptvTime=${ptvTime}`;
	const response = await apis.post(url);
	const defaultResult = response.data;
	dispatch({ type: FETCH_DEFAULT_RESULT, payload: defaultResult });
	if (response && history) {
		dispatch(setDefaultLoading(false));
		history.push('/iteration2/calculator');
	}
};

export const fetchDefaultResultIteration3 = (
	distance,
	days,
	congestion,
	period = 'Day',
	carTime,
	bicycleTime,
	walkingTime,
	ptvTime,
	history
) => async dispatch => {
	console.log('fetchDefaultResultIteration3');
	var url = `https://cors-anywhere.herokuapp.com/https://ecomelbourneiteration3.azurewebsites.net/Compare1/calculate?distance=${distance}&days=${days}&period=${period}&congestion=${congestion}&carTime=${carTime}&bicycleTime=${bicycleTime}&walkingTime=${walkingTime}&ptvTime=${ptvTime}`;
	const response = await apis.post(url);
	console.log('ACTION CREATOR RESP DATA', response.data);
	const defaultResult = response.data;
	dispatch({ type: FETCH_DEFAULT_RESULT, payload: defaultResult });
	dispatch(setDefaultLoading(false));
	if (response && history) {
		dispatch(setDefaultLoading(false));
		history.push('/iteration3/calculator');
	}
};

export const fetchComparsionResultIteration3 = (
	distance,
	days,
	congestion,
	period = 'Day',
	carTime,
	bicycleTime,
	walkingTime,
	ptvTime,
	ptvWalkingTime
) => async dispatch => {
	dispatch(setDefaultLoading(true));
	var url = `https://cors-anywhere.herokuapp.com/https://ecomelbourneiteration3.azurewebsites.net/Compare1/compare?distance=${distance}&days=${days}&period=${period}&congestion=${congestion}&carTime=${carTime}&bicycleTime=${bicycleTime}&walkingTime=${walkingTime}&ptvTime=${ptvTime}&ptvWalkingTime=${ptvWalkingTime}`;
	console.log('fetchComparsionResultIteration3', url);
	const response = await apis.post(url);
	const comparsionResult = response.data;
	console.log('response ', comparsionResult);
	dispatch(setDefaultLoading(false));
	dispatch({ type: FETCH_COMPARISON_RESULT, payload: comparsionResult });
};

export const fetchComparsionResult = (
	distance,
	days,
	congestion,
	period = 'Month',
	carTime,
	bicycleTime,
	walkingTime,
	ptvTime
) => async dispatch => {
	var url = `https://cors-anywhere.herokuapp.com/https://ecomelbourneiteration2.azurewebsites.net/Compare/compare?distance=${distance}&days=${days}&period=${period}&congestion=${congestion}&carTime=${carTime}&bicycleTime=${bicycleTime}&walkingTime=${walkingTime}&ptvTime=${ptvTime}`;
	console.log('fetchComparsionResult', url);
	const response = await apis.post(url);
	const comparsionResult = response.data;
	dispatch({ type: FETCH_COMPARISON_RESULT, payload: comparsionResult });
};
