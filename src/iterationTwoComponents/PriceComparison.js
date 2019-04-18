import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import { GOOGLEMAPAPI } from '../config/keys';

class PriceComparison extends Component {
	componentDidMount() {
		this.getDistance('Carnegie VIC, Australia', 'Box Hill VIC, Australia');
	}

	getDistance = (baseLocation, targetLocation) => {
		const { google } = this.props;

		const transitOptions = {
			// arrivalTime: Date,
			departureTime: new Date('April 17, 2019 9:00:00'),
			modes: ['TRAM', 'TRAIN']
			// routingPreference: TransitRoutePreference
		};

		const drivingOptions = {
			departureTime: new Date('April 17, 2019 8:00:00'),
			trafficModel: 'bestguess'
		};

		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix(
			{
				origins: [baseLocation],
				destinations: [targetLocation],
				// trafficModel: "TRANSIT", "BICYCLING", "WALKING"
				travelMode: 'DRIVING',
				transitOptions: transitOptions,
				drivingOptions: drivingOptions
				// unitSystem: UnitSystem,
				// avoidHighways: true,
				// avoidTolls: true
			},
			(response, status) => {
				if (status !== 'OK') {
					console.log('ERROR!');
					console.log(status);
				} else {
					console.log(response);
					// console.log(response.rows[0].elements[0].distance.text);
					// var distance = response.rows[0].elements[0].distance.text;
					// distance = distance.substring(0, distance.length - 2);
					// return;
				}
			}
		);
	};

	render() {
		return <div>CONSOLE LOG</div>;
	}
}

export default GoogleApiWrapper({
	apiKey: GOOGLEMAPAPI
})(PriceComparison);
