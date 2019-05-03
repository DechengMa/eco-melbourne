import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	Container,
	Row,
	Col,
	Fade
	// Dropdown,
	// DropdownToggle,
	// DropdownMenu,
	// DropdownItem
} from 'shards-react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

import LearnMoreCard from '../utils/LearnMoreCard';
import PageTitle from './../components/common/PageTitle';
import SmallStats from './../components/common/SmallStats';
import UsersOverview from './../components/blog/UsersOverview';
import { connect } from 'react-redux';
import { fetchDefaultResult } from '../../iterationTwoComponents/actions';
import Navigation from '../headerThree/Nav/Navigation';
// import UsersByDevice from './../components/blog/UsersByDevice';

const Overview = ({
	smallStats,
	currentInfo,
	currentParam,
	fetchDefaultResult
}) => {
	const [open, toggle] = useState(false);
	const [dropdownOpen, dropdownToggle] = useState(false);
	const [period, setPeriod] = useState('Week');
	// const [period, ]
	// var dropdownOpen = false;

	var chartData = {
		// labels: Array.from(new Array(10), (_, i) => (i === 0 ? 1 : i)),
		labels: [
			'2019',
			'2020',
			'2021',
			'2022',
			'2023',
			'2024',
			'2025',
			'2026',
			'2027',
			'2028',
			'2029',
			'2030'
		],
		datasets: [
			{
				label: 'Time Wasted',
				fill: 'start',
				numberDesc:
					'This data presents how many minutes user wasted due to traffic congestion',
				data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				backgroundColor: 'rgba(0,123,255,0.1)',
				borderColor: 'rgba(0,123,255,1)',
				pointBackgroundColor: '#ffffff',
				pointHoverBackgroundColor: 'rgb(0,123,255)',
				borderWidth: 1.5,
				pointRadius: 0,
				pointHoverRadius: 3
			}
		]
	};

	if (currentInfo) {
		chartData = {
			// labels: Array.from(new Array(10), (_, i) => (i === 0 ? 1 : i)),
			labels: [
				'2019',
				'2020',
				'2021',
				'2022',
				'2023',
				'2024',
				'2025',
				'2026',
				'2027',
				'2028',
				'2029',
				'2030'
			],
			datasets: [
				{
					label: 'Time Wasted',
					fill: 'start',
					numberDesc:
						'This data presents how many minutes user wasted due to traffic congestion',
					data: currentInfo.timeDelay.timeDelay
						? currentInfo.timeDelay.timeDelay
						: [0, 0, 0, 0, 0, 0],
					backgroundColor: 'rgba(255,65,105,0.1)',
					borderColor: 'rgba(255,65,105,1)',
					pointBackgroundColor: '#ffffff',
					pointHoverBackgroundColor: 'rgba(255,65,105,1)',
					borderDash: [3, 3],
					borderWidth: 1,
					pointRadius: 0,
					pointHoverRadius: 2,
					pointBorderColor: 'rgba(255,65,105,1)'
				}
			]
		};

		smallStats = [
			{
				label: 'Time Wasted',
				value: currentInfo.environment
					? currentInfo.environment.timeWaste
					: '0',
				numberDesc:
					'This data presents how many minutes user wasted due to traffic congestion',
				increase: true,
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
				label: 'Spending',
				value: currentInfo.price ? currentInfo.price.totalMoneySpent : '0',
				numberDesc: 'This data presents how much money you spend',
				unit: '$',
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
				label: 'Carbon Footprint',
				value: currentInfo.environment
					? currentInfo.environment.carCarbon
					: '0',
				numberDesc:
					'This data presents how many carbon dioxide are created by using current travel method.',
				unit: 'Kg CO2e',

				increase: false,
				decrease: true,
				chartLabels: [null, null, null, null, null, null, null],
				attrs: { md: '6', sm: '6' },
				datasets: [
					{
						label: 'Today',
						fill: 'start',
						borderWidth: 1.5,
						backgroundColor: 'rgba(255,180,0,0.1)',
						borderColor: 'rgb(255,180,0)',
						data: [0, 0, 0, 0, 0, 0, 0]
					}
				]
			},
			{
				label: 'Environmental Impact',
				value: currentInfo.environment
					? currentInfo.environment.treesRequired
					: '0',
				numberDesc:
					'This data presents how many trees are needed to absorb those created carbon dioxide',
				unit: 'Num Of Trees',
				increase: false,
				decrease: true,
				chartLabels: [null, null, null, null, null, null, null],
				attrs: { md: '6', sm: '6' },
				datasets: [
					{
						label: 'Today',
						fill: 'start',
						borderWidth: 1.5,
						backgroundColor: 'rgba(255,65,105,0.1)',
						borderColor: 'rgb(255,65,105)',
						data: [0, 0, 0, 0, 0, 0, 0]
					}
				]
			}
		];
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

			fetchDefaultResult(
				distance,
				days,
				congestion,
				period,
				carTime,
				bicycleTime,
				walkingTime,
				ptvTime,
				null
			);
		}
	};

	console.log('currentParam', currentParam);

	const subtitle = currentParam
		? `From ${currentParam.livingSuburb} to ${
				currentParam.workingSuburb
		  }, The distance is ${currentParam.distance} km`
		: '';

	return (
		<Fade in={true}>
			<Navigation />
			<Container fluid className='main-content-container px-4'>
				<Row noGutters className='page-header py-4'>
					<Col lg='10' md='12' sm='12'>
						<PageTitle
							title='Here Is Your Current Spending Overview'
							subtitle={subtitle}
							className='text-sm-left mb-12'
						/>
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
					{/* <Col
						lg='2'
						md='6'
						sm='6'
						xs='6'
						style={{ marginTop: '20px', textAlign: 'right' }}
					>
						<Button onClick={() => toggle(!open)}>Advanced Search</Button>
					</Col> */}
				</Row>

				<Row>
					{smallStats.map((stats, idx) => (
						<Col className='col-lg mb-4' key={idx} {...stats.attrs}>
							<SmallStats
								id={`small-stats-${idx}`}
								variation='1'
								numberDesc={stats.numberDesc}
								chartData={stats.datasets}
								chartLabels={stats.chartLabels}
								label={stats.label}
								unit={stats.unit}
								value={stats.value}
								percentage={stats.percentage}
								increase={stats.increase}
								decrease={stats.decrease}
							/>
						</Col>
					))}
				</Row>

				<Row>
					<Col lg='8' md='6' sm='12' className='mb-4'>
						<UsersOverview chartData={chartData} />
					</Col>

					<Col lg='4' md='6' sm='12' className='mb-4'>
						{/* <UsersByDevice /> */}
						<LearnMoreCard
							cardHeader='Want a way to stop this?'
							title='Make Change'
							img='https://s23705.pcdn.co/wp-content/uploads/2019/02/Insurance.jpg'
							text='Save up to $1000 yearly by changing the way your travel'
							buttonText='Learn More &rarr;'
							btnTheme='warning'
							to='/iteration2/comparison'
						/>
					</Col>
				</Row>

				{/* <Modal open={open} toggle={() => toggle(!open)}>
					<ModalHeader>Advanced Search</ModalHeader>
					<ModalBody>
						<Form>
							<FormGroup>
								<label htmlFor='username'>Input</label>
								<FormInput id='username' />
								<label htmlFor='username'>Input</label>
								<FormInput id='username' />
								<label htmlFor='username'>Input</label>
								<FormInput id='username' />
								<label htmlFor='username'>Input</label>
								<FormInput id='username' />
								<label htmlFor='username'>Input</label>
								<FormInput id='username' />
								<label htmlFor='username'>Input</label>
								<FormInput id='username' />
								<label htmlFor='username'>Input</label>
								<FormInput id='username' />
							</FormGroup>
						</Form>
					</ModalBody>
					<ModalFooter>
						<Button>Search</Button>
					</ModalFooter>
				</Modal> */}
			</Container>
		</Fade>
	);
};

Overview.propTypes = {
	smallStats: PropTypes.array
};

Overview.defaultProps = {
	smallStats: [
		{
			label: 'Time Wasted',
			value: '0',
			unit: 'Mins',
			numberDesc:
				'This data presents how many minutes user wasted due to traffic congestion',
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
					data: [0, 0, 0, 0, 0, 0, 0]
				}
			]
		},
		{
			label: 'Spending',
			value: '0',
			unit: '$',
			numberDesc: 'This data presents how much money you spend',

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
					data: [0, 0, 0, 0, 0, 0, 0]
				}
			]
		},
		{
			label: 'Carbon Footprint',
			value: '0',
			unit: 'Kg CO2e',
			numberDesc:
				'This data presents how many carbon dioxide are created by using current travel method',
			increase: false,
			decrease: true,
			chartLabels: [null, null, null, null, null, null, null],
			attrs: { md: '4', sm: '6' },
			datasets: [
				{
					label: 'Today',
					fill: 'start',
					borderWidth: 1.5,
					backgroundColor: 'rgba(255,180,0,0.1)',
					borderColor: 'rgb(255,180,0)',
					data: [0, 0, 0, 0, 0, 0, 0]
				}
			]
		},
		{
			label: 'Environmental Impact',
			value: '0',
			unit: 'Num Of Trees',
			numberDesc:
				'This data presents how many trees are needed to absorb those created carbon dioxide',
			increase: false,
			decrease: true,
			chartLabels: [null, null, null, null, null, null, null],
			attrs: { md: '4', sm: '6' },
			datasets: [
				{
					label: 'Today',
					fill: 'start',
					borderWidth: 1.5,
					backgroundColor: 'rgba(255,65,105,0.1)',
					borderColor: 'rgb(255,65,105)',
					data: [0, 0, 0, 0, 0, 0, 0]
				}
			]
		}
	]
};

const mapStateToProps = ({ info }) => {
	return {
		currentInfo: info.currentInfo,
		currentParam: info.currentParam
	};
};

export default connect(
	mapStateToProps,
	{ fetchDefaultResult }
)(Overview);
