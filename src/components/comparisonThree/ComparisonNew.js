import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Fade } from 'shards-react';
import { CircularProgress } from '@material-ui/core';
import {
	fetchComparsionResultIteration3,
	setGlobalPeriod
} from '../../actions';
import MapContainer from './MapContainer';
import PeriodSelector from '../utils/PeriodSelector';
import CalorieCard from './CalorieCard';
import TimeDifferenceCard from './TimeDifferenceCard';
import MoneyDifferenceCard from './MoneyDifferenceCard';

const moneySpentBarStyle = {
	backgroundColor: 'rgba(255,128,64,1)',
	borderColor: 'rgba(255,128,64,1)',
	borderWidth: 1,
	hoverBackgroundColor: 'rgba(255,128,64,1)',
	hoverBorderColor: 'rgba(255,128,64,1)'
};
const travelTimeBarStyle = {
	backgroundColor: 'rgb(40,125,246)',
	borderColor: 'rgb(40,125,246)',
	borderWidth: 1,
	hoverBackgroundColor: 'rgb(40,85,265)',
	hoverBorderColor: 'rgb(40,85,265)'
};

const ComparisonNew = ({
	smallStats,
	comparisonInfo,
	currentParam,
	fetchComparsionResultIteration3,
	loading,
	currentPeriod,
	setGlobalPeriod
}) => {
	const [period, setPeriod] = useState('Day');

	useEffect(() => {
		if (currentPeriod && currentPeriod !== period) {
			fetchDataFromBackEnd(currentPeriod);
			setPeriod(currentPeriod);
		}
	});

	var data = {
		labels: ['Money Spent', 'Travel Time (mins for a round trip)'],
		datasets: [
			{
				label: 'Car',
				...moneySpentBarStyle,
				data: [0, 0, 0]
			},
			{
				label: 'PTV',
				...travelTimeBarStyle,
				data: [0, 0, 0]
			},
			{
				label: 'Bicycle',
				...travelTimeBarStyle,
				data: [0, 0, 0]
			}
		]
	};

	var alternate_1ModeName = '';
	var alternate_2ModeName = '';
	var alternate_3ModeName = '';
	const [modeOfTransitShowing, changeMode] = useState('Alternate_1');
	if (comparisonInfo) {
		var travelMethodToShow = comparisonInfo[modeOfTransitShowing];

		if (comparisonInfo.Alternate_1) {
			alternate_1ModeName = comparisonInfo.Alternate_1.modeOfTransit;
			alternate_2ModeName = comparisonInfo.Alternate_2.modeOfTransit;
			alternate_3ModeName = comparisonInfo.Alternate_3.modeOfTransit;
		}

		data = {
			labels: ['Money Spend $', 'Travel Time (mins)'],
			datasets: [
				{
					label: 'Car',
					...moneySpentBarStyle,
					data: [travelMethodToShow.carMoney, travelMethodToShow.carTime]
				},
				{
					label: travelMethodToShow.modeOfTransit,
					...travelTimeBarStyle,
					data: [travelMethodToShow.newMoney, travelMethodToShow.newTime]
				}
			]
		};
		smallStats = [
			{
				value: travelMethodToShow ? travelMethodToShow.timeDifference : '0',
				percentage: travelMethodToShow
					? `${travelMethodToShow.timePercentage}%`
					: '0',
				increase: travelMethodToShow.timePercentage < 0 ? false : true,
				numberDesc: `This data presents the time difference between new travel method and driving a car in a day (or, week / month / year, depending on the selected period). 
				Time difference = the total travel time of new travel method - the current travel time of driving a car.
				`
			},
			{
				label: 'Money difference',
				value: comparisonInfo ? travelMethodToShow.moneySaved : '0',
				percentage: travelMethodToShow
					? `${travelMethodToShow.moneyPercentage}%`
					: '0',
				numberDesc: `This data presents the money difference between new travel method and driving a car in a day (or, week / month / year, depending on the selected period).
				Money difference = the total spend of using the new travel method - the current spend of driving a car.
				`,
				increase: travelMethodToShow.moneyPercentage < 0 ? false : true
			},
			{
				label: 'Calories Burnt',
				value: comparisonInfo ? travelMethodToShow.caloriesBurnt : '0',
				numberDesc:
					'This data presents how many calories are consumed by using current selected travel method during a day/week/month/year.'
			}
		];
	}

	var origin = '';
	var destination = '';
	if (currentParam && currentParam.livingSuburb && currentParam.workingSuburb) {
		origin = currentParam.livingSuburb;
		destination = currentParam.workingSuburb;
	}

	const fetchDataFromBackEnd = period => {
		if (currentParam && currentParam.distance) {
			const {
				distance,
				days,
				congestion,
				carTime,
				bicycleTime,
				walkingTime,
				ptvTime,
				ptvWalkingTime
			} = currentParam;

			fetchComparsionResultIteration3(
				distance,
				days,
				congestion,
				period,
				carTime,
				bicycleTime,
				walkingTime,
				ptvTime,
				ptvWalkingTime
			);
		}
	};

	const renderMap = () => {
		var travelMode = '';

		switch (modeOfTransitShowing) {
			case 'Alternate_1':
				travelMode = alternate_1ModeName;
				break;
			case 'Alternate_2':
				travelMode = alternate_2ModeName;
				break;
			case 'Alternate_3':
				travelMode = alternate_3ModeName;
				break;
			default:
				travelMode = alternate_1ModeName;
				break;
		}

		if (travelMode === 'PTV') {
			travelMode = 'TRANSIT';
		} else if (travelMode === 'CYCLING') {
			travelMode = 'BICYCLING';
		} else if (travelMode === 'WALKING') {
			travelMode = 'WALKING';
		}
		return (
			<MapContainer
				travelMode={travelMode}
				origin={origin}
				destination={destination}
			/>
		);
	};

	const returnMethodName = () => {
		var travelMode = '';

		switch (modeOfTransitShowing) {
			case 'Alternate_1':
				travelMode = alternate_1ModeName;
				break;
			case 'Alternate_2':
				travelMode = alternate_2ModeName;
				break;
			case 'Alternate_3':
				travelMode = alternate_3ModeName;
				break;
			default:
				travelMode = alternate_1ModeName;
				break;
		}
		return travelMode;
	};

	return (
		<Fade in={true}>
			<Container
				style={{ position: 'relative' }}
				fluid
				className='main-content-container px-4'
			>
				<Row noGutters className='page-header py-4'>
					<Col
						lg='8'
						md='12'
						sm='12'
						style={{ fontSize: '1.6rem' }}
						className='text-sm-left mb-3'
					>
						We recommend you to travel by
						<Button
							style={{ margin: '5px', fontSize: '1.2rem' }}
							theme={
								modeOfTransitShowing === 'Alternate_1' ? 'success' : 'secondary'
							}
							onClick={() => {
								changeMode('Alternate_1');
							}}
						>
							{alternate_1ModeName === 'PTV'
								? 'PUBLIC TRANSPORT'
								: alternate_1ModeName}
						</Button>
						, or try
						<Button
							style={{ margin: '5px', fontSize: '1.0rem' }}
							theme={
								modeOfTransitShowing === 'Alternate_2' ? 'success' : 'secondary'
							}
							onClick={() => {
								changeMode('Alternate_2');
							}}
						>
							{alternate_2ModeName === 'PTV'
								? 'PUBLIC TRANSPORT'
								: alternate_2ModeName}
						</Button>{' '}
						/
						<Button
							style={{ margin: '5px', fontSize: '1.0rem' }}
							theme={
								modeOfTransitShowing === 'Alternate_3' ? 'success' : 'secondary'
							}
							onClick={() => {
								changeMode('Alternate_3');
							}}
						>
							{alternate_3ModeName === 'PTV'
								? 'PUBLIC TRANSPORT'
								: alternate_3ModeName}
						</Button>
					</Col>
					<Col
						lg='4'
						md='12'
						sm='12'
						xs='12'
						style={{
							marginTop: '20px',
							display: 'flex',
							justifyContent: 'flex-end'
						}}
					>
						<PeriodSelector
							period={period}
							handleChange={value => {
								fetchDataFromBackEnd(value);
								setPeriod(value);
								setGlobalPeriod(value);
							}}
						/>
					</Col>
				</Row>

				{loading ? (
					<Row style={{ height: '380px' }}>
						<CircularProgress
							style={{ position: 'absolute', left: '50%', top: '20%' }}
						/>
					</Row>
				) : (
					<Row>
						<Col className='mb-4'>
							<TimeDifferenceCard
								period={period}
								travelMethodName={data.datasets[1].label}
								timeDifference={smallStats[0].value}
								increase={smallStats[0].increase}
								data={[data.datasets[0].data[1], [data.datasets[1].data[1]]]}
							/>
						</Col>
						<Col className='mb-4'>
							<MoneyDifferenceCard
								period={period}
								travelMethodName={data.datasets[1].label}
								moneyDifference={smallStats[1].value}
								increase={smallStats[1].increase}
								data={[data.datasets[0].data[0], [data.datasets[1].data[0]]]}
							/>
						</Col>
					</Row>
				)}

				<Row>
					<Col lg='4' md='6' sm='12' className='mb-4'>
						<CalorieCard
							value={smallStats[2].value}
							travelMethod={returnMethodName()}
							period={period}
						/>
					</Col>

					<Col lg='8' md='6' sm='12' className='mb-4'>
						{renderMap()}
					</Col>
				</Row>
			</Container>
		</Fade>
	);
};

const mapStateToProps = ({ info, loading }) => {
	return {
		comparisonInfo: info.comparisonInfo,
		currentParam: info.currentParam,
		currentPeriod: info.periodNow,
		loading: loading.fetchDefaultloading
	};
};

ComparisonNew.defaultProps = {
	smallStats: [
		{
			label: 'Time Difference',
			value: '0',
			unit: 'Mins',
			percentage: '0%',
			increase: true,
			chartLabels: [null, null, null, null, null, null, null],
			numberDesc: `This data presents the time difference between new travel method and driving a car in a day (or, week / month / year, depending on the selected period). 
			Time difference = the total travel time of new travel method - the current travel time of driving a car.
			`
		},
		{
			label: 'Money Saved',
			value: '0',
			unit: '$',
			percentage: '0%',
			numberDesc: `This data presents the money difference between new travel method and driving a car in a day (or, week / month / year, depending on the selected period).
			Money difference = the total spend of using the new travel method - the current spend of driving a car.
			`,
			increase: true
		},
		{
			label: 'Calories Burnt',
			value: 0,
			numberDesc:
				'This data presents how many calories are consumed by using current selected travel method during a day/week/month/year.'
		}
	]
};

export default connect(
	mapStateToProps,
	{ fetchComparsionResultIteration3, setGlobalPeriod }
)(ComparisonNew);
