import React from 'react';
import { Card, CardBody, CardTitle, Button, CardImg } from 'shards-react';
import { Link } from 'react-router-dom';

const LearnMoreCard = props => {
	return (
		<Card style={{ maxWidth: '450px', overflow: 'hidden' }}>
			{/* <CardHeader>{props.cardHeader}</CardHeader> */}
			<CardImg src={props.img} style={{ maxHeight: '300px' }} />
			<CardBody>
				<CardTitle>{props.title}</CardTitle>
				<p>{props.text}</p>
				<Link to={props.to}>
					<Button theme={props.btnTheme}>{props.buttonText}</Button>
				</Link>
			</CardBody>
		</Card>
	);
};

export default LearnMoreCard;
