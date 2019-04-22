import apis from '../apis';
import { FETCH_DEFAULT_RESULT } from './types';

export const fetchDefaultResult = (
	distance,
	days,
	congestion,
	period = 'Month'
) => async dispatch => {
	var url =
		'https://ecomelbourneiteration2.azurewebsites.net/Compare/calculate?distance=23&days=4&period=Month&congestion=19';

	const response = await apis.post(
		url
		//     , {
		// 	distance: distance,
		// 	days: days,
		// 	period,
		// 	period,
		// 	congestion: congestion
		// }
	);
	const defaultResult = response.data;
	console.log(response);

	dispatch({ type: FETCH_DEFAULT_RESULT, payload: defaultResult });
};
