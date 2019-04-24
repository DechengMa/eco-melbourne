import React from 'react';
import { Card, CardImg, CardBody, Container, Col, Row } from 'shards-react';
import NotFoundImg from '../resources/img/404NotFound.png';

const NotFoundPage = () => {
	return (
		<div style={{ width: '100%', height: '90vh' }}>
			<Container>
				<Row>
					<Col sm={{ size: 8, order: 2, offset: 2 }}>
						<Card
							style={{
								height: '70vh',
								marginLeft: 'auto',
								marginRight: 'auto',
								textAlign: 'center',
								marginTop: '10vh'
							}}
						>
							<CardImg top src={NotFoundImg} style={{ height: '85%' }} />
							<CardBody>
								<p>The page you are looking for doesn't exist</p>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default NotFoundPage;
