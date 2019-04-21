import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Button } from 'shards-react';
import { GOOGLEMAPAPI } from '../../config/keys';
import { Grid } from '@material-ui/core';

export class MapContainer extends Component {
	render() {
		return (
			<Card small className='h-100'>
				<CardHeader className='border-bottom'>
					<h6 className='m-0'>Map</h6>
				</CardHeader>
				<CardBody className='pt-0'>
					<div style={{ width: '85%', height: '500px' }}>
						<Map
							style={{ width: '95%', height: '500px' }}
							google={this.props.google}
							zoom={14}
						>
							<Marker onClick={this.onMarkerClick} name={'Current location'} />

							{/* <InfoWindow onClose={this.onInfoWindowClose}>
							<div>
								<h1>{this.state.selectedPlace.name}</h1>
							</div>
						</InfoWindow> */}
						</Map>
					</div>
				</CardBody>
			</Card>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: GOOGLEMAPAPI
})(MapContainer);
