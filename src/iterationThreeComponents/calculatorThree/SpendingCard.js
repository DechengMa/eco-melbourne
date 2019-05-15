import React from 'react';
import { Card, CardBody, Container, Row, Col } from 'shards-react';
import { AccessTime, AttachMoney, ArrowForwardIos } from '@material-ui/icons';
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

const delayBase = 8000;

const SpendingCard = ({ totalMoneySpent }) => {
	return (
		<Card style={{ width: '100%' }}>
			<CardBody>
				<Container>
					<Row style={{ textAlign: 'center' }}>
						<Col lg='5' md='5' sm='12' xs='12'>
							<Fade delay={500}>
								<div>
									<h6
										style={{
											...titleStyle
										}}
										className='stats-small__label'
									>
										<AccessTime />
										The Running Costs is
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
										For using your car daily
									</h6>
								</div>
							</Fade>
						</Col>
						<Col style={{ ...arrowStyle }}>
							<Fade delay={1000}>
								<ArrowForwardIos />
							</Fade>
						</Col>
						<Col lg='5' md='5' sm='12' xs='12'>
							<Fade delay={2000}>
								<div>
									<h6
										style={{
											...titleStyle
										}}
										className='stats-small__label'
									>
										<AttachMoney />
										Which needs
									</h6>
									<h6
										className='stats-small__value'
										style={{
											fontSize: '2.0625rem',
											color: Colors.infoRed
										}}
									>
										65
										<span style={{ fontSize: '0.8rem' }}>hours</span>
									</h6>
									<h6
										style={{
											fontSize: '0.825rem'
										}}
										className='stats-small__label'
									>
										Extra working time to earn back
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

export default SpendingCard;
