import React from 'react';
import { Card, CardBody, Container, Row, Col } from 'shards-react';
import {
	AccessTime,
	AttachMoney,
	LocalCafe,
	ArrowForwardIos
} from '@material-ui/icons';
import { Colors } from '../utils/Variables';
import { Fade } from 'react-reveal';

const arrowStyle = {
	alignItems: 'center',
	display: 'flex',
	justifyContent: 'center'
};

const delayBase = 0;

const TimeWastedCard = ({ timeWaste }) => {
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
										{/* {timeWaste} */}
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
										Might let you lost
									</h6>
									<h6
										className='stats-small__value'
										style={{
											fontSize: '2.0625rem',
											color: Colors.infoRed
										}}
									>
										50
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
								<div>
									<h6
										className='stats-small__label'
										style={{
											fontSize: '1.0625rem',
											color: '#000'
										}}
									>
										<LocalCafe />
										Which can buy
									</h6>
									<h6
										className='stats-small__value'
										style={{
											fontSize: '2.0625rem',
											color: Colors.infoGreen
										}}
									>
										10
										<span style={{ fontSize: '0.8rem' }}>cup</span>
									</h6>
									<h6
										style={{
											fontSize: '0.825rem'
										}}
										className='stats-small__label'
									>
										of coffees from starbucks
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

export default TimeWastedCard;
