import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { unstable_Box as Box } from '@material-ui/core/Box';
import { Spa, AttachMoney } from '@material-ui/icons';
import { Bar } from 'react-chartjs-2';
import { Colors } from '../utils/Variables';
import AnimatedNumber from 'react-animated-number';

class SecondDataVisualColumn extends Component {
	chartOptions = {
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

	render() {
		const data = {
			labels: ['Car', 'PTV', 'Bicycle'],
			datasets: [
				{
					label: 'Travel Cost ($AUD)',
					backgroundColor: Colors.mainGreen,
					borderColor: Colors.mainGreen,
					borderWidth: 1,
					hoverBackgroundColor: Colors.mainGreen,
					hoverBorderColor: Colors.mainGreen,
					data: [
						this.props.carPrice,
						this.props.ptvPrice,
						this.props.bicyclePrice
					]
				}
			]
		};

		return (
			<div>
				<Box display='flex' flexDirection='column'>
					<Box p={1}>
						<div style={{ margin: '15px 15px' }}>
							<Card style={{ height: '40vh', position: 'relative' }}>
								<Spa
									style={{
										position: 'absolute',
										right: '15px',
										top: '15px',
										color: Colors.mainGreen
									}}
								/>
								<CardContent>
									<Typography variant='h5' component='h2'>
										Impact
									</Typography>

									<Typography component='p' style={{ marginTop: '30px' }}>
										How many trees would be able to absorb this carbon dioxide ?
									</Typography>
								</CardContent>
								<CardActions
									style={{
										position: 'absolute',
										margin: '15px',
										bottom: '20px'
									}}
								>
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
										/>
									</Typography>
								</CardActions>
							</Card>
						</div>
					</Box>
				</Box>
				{/* <Box p={1}>
					<div style={{ margin: '15px 15px' }}>
						<Card style={{ height: '40vh', position: 'relative' }}>
							<CardContent>
								<Typography variant='h5' component='h2'>
									Fuel Consumption
								</Typography>
								<MeetingRoom />

								<Typography variant='h6'>
									<AnimatedNumber
										style={{
											transition: '0.8s ease-out',
											fontSize: 48,
											transitionProperty: 'background-color, color, opacity',
											color: Colors.mainBlue
										}}
										frameStyle={perc => (perc === 100 ? {} : { opacity: 0.25 })}
										duration={300}
										value={this.props.energyPrice}
										component='text'
										// formatValue={n => prettyBytes(n)}
									/>
									<span style={{ fontSize: 28 }}>$AUD</span>
								</Typography>
							</CardContent>
							<CardActions
								style={{ position: 'absolute', margin: '15px', bottom: '20px' }}
							>
								<Typography component='p'>
									How much fuel the user's car will consume
								</Typography>
							</CardActions>
						</Card>
					</div>
				</Box> */}
				<Box p={1}>
					<div style={{ margin: '15px 15px' }}>
						<Card style={{ height: '40vh', position: 'relative' }}>
							<AttachMoney
								style={{
									position: 'absolute',
									right: '15px',
									top: '15px',
									color: Colors.mainGreen
								}}
							/>
							<CardContent>
								<Typography variant='h5' component='h2'>
									Price Comparison
								</Typography>
								<Typography component='p'>
									How much can I save using other methods of travel ?
								</Typography>
							</CardContent>

							<CardActions
								style={{ position: 'absolute', margin: '15px', bottom: '20px' }}
							/>
							<div>
								<Bar
									data={data}
									width={100}
									height={190}
									options={{
										maintainAspectRatio: false
									}}
								/>
							</div>
						</Card>
					</div>
				</Box>
			</div>
		);
	}
}

export default SecondDataVisualColumn;
