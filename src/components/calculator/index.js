import React, { Component } from 'react';
import Question from './Question';
import FirstDataVisualColumn from './FirstDataVisualColumn';
import SecondDataVisualColumn from './SecondDataVisualColumn';
import { Grid } from '@material-ui/core';

class index extends Component {
	render() {
		return (
			<div>
				<Grid container>
					<Grid item xs={4}>
						<Question />
					</Grid>
					<Grid item xs={4}>
						<FirstDataVisualColumn />
					</Grid>
					<Grid item xs={4}>
						<SecondDataVisualColumn />
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default index;
