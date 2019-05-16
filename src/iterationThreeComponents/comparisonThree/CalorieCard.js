import React from 'react';
import { KeyboardArrowDown } from '@material-ui/icons';
import { Card, CardBody } from 'shards-react';
import { Colors } from '../utils/Variables';
import { LocalPizza, Fastfood } from '@material-ui/icons';

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
		if (Number(value) > 20000) {
			return (
				<>
					<h6
						className='stats-small__value'
						style={{
							fontSize: '2.0625rem',
							color: Colors.infoGreen
						}}
					>
						{(Number(value) / 298).toFixed(2)}
						<span style={{ fontSize: '0.8rem' }} />
					</h6>
					<h6
						style={{
							...descStyle
						}}
						className='stats-small__label'
					>
						<LocalPizza />
						Pizza (pepperoni, regular crust, one slice)
					</h6>
				</>
			);
		} else {
			return (
				<>
					<h6
						className='stats-small__value'
						style={{
							fontSize: '2.0625rem',
							color: Colors.infoGreen
						}}
					>
						{(Number(value) / 137).toFixed(2)}
						<span style={{ fontSize: '0.8rem' }} />
					</h6>
					<h6
						style={{
							...descStyle
						}}
						className='stats-small__label'
					>
						<Fastfood />
						Hot dog (beef and pork)
					</h6>
				</>
			);
		}
	};

	return (
		<Card style={{ width: '100%', height: '100%' }}>
			<CardBody style={{ ...containerStyle }}>
				<h6 style={{ ...titleStyle }} className='stats-small__label'>
					You will generate
				</h6>
				<h6
					className='stats-small__value'
					style={{
						fontSize: '2.0625rem',
						color: Colors.infoGreen
					}}
				>
					{value}
					<span style={{ fontSize: '0.8rem' }}>calorie</span>
				</h6>
				<h6
					style={{
						...descStyle
					}}
					className='stats-small__label'
				>
					By traveling by {travelMethod} in one {period}
				</h6>
				<KeyboardArrowDown />
				<h6 style={{ ...titleStyle }} className='stats-small__label'>
					Which equals to
				</h6>
				{renderFood()}
			</CardBody>
		</Card>
	);
};

export default CalorieCard;
