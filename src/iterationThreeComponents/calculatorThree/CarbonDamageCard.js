import React from 'react';
import { Card, CardBody, Container, Row, Col } from 'shards-react';
import { ScatterPlot, Spa, Terrain, ArrowForwardIos } from '@material-ui/icons';
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

const CarbonDamageCard = ({ carCarbon, treesRequired }) => {
	return (
		<Card style={{ width: '100%' }}>
			<CardBody>
				<Container>
					<Row style={{ textAlign: 'center' }}>
						<Col lg='3' md='3' sm='12' xs='12'>
							<Fade delay={500 + delayBase}>
								<div>
									<h6 style={{ ...titleStyle }} className='stats-small__label'>
										<ScatterPlot />
										Your Generated
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
									<h6 style={{ ...titleStyle }} className='stats-small__label'>
										<Spa />
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
										<span style={{ fontSize: '0.8rem' }}>trees</span>
									</h6>
									<h6
										style={{
											fontSize: '0.825rem'
										}}
										className='stats-small__label'
									>
										To absorb your car emission
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
								<div>
									<h6
										className='stats-small__label'
										style={{
											...titleStyle
										}}
									>
										<Terrain />
										Which equals to
									</h6>
									<h6
										className='stats-small__value'
										style={{
											fontSize: '2.0625rem',
											color: Colors.infoRed
										}}
									>
										0.7
										<span style={{ fontSize: '0.8rem' }} />
									</h6>
									<h6
										style={{
											fontSize: '0.825rem'
										}}
										className='stats-small__label'
									>
										Num of trees in Albert Park
									</h6>
								</div>
							</Fade>
						</Col>
					</Row>
				</Container>
			</CardBody>
		</Card>
	);
};

export default CarbonDamageCard;
