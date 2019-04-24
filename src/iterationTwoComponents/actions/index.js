import apis from '../apis';
import { FETCH_DEFAULT_RESULT } from './types';

export const fetchDefaultResult = (
	distance,
	days,
	congestion,
	period = 'Month',
	history
) => async dispatch => {
	var url = `https://cors-anywhere.herokuapp.com/https://ecomelbourneiteration2.azurewebsites.net/Compare/calculate?distance=${distance}&days=${days}&period=${period}&congestion=${congestion}`;

	const response = await apis.post(url);
	const defaultResult = response.data;
	console.log(response);

	dispatch({ type: FETCH_DEFAULT_RESULT, payload: defaultResult });
	if (response) {
		history.push('/iteration2/calculator');
	}
};
