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
		const valueArr = props.substring(1, props.length - 1).split(',');

		const equation = valueArr[0].substring(0, valueArr[0].indexOf('.'));

		const carEmission = parseFloat(Math.round(valueArr[2] * 100) / 100).toFixed(
			2
		);

		this.setState({
			carEmission: carEmission,
			equation: equation,
			energyPrice: valueArr[1],
			ptvPrice: valueArr[3],
			bicyclePrice: valueArr[4]
		});
	};

	handlePeriodSelect = period => {
		console.log(period.target.value);
		this.setState({ period: period.target.value });
	};

	render() {
		return (
			<div>
				<div style={{ position: 'absolute', right: '30px' }}>
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

				<Grid container>
					<Grid item md={4} xs={12}>
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
			</div>
		);
	}
}

export default index;
