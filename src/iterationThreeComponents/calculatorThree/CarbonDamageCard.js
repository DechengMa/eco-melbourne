import React, { Component } from 'react';
import { Card, CardBody, Container, Row, Col, Collapse } from 'shards-react';
import classnames from 'classnames';
import {
	ScatterPlot,
	Terrain,
	ArrowForwardIos,
	AccountBalance,
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

const delayBase = 4000;

const renderTrees = value => {
	value = Number(value).toFixed(2);
	var data = [];

	if (value < 2000) {
		data[0] = 'Which can be used to build';
		data[1] = (value / 44).toFixed(2);
		data[2] = 'House(s) of 2600 square feet';
	} else {
		data[0] = 'Which equals to';
		data[1] = (value / 2982).toFixed(2);
		data[2] = 'Num of trees in Albert Park';
	}

	return (
		<>
			<h6
				className='stats-small__label'
				style={{
					...titleStyle
				}}
			>
				<AccountBalance />
				{data[0]}
			</h6>
			<h6
				className='stats-small__value'
				style={{
					fontSize: '2.0625rem',
					color: Colors.infoRed
				}}
			>
				{data[1]}
			</h6>
			<h6
				style={{
					fontSize: '0.825rem'
				}}
				className='stats-small__label'
			>
				{data[2]}
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

class CarbonDamageCard extends Component {
	state = { collapse: false };

	toggle = () => {
		this.setState({ collapse: !this.state.collapse });
	};
	render() {
		const { carCarbon, treesRequired, classes } = this.props;
		return (
			<Card style={{ width: '100%' }}>
				<CardBody>
					<Container>
						<Row style={{ textAlign: 'center' }}>
							<Col lg='3' md='3' sm='12' xs='12'>
								<Fade delay={500 + delayBase}>
									<div>
										<h6
											style={{ ...titleStyle }}
											className='stats-small__label'
										>
											<ScatterPlot />
											You Generated
										</h6>

										<h6
											className='stats-small__value'
											style={{
												fontSize: '2.0625rem'
											}}
										>
											{carCarbon}
											<span style={{ fontSize: '0.8rem' }}>kg</span>
										</h6>
										<h6
											style={{
												fontSize: '0.825rem'
											}}
											className='stats-small__label'
										>
											Carbon Footprint by driving daily
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
											style={{ ...titleStyle }}
											className='stats-small__label'
										>
											<Terrain />
											Which needs
										</h6>
										<h6
											className='stats-small__value'
											style={{
												fontSize: '2.0625rem',
												color: Colors.infoYellow
											}}
										>
											{treesRequired}
											<span style={{ fontSize: '0.8rem' }}>mature trees</span>
										</h6>
										<h6
											style={{
												fontSize: '0.825rem'
											}}
											className='stats-small__label'
										>
											To absorb your car emission yealy
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
									<div>{renderTrees(treesRequired)}</div>
								</Fade>
							</Col>
						</Row>
						<Row>
							<Collapse style={{ width: '100%' }} open={this.state.collapse}>
								<div className='p-3 mt-3 border rounded'>
									<h5>What to know how we calculate these number?</h5>
									{`
									A tree can absorb as much as 48 pounds of carbon dioxide per year
									48 pounds = 22 kg approx (*Data Source: NC state Univerisity)
									
									`
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
						<Fade delay={4000 + delayBase}>
							<ExpandMore />
						</Fade>
					</IconButton>
				</CardBody>
			</Card>
		);
	}
}

export default withStyles(styles)(CarbonDamageCard);
