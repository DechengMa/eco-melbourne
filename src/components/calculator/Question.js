import React, { Component } from 'react';
import InputField from '../utils/InputField';
import SelectField from '../utils/SelectField';
import { unstable_Box as Box } from '@material-ui/core/Box';
import LocationSearchInput from '../utils/LocationSearchInput';
import Button from '@material-ui/core/Button';
import { Map, GoogleApiWrapper, Polyline } from 'google-maps-react';
import { GOOGLEMAPAPI } from '../../config/keys';

class Question extends Component {
	state = {
		livingSuburb: '',
		workingSuburb: '',
		vehicle: '',
		daysWork: '',
		fuelType: '',
		fuelConsumption: '',
		distance: ''
	};

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
					console.log(response.rows[0].elements[0].distance.text);
					this.setState({
						distance: response.rows[0].elements[0].distance.text
					});
				}
			}
		);
	};

	// callback = (response, status) => {
	// 	console.log('Callback called');

	// 	if (status !== 'OK') {
	// 		console.log('ERROR!');
	// 		console.log(status);
	// 	} else {
	// 		console.log('Distance Come UP!');
	// 		console.log(response);
	// 	}
	// };

	handleCheckResult = () => {
		console.log(this.state);
		this.getDistance(this.state.livingSuburb, this.state.workingSuburb);
	};

	handleLivingSelect = address => {
		this.setState({ livingSuburb: address });
	};

	handleWorkingSelect = address => {
		this.setState({ workingSuburb: address });
	};

	handleChange = event => {
		console.log(event);
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const vehicleArr = ['Car', 'MotorBike', 'Bicycle', 'Walk'];
		var daysworkArr = ['1', '2', '3', '4', '5', '6', '7'];
		const fuelTypeArr = ['Pertrol', 'Dissel', 'Gas'];
		return (
			<div style={{ margin: '30px' }}>
				<Box display='flex' flexDirection='column'>
					<Box p={1}>
						<p>Input Where You Live</p>
						{/* <InputField
							inputName='Living Suburb'
							name='livingSuburb'
							value={this.state.livingSuburb}
							handleChange={this.handleChange}
						/> */}

						<LocationSearchInput
							value={this.state.livingSuburb}
							error={this.state.error}
							name='Living Suburb'
							handleSelect={this.handleLivingSelect}
							errorMsg={this.state.error ? this.state.errorMsg : ''}
							returnCenterPoint={this.returnCenterPoint}
						/>
					</Box>
					<Box p={1}>
						<p>Input Where You Work</p>
						{/* <InputField
							inputName='Working Suburb'
							name='workingSuburb'
							value={this.state.workingSuburb}
							handleChange={this.handleChange}
						/> */}
						<LocationSearchInput
							value={this.state.workingSuburb}
							error={this.state.error}
							name='Working Suburb'
							handleSelect={this.handleWorkingSelect}
							errorMsg={this.state.error ? this.state.errorMsg : ''}
							returnCenterPoint={this.returnCenterPoint}
						/>
					</Box>
					<Box p={1}>
						<p>Input Where You Live</p>
						<SelectField
							name='daysWork'
							selectName='Day works weekly'
							value={this.state.daysWork}
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
							itemList={vehicleArr}
							handleChange={this.handleChange}
						/>
					</Box>
					<Box p={1}>
						<p>Select Type Of Fuel You Use</p>
						<SelectField
							name='fuelType'
							selectName='Type of Fuel Using'
							value={this.state.fuelType}
							itemList={fuelTypeArr}
							handleChange={this.handleChange}
						/>
					</Box>
					<Box p={1}>
						<p>Input Fuel Consumption For Your Car</p>
						<InputField
							inputName='Fuel Consumption'
							name='fuelConsumption'
							value={this.state.fuelConsumption}
							handleChange={this.handleChange}
						/>
					</Box>
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
