import React from 'react';
import {
	Card,
	CardHeader,
	ListGroup,
	ListGroupItem,
	FormInput,
	Button
} from 'shards-react';

const NotFoundPage = () => {
	return (
		<div style={{ width: '100%', height: '90vh' }}>
			<Card
				style={{
					width: '500px',
					height: '200px',
					marginLeft: 'auto',
					marginRight: 'auto',
					textAlign: 'center',
					marginTop: '10vh'
				}}
			>
				<CardHeader>
					<h3 className='m-0'>404 Not Found</h3>
				</CardHeader>
				<strong>The page you are looking for doesn't exist</strong>
			</Card>
		</div>
	);
};

export default NotFoundPage;
