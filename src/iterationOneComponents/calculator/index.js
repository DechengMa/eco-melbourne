import React, { Component } from 'react';
import Question from './Question';
import FirstDataVisualColumn from './FirstDataVisualColumn';
import SecondDataVisualColumn from './SecondDataVisualColumn';
import { Grid } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class index extends Component {
	state = {
		carEmission: 0,
		equation: 0,
		energyPrice: 0,
		ptvPrice: 0,
		bicyclePrice: 0,
		period: 'Week'
	};

	setupResult = props => {
		let valueArr = props.substring(1, props.length - 1).split(',');

		let equation = Number(valueArr[0]).toFixed(1);

		let carEmission = Number(valueArr[2]).toFixed(2);

		let energyPrice = Number(valueArr[1]).toFixed(2);

		let ptvPrice = Number(valueArr[3]).toFixed(2);
		let bicyclePrice = Number(valueArr[4]).toFixed(2);
		this.setState({
			carEmission: carEmission,
			equation: equation,
			energyPrice: energyPrice,
			ptvPrice: ptvPrice,
			bicyclePrice: bicyclePrice
		});
	};

	handlePeriodSelect = period => {
		console.log(period.target.value);
		this.setState((prevState, props) => ({
			...prevState,
			period: period.target.value
		}));
	};

	render() {
		return (
			<React.Fragment>
				<div style={{ position: 'absolute', right: '20px' }}>
					<FormControl style={{ width: '200px' }} variant='outlined'>
						<InputLabel>Period</InputLabel>
						<Select
							value={this.state.period}
							onChange={this.handlePeriodSelect}
						>
							<MenuItem value={'Week'}>Weekly</MenuItem>
							<MenuItem value={'Month'}>Monthly</MenuItem>
							<MenuItem value={'Year'}>Yearly</MenuItem>
						</Select>
					</FormControl>
				</div>
				<div style={{ height: '50px' }} />
				<Grid
					container
					style={{
						height: '80vh',
						gridAutoRows: '1fr'
					}}
				>
					<Grid
						item
						md={4}
						xs={12}
						style={{
							overflow: 'scroll',
							height: '100%'
						}}
					>
						<Question
							setupResult={this.setupResult}
							period={this.state.period}
						/>
					</Grid>
					<Grid item md={4} xs={12}>
						<FirstDataVisualColumn
							carEmission={this.state.carEmission}
							energyPrice={this.state.energyPrice}
						/>
					</Grid>
					<Grid item md={4} xs={12}>
						<SecondDataVisualColumn
							equation={this.state.equation}
							carPrice={this.state.energyPrice}
							ptvPrice={this.state.ptvPrice}
							bicyclePrice={this.state.bicyclePrice}
						/>
					</Grid>
				</Grid>
				{/* </React.Fragment> */}
			</React.Fragment>
		);
	}
}

export default index;
