import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Card, CardBody } from 'shards-react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { fetchComparsionResult } from '../../actions';

import PageTitle from '../components/common/PageTitle';
import SmallStats from '../components/common/SmallStats';
import UsersByDevice from '../components/blog/UsersByDevice';
import Navigation from '../headerTwo/Nav/Navigation';
import { Bar } from 'react-chartjs-2';

import MapContainer from './MapContainer';

const Comparison = ({
	smallStats,
	comparisonInfo,
	currentParam,
	fetchComparsionResult
}) => {
	const [period, setPeriod] = useState('Week');
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

	var moneySpentBarStyle = {
		// label: 'Money Spend ($)',
		backgroundColor: 'rgba(255,128,64,1)',
		borderColor: 'rgba(255,128,64,1)',
		borderWidth: 1,
		hoverBackgroundColor: 'rgba(255,128,64,1)',
		hoverBorderColor: 'rgba(255,128,64,1)'
	};
	var travelTimeBarStyle = {
		// label: 'Travel Time (mins)',
		backgroundColor: 'rgb(40,125,246)',
		borderColor: 'rgb(40,125,246)',
		borderWidth: 1,
		hoverBackgroundColor: 'rgb(40,85,265)',
		hoverBorderColor: 'rgb(40,85,265)'
	};

	var data = {
		labels: ['Money Spent', 'Travel Time'],
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

	console.log('Comparison.props.comparisonInfo', comparisonInfo);

	const [modeOfTransit, changeMode] = useState('');

	console.log(modeOfTransit);
	if (comparisonInfo) {
		const numOfWay = Object.keys(comparisonInfo).length;
		if (numOfWay === 1) {
			if (modeOfTransit !== comparisonInfo.Alternate.modeOfTransit) {
				changeMode(comparisonInfo.Alternate.modeOfTransit);
			}

			data = {
				labels: ['Money Spend $', 'Travel Time (mins)'],
				datasets: [
					{
						label: 'Car',
						...moneySpentBarStyle,
						data: [
							comparisonInfo.Alternate.carMoney,
							comparisonInfo.Alternate.carTime
						]
					},
					{
						label: 'PTV',
						...travelTimeBarStyle,
						data: [
							comparisonInfo.Alternate.ptvMoney,
							comparisonInfo.Alternate.ptvTime
						]
					}
				]
			};

			smallStats = [
				{
					label: 'Time Difference',
					value: comparisonInfo.Alternate
						? comparisonInfo.Alternate.timeDifferencePTV
						: '0',
					percentage: comparisonInfo.Alternate
						? `${comparisonInfo.Alternate.timePercentage}%`
						: '0',
					increase: comparisonInfo.Alternate.timePercentage < 0 ? false : true,
					unit: 'Mins',
					numberDesc:
						'This data presents how many minutes user wasted due to traffic congestion',
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
						? `${comparisonInfo.Alternate.moneyPercentage}%`
						: '0',
					increase: comparisonInfo.Alternate.moneyPercentage < 0 ? false : true,
					numberDesc: 'This data presents how much money user saved.',
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
				modeOfTransit !== comparisonInfo.Alternate_1.modeOfTransit &&
				modeOfTransit !== comparisonInfo.Alternate_2.modeOfTransit
			) {
				changeMode(comparisonInfo.Alternate_1.modeOfTransit);
			}
			if (modeOfTransit === 'CYCLING') {
				data = {
					labels: ['Money Spend $', 'Travel Time (mins)'],
					datasets: [
						{
							label: 'Car',
							...moneySpentBarStyle,
							data: [
								comparisonInfo.Alternate_1.carMoney,
								comparisonInfo.Alternate_1.carTime
							]
						},
						{
							label: 'Bicycle',
							...travelTimeBarStyle,
							data: [
								comparisonInfo.Alternate_1.bicycleMoney,
								comparisonInfo.Alternate_1.bicycleTime
							]
						}
					]
				};
				smallStats = [
					{
						label: 'Time Difference',
						value: comparisonInfo.Alternate_1
							? comparisonInfo.Alternate_1.timeDifferenceCycling
							: '0',
						percentage: comparisonInfo.Alternate_1
							? `${comparisonInfo.Alternate_1.timePercentage}%`
							: '0',
						numberDesc: 'This data presents how many minutes user saved',
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
							? `${comparisonInfo.Alternate_1.moneyPercentage}%`
							: '0',
						numberDesc: 'This data presents how much money user saved',
						increase:
							comparisonInfo.Alternate_1.moneyPercentage < 0 ? false : true,
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
						numberDesc:
							'This data presents how many calories are consumed by using current travel method',
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
					labels: ['Money Spend $', 'Travel Time (mins)'],
					datasets: [
						{
							label: 'Car',
							...moneySpentBarStyle,
							data: [
								comparisonInfo.Alternate_2.carMoney,
								comparisonInfo.Alternate_2.carTime
							]
						},
						{
							label: 'Walking',
							...travelTimeBarStyle,
							data: [
								comparisonInfo.Alternate_2.walkingMoney,
								comparisonInfo.Alternate_2.walkingTime
							]
						}
					]
				};
				smallStats = [
					{
						label: 'Time Difference',
						value: comparisonInfo.Alternate_2
							? comparisonInfo.Alternate_2.timeDifferenceWalking
							: '0',
						percentage: comparisonInfo.Alternate_2
							? `${comparisonInfo.Alternate_2.timePercentage}%`
							: '0',
						numberDesc: 'This data presents how many minutes user saved',
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
							? `${comparisonInfo.Alternate_2.moneyPercentage}%`
							: '0',
						numberDesc: 'This data presents how much money user saved',
						increase:
							comparisonInfo.Alternate_2.moneyPercentage < 0 ? false : true,
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

						numberDesc:
							'This data presents how many calories are consumed by using current travel method',
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
		<>
			<Navigation />
			<Container fluid className='main-content-container px-4'>
				<Row noGutters className='page-header py-4'>
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
								theme='success'
							>
								Public Transportation
							</Button>
						) : (
							<>
								<Button
									style={{ margin: '5px', fontSize: '1.2rem' }}
									theme={modeOfTransit === 'CYCLING' ? 'success' : 'secondary'}
									onClick={() => changeMode('CYCLING')}
								>
									Cycling
								</Button>
								Or
								<Button
									style={{ margin: '5px', fontSize: '1.2rem' }}
									theme={modeOfTransit === 'WALKING' ? 'success' : 'secondary'}
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
								numberDesc={stats.numberDesc}
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
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

Comparison.propTypes = {
	smallStats: PropTypes.array
};

Comparison.defaultProps = {
	smallStats: [
		{
			label: 'Time Difference',
			value: '0',
			unit: 'Mins',
			percentage: '0%',
			increase: true,
			chartLabels: [null, null, null, null, null, null, null],
			numberDesc: 'This data presents how many minutes user saved',
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
			numberDesc: 'This data presents how much money user saved',
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
