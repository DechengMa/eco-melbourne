import React from 'react';
import Navigation from '../header/Nav/Navigation';
import {
	Card,
	CardTitle,
	CardImg,
	CardBody,
	Container,
	Row,
	Col
} from 'shards-react';
import Angie from '../../resources/img/Avatar/Angie.png';
import Matt from '../../resources/img/Avatar/Matt.png';
import Nitya from '../../resources/img/Avatar/Nitya.png';
import Vig from '../../resources/img/Avatar/Vig.png';
import Gavin from '../../resources/img/Avatar/Gavin.png';

const profilesArray = [
	{
		name: 'Angie',
		occupation: `Business Analyst 
        User Interface Designer`,
		avatar: Angie
	},
	{
		name: 'Nitya',
		occupation: 'Data Analyst',
		avatar: Nitya
	},
	{
		name: 'Matt',
		occupation: 'Front End Developer',
		avatar: Matt
	},
	{
		name: 'Gavin',
		occupation: 'Business Analyst; Tester',
		avatar: Gavin
	},
	{
		name: 'Vignesh',
		occupation: 'Back End Developer',
		avatar: Vig
	}
];

const index = () => {
	return (
		<>
			<Navigation />
			<Container
				style={{ position: 'relative' }}
				fluid
				className='main-content-container px-4'
			>
				<Row noGutters className='page-header py-4'>
					<Col lg='12' md='12' sm='12'>
						<h6
							style={{
								fontSize: '1.8rem',
								fontWeight: '600px',
								textAlign: 'center'
							}}
						>
							Project: EcoMelbourne
						</h6>
						<h6
							style={{
								fontSize: '1.6rem',
								fontWeight: '600px',
								textAlign: 'center'
							}}
							className=' mb-3'
						>
							Team Name: Star Tech
						</h6>
					</Col>
				</Row>

				<Row>
					<Col lg='1' md='1' sm='1' className='mb-4' />
					{profilesArray.map(e => (
						<Col lg='2' md='3' sm='6' className='mb-4'>
							<Card
								style={{
									maxWidth: '300px',
									overflow: 'hidden',
									height: '320px'
								}}
							>
								<CardImg src={e.avatar} style={{ maxHeight: '180px' }} />
								<CardBody>
									<CardTitle>{e.name}</CardTitle>
									<p>{e.occupation}</p>
								</CardBody>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
		</>
	);
};

export default index;
