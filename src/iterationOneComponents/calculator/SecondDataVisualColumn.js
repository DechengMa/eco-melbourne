import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Spa, AttachMoney } from '@material-ui/icons';
import { Bar } from 'react-chartjs-2';
import { Colors } from '../utils/Variables';
// import AnimatedNumber from 'react-animated-number';
import { AnimatedNum } from '../utils/AnimatedNum';

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
			<>
				<Card style={{ margin: '20px', height: '45%', position: 'relative' }}>
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
							<AnimatedNum
								color={Colors.mainGreen}
								value={this.props.equation}
							/>
						</Typography>
					</CardActions>
				</Card>

				<Card style={{ margin: '20px', height: '45%', position: 'relative' }}>
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
							width={60}
							height={150}
							options={{
								maintainAspectRatio: false
							}}
						/>
					</div>
				</Card>
			</>
		);
	}
}

export default SecondDataVisualColumn;
