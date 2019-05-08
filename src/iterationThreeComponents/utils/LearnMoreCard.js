import React from 'react';
import { Card, CardBody, CardTitle, Button, CardImg } from 'shards-react';
import { Link } from 'react-router-dom';

const LearnMoreCard = props => {
	return (
		<Card
			small
			style={{
				overflow: 'hidden',
				// maxHeight: '400px !important',
				height: '100%'
			}}
		>
			{/* <CardHeader>{props.cardHeader}</CardHeader> */}
			{/* <div style={{ height: '70%' }}> */}
			<CardImg src={props.img} style={{ width: '100%' }} />
			{/* </div> */}
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
