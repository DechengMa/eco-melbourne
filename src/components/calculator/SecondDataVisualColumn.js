import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { unstable_Box as Box } from '@material-ui/core/Box';

const SecondDataVisualColumn = () => {
	return (
		<div>
			<Box display='flex' flexDirection='column'>
				<Box p={1}>
					<div style={{ margin: '30px 30px' }}>
						<Card style={{ height: '40vh' }}>
							<CardContent>
								{/* <Typography color='textSecondary' gutterBottom>
									Carbon emission
								</Typography> */}
								<Typography variant='h5' component='h2'>
									Equation
								</Typography>
								{/* <Typography color='textSecondary'>adjective</Typography> */}
								<Typography component='p'>
									How many trees do we need to absorb these carbon dioxide?
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
							{/* <Typography color='textSecondary' gutterBottom>
								Word of the Day
							</Typography> */}
							<Typography variant='h5' component='h2'>
								Price comparison
							</Typography>
							{/* <Typography color='textSecondary'>adjective</Typography> */}
							<Typography component='p'>
								How much the user could save using other travel methods ?
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

export default SecondDataVisualColumn;
