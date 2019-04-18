import { Map, GoogleApiWrapper, Polyline } from 'google-maps-react';
const distanceGetter = props => {
	const { baseLocation, targetLocation } = props;
	// const BaseLocation = '555 E Lafayette St, Detroit, MI 48226';
	// const TargetLocation = '21000 W 10 Mile Rd, Southfield, MI 48075';
	const { google } = this.props;
	var service = new google.maps.DistanceMatrixService();
	service.getDistanceMatrix(
		{
			origins: [baseLocation],
			destinations: [targetLocation],
			travelMode: 'DRIVING'
			// transitOptions: TransitOptions,
			// drivingOptions: DrivingOptions,
			// unitSystem: UnitSystem,
			// avoidHighways: true,
			// avoidTolls: true
		},
		callback
	);

	callback = (response, status) => {
		console.log('Callback called');
		console.log(response);
		console.log(status);
	};
};

export default distanceGetter;
