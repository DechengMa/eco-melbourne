import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { unstable_Box as Box } from '@material-ui/core/Box';
import { DirectionsCar, Power } from '@material-ui/icons';
import AnimatedNumber from 'react-animated-number';
import { Colors } from '../utils/Variables';

class FirstDataVisualColumn extends Component {
	state = {
		carEmission: '',
		energyPrice: ''
	};

	componentWillReceiveProps() {
		this.setState({
			carEmission: this.props.carEmission,
			energyPrice: this.props.energyPrice
		});
	}

	render() {
		return (
			<div>
				<Box display='flex' flexDirection='column'>
					<Box p={1}>
						<div style={{ margin: '15px 15px' }}>
							<Card style={{ height: '30vh', position: 'relative' }}>
								<DirectionsCar
									style={{
										position: 'absolute',
										right: '15px',
										top: '15px',
										color: Colors.mainYellow
									}}
								/>
								<CardContent>
									<Typography variant='h5' component='h2'>
										Carbon Emission
									</Typography>

									{/* <Typography variant='h6'>
										<AnimatedNumber
											style={{
												transition: '0.8s ease-out',
												fontSize: 48,
												transitionProperty: 'background-color, color, opacity',
												color: Colors.mainYellow
											}}
											frameStyle={perc =>
												perc === 100 ? {} : { opacity: 0.25 }
											}
											duration={300}
											value={this.props.carEmission}
											component='text'
											// formatValue={n => prettyBytes(n)}
										/>
										<span style={{ fontSize: 28 }}>Kg CO2e</span>
									</Typography> */}
									<Typography component='p' style={{ marginTop: '30px' }}>
										What is my current carbon footprint ?
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
												color: Colors.mainYellow
											}}
											frameStyle={perc =>
												perc === 100 ? {} : { opacity: 0.25 }
											}
											duration={300}
											value={this.props.carEmission}
											// component='text'
										/>
										<span style={{ fontSize: 28 }}>Kg CO2e</span>
									</Typography>
								</CardActions>
							</Card>
						</div>
					</Box>
				</Box>
				<Box p={1}>
					<div style={{ margin: '15px 15px' }}>
						<Card style={{ height: '30vh', position: 'relative' }}>
							<Power
								style={{
									position: 'absolute',
									right: '15px',
									top: '15px',
									color: Colors.mainBlue
								}}
							/>
							<CardContent>
								<Typography variant='h5' component='h2'>
									My Spending
								</Typography>
								<Typography component='p' style={{ marginTop: '30px' }}>
									How much am I currently spending ?
								</Typography>
							</CardContent>
							<CardActions
								style={{ position: 'absolute', margin: '15px', bottom: '20px' }}
							>
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
									/>
									<span style={{ fontSize: 28 }}>$AUD</span>
								</Typography>
							</CardActions>
						</Card>
					</div>
				</Box>
			</div>
		);
	}
}

export default FirstDataVisualColumn;
