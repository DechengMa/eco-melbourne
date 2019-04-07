import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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
		console.log('This.Props');
		console.log(this.props);
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
							<Card style={{ height: '40vh', position: 'relative' }}>
								<CardContent>
									<Typography variant='h5' component='h2'>
										Carbon emission
									</Typography>
									<DirectionsCar />

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
											component='text'
											// formatValue={n => prettyBytes(n)}
										/>
										<span style={{ fontSize: 28 }}>Kg CO2e</span>
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
										How much carbon emission is created by a car ?
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
									Energy price
								</Typography>
								<Power />

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
									How much the user is spending for current travel method ?
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
