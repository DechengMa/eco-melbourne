import React, { Component } from 'react';
import {
	Card,
	CardHeader,
	ListGroup,
	ListGroupItem,
	Button
} from 'shards-react';
import { CircularProgress } from '@material-ui/core';
import { GoogleApiWrapper } from 'google-maps-react';
import { GOOGLEMAPAPI } from '../../config/keys';
import CustomSelect from '../components/components-overview/CustomSelect';
import LocationSearchInput from '../utils/LocationSearchInput';
import { connect } from 'react-redux';
import {
	fetchDefaultResult,
	setCurrentValue,
	fetchComparsionResult,
	setDefaultLoading
} from '../../actions';
import { get_next_weekday } from '../utils/Variables';
import { withRouter } from 'react-router-dom';

class QuestionBox extends Component {
	state = {
		livingSuburb: '',
		workingSuburb: '',
		vehicle: '',
		fuelType: '',
		fuelConsumption: 0,
		period: 'Week',
		postParams: {
			livingSuburb: '',
			workingSuburb: '',
			bicycleTime: '',
			walkingTime: '',
			ptvTime: '',
			distance: '',
			daysWork: '1',
			congestion: '',
			period: 'Week'
		},
		loading: false,
		errorOrNot: false,
		error: {}
	};

	componentDidMount() {
		this.getDirectionRoute();
	}

	handleLivingSelect = address => {
		this.setState({
			livingSuburb: address,
			postParams: { livingSuburb: address },
			error: { livingSuburb: '' }
		});
	};

	handleWorkingSelect = address => {
		this.setState({
			workingSuburb: address,
			postParams: { workingSuburb: address },
			error: { workingSuburb: '' }
		});
	};

	handleChange = event => {
		this.setState({
			postParams: { [event.target.name]: event.target.value },
			error: {}
		});
	};

	handleClick = () => {
		var hasError = false;
		const { livingSuburb, workingSuburb } = this.state.postParams;
		console.log('suburb', livingSuburb, workingSuburb);
		const { daysWork } = this.state.postParams;
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
		var dptTime = get_next_weekday();

		const drivingOptions = {
			departureTime: dptTime,
			trafficModel: 'bestguess'
		};

		var service = new google.maps.DistanceMatrixService();

		this.props.setDefaultLoading(true);

		service.getDistanceMatrix(
			{
				origins: [baseLocation],
				destinations: [targetLocation],
				travelMode: 'DRIVING',
				drivingOptions: drivingOptions
			},
			(response, status) => {
				if (status !== 'OK') {
					console.log('ERROR!');
					console.log(status);
				} else {
					const data = response.rows[0].elements[0];
					// console.log(response.rows[0].elements[0].distance.text);
					const distance = data.distance.text.substring(
						0,
						data.distance.text.length - 2
					);

					const congestion =
						(data.duration_in_traffic.value - data.duration.value) / 60;

					const carTime = data.duration_in_traffic.value / 60;

					this.setState(prevState => ({
						postParams: {
							...prevState.postParams,
							distance: distance,
							congestion: congestion,
							carTime: carTime,
							period: 'Week'
						}
					}));
					this.fetchResultFromBackEnd();
				}
			}
		);

		service.getDistanceMatrix(
			{
				origins: [baseLocation],
				destinations: [targetLocation],
				travelMode: 'TRANSIT'
			},
			(response, status) => {
				if (status !== 'OK') {
					console.log('ERROR!');
					console.log(status);
				} else {
					const data = response.rows[0].elements[0];

					const ptvTime = data.duration.value / 60;

					this.setState(prevState => ({
						postParams: {
							...prevState.postParams,
							ptvTime: ptvTime
						}
					}));
					this.fetchResultFromBackEnd();
				}
			}
		);

		service.getDistanceMatrix(
			{
				origins: [baseLocation],
				destinations: [targetLocation],
				travelMode: 'BICYCLING'
			},
			(response, status) => {
				if (status !== 'OK') {
					console.log('ERROR!');
					console.log(status);
				} else {
					const data = response.rows[0].elements[0];
					const bicycleTime = data.duration.value / 60;
					this.setState(prevState => ({
						postParams: {
							...prevState.postParams,
							bicycleTime: bicycleTime
						}
					}));
					this.fetchResultFromBackEnd();
				}
			}
		);

		service.getDistanceMatrix(
			{
				origins: [baseLocation],
				destinations: [targetLocation],
				travelMode: 'WALKING'
			},
			(response, status) => {
				if (status !== 'OK') {
					console.log('ERROR!');
					console.log(status);
				} else {
					const data = response.rows[0].elements[0];
					const walkingTime = data.duration.value / 60;
					this.setState(prevState => ({
						postParams: {
							...prevState.postParams,
							walkingTime: walkingTime
						}
					}));
					this.fetchResultFromBackEnd();
				}
			}
		);
	};

	fetchResultFromBackEnd = () => {
		const {
			carTime,
			bicycleTime,
			walkingTime,
			ptvTime,
			distance,
			congestion,
			daysWork,
			period
		} = this.state.postParams;
		const { livingSuburb, workingSuburb } = this.state;

		if (
			(bicycleTime !== '' && walkingTime !== '',
			ptvTime !== '',
			distance !== '',
			congestion !== '')
		) {
			this.props.fetchDefaultResult(
				distance,
				daysWork,
				congestion,
				period,
				carTime,
				bicycleTime,
				walkingTime,
				ptvTime,
				this.props.history
			);
			this.props.fetchComparsionResult(
				distance,
				daysWork,
				congestion,
				period,
				carTime,
				bicycleTime,
				walkingTime,
				ptvTime
			);
			this.props.setCurrentValue(
				livingSuburb,
				workingSuburb,
				distance,
				daysWork,
				congestion,
				period,
				carTime,
				bicycleTime,
				walkingTime,
				ptvTime
			);
		}
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
					<h5 className='m-0' style={{ textTransform: 'uppercase' }}>
						Change the way you travel
					</h5>
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
							value={this.state.livingSuburb}
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
							value={this.state.postParams.daysWork}
							handleChange={this.handleChange}
						/>
						<Button style={{ height: '35px' }} onClick={this.handleClick}>
							{this.props.loading ? (
								<CircularProgress size={20} style={{ color: '#fff' }} />
							) : (
								'GET STARTED'
							)}
						</Button>
					</ListGroupItem>
				</ListGroup>
			</Card>
		);
	}
}

const mapStateToProps = ({ loading }) => {
	console.log('loading', loading);
	return { loading: loading.fetchDefaultloading };
};

export default connect(
	mapStateToProps,
	{
		fetchDefaultResult,
		fetchComparsionResult,
		setCurrentValue,
		setDefaultLoading
	}
)(
	GoogleApiWrapper({
		apiKey: GOOGLEMAPAPI
	})(withRouter(QuestionBox))
);
