import React from 'react';
import { Container, Row, Col, Fade, CardBody, Card } from 'shards-react';
import Navigation from '../headerThree/Nav/Navigation';
import EnvironmentalIssue from '../../resources/img/environmentalIssue.png';
import HealthyIssue from '../../resources/img/healthyIssue.png';
import TableauReport from 'tableau-react';
import IssuesCard from './IssuesCard';
import GoHomeBtn from '../utils/GoHomeBtn';
import Footer from '../footerThree';

const healthyRisksPoints = (
	<>
		<p>• Overweight and obesity </p>
		<p>• Sleep disorder</p>
		<p>• Breath issue</p>
		<p>• Hypertension</p>
	</>
);

const environmentalIssuesPoints = (
	<>
		<p>• Global warming </p>
		<p>• Air soil and water pollution </p>
		<p>• Noise pollution </p>
	</>
);

const healthyRisksDesc = `• Overweight and obesity
According to recent research(NTC, 2015), long-term driving influence the health of the driver. 
74% driver are overweight or obese, compared to 58% of males in the general population.
• Sleep disorder
According to recent research (NTC, 2015), long-term driving influence the health of the driver. 
18% driver has high score to very high score on the Epworth Sleepiness Scale, an indicator of excess daytime sleepiness.
• Breath issue
According to recent research (NTC, 2015), long-term driving influence the health of the driver. 
24% driver have a high to very high risk of breathing problems associated with a sleep disorder.
• Hypertension
According to recent research (NTC, 2015), long-term driving influence the health of the driver. 
26% driver have mild hypertension (high blood pressure).
`;

const environmentalIssuesDesc = `
• Global warming
Car pollution is one of the major causes of global warming. Cars and trucks emit carbon dioxide and other greenhouse gases, which contribute one-fifth of the United States' total global warming pollution. Greenhouse gases trap heat in the atmosphere, which causes worldwide temperatures to rise. Without greenhouse gases, the Earth would be covered in ice, but burning excessive amounts of fossil fuels, such as gasoline and diesel, has caused an increase of 0.6 degrees Celsius, or 1 degree F, in global temperatures since pre-industrial times, and this will continue to rise over the coming decades. Warmer global temperatures affect farming, wildlife, sea levels and natural landscapes.
• Air soil and water pollution
The effects of car pollution are widespread, affecting air, soil and water quality.
Cars emit a variety of gases. Sulfur dioxide and nitrogen dioxide mix with rainwater to create acid rain, which damages crops, forests and other vegetation and buildings. 
Oil and fuel spills from cars and trucks seep into the soil near highways, and discarded fuel and particulates from vehicle emissions contaminate lakes, rivers and wetlands.
• Noise pollution
Noise from cars is harmful, damaging hearing and causing psychological ill-health.
`;

const index = props => {
	return (
		<>
			<Navigation />
			<Fade in={true}>
				<Container
					style={{ position: 'relative' }}
					fluid
					className='main-content-container px-4'
				>
					<Row noGutters className='page-header py-4'>
						<Col lg='10' md='12' sm='12'>
							<h6 style={{ fontSize: '1.6rem' }} className='text-sm-left mb-3'>
								What happens in the future if you don't take any action?
							</h6>
						</Col>
					</Row>
					<Row>
						<Col lg='8' md='6' sm='12' className='mb-4'>
							<Col lg='12' md='12' sm='12' className='mb-4'>
								<Card style={{ overflow: 'hidden' }}>
									<CardBody>
										<TableauReport
											url={
												'https://public.tableau.com/views/PC_15576489568200/Dashboard1?:embed=y&:display_count=yes'
											}
										/>
									</CardBody>
								</Card>
							</Col>
							<Col lg='12' md='12' sm='12' className='mb-4'>
								<Card style={{ overflow: 'hidden' }}>
									<CardBody>
										<TableauReport
											url={
												'https://public.tableau.com/views/TimeWasted/Dashboard1?:embed=y&:display_count=yes'
											}
										/>
									</CardBody>
								</Card>
							</Col>
						</Col>
						<Col lg='4' md='6' sm='12' className='mb-4'>
							<Col lg='12' md='12' sm='12' className='mb-4'>
								<IssuesCard
									header='Health Risk of Driving'
									img={HealthyIssue}
									body={healthyRisksPoints}
									id='Healthy'
									desc={healthyRisksDesc}
								/>
							</Col>
							<Col lg='12' md='12' sm='12' className='mb-4'>
								<IssuesCard
									header='Environmental Impact of Driving'
									img={EnvironmentalIssue}
									body={environmentalIssuesPoints}
									id='Environmental'
									desc={environmentalIssuesDesc}
								/>
							</Col>
						</Col>
					</Row>
				</Container>
			</Fade>
			<GoHomeBtn />
			<Footer />
		</>
	);
};

index.propTypes = {};

export default index;
