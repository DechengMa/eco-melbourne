import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Button } from 'shards-react';
import { GOOGLEMAPAPI } from '../../config/keys';
import { Grid } from '@material-ui/core';

import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	DirectionsRenderer
} from 'react-google-maps';
import { compose, withProps, lifecycle } from 'recompose';

const MapWithADirectionsRenderer = compose(
	withProps({
		googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLEMAPAPI}&v=3.exp&libraries=geometry,drawing,places`,
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `500px` }} />,
		mapElement: <div style={{ height: `100%` }} />
	}),
	withScriptjs,
	withGoogleMap,
	lifecycle({
		componentDidMount() {
			const { google } = window;
			const { origin, destination, travelMode } = this.props;

			const DirectionsService = new google.maps.DirectionsService();

			DirectionsService.route(
				{
					// origin: new google.maps.LatLng(41.85073, -87.65126),
					origin,
					destination,
					// travelMode: google.maps.TravelMode.TRANSIT
					travelMode
				},
				(result, status) => {
					if (status === google.maps.DirectionsStatus.OK) {
						this.setState({
							directions: result
						});
					} else {
						console.error(`error fetching directions ${result}`);
					}
				}
			);
		}
	})
)(props => (
	<GoogleMap
		defaultZoom={7}
		defaultCenter={new window.google.maps.LatLng(-37.9712305, 144.4913181)}
	>
		{props.directions && <DirectionsRenderer directions={props.directions} />}
	</GoogleMap>
));

export class MapContainer extends Component {
	render() {
		return (
			<Card small className='h-100'>
				<CardHeader className='border-bottom'>
					<h6 className='m-0'>Map</h6>
				</CardHeader>
				<CardBody className='pt-0'>
					<div style={{ width: '100%', height: '500px' }}>
						<MapWithADirectionsRenderer
							origin='Carnegie VIC, Australia'
							destination='Box Hill VIC, Australia'
							travelMode='TRANSIT'
						/>
						{/* <Map
							style={{ width: '95%', height: '500px' }}
							google={this.props.google}
							zoom={14}
						>
							<Marker onClick={this.onMarkerClick} name={'Current location'} />
						</Map> */}
					</div>
				</CardBody>
			</Card>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: GOOGLEMAPAPI
})(MapContainer);
