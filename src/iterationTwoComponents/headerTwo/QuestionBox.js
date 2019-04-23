import React, { Component } from 'react';
import {
	Card,
	CardHeader,
	ListGroup,
	ListGroupItem,
	Button
} from 'shards-react';
import { GoogleApiWrapper } from 'google-maps-react';
import { GOOGLEMAPAPI } from '../../config/keys';
import CustomSelect from '../components/components-overview/CustomSelect';
import LocationSearchInput from '../utils/LocationSearchInput';
import { connect } from 'react-redux';
import { fetchDefaultResult } from '../actions';

class QuestionBox extends Component {
	state = {
		livingSuburb: '',
		workingSuburb: '',
		vehicle: '',
		daysWork: '1',
		fuelType: '',
		fuelConsumption: 0,
		distance: '',
		period: 'Week',
		loading: false,
		errorOrNot: false,
		error: {}
	};

	componentDidMount() {
		this.getDirectionRoute();
	}

	handleLivingSelect = address => {
		this.setState({ livingSuburb: address, error: { livingSuburb: '' } });
	};

	handleWorkingSelect = address => {
		this.setState({ workingSuburb: address, error: { workingSuburb: '' } });
	};

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value, error: {} });
	};

	handleClick = () => {
		var hasError = false;
		const { livingSuburb, workingSuburb, daysWork } = this.state;

		if (livingSuburb === '') {
			this.setState(prevState => ({
				error: {
					...prevState.error,
					livingSuburb: 'Please select a valid suburb'
				}
			}));
			hasError = true;
		}
		if (workingSuburb === '') {
			this.setState(prevState => ({
				error: {
					...prevState.error,
					workingSuburb: 'Please select a valid suburb'
				}
			}));
			hasError = true;
		}
		if (daysWork === '') {
			this.setState(prevState => ({
				error: {
					...prevState.error,
					daysWork: 'Please select a how many days you work weekly'
				}
			}));
			hasError = true;
		}

		if (hasError) {
			return;
		}

		console.log(this.state);
		// this.props.fetchDefaultResult(20, 5, 5);
		this.getDistance(livingSuburb, workingSuburb);
	};

	getDistance = (baseLocation, targetLocation) => {
		const { google } = this.props;

		const transitOptions = {
			// arrivalTime: Date,
			departureTime: new Date('April 23, 2019 9:00:00'),
			modes: ['TRAM', 'TRAIN']
			// routingPreference: TransitRoutePreference
		};

		// const drivingOptions = {
		// 	departureTime: new Date('April 23, 2019 8:00:00'),
		// 	trafficModel: 'bestguess'
		// };

		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix(
			{
				origins: [baseLocation],
				destinations: [targetLocation],
				// trafficModel: "TRANSIT", "BICYCLING", "WALKING","DRIVING"
				travelMode: 'TRANSIT',
				transitOptions: transitOptions
				// drivingOptions: drivingOptions
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

	getDirectionRoute = () => {
		const { google } = this.props;

		var directionService = new google.maps.DirectionsService();
		directionService.route(
			{
				origin: 'Carnegie VIC, Australia',
				destination: 'Box Hill VIC, Australia',
				travelMode: 'TRANSIT'
			},
			(rep, status) => {
				if (status !== 'OK') {
					console.log('ERROR!');
					console.log(status);
				} else {
					console.log(rep);
				}
			}
		);
	};

	render() {
		return (
			<Card small style={{ padding: '15px' }}>
				<CardHeader className='border-bottom'>
					<h5 className='m-0'>Change the way you travel, from today</h5>
				</CardHeader>

				<ListGroup flush>
					<ListGroupItem className='px-3'>
						<strong className='text-muted d-block mb-2'>
							Where do you live?
						</strong>
						<LocationSearchInput
							name='livingSuburb'
							value={this.state.livingSuburb}
							error={this.state.error.livingSuburb ? true : false}
							handleSelect={this.handleLivingSelect}
							errorMsg={
								this.state.error.livingSuburb
									? this.state.error.livingSuburb
									: ''
							}
						/>

						<strong className='text-muted d-block mb-2'>
							Where do you work?
						</strong>
						<LocationSearchInput
							value={this.state.workingSuburb}
							error={this.state.error.workingSuburb ? true : false}
							name='Working Suburb'
							handleSelect={this.handleWorkingSelect}
							errorMsg={
								this.state.error.workingSuburb
									? this.state.error.workingSuburb
									: ''
							}
						/>
						<strong className='text-muted d-block mb-2'>
							How many days do you work weekly?
						</strong>
						<CustomSelect
							name='daysWork'
							value={this.state.daysWork}
							handleChange={this.handleChange}
						/>
						<Button onClick={this.handleClick}>Search</Button>
					</ListGroupItem>
				</ListGroup>
			</Card>
		);
	}
}

function mapStateToProps({ currentInfo }) {
	console.log('mapStateToProps');
	console.log(currentInfo);
	return { currentInfo: currentInfo };
}

// export default connect(
// 	mapStateToProps,
// 	{ fetchDefaultResult }
// )(QuestionBox);

export default connect(
	mapStateToProps,
	{ fetchDefaultResult }
)(
	GoogleApiWrapper({
		apiKey: GOOGLEMAPAPI
	})(QuestionBox)
);
