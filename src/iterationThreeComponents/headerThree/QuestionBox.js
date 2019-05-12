import React, { Component } from 'react';
import {
	Card,
	CardHeader,
	ListGroup,
	ListGroupItem,
	Button,
	Container,
	Row,
	Col
} from 'shards-react';
import { CircularProgress, withStyles } from '@material-ui/core';
import { GoogleApiWrapper } from 'google-maps-react';
import { GOOGLEMAPAPI } from '../../config/keys';
import LocationSearchInput from '../utils/LocationSearchInput';
import { connect } from 'react-redux';
import {
	fetchDefaultResultIteration3,
	fetchComparsionResultIteration3,
	setCurrentValue,
	setDefaultLoading
} from '../../actions';
import { get_next_weekday } from '../utils/Variables';
import { withRouter } from 'react-router-dom';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
const styles = theme => ({
	header: {
		padding: '0rem 1rem !important',
		[theme.breakpoints.up('md')]: {
			fontSize: '1.25rem',
			padding: '1rem 1rem !important'
		}
	},
	slogan: {
		textTransform: 'uppercase',
		fontSize: '0.85rem',
		[theme.breakpoints.up('md')]: {
			fontSize: '1.25rem'
		}
	}
});

class QuestionBox extends Component {
	state = {
		livingSuburb: '',
		workingSuburb: '',
		period: 'Day',
		postParams: {
			livingSuburb: '',
			workingSuburb: '',
			bicycleTime: '',
			walkingTime: '',
			ptvTime: '',
			distance: '',
			daysWork: '1',
			congestion: '',
			period: 'Day',
			ptvWalkingTime: '',
			carTimeMorning: '',
			carTimeAfternoon: '',
			congestionMorning: '',
			congestionAfternoon: '',
			timeGoToWork: get_next_weekday(8),
			timeLeaveWork: get_next_weekday(17)
		},
		loading: false,
		errorOrNot: false,
		error: {}
	};

	componentDidMount() {
		// this.getNextFiveDaysPrediction();
	}

	handleLivingSelect = address => {
		this.setState(prevState => ({
			...prevState,
			livingSuburb: address,
			postParams: { ...prevState.postParams, livingSuburb: address },
			error: { livingSuburb: '' }
		}));
	};

	handleWorkingSelect = address => {
		this.setState(prevState => ({
			...prevState,
			workingSuburb: address,
			postParams: { ...prevState.postParams, workingSuburb: address },
			error: { workingSuburb: '' }
		}));
	};

	handleChange = event => {
		this.setState({
			postParams: { [event.target.name]: event.target.value },
			error: {}
		});
	};

	onChangeGoTo = value => {
		if (!value) {
			return;
		}
		const [hours, mins] = value.format('HH:mm').split(':');
		const timeGoToWork = get_next_weekday(hours, mins);
		this.setState(prevState => ({
			...prevState,
			timeGoToWork: [hours, mins],
			postParams: {
				...prevState.postParams,
				timeGoToWork: timeGoToWork
			}
		}));
	};

	onChangeLeave = value => {
		if (!value) {
			return;
		}
		const [hours, mins] = value.format('HH:mm').split(':');
		const timeLeaveWork = get_next_weekday(hours, mins);
		this.setState(prevState => ({
			...prevState,
			timeLeaveWork: [hours, mins],
			postParams: {
				...prevState.postParams,
				timeLeaveWork: timeLeaveWork
			}
		}));
	};

	setError = () => {
		this.props.setDefaultLoading(false);
		this.setState(prevState => ({
			error: {
				...prevState.error,
				livingSuburb:
					'Invalid address, please only input address inside Melbourne',
				workingSuburb:
					'Invalid address, please only input address inside Melbourne'
			}
		}));
		return;
	};

	handleClick = () => {
		var hasError = false;
		const { livingSuburb, workingSuburb } = this.state.postParams;
		const validArr = [livingSuburb, workingSuburb];
		const validaArrName = ['livingSuburb', 'workingSuburb'];
		const validMsg = [
			'Please select a valid suburb',
			'Please select a valid suburb'
		];
		validArr.forEach((e, index) => {
			if (e === '' || livingSuburb === workingSuburb) {
				this.setState(prevState => ({
					error: {
						...prevState.error,
						[validaArrName[index]]: validMsg[index]
					}
				}));
				hasError = true;
			}
		});

		if (hasError) {
			return;
		}
		this.getDistance(livingSuburb, workingSuburb);
	};

	getDistance = (baseLocation, targetLocation) => {
		const { google } = this.props;
		// var dptTime = get_next_weekday();
		const { timeGoToWork, timeLeaveWork } = this.state.postParams;

		var service = new google.maps.DistanceMatrixService();

		this.props.setDefaultLoading(true);

		const originsAndDest = {
			origins: [baseLocation],
			destinations: [targetLocation]
		};

		service.getDistanceMatrix(
			{
				...originsAndDest,
				travelMode: 'DRIVING',
				drivingOptions: {
					departureTime: timeGoToWork,
					trafficModel: 'bestguess'
				}
			},
			(response, status) => {
				if (status !== 'OK') {
					console.log('ERROR!', status);
				} else {
					const data = response.rows[0].elements[0];
					if (
						!(
							data &&
							data.distance &&
							data.distance.text &&
							data.duration_in_traffic &&
							data.duration
						)
					) {
						this.setError();
						return;
					}

					const distance = data.distance.text.substring(
						0,
						data.distance.text.length - 2
					);

					if (distance > 200) {
						this.props.setDefaultLoading(false);
						this.setState(prevState => ({
							error: {
								...prevState.error,
								livingSuburb:
									'Invalid address, please only input address inside Melbourne',
								workingSuburb:
									'Invalid address, please only input address inside Melbourne'
							}
						}));
						return;
					}

					const congestionMorning =
						(data.duration_in_traffic.value - data.duration.value) / 60;

					const carTimeMorning = data.duration_in_traffic.value / 60;
					this.setState(prevState => ({
						postParams: {
							...prevState.postParams,
							distance: distance,
							congestionMorning: congestionMorning,
							carTimeMorning: carTimeMorning,
							period: 'Day'
						}
					}));
					this.fetchResultFromBackEnd();
				}
			}
		);

		service.getDistanceMatrix(
			{
				...originsAndDest,
				travelMode: 'DRIVING',
				drivingOptions: {
					departureTime: timeLeaveWork,
					trafficModel: 'bestguess'
				}
			},
			(response, status) => {
				if (status !== 'OK') {
					console.log('ERROR!', status);
				} else {
					const data = response.rows[0].elements[0];
					if (
						!(
							data &&
							data.distance &&
							data.distance.text &&
							data.duration_in_traffic &&
							data.duration
						)
					) {
						this.setError();
						return;
					}

					const distance = data.distance.text.substring(
						0,
						data.distance.text.length - 2
					);
					if (distance > 300) {
						this.setError();
						return;
					}

					const congestionAfternoon =
						(data.duration_in_traffic.value - data.duration.value) / 60;
					const carTimeAfternoon = data.duration_in_traffic.value / 60;
					this.setState(prevState => ({
						postParams: {
							...prevState.postParams,
							distance: distance,
							congestionAfternoon: congestionAfternoon,
							carTimeAfternoon: carTimeAfternoon,
							period: 'Day'
						}
					}));
					this.fetchResultFromBackEnd();
				}
			}
		);

		const travelModeArr = ['TRANSIT', 'BICYCLING', 'WALKING'];
		const travelModePostParams = ['ptvTime', 'bicycleTime', 'walkingTime'];

		travelModeArr.forEach((e, index) => {
			if (e === 'TRANSIT') {
				const DirectionsService = new google.maps.DirectionsService();

				DirectionsService.route(
					{
						origin: baseLocation,
						destination: targetLocation,
						travelMode: e,
						transitOptions: {
							departureTime: timeGoToWork
						}
					},
					(result, status) => {
						if (status === google.maps.DirectionsStatus.OK) {
							if (
								!(
									result &&
									result.routes[0] &&
									result.routes[0].legs[0] &&
									result.routes[0].legs[0].steps
								)
							) {
								this.setError();
								return;
							}
							var ptvWalkingTime = 0;
							const steps = result.routes[0].legs[0].steps;
							steps.forEach(step => {
								if (step.travel_mode === 'WALKING') {
									ptvWalkingTime += step.duration.value;
								}
							});

							const ptvWalkingTimeMins = ptvWalkingTime / 60;
							this.setState(prevState => ({
								...prevState,
								postParams: {
									...prevState.postParams,
									ptvWalkingTime: ptvWalkingTimeMins
								}
							}));
							this.fetchResultFromBackEnd();
						} else {
							console.error(`error fetching directions ${result}`);
						}
					}
				);
			}

			service.getDistanceMatrix(
				{
					...originsAndDest,
					travelMode: e,
					transitOptions: { departureTime: timeGoToWork }
				},
				(res, status) => {
					if (status !== 'OK') {
						console.log('ERROR!', status);
					} else {
						const data = res.rows[0].elements[0];
						if (!(data && data.duration && data.duration.value)) {
							this.setError();
							return;
						}

						const name = travelModePostParams[index];
						this.setState(prevState => ({
							...prevState,
							postParams: {
								...prevState.postParams,
								[name]: data.duration.value / 60
							}
						}));

						this.fetchResultFromBackEnd();
					}
				}
			);
		});
	};

	fetchResultFromBackEnd = () => {
		const {
			livingSuburb,
			workingSuburb,
			carTimeAfternoon,
			carTimeMorning,
			bicycleTime,
			walkingTime,
			ptvTime,
			distance,
			congestionMorning,
			congestionAfternoon,
			daysWork,
			period,
			ptvWalkingTime,
			timeGoToWork
		} = this.state.postParams;
		if (
			(bicycleTime !== '' && walkingTime !== '',
			ptvTime !== '',
			distance !== '',
			carTimeMorning !== '',
			carTimeAfternoon !== '',
			congestionMorning !== '',
			congestionAfternoon !== '',
			ptvWalkingTime !== '')
		) {
			const carTime = carTimeMorning + carTimeAfternoon;
			const congestion = congestionMorning + congestionAfternoon;
			this.props.fetchDefaultResultIteration3(
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
			this.props.fetchComparsionResultIteration3(
				distance,
				daysWork,
				congestion,
				period,
				carTime,
				bicycleTime,
				walkingTime,
				ptvTime,
				ptvWalkingTime
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
				ptvTime,
				ptvWalkingTime,
				timeGoToWork
			);
		}
	};

	render() {
		const format = 'h:mm a';

		const timeGo = moment()
			.hour(8)
			.minute(0);
		const timeLeave = moment()
			.hour(17)
			.minute(0);
		const { classes } = this.props;
		return (
			<Card small style={{ padding: '15px' }}>
				<CardHeader className={`border-bottom ${classes.header}`}>
					{/* <h5 className='m-0' style={{ textTransform: 'uppercase' }}> */}
					<h6 className={classes.slogan}>Check how much you can save</h6>

					{/* </h5> */}
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
							When do you go to and leave work?
						</strong>
						<Container style={{ padding: '0' }}>
							<Row noGutters={true}>
								<Col sm='12' md='6' lg='6'>
									<div style={{ width: '100%' }}>
										<span className='text-muted d-block'>Go:</span>
										<TimePicker
											showSecond={false}
											defaultValue={timeGo}
											onChange={this.onChangeGoTo}
											format={format}
											use12Hours
											inputReadOnly
											style={{ maxWidth: '200px' }}
										/>
									</div>
								</Col>

								<Col sm='12' md='6' lg='6'>
									<div style={{ width: '100%' }}>
										<span className='text-muted d-block'>Leave:</span>
										<TimePicker
											showSecond={false}
											defaultValue={timeLeave}
											onChange={this.onChangeLeave}
											format={format}
											use12Hours
											inputReadOnly
										/>
									</div>
								</Col>
							</Row>
						</Container>
						<br />
						<Button
							style={{ height: '35px', width: '115px', marginTop: '10px' }}
							onClick={this.handleClick}
						>
							{this.props.loading ? (
								<CircularProgress size={18} style={{ color: '#fff' }} />
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
	return { loading: loading.fetchDefaultloading };
};

export default connect(
	mapStateToProps,
	{
		fetchDefaultResultIteration3,
		fetchComparsionResultIteration3,
		setCurrentValue,
		setDefaultLoading
	}
)(
	GoogleApiWrapper({
		apiKey: GOOGLEMAPAPI
	})(withRouter(withStyles(styles)(QuestionBox)))
);
