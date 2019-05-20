import React from 'react';
import { Card, CardBody } from 'shards-react';
import { Colors } from '../utils/Variables';
import { Bar } from 'react-chartjs-2';
import { Fade } from 'react-reveal';

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

const MoneyDifferenceCard = ({
	period,
	moneyDifference,
	increase,
	data,
	travelMethodName
}) => {
	const dataToShow = {
		labels: ['Car', travelMethodName],
		datasets: [
			{
				label: ['Money Spending ($)'],
				backgroundColor: ['rgba(40, 125, 246,0.7)', 'rgba(40, 125, 246,0.9)'],
				borderWidth: 1,
				data: data
			}
		]
	};
	return (
		<Card style={{ width: '100%', maxHeight: '450px' }}>
			<CardBody style={{ ...containerStyle }}>
				<Fade delay={200}>
					<h6 style={{ ...titleStyle }} className='stats-small__label'>
						{increase
							? ` In terms of money, you will save`
							: `In terms of money, you will waste`}
					</h6>
				</Fade>
				<Fade delay={700}>
					<h6
						className='stats-small__value'
						style={{
							fontSize: '2.0625rem',
							color: `${increase ? Colors.infoGreen : Colors.infoYellow}`
						}}
					>
						{increase ? moneyDifference : 0 - Number(moneyDifference)}
						<span style={{ fontSize: '0.8rem' }}>$</span>
					</h6>
				</Fade>

				<Fade delay={1200}>
					<h6
						style={{
							...descStyle
						}}
						className='stats-small__label'
					>
						By using this travel method in one {period}
					</h6>
				</Fade>
				<Fade delay={1700}>
					<div
						style={{
							position: 'relative',
							height: '180px'
						}}
					>
						<Bar
							responsive={true}
							data={dataToShow}
							options={{
								legend: {
									position: 'top',
									labels: {
										boxWidth: 20
									}
								},
								maintainAspectRatio: false,
								scales: {
									xAxes: [
										{
											maxBarThickness: 40
										}
									],
									yAxes: [
										{
											ticks: {
												beginAtZero: true
											}
										}
									]
								}
							}}
						/>
					</div>
				</Fade>
			</CardBody>
		</Card>
	);
};

export default MoneyDifferenceCard;
