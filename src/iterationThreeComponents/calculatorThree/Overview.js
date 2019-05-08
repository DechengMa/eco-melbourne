import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Fade } from 'shards-react';
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Fab
} from '@material-ui/core';
import { Home } from '@material-ui/icons';
import LearnMoreCard from '../utils/LearnMoreCard';
import { Link } from 'react-router-dom';
import PageTitle from './../components/common/PageTitle';
import SmallStats from './../components/common/SmallStats';
import UsersOverview from './../components/blog/UsersOverview';
import { connect } from 'react-redux';
import { fetchDefaultResult } from '../../actions';
import Navigation from '../headerThree/Nav/Navigation';
import Comparison from '../comparisonThree/Comparison';
import Bike from '../../resources/img/bicycle.png';

const Overview = ({
	smallStats,
	currentInfo,
	currentParam,
	fetchDefaultResult
}) => {
	// const [open, toggle] = useState(false);
	// const [dropdownOpen, dropdownToggle] = useState(false);
	const [period, setPeriod] = useState('Week');

	var chartData = {
		// labels: Array.from(new Array(10), (_, i) => (i === 0 ? 1 : i)),
		labels: ['08/05', '09/05', '10/05', '11/05', '12/05'],
		datasets: [
			{
				label: 'Time without traffic',
				fill: 'start',
				numberDesc:
					'This data represents the total delay time for one week/month/year. In other words, how many minutes was the user wasted on the way to and from work during this time.',
				data: [0, 13, 24, 28, 32],

				backgroundColor: 'rgba(0,123,255,0.1)',
				borderColor: 'rgba(0,123,255,1)',
				pointBackgroundColor: '#ffffff',
				pointHoverBackgroundColor: 'rgb(0,123,255)',
				borderWidth: 1.5,
				pointRadius: 0,
				pointHoverRadius: 3
			},
			{
				label: 'Travel Time with Traffic',
				fill: 'start',
				numberDesc:
					'This data represents the total delay time for one week/month/year. In other words, how many minutes was the user wasted on the way to and from work during this time.',
				data: [0, 20, 30, 50, 60],
				backgroundColor: 'rgba(255,65,105,0.1)',
				borderColor: 'rgba(255,65,105,1)',
				pointBackgroundColor: '#ffffff',
				pointHoverBackgroundColor: 'rgba(255,65,105,1)',
				borderWidth: 1.5,
				pointRadius: 0,
				pointHoverRadius: 3
			}
		]
	};

	if (currentInfo) {
		chartData = {
			labels: ['08/05', '09/05', '10/05', '11/05', '12/05'],
			datasets: [
				{
					label: 'Time without traffic',
					fill: 'start',
					numberDesc:
						'This data represents the total delay time for one week/month/year. In other words, how many minutes was the user wasted on the way to and from work during this time.',
					data: [0, 13, 24, 28, 32],

					backgroundColor: 'rgba(0,123,255,0.1)',
					borderColor: 'rgba(0,123,255,1)',
					pointBackgroundColor: '#ffffff',
					pointHoverBackgroundColor: 'rgb(0,123,255)',
					borderWidth: 1.5,
					pointRadius: 0,
					pointHoverRadius: 3
				},
				{
					label: 'Travel Time with Traffic',
					fill: 'start',
					numberDesc:
						'This data represents the total delay time for one week/month/year. In other words, how many minutes was the user wasted on the way to and from work during this time.',
					data: [0, 20, 30, 50, 60],
					backgroundColor: 'rgba(255,65,105,0.1)',
					borderColor: 'rgba(255,65,105,1)',
					pointBackgroundColor: '#ffffff',
					pointHoverBackgroundColor: 'rgba(255,65,105,1)',
					borderWidth: 1.5,
					pointRadius: 0,
					pointHoverRadius: 3
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
					'This data represents the total delay time for one week/month/year. In other words, how many minutes was the user wasted on the way to and from work during this time.',
				increase: true,
				unit: 'Mins',
				attrs: { md: '6', sm: '6' }
			},
			{
				label: 'Spending',
				value: currentInfo.price ? currentInfo.price.totalMoneySpent : '0',
				numberDesc:
					'This data shows the amount the user spent on the car during one week/month/year. This fee includes fuel price, insurance price and maintenance services price.',
				unit: '$',
				increase: true,
				attrs: { md: '6', sm: '6' }
			},
			{
				label: 'Carbon Footprint',
				value: currentInfo.environment
					? currentInfo.environment.carCarbon
					: '0',
				numberDesc:
					'This data presents how many carbon dioxide are created by using current travel method during a week/month/year. Cars emit a lot of Carbon dioxide, which aggravates the greenhouse effect. (The industrialization of the world has led to a sharp increase in atmospheric carbon dioxide, of which 30% comes from automobile exhaust.)',
				unit: 'Kg CO2e',

				increase: false,
				decrease: true,
				attrs: { md: '6', sm: '6' }
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
				attrs: { md: '6', sm: '6' }
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
	const subtitle = currentParam
		? `From ${currentParam.livingSuburb} to ${
				currentParam.workingSuburb
		  }, The distance is ${currentParam.distance} km`
		: '';

	return (
		<Fade in={true}>
			<Navigation />
			<Container
				style={{ position: 'relative' }}
				fluid
				className='main-content-container px-4'
			>
				<Row noGutters className='page-header py-4'>
					<Col lg='10' md='12' sm='12'>
						{/* <PageTitle
							title='Here Is Your Current Spending Overview'
							subtitle={subtitle}
							className='text-sm-left mb-12'
						/> */}
						<h6 style={{ fontSize: '1.6rem' }} className='text-sm-left mb-3'>
							Here Is Your Current Spending Overview
						</h6>
						<p>{subtitle}</p>
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
				{/* <Row>
					{smallStatsRow2.map((stats, idx) => (
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
				</Row> */}

				<Row>
					<Col lg='8' md='12' sm='12' className='mb-4'>
						<UsersOverview chartData={chartData} />
					</Col>

					<Col lg='4' md='6' sm='12' className='mb-4'>
						<LearnMoreCard
							cardHeader='Want a way to stop this?'
							title='Make Change'
							img={Bike}
							// img='https://images.pexels.com/photos/1769349/pexels-photo-1769349.jpeg?cs=srgb&dl=action-adult-bicycle-1769349.jpg&fm=jpg'
							// img='https://s23705.pcdn.co/wp-content/uploads/2019/02/Insurance.jpg'
							text='Save up to $1000 yearly by changing the way your travel'
							buttonText='Learn More &rarr;'
							btnTheme='warning'
							to='/iteration3/comparison'
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
				<Link to='/iteration3'>
					<Fab
						color='primary'
						style={{
							position: 'absolute',
							right: '20px',
							bottom: '20px',
							zIndex: '1000'
						}}
					>
						<Home />
					</Fab>
				</Link>
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
			attrs: { md: '6', sm: '6' }
		},
		{
			label: 'Spending',
			value: '0',
			unit: '$',
			numberDesc: 'This data presents how much money you spend',

			increase: true,
			attrs: { md: '6', sm: '6' }
		},
		{
			label: 'Carbon Footprint',
			value: '0',
			unit: 'Kg CO2e',
			numberDesc:
				'This data presents how many carbon dioxide are created by using current travel method',
			increase: false,
			decrease: true,
			attrs: { md: '6', sm: '6' }
		},
		{
			label: 'Environmental Impact',
			value: '0',
			unit: 'Num Of Trees',
			numberDesc:
				'This data presents how many trees are needed to absorb those created carbon dioxide',
			increase: false,
			decrease: true,
			attrs: { md: '6', sm: '6' }
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
