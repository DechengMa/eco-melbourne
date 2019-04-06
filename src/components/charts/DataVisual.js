import React from 'react';
import ChartCard from '../utils/ChartCard';
import Grid from '@material-ui/core/Grid';

const DataVisual = () => {
	let table1 =
		'https://public.tableau.com/views/methodoftraveltowork2/Methodoftraveltowork?:embed=y&:display_count=yes';
	let table2 =
		'https://public.tableau.com/views/PopulationCongestion/Sheet1?:embed=y&:display_count=yes&publish=yes';
	return (
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
