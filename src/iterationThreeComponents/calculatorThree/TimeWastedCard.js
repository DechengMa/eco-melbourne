import React, { Component } from 'react';
import { Card, CardBody, Container, Row, Col, Collapse } from 'shards-react';
import classnames from 'classnames';
import {
	AccessTime,
	AttachMoney,
	LocalCafe,
	ArrowForwardIos,
	Watch,
	Computer,
	ExpandMore
} from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Colors } from '../utils/Variables';
import { Fade } from 'react-reveal';

const arrowStyle = {
	alignItems: 'center',
	display: 'flex',
	justifyContent: 'center'
};

const delayBase = 0;

const renderItem = value => {
	var valueToCompare = Number(value).toFixed(2);
	var title = '';

	var number = [0, ''];
	var desc = '';
	switch (true) {
		case valueToCompare < 100:
			title = (
				<>
					<LocalCafe />
					Which can buy
				</>
			);
			number = [valueToCompare / 1, 'cup(s)'];
			desc = 'of regular coffees from 711';
			break;
		case valueToCompare > 100 && valueToCompare < 600:
			title = (
				<>
					<Watch />
					Which can buy
				</>
			);
			number = [(valueToCompare / 99.95).toFixed(1), ''];
			desc = 'Fitbit Flex 2™ fitness wristband';
			break;
		case valueToCompare > 600 && valueToCompare < 1850:
			title = (
				<>
					<Watch />
					Which can buy
				</>
			);
			number = [(valueToCompare / 600).toFixed(1), ''];
			desc = 'Apple Watch (40-mm) from Apple';
			break;
		case valueToCompare > 1850:
			title = (
				<>
					<Computer />
					Which can buy
				</>
			);
			number = [(valueToCompare / 1849).toFixed(1), ''];
			desc = '13-inch MacBook Air from Apple';
			break;

		default:
			break;
	}
	return (
		<>
			<h6
				className='stats-small__label'
				style={{
					fontSize: '1.0625rem',
					color: '#000'
				}}
			>
				{title}
			</h6>
			<h6
				className='stats-small__value'
				style={{
					fontSize: '2.0625rem',
					color: Colors.infoGreen
				}}
			>
				{number[0]}
				<span style={{ fontSize: '0.8rem' }}>{number[1]}</span>
			</h6>
			<h6
				style={{
					fontSize: '0.825rem'
				}}
				className='stats-small__label'
			>
				{desc}
			</h6>
		</>
	);
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

class TimeWastedCard extends Component {
	state = { collapse: false };

	toggle = () => {
		this.setState({ collapse: !this.state.collapse });
	};
	render() {
		const { timeWaste, classes } = this.props;
		const money =
			Number(timeWaste) > 0 ? (Number(timeWaste) * 0.415).toFixed(2) : 0;
		return (
			<Card style={{ width: '100%' }}>
				<CardBody>
					<Container>
						<Row style={{ textAlign: 'center' }}>
							<Col lg='3' md='3' sm='12' xs='12'>
								<Fade delay={500 + delayBase}>
									<div>
										<h6
											style={{
												fontSize: '1.0625rem',
												color: '#000'
											}}
											className='stats-small__label'
										>
											<AccessTime />
											You wasted
										</h6>

										<h6
											className='stats-small__value'
											style={{
												fontSize: '2.0625rem',
												color: Colors.infoYellow
											}}
										>
											{Number(timeWaste) > 0 ? timeWaste : 0}
											<span style={{ fontSize: '0.8rem' }}>mins</span>
										</h6>
										<h6
											style={{
												fontSize: '0.825rem'
											}}
											className='stats-small__label'
										>
											Daily stuck on the road
										</h6>
									</div>
								</Fade>
							</Col>

							<Col style={{ ...arrowStyle }}>
								<Fade delay={1000 + delayBase}>
									<ArrowForwardIos />
								</Fade>
							</Col>

							<Col lg='3' md='3' sm='12' xs='12'>
								<Fade delay={2000 + delayBase}>
									<div>
										<h6
											style={{
												fontSize: '1.0625rem',
												color: '#000'
											}}
											className='stats-small__label'
										>
											<AttachMoney />
											Might let you lose
										</h6>
										<h6
											className='stats-small__value'
											style={{
												fontSize: '2.0625rem',
												color: Colors.infoRed
											}}
										>
											{money}
											<span style={{ fontSize: '0.8rem' }}>$</span>
										</h6>
										<h6
											style={{
												fontSize: '0.825rem'
											}}
											className='stats-small__label'
										>
											Compare to Melbourne Avg salary rate
										</h6>
									</div>
								</Fade>
							</Col>

							<Col style={{ ...arrowStyle }}>
								<Fade delay={2500 + delayBase}>
									<ArrowForwardIos />
								</Fade>
							</Col>

							<Col lg='3' md='3' sm='12' xs='12'>
								<Fade delay={3500 + delayBase}>
									<div>{renderItem(money)}</div>
								</Fade>
							</Col>
						</Row>
						<Row>
							<Collapse style={{ width: '100%' }} open={this.state.collapse}>
								<div className='p-3 mt-3 border rounded'>
									<h5>What to know how we calculate these number?</h5>
									{`
									Time Wasted = travel time with traffic - travel time without tr	affic (*Data Source: Google API)
									Melbourne salary hour rates : $24.855 (*Data Source: payscale)
									711 regular coffee: $1; Fitbit Flex 2™: $99.95; Apple Watch Silver Aluminium Case with White Sport Band (40-mm): $600; 13-inch MacBook Air: $1,849.00`
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
						<ExpandMore />
					</IconButton>
				</CardBody>
			</Card>
		);
	}
}

export default withStyles(styles)(TimeWastedCard);
