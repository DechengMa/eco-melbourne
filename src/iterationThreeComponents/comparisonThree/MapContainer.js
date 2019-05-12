import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleApiWrapper } from 'google-maps-react';
import { Card, CardHeader, CardBody, ButtonGroup, Button } from 'shards-react';
import { GOOGLEMAPAPI } from '../../config/keys';
import { get_next_weekday } from '../utils/Variables';
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
			const { origin, destination, travelMode, timeGoToWork } = this.props;

			const DirectionsService = new google.maps.DirectionsService();

			DirectionsService.route(
				{
					// origin: new google.maps.LatLng(41.85073, -87.65126),
					origin,
					destination,
					// travelMode: google.maps.TravelMode.TRANSIT
					travelMode,
					// TODO
					transitOptions: {
						departureTime: timeGoToWork ? timeGoToWork : get_next_weekday(8)
					}
				},
				(result, status) => {
					if (status === google.maps.DirectionsStatus.OK) {
						console.log('=========== RESULT ===========', result);
						this.setState({
							directions: result
						});
					} else {
						console.error(`error fetching directions ${result}`);
					}
				}
			);
		},
		componentDidUpdate() {
			const { google } = window;
			const { origin, destination, travelMode, timeGoToWork } = this.props;

			const DirectionsService = new google.maps.DirectionsService();

			DirectionsService.route(
				{
					// origin: new google.maps.LatLng(41.85073, -87.65126),
					origin,
					destination,
					// travelMode: google.maps.TravelMode.TRANSIT
					travelMode,
					transitOptions: {
						departureTime: timeGoToWork ? timeGoToWork : get_next_weekday(8)
					}
				},
				(result, status) => {
					if (status === google.maps.DirectionsStatus.OK) {
						console.log('=========== RESULT ===========', result);
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
	state = { contentShowing: 'route' };

	render() {
		const { contentShowing } = this.state;
		if (this.props.travelMode === 'BICYCLING') {
			return (
				<Card small className='h-100'>
					<CardHeader className='border-bottom'>
						<ButtonGroup>
							<Button
								theme={contentShowing === 'route' ? 'success' : 'secondary'}
								onClick={() => {
									this.setState({ contentShowing: 'route' });
								}}
							>
								Route
							</Button>
							<Button
								theme={contentShowing === 'bikeShare' ? 'success' : 'secondary'}
								onClick={() => {
									this.setState({ contentShowing: 'bikeShare' });
								}}
							>
								Melbourne Bike Share Stations Map
							</Button>
						</ButtonGroup>
					</CardHeader>
					<CardBody className='pt-0'>
						<div style={{ width: '100%', height: '500px' }}>
							{contentShowing === 'route' ? (
								<MapWithADirectionsRenderer
									origin={this.props.origin}
									destination={this.props.destination}
									travelMode={this.props.travelMode}
								/>
							) : (
								<iframe
									src='https://data.melbourne.vic.gov.au/dataset/Melbourne-Bike-Share-Stations-Map/tri2-3a8m/embed?width=900&height=500'
									style={{
										height: '100%',
										width: '100%',
										border: 0,
										padding: 0,
										margin: 0
									}}
								/>
							)}
						</div>
					</CardBody>
				</Card>
			);
		}

		return (
			<Card small className='h-100'>
				<CardHeader className='border-bottom'>
					<h6 className='m-0'>Route</h6>
				</CardHeader>
				<CardBody className='pt-0'>
					<div style={{ width: '100%', height: '500px' }}>
						<MapWithADirectionsRenderer
							origin={this.props.origin}
							destination={this.props.destination}
							travelMode={this.props.travelMode}
							timeGoToWork={
								this.props.currentParam
									? this.props.currentParam.timeGoToWork
									: get_next_weekday(8)
							}
						/>
					</div>
				</CardBody>
			</Card>
		);
	}
}

const mapStateToProps = ({ info }) => {
	return { currentParam: info.currentParam };
};

export default GoogleApiWrapper({
	apiKey: GOOGLEMAPAPI
})(connect(mapStateToProps)(MapContainer));
