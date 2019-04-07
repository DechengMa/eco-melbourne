import React, { Component } from 'react';
import Question from './Question';
import FirstDataVisualColumn from './FirstDataVisualColumn';
import SecondDataVisualColumn from './SecondDataVisualColumn';
import { Grid } from '@material-ui/core';

class index extends Component {
	state = {
		carEmission: '',
		equation: '',
		energyPrice: ''
	};

	getDistance = distance => {};

	setupResult = props => {
		console.log('setupResult in index.js');
		// fuel consumption // price of fuel // CO2e
		console.log(props.substring(1, props.length - 1));
		const valueArr = props.substring(1, props.length - 1).split(',');
		console.log(valueArr);
		this.setState({
			carEmission: valueArr[2],
			equation: valueArr[0],
			energyPrice: valueArr[1]
		});
	};

	render() {
		return (
			<div>
				<Grid container>
					<Grid item xs={4}>
						<Question setupResult={this.setupResult} />
					</Grid>
					<Grid item xs={4}>
						<FirstDataVisualColumn
							carEmission={this.state.carEmission}
							energyPrice={this.state.energyPrice}
						/>
					</Grid>
					<Grid item xs={4}>
						<SecondDataVisualColumn equation={this.state.equation} />
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default index;
