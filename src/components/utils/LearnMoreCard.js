import React from 'react';
import { Card, CardTitle, Button, CardImg, CardFooter } from 'shards-react';
import { Link } from 'react-router-dom';
import Pulse from 'react-reveal/Pulse';

const LearnMoreCard = props => {
	return (
		<Card
			small
			style={{
				overflow: 'hidden',
				height: '100%',
				display: 'flex',
				justifyContent: 'space-between'
			}}
		>
			<CardImg src={props.img} style={{ width: '100%', maxHeight: '440px' }} />
			<CardFooter>
				<CardTitle>{props.title}</CardTitle>
				<p>{props.text}</p>
				<Link to={props.to}>
					<Pulse forever={true}>
						<Button theme={props.btnTheme}>{props.buttonText}</Button>
					</Pulse>
				</Link>
			</CardFooter>
		</Card>
	);
};

export default LearnMoreCard;
