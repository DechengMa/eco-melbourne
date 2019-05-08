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
import { CircularProgress } from '@material-ui/core';
import { GoogleApiWrapper } from 'google-maps-react';
import { GOOGLEMAPAPI } from '../../config/keys';
import LocationSearchInput from '../utils/LocationSearchInput';
import { connect } from 'react-redux';
import {
	fetchDefaultResult,
	setCurrentValue,
	fetchComparsionResult,
	setDefaultLoading
} from '../../actions';
import { get_next_weekday, get_next_week_arr } from '../utils/Variables';
import { withRouter } from 'react-router-dom';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import TimePicker from 'rc-time-picker';

class QuestionBox extends Component {
	state = {
		livingSuburb: '',
		workingSuburb: '',
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
			period: 'Week',
			timeGoToWork: get_next_weekday(8),
			timeLeaveWork: get_next_weekday(17)
		},
		loading: false,
		errorOrNot: false,
		error: {}
	};

	componentDidMount() {
		this.getNextFiveDaysPrediction();
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
		const [hours, mins] = value.format('HH:mm').split(':');
		console.log(hours, mins);
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

	handleClick = () => {
		var hasError = false;
		const { livingSuburb, workingSuburb, daysWork } = this.state.postParams;
		const validArr = [livingSuburb, workingSuburb, daysWork];
		const validaArrName = ['livingSuburb', 'workingSuburb', 'daysWork'];
		const validMsg = [
			'Please select a valid suburb',
			'Please select a valid suburb',
			'Please select a how many days you work weekly'
		];
		validArr.forEach((e, index) => {
			if (e === '') {
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

	getNextFiveDaysPrediction = (baseLocation, targetLocation) => {
		// var predictData = [{ date: { travelTime: 12, tra_in_traffic: 15 } }];
		const { google } = this.props;

		var service = new google.maps.DistanceMatrixService();

		const nextWeekArr = get_next_week_arr(8, 17, 0);

		nextWeekArr.forEach(date => {
			console.log(date);
			// date.forEach(e => {
			// 	this.setState(state)
			// 	predictData.forEach(element => {
			// 		if(e === date){
			// 			// alrealdy have one predicton, just add another
			// 			if(date.travelTime){
			// 				date.travelTime = date.travelTime + travelTime
			// 			}else {
			// 				date.travelTime = travelTime
			// 			}
			// 			if(date.tra_in_traffic){
			// 				date.tra_in_traffic = date.tra_in_traffic + tra_in_traffic
			// 			}else {
			// 				date.tra_in_traffic = tra_in_traffic
			// 			}
			// 		}
			// 	});
			// });
		});

		// service.getDistanceMatrix(
		// 	{
		// 		...originsAndDest,
		// 		travelMode: 'DRIVING',
		// 		drivingOptions: { departureTime: dptTime, trafficModel: 'bestguess' }
		// 	},
		// 	(response, status) => {
		// 		if (status !== 'OK') {
		// 			console.log('ERROR!', status);
		// 		} else {
		// 			const data = response.rows[0].elements[0];
		// 			const duration_in_traffic = data.duration_in_traffic.value / 60;
		// 			const carTime = data.duration_in_traffic.value / 60;

		// 			this.setState(prevState => ({

		// 			}));
		// 			this.fetchResultFromBackEnd();
		// 		}
		// 	}
		// );
	};

	getDistance = (baseLocation, targetLocation) => {
		const { google } = this.props;
		var dptTime = get_next_weekday();

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
				drivingOptions: { departureTime: dptTime, trafficModel: 'bestguess' }
			},
			(response, status) => {
				if (status !== 'OK') {
					console.log('ERROR!', status);
				} else {
					const data = response.rows[0].elements[0];
					const distance = data.distance.text.substring(
						0,
						data.distance.text.length - 2
					);

					if (distance > 300) {
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
					// TODO use congestion for morning and afternoon
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

		const travelModeArr = ['TRANSIT', 'BICYCLING', 'WALKING'];
		const travelModePostParams = ['ptvTime', 'bicycleTime', 'walkingTime'];

		travelModeArr.forEach((e, index) => {
			service.getDistanceMatrix(
				{
					...originsAndDest,
					travelMode: e,
					transitOptions: { departureTime: dptTime }
				},
				(res, status) => {
					if (status !== 'OK') {
						console.log('ERROR!', status);
					} else {
						const data = res.rows[0].elements[0];
						if (!(data && data.duration && data.duration.value)) {
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
						const name = travelModePostParams[index];
						this.setState(prevState => ({
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

	render() {
		const format = 'h:mm a';

		const timeGo = moment()
			.hour(8)
			.minute(0);
		const timeLeave = moment()
			.hour(17)
			.minute(0);

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
							style={{ height: '35px', marginTop: '10px' }}
							onClick={this.handleClick}
						>
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
