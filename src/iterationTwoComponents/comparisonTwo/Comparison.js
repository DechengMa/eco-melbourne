import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Card, CardBody } from 'shards-react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { fetchComparsionResult } from '../actions';

import PageTitle from '../components/common/PageTitle';
import SmallStats from '../components/common/SmallStats';
import UsersByDevice from '../components/blog/UsersByDevice';
import { Bar } from 'react-chartjs-2';

import MapContainer from './MapContainer';

const Comparison = ({
	smallStats,
	comparisonInfo,
	currentParam,
	fetchComparsionResult
}) => {
	const [period, setPeriod] = useState('Month');
	const chartOptions = {
		scales: {
			xAxes: [
				{
					barPercentage: 0.5,
					barThickness: 6,
					maxBarThickness: 8,
					minBarLength: 2,
					gridLines: {
						offsetGridLines: true
					}
				}
			]
		}
	};
	var data = {
		labels: ['Car', 'PTV', 'Bicycle'],
		datasets: [
			{
				label: 'Travel Time (mins)',
				backgroundColor: 'rgb(23,198,113)',
				borderColor: 'rgb(23,198,113)',
				borderWidth: 1,
				hoverBackgroundColor: 'rgb(23,198,113)',
				hoverBorderColor: 'rgb(23,198,113)',
				data: [0, 0, 0]
			}
		]
	};

	console.log('Comparison.props.comparisonInfo', comparisonInfo);

	const [modeOfTransit, changeMode] = useState('');

	console.log(modeOfTransit);
	if (comparisonInfo) {
		const numOfWay = Object.keys(comparisonInfo).length;
		if (numOfWay === 1) {
			if (modeOfTransit !== comparisonInfo.Alternate.Mode_of_transit) {
				changeMode(comparisonInfo.Alternate.Mode_of_transit);
			}

			data = {
				labels: ['Car', 'PTV'],
				datasets: [
					{
						label: 'Travel Time (mins)',
						backgroundColor: 'rgb(23,198,113)',
						borderColor: 'rgb(23,198,113)',
						borderWidth: 1,
						hoverBackgroundColor: 'rgb(23,198,113)',
						hoverBorderColor: 'rgb(23,198,113)',
						data: [
							comparisonInfo.Alternate.carTime,
							comparisonInfo.Alternate.ptvTime
						]
					}
				]
			};

			smallStats = [
				{
					label: 'Time Save',
					value: comparisonInfo.Alternate
						? comparisonInfo.Alternate.timeDifferencePTV
						: '0',
					percentage: comparisonInfo.Alternate
						? `${comparisonInfo.Alternate.timePercentage}%`
						: '0',
					increase: comparisonInfo.Alternate.timePercentage < 0 ? false : true,
					unit: 'Mins',
					chartLabels: [null, null, null, null, null, null, null],
					attrs: { md: '6', sm: '6' },
					datasets: [
						{
							label: 'Today',
							fill: 'start',
							borderWidth: 1.5,
							backgroundColor: 'rgba(0, 184, 216, 0.1)',
							borderColor: 'rgb(0, 184, 216)',
							data: [1, 2, 1, 3, 5, 4, 7]
						}
					]
				},
				{
					label: 'Money Saved',
					value: comparisonInfo ? comparisonInfo.Alternate.moneySaved : '0',
					percentage: comparisonInfo.Alternate
						? `${comparisonInfo.Alternate.moneyPrecentage}%`
						: '0',
					increase: comparisonInfo.Alternate.moneyPrecentage < 0 ? false : true,
					unit: '$',
					chartLabels: [null, null, null, null, null, null, null],
					attrs: { md: '6', sm: '6' },
					datasets: [
						{
							label: 'Today',
							fill: 'start',
							borderWidth: 1.5,
							backgroundColor: 'rgba(0, 184, 216, 0.1)',
							borderColor: 'rgb(0, 184, 216)',
							data: [1, 2, 1, 3, 5, 4, 7]
						}
					]
				}
			];
		} else if (numOfWay === 2) {
			if (
				modeOfTransit !== comparisonInfo.Alternate_1.Mode_of_transit &&
				modeOfTransit !== comparisonInfo.Alternate_2.Mode_of_transit
			) {
				changeMode(comparisonInfo.Alternate_1.Mode_of_transit);
			}
			if (modeOfTransit === 'CYCLING') {
				data = {
					labels: ['Car', 'Bicycle'],
					datasets: [
						{
							label: 'Travel Time (mins)',
							backgroundColor: 'rgb(23,198,113)',
							borderColor: 'rgb(23,198,113)',
							borderWidth: 1,
							hoverBackgroundColor: 'rgb(23,198,113)',
							hoverBorderColor: 'rgb(23,198,113)',
							data: [
								comparisonInfo.Alternate_1.carTime,
								comparisonInfo.Alternate_1.bicycleTime
							]
						}
					]
				};
				smallStats = [
					{
						label: 'Time Save',
						value: comparisonInfo.Alternate_1
							? comparisonInfo.Alternate_1.timeDifferenceCycling
							: '0',
						percentage: comparisonInfo.Alternate_1
							? `${comparisonInfo.Alternate_1.timePercentage}%`
							: '0',
						increase:
							comparisonInfo.Alternate_1.timePercentage < 0 ? false : true,
						unit: 'Mins',
						chartLabels: [null, null, null, null, null, null, null],
						attrs: { md: '6', sm: '6' },
						datasets: [
							{
								label: 'Today',
								fill: 'start',
								borderWidth: 1.5,
								backgroundColor: 'rgba(0, 184, 216, 0.1)',
								borderColor: 'rgb(0, 184, 216)',
								data: [1, 2, 1, 3, 5, 4, 7]
							}
						]
					},
					{
						label: 'Money Saved',
						value: comparisonInfo ? comparisonInfo.Alternate_1.moneySaved : '0',
						percentage: comparisonInfo.Alternate_1
							? `${comparisonInfo.Alternate_1.moneyPrecentage}%`
							: '0',
						increase:
							comparisonInfo.Alternate_1.moneyPrecentage < 0 ? false : true,
						unit: '$',
						chartLabels: [null, null, null, null, null, null, null],
						attrs: { md: '6', sm: '6' },
						datasets: [
							{
								label: 'Today',
								fill: 'start',
								borderWidth: 1.5,
								backgroundColor: 'rgba(0, 184, 216, 0.1)',
								borderColor: 'rgb(0, 184, 216)',
								data: [1, 2, 1, 3, 5, 4, 7]
							}
						]
					},
					{
						label: 'Calories Burnt',
						value: comparisonInfo
							? comparisonInfo.Alternate_1.caloriesBurnt
							: '0',

						// unit: '$',
						chartLabels: [null, null, null, null, null, null, null],
						attrs: { md: '6', sm: '6' },
						datasets: [
							{
								label: 'Today',
								fill: 'start',
								borderWidth: 1.5,
								backgroundColor: 'rgba(0, 184, 216, 0.1)',
								borderColor: 'rgb(0, 184, 216)',
								data: [1, 2, 1, 3, 5, 4, 7]
							}
						]
					}
				];
			} else if (modeOfTransit === 'WALKING') {
				data = {
					labels: ['Car', 'Walking'],
					datasets: [
						{
							label: 'Travel Time (mins)',
							backgroundColor: 'rgb(23,198,113)',
							borderColor: 'rgb(23,198,113)',
							borderWidth: 1,
							hoverBackgroundColor: 'rgb(23,198,113)',
							hoverBorderColor: 'rgb(23,198,113)',
							data: [
								comparisonInfo.Alternate_2.carTime,
								comparisonInfo.Alternate_2.walkingTime
							]
						}
					]
				};
				smallStats = [
					{
						label: 'Time Save',
						value: comparisonInfo.Alternate_2
							? comparisonInfo.Alternate_2.timeDifferenceWalking
							: '0',
						percentage: comparisonInfo.Alternate_2
							? `${comparisonInfo.Alternate_2.timePercentage}%`
							: '0',
						increase:
							comparisonInfo.Alternate_2.timePercentage < 0 ? false : true,
						unit: 'Mins',
						chartLabels: [null, null, null, null, null, null, null],
						attrs: { md: '6', sm: '6' },
						datasets: [
							{
								label: 'Today',
								fill: 'start',
								borderWidth: 1.5,
								backgroundColor: 'rgba(0, 184, 216, 0.1)',
								borderColor: 'rgb(0, 184, 216)',
								data: [1, 2, 1, 3, 5, 4, 7]
							}
						]
					},
					{
						label: 'Money Saved',
						value: comparisonInfo ? comparisonInfo.Alternate_2.moneySaved : '0',
						percentage: comparisonInfo.Alternate_2
							? `${comparisonInfo.Alternate_2.moneyPercantage}%`
							: '0',
						increase:
							comparisonInfo.Alternate_2.moneyPercantage < 0 ? false : true,
						unit: '$',
						chartLabels: [null, null, null, null, null, null, null],
						attrs: { md: '6', sm: '6' },
						datasets: [
							{
								label: 'Today',
								fill: 'start',
								borderWidth: 1.5,
								backgroundColor: 'rgba(0, 184, 216, 0.1)',
								borderColor: 'rgb(0, 184, 216)',
								data: [1, 2, 1, 3, 5, 4, 7]
							}
						]
					},
					{
						label: 'Calories Burnt',
						value: comparisonInfo
							? comparisonInfo.Alternate_2.caloriesBurnt
							: '0',

						// unit: '$',
						chartLabels: [null, null, null, null, null, null, null],
						attrs: { md: '6', sm: '6' },
						datasets: [
							{
								label: 'Today',
								fill: 'start',
								borderWidth: 1.5,
								backgroundColor: 'rgba(0, 184, 216, 0.1)',
								borderColor: 'rgb(0, 184, 216)',
								data: [1, 2, 1, 3, 5, 4, 7]
							}
						]
					}
				];
			}
		}
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
				ptvTime
			} = currentParam;

			fetchComparsionResult(
				distance,
				days,
				congestion,
				period,
				carTime,
				bicycleTime,
				walkingTime,
				ptvTime
			);
		}
	};

	const renderMap = () => {
		var travelMode = '';
		if (modeOfTransit === 'PTV') {
			travelMode = 'TRANSIT';
		} else if (modeOfTransit === 'CYCLING') {
			travelMode = 'BICYCLING';
		} else if (modeOfTransit === 'WALKING') {
			travelMode = 'WALKING';
		}
		console.log('renderMap', travelMode);
		return (
			<MapContainer
				travelMode={travelMode}
				origin={origin}
				destination={destination}
			/>
		);
	};

	return (
		<Container fluid className='main-content-container px-4'>
			<Row noGutters className='page-header py-4'>
				{/* <PageTitle
					title='Comparison'
					subtitle='Dashboard'
					className='text-sm-left mb-3'
				/> */}
				<Col
					lg='10'
					md='12'
					sm='12'
					style={{ fontSize: '1.6rem' }}
					className='text-sm-left mb-3'
				>
					Have you ever think of travel by{' '}
					{modeOfTransit === 'PTV' ? (
						<Button
							style={{ margin: '5px', fontSize: '1.2rem' }}
							pill
							theme='success'
						>
							Public Transportation
						</Button>
					) : (
						<>
							<Button
								style={{ margin: '5px', fontSize: '1.2rem' }}
								theme={modeOfTransit === 'CYCLING' ? 'success' : 'light'}
								onClick={() => changeMode('CYCLING')}
							>
								Cyclying
							</Button>
							Or
							<Button
								style={{ margin: '5px', fontSize: '1.2rem' }}
								theme={modeOfTransit === 'WALKING' ? 'success' : 'light'}
								onClick={() => changeMode('WALKING')}
							>
								Walking
							</Button>
						</>
					)}
					? This is the difference!
				</Col>
				<Col
					lg='2'
					md='12'
					sm='12'
					xs='12'
					style={{ marginTop: '20px', textAlign: 'right' }}
				>
					<FormControl variant='outlined'>
						<InputLabel>Period</InputLabel>
						<Select
							value={period}
							onChange={event => {
								fetchDataFromBackEnd(event.target.value);
								setPeriod(event.target.value);
							}}
						>
							<MenuItem value={'Week'}>Weekly</MenuItem>
							<MenuItem value={'Month'}>Monthly</MenuItem>
							<MenuItem value={'Year'}>Yearly</MenuItem>
						</Select>
					</FormControl>
				</Col>
			</Row>

			<Row>
				{smallStats.map((stats, idx) => (
					<Col className='col-lg mb-4' key={idx} {...stats.attrs}>
						<SmallStats
							id={`small-stats-${idx}`}
							variation='1'
							chartData={stats.datasets}
							chartLabels={stats.chartLabels}
							unit={stats.unit}
							label={stats.label}
							value={stats.value}
							percentage={stats.percentage}
							increase={stats.increase}
							decrease={stats.decrease}
						/>
					</Col>
				))}
			</Row>

			<Row>
				<Col lg='8' md='12' sm='12' className='mb-4'>
					{renderMap()}
					{/* <MapContainer travelMode={} origin={origin} destination={destination} /> */}
				</Col>

				<Col lg='4' md='6' sm='12' className='mb-4'>
					<Card style={{ height: '100%', padding: '10px' }}>
						<Bar
							data={data}
							width={60}
							height={150}
							options={{
								maintainAspectRatio: false
							}}
						/>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

Comparison.propTypes = {
	smallStats: PropTypes.array
};

Comparison.defaultProps = {
	smallStats: [
		{
			label: 'Time saved',
			value: '0',
			unit: 'Mins',
			percentage: '0%',
			increase: true,
			chartLabels: [null, null, null, null, null, null, null],
			attrs: { md: '6', sm: '6' },
			datasets: [
				{
					label: 'Today',
					fill: 'start',
					borderWidth: 1.5,
					backgroundColor: 'rgba(0, 184, 216, 0.1)',
					borderColor: 'rgb(0, 184, 216)',
					data: [1, 2, 1, 3, 5, 4, 7]
				}
			]
		},
		{
			label: 'Money Saved',
			value: '0',
			unit: '$',
			percentage: '0%',
			increase: true,
			chartLabels: [null, null, null, null, null, null, null],
			attrs: { md: '6', sm: '6' },
			datasets: [
				{
					label: 'Today',
					fill: 'start',
					borderWidth: 1.5,
					backgroundColor: 'rgba(23,198,113,0.1)',
					borderColor: 'rgb(23,198,113)',
					data: [1, 2, 3, 3, 3, 4, 4]
				}
			]
		}
	]
};

const mapStateToProps = ({ info }) => {
	return {
		comparisonInfo: info.comparisonInfo,
		currentParam: info.currentParam
	};
};

export default connect(
	mapStateToProps,
	{ fetchComparsionResult }
)(Comparison);
