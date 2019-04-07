import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TableauReport from 'tableau-react';

const ChartCard = props => {
	return (
		<Card style={{ margin: '30px' }}>
			<CardContent>
				<TableauReport url={props.url} />
			</CardContent>
			{/* <CardActions>
				<Button size='small'>Learn More</Button>
			</CardActions> */}
		</Card>
	);
};

export default ChartCard;
