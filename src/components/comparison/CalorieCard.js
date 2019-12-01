import React from 'react';
import { ArrowDownward } from '@material-ui/icons';
import { Card, CardBody } from 'shards-react';
import { Colors } from '../utils/Variables';

const containerStyle = {
	alignItems: 'center',
	display: 'flex',
	justifyContent: 'space-between',
	flexDirection: 'column'
};

const titleStyle = {
	fontSize: '1.4rem',
	color: '#000',
	fontWeight: '400'
};

const descStyle = {
	fontSize: '1.1rem'
};

const CalorieCard = ({ value, period, travelMethod }) => {
	const renderFood = () => {
		return (
			<>
				<h6
					className='stats-small__value'
					style={{
						fontSize: '2.0625rem',
						color: Colors.infoGreen
					}}
				>
					{(Number(value) / 365).toFixed(2)}
					<span style={{ fontSize: '0.8rem' }}>hour(s)</span>
				</h6>
				<h6
					style={{
						...descStyle
					}}
					className='stats-small__label'
				>
					To Burn if you Run on the Treadmill
				</h6>
			</>
		);
	};

	return (
		<Card style={{ width: '100%', height: '100%' }}>
			<CardBody style={{ ...containerStyle }}>
				<h6 style={{ ...titleStyle }} className='stats-small__label'>
					You will Burn
				</h6>
				<h6
					className='stats-small__value'
					style={{
						fontSize: '2.0625rem',
						color: Colors.infoGreen
					}}
				>
					{value}
					<span style={{ fontSize: '0.8rem' }}>kcal</span>
				</h6>
				<h6
					style={{
						...descStyle
					}}
					className='stats-small__label'
				>
					If you Travel by {travelMethod} in one {period}
				</h6>
				<ArrowDownward />
				<h6 style={{ ...titleStyle }} className='stats-small__label'>
					Which Would Take
				</h6>
				{renderFood()}
			</CardBody>
		</Card>
	);
};

export default CalorieCard;
