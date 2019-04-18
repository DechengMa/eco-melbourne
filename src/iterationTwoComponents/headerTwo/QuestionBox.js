import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputField from '../utils/InputField';
import SelectField from '../utils/SelectField';
import { unstable_Box as Box } from '@material-ui/core/Box';
import LocationSearchInput from '../utils/LocationSearchInput';
import { GoogleApiWrapper } from 'google-maps-react';
import { GOOGLEMAPAPI } from '../../config/keys';
import axios from 'axios';
import { isNumeric } from '../utils/Variables';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Colors } from '../utils/Variables';

class QuestionBox extends Component {
	state = {
		livingSuburb: '',
		workingSuburb: '',
		vehicle: '',
		daysWork: '',
		fuelType: '',
		fuelConsumption: 0,
		distance: '',
		period: 'Week',
		loading: false,
		errorOrNot: false,
		error: {}
	};

	render() {
		const daysworkArr = ['1', '2', '3', '4', '5', '6', '7'];
		return (
			<Card style={{ padding: '20px' }}>
				<CardContent>
					<h2>Change the way you travel,</h2>
					<h2>from today</h2>
					<div style={{ margin: '10px' }}>
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
					</div>

					<div style={{ margin: '10px' }}>
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
					</div>
					<div style={{ margin: '10px' }}>
						<SelectField
							name='daysWork'
							selectName='Day works weekly'
							value={this.state.daysWork}
							error={this.state.error.daysWork ? true : false}
							errorMsg={this.state.error.daysWork}
							itemList={daysworkArr}
							handleChange={this.handleChange}
						/>
					</div>
				</CardContent>
				<CardActions>
					<Button
						variant='contained'
						style={{
							backgroundColor: Colors.mainGreen,
							color: '#fff',
							height: '40px',
							width: '100%'
						}}
						onClick={this.handleCheckResult}
					>
						Check
					</Button>
				</CardActions>
			</Card>
		);
	}
}

export default QuestionBox;
