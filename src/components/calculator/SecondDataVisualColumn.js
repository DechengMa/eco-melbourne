import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { unstable_Box as Box } from '@material-ui/core/Box';
import { Spa } from '@material-ui/icons';
import { Bar } from 'react-chartjs-2';
import { Colors } from '../utils/Variables';
import AnimatedNumber from 'react-animated-number';

const data = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [
		{
			label: 'My First dataset',
			backgroundColor: Colors.mainGreen,
			borderColor: Colors.mainGreen,
			borderWidth: 1,
			hoverBackgroundColor: Colors.mainGreen,
			hoverBorderColor: Colors.mainGreen,
			data: [65, 59, 80, 81, 56, 55, 40]
		}
	]
};

const chartOptions = {
	scales: {
		xAxes: [
			{
				barPercentage: 0.5,
				barThickness: 6,
				maxBarThickness: 8,
				minBarLength: 2,
				gridLines: {
					offsetGridLines: true
				}
			}
		]
	}
};

class SecondDataVisualColumn extends Component {
	render() {
		return (
			<div>
				<Box display='flex' flexDirection='column'>
					<Box p={1}>
						<div style={{ margin: '15px 15px' }}>
							<Card style={{ height: '40vh', position: 'relative' }}>
								<CardContent>
									<Typography variant='h5' component='h2'>
										Equation
									</Typography>
									<Spa />
									<Typography variant='h6'>
										<AnimatedNumber
											style={{
												transition: '0.8s ease-out',
												fontSize: 48,
												transitionProperty: 'background-color, color, opacity',
												color: Colors.mainGreen
											}}
											frameStyle={perc =>
												perc === 100 ? {} : { opacity: 0.25 }
											}
											duration={300}
											value={this.props.equation}
											component='text'
										/>
										<span style={{ fontSize: 28 }}>Num of Trees</span>
									</Typography>
								</CardContent>
								<CardActions
									style={{
										position: 'absolute',
										margin: '15px',
										bottom: '20px'
									}}
								>
									<Typography component='p'>
										How many trees do we need to absorb these carbon dioxide ?
									</Typography>
								</CardActions>
							</Card>
						</div>
					</Box>
				</Box>
				<Box p={1}>
					<div style={{ margin: '15px 15px' }}>
						<Card style={{ height: '40vh', position: 'relative' }}>
							<CardContent>
								<Typography variant='h5' component='h2'>
									Price comparison
								</Typography>
								<Typography component='p'>
									How much the user could save using other travel methods ?
								</Typography>
							</CardContent>
							<Bar
								data={data}
								width={100}
								height={30}
								options={{
									maintainAspectRatio: false
								}}
							/>
							{/* <CardActions style={{ position: 'absolute', bottom: '20px' }}>
								<Button size='small'>Learn More</Button>
							</CardActions> */}
						</Card>
					</div>
				</Box>
			</div>
		);
	}
}

export default SecondDataVisualColumn;
