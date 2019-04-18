import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { DirectionsCar, Power } from '@material-ui/icons';
import { AnimatedNum } from '../utils/AnimatedNum';
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
			<>
				<Card style={{ margin: '20px', height: '45%', position: 'relative' }}>
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
							<AnimatedNum
								value={this.props.carEmission}
								units={'Kg CO2e'}
								color={Colors.mainYellow}
							/>
						</Typography>
					</CardActions>
				</Card>

				<Card style={{ margin: '20px', height: '45%', position: 'relative' }}>
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
							<AnimatedNum
								value={this.props.energyPrice}
								units={'$Aud'}
								color={Colors.mainBlue}
							/>
						</Typography>
					</CardActions>
				</Card>
			</>
		);
	}
}

export default FirstDataVisualColumn;
