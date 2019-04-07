import React from 'react';
import ChartCard from '../utils/ChartCard';
import Grid from '@material-ui/core/Grid';

const DataVisual = () => {
	let table1 =
		'https://public.tableau.com/views/methodoftraveltowork2/Dashboard1?:embed=y&:display_count=yes';
	let table2 =
		'https://public.tableau.com/views/PopulationCongestion/Dashboard1?:embed=y&:display_count=yes';
	return (
		// <React.Fragment>
		// 	<ChartCard url={table1} />
		// 	<ChartCard url={table2} />
		// </React.Fragment>
		<Grid container>
			<Grid item xs={6}>
				<ChartCard url={table1} />
			</Grid>
			<Grid xs={6}>
				<ChartCard url={table2} />
			</Grid>
		</Grid>
	);
};

export default DataVisual;
