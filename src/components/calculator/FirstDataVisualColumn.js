import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { unstable_Box as Box } from '@material-ui/core/Box';

const FirstDataVisualColumn = () => {
	return (
		<div>
			<Box display='flex' flexDirection='column'>
				<Box p={1}>
					<div style={{ margin: '30px 30px' }}>
						<Card style={{ height: '40vh' }}>
							<CardContent>
								<Typography variant='h5' component='h2'>
									Carbon emission
								</Typography>
								<Typography component='p'>
									How much carbon emission is created by a car ?
								</Typography>
							</CardContent>
							<CardActions>
								<Button size='small'>Learn More</Button>
							</CardActions>
						</Card>
					</div>
				</Box>
			</Box>
			<Box p={1}>
				<div style={{ margin: '30px 30px' }}>
					<Card style={{ height: '40vh' }}>
						<CardContent>
							<Typography variant='h5' component='h2'>
								Energy price
							</Typography>
							<Typography component='p'>
								How much the user is spending for current travel method ?
							</Typography>
						</CardContent>
						<CardActions>
							<Button size='small'>Learn More</Button>
						</CardActions>
					</Card>
				</div>
			</Box>
		</div>
	);
};

export default FirstDataVisualColumn;
