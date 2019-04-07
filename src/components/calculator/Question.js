import React, { Component } from 'react';
import InputField from '../utils/InputField';
import SelectField from '../utils/SelectField';
import { unstable_Box as Box } from '@material-ui/core/Box';
import LocationSearchInput from '../utils/LocationSearchInput';
import Button from '@material-ui/core/Button';
import { GoogleApiWrapper } from 'google-maps-react';
import { GOOGLEMAPAPI } from '../../config/keys';
import axios from 'axios';
import { isNumeric } from '../utils/Variables';

class Question extends Component {
	state = {
		livingSuburb: '',
		workingSuburb: '',
		vehicle: '',
		daysWork: '',
		fuelType: '',
		fuelConsumption: '',
		distance: '',
		error: {}
	};

	componentDidMount() {
		this.getDataFromBackEnd();
	}

	getDistance = (baseLocation, targetLocation) => {
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
			(response, status) => {
				console.log('Callback called');

				if (status !== 'OK') {
					console.log('ERROR!');
					console.log(status);
				} else {
					console.log('Distance Come UP!');
					// console.log(response.rows[0].elements[0].distance.text);
					var distance = response.rows[0].elements[0].distance.text;
					distance = distance.substring(0, distance.length - 2);
					console.log('DISTANCE');
					console.log(distance);
					// return;

					this.setState({
						distance: distance
					});

					this.getDataFromBackEnd();
				}
			}
		);
	};

	getDataFromBackEnd = () => {
		const {
			daysWork,
			vehicle,
			fuelType,
			fuelConsumption,
			distance
		} = this.state;
		var url = `Https://ecomelbourne.azurewebsites.net/Calculator/index?fuelType=${fuelType}&distance=${distance}&days=${daysWork}&average=${fuelConsumption}&vehicleType=${vehicle}&period=Week`;
		console.log(url);
		axios
			.get(url)
			.then(response => {
				// console.log(response.data);
				console.log('THIS.PROPS');
				console.log(this.props);
				this.props.setupResult(response.data);
				console.log('After setupUp result');
			})
			.catch(error => {
				console.log(error);
			});
	};

	handleCheckResult = () => {
		console.log('THIS.STATE');
		console.log(this.state);

		const {
			livingSuburb,
			workingSuburb,
			daysWork,
			vehicle,
			fuelType,
			fuelConsumption
		} = this.state;

		if (livingSuburb === '') {
			this.setState({
				error: { livingSuburb: 'Please select a valid suburb' }
			});
			return;
		}

		if (workingSuburb === '') {
			this.setState({
				error: { workingSuburb: 'Please select a valid suburb' }
			});
			return;
		}

		if (daysWork === '') {
			this.setState({
				error: { daysWork: 'Please select a how many days you work weekly' }
			});
			return;
		}

		if (vehicle === '') {
			this.setState({
				error: { vehicle: 'Please select a way of travel' }
			});
			return;
		}

		if (vehicle === 'Car' || vehicle === 'MotorBike') {
			if (fuelType === '') {
				this.setState({
					error: { fuelType: 'Please select type of fuel you use' }
				});
				return;
			}

			if (
				fuelConsumption === '' ||
				!isNumeric(fuelConsumption) ||
				parseInt(fuelConsumption) <= 0
			) {
				this.setState({
					error: {
						fuelConsumption: 'Please select a valid fuel consumption'
					}
				});
				return;
			}
		}

		this.getDistance(this.state.livingSuburb, this.state.workingSuburb);
	};

	handleLivingSelect = address => {
		this.setState({ livingSuburb: address, error: { livingSuburb: '' } });
	};

	handleWorkingSelect = address => {
		this.setState({ workingSuburb: address, error: { workingSuburb: '' } });
	};

	handleChange = event => {
		console.log(event);
		this.setState({ [event.target.name]: event.target.value, error: {} });
	};

	render() {
		const vehicleArr = ['Car', 'MotorBike', 'Bus', 'Bicycle', 'Walk'];
		const daysworkArr = ['1', '2', '3', '4', '5', '6', '7'];
		var fuelTypeArr = ['Petrol', 'Diesel', 'Gas'];
		if (this.state.vehicle === 'MotorBike') {
			fuelTypeArr = ['Petrol'];
		}
		return (
			<div style={{ margin: '30px' }}>
				<Box display='flex' flexDirection='column'>
					<Box p={1}>
						<p>Input Where You Live</p>
						<LocationSearchInput
							value={this.state.livingSuburb}
							error={this.state.error.livingSuburb ? true : false}
							name='Living Suburb'
							handleSelect={this.handleLivingSelect}
							errorMsg={
								this.state.error.livingSuburb
									? this.state.error.livingSuburb
									: ''
							}
							returnCenterPoint={this.returnCenterPoint}
						/>
					</Box>
					<Box p={1}>
						<p>Input Where You Work</p>
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
							returnCenterPoint={this.returnCenterPoint}
						/>
					</Box>
					<Box p={1}>
						<p>Input How many days you work weekly</p>
						<SelectField
							name='daysWork'
							selectName='Day works weekly'
							value={this.state.daysWork}
							error={this.state.error.daysWork ? true : false}
							errorMsg={this.state.error.daysWork}
							itemList={daysworkArr}
							handleChange={this.handleChange}
						/>
					</Box>
					<Box p={1}>
						<p>How Do You Usually Travel?</p>
						<SelectField
							name='vehicle'
							selectName='Vehicle Using'
							value={this.state.vehicle}
							error={this.state.error.vehicle ? true : false}
							errorMsg={this.state.error.vehicle}
							itemList={vehicleArr}
							handleChange={this.handleChange}
						/>
					</Box>
					{this.state.vehicle === 'Car' ||
					this.state.vehicle === 'MotorBike' ? (
						<div>
							<Box p={1}>
								<p>Select Type Of Fuel You Use</p>
								<SelectField
									name='fuelType'
									selectName='Type of Fuel Using'
									value={this.state.fuelType}
									itemList={fuelTypeArr}
									error={this.state.error.fuelType ? true : false}
									errorMsg={this.state.error.fuelType}
									handleChange={this.handleChange}
								/>
							</Box>
							<Box p={1}>
								<p>Average Fuel /100km</p>
								<InputField
									inputName='Fuel Consumption'
									name='fuelConsumption'
									value={this.state.fuelConsumption}
									error={this.state.error.fuelConsumption ? true : false}
									errorMsg={this.state.error.fuelConsumption}
									handleChange={this.handleChange}
								/>
							</Box>
						</div>
					) : (
						<div />
					)}
					<Box p={1}>
						<Button
							variant='contained'
							style={{ backgroundColor: '#009a3f', color: '#fff' }}
							onClick={this.handleCheckResult}
						>
							Check How Much You Can Save !
						</Button>
					</Box>
				</Box>
			</div>
		);
	}
}
export default GoogleApiWrapper({
	apiKey: GOOGLEMAPAPI
})(Question);
