import React, { Component } from 'react';
import { Card, CardBody, Container, Row, Col, Collapse } from 'shards-react';
import classnames from 'classnames';
import {
	AccessTime,
	AttachMoney,
	ArrowForwardIos,
	ExpandMore
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { Colors } from '../utils/Variables';

import { Fade } from 'react-reveal';

const arrowStyle = {
	alignItems: 'center',
	display: 'flex',
	justifyContent: 'center'
};

const titleStyle = {
	fontSize: '1.0625rem',
	color: '#000',
	fontWeight: '400'
};

const styles = theme => ({
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	}
});

const delayBase = 4000;

const renderWorkingTime = totalMoneySpent => {
	const hours =
		Number(totalMoneySpent) > 0 ? (totalMoneySpent / 24.855).toFixed(1) : 0;
	var data = [];

	if (hours < 7.6) {
		data[0] = hours;
		data[1] = 'hour(s)';
	} else if (hours > 7.6 && hours < 38) {
		data[0] = Number(hours / 7.6).toFixed(1);
		data[1] = 'day(s)';
	} else {
		data[0] = Number(hours / 38).toFixed(1);
		data[1] = 'week(s)';
	}

	return (
		<div>
			<h6
				style={{
					...titleStyle
				}}
				className='stats-small__label'
			>
				<AccessTime />
				Which Takes
			</h6>
			<h6
				className='stats-small__value'
				style={{
					fontSize: '2.0625rem',
					color: Colors.infoRed
				}}
			>
				{data[0]}
				<span style={{ fontSize: '0.8rem' }}>{data[1]}</span>
			</h6>
			<h6
				style={{
					fontSize: '0.825rem'
				}}
				className='stats-small__label'
			>
				For an Average Employee in Melbourne to Earn
			</h6>
		</div>
	);
};

class SpendingCard extends Component {
	state = { collapse: false };

	toggle = () => {
		this.setState({ collapse: !this.state.collapse });
	};
	render() {
		const { totalMoneySpent, classes } = this.props;
		return (
			<Card style={{ width: '100%' }}>
				<CardBody>
					<Container>
						<Row style={{ textAlign: 'center' }}>
							<Col lg='5' md='5' sm='12' xs='12'>
								<Fade delay={500 + delayBase}>
									<div>
										<h6
											style={{
												...titleStyle
											}}
											className='stats-small__label'
										>
											<AttachMoney />
											You are Spending
										</h6>

										<h6
											className='stats-small__value'
											style={{
												fontSize: '2.0625rem',
												color: Colors.infoYellow
											}}
										>
											{totalMoneySpent}
											<span style={{ fontSize: '0.8rem' }}>$</span>
										</h6>
										<h6
											style={{
												fontSize: '0.825rem'
											}}
											className='stats-small__label'
										>
											Running your Car
										</h6>
									</div>
								</Fade>
							</Col>
							<Col style={{ ...arrowStyle }}>
								<Fade delay={800 + delayBase}>
									<ArrowForwardIos />
								</Fade>
							</Col>
							<Col lg='5' md='5' sm='12' xs='12'>
								<Fade delay={1100 + delayBase}>
									{renderWorkingTime(totalMoneySpent)}
								</Fade>
							</Col>
						</Row>
						<Row>
							<Collapse style={{ width: '100%' }} open={this.state.collapse}>
								<div className='p-3 mt-3 border rounded'>
									<h5>What to know how we calculate these number?</h5>
									{`
									Runing cost includes fuel price, insurance price and service price, we used average value in Melbourne for insurance and service
									Melbourne salary hour rates : $24.855 (*Data Source: payscale)
									In Australia, an employee can work up to 38 hours in a week or 7.6 hours a day. (*Data Source: robertwalters)`
										.split('\n')
										.map(e => (
											<p>{e}</p>
										))}
								</div>
							</Collapse>
						</Row>
					</Container>
					<IconButton
						style={{ position: 'absolute', bottom: '0', right: '0' }}
						className={classnames(classes.expand, {
							[classes.expandOpen]: this.state.collapse
						})}
						onClick={this.toggle}
						aria-expanded={this.state.collapse}
						aria-label='Show more'
					>
						<Fade delay={1300 + delayBase}>
							<ExpandMore />
						</Fade>
					</IconButton>
				</CardBody>
			</Card>
		);
	}
}

export default withStyles(styles)(SpendingCard);
