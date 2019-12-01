import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Fade } from 'shards-react';
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	CircularProgress
} from '@material-ui/core';
import LearnMoreCard from '../utils/LearnMoreCard';
import SmallStats from './../components/common/SmallStats';
import { connect } from 'react-redux';
import { fetchDefaultResultIteration3, setDefaultLoading } from '../../actions';
import Bike from '../../resources/img/bicycle.png';

const Overview = ({
	smallStats,
	currentInfo,
	currentParam,
	fetchDefaultResultIteration3,
	setDefaultLoading,
	loading
}) => {
	const [period, setPeriod] = useState('Day');

	if (currentInfo) {
		smallStats = [
			{
				label: 'Time wasted in traffic',
				value: currentInfo.environment
					? currentInfo.environment.timeWaste
					: '0',
				numberDesc: `This is the time you’re wasting because of traffic congestion in a day (or, week / month / year, depending on the selected period).
					 Time Wasted = Travel Time With Traffic - Travel Time Without Traffic
					 *Data Source: Google API`,
				increase: true,
				unit: 'Mins',
				attrs: { md: '6', sm: '6' }
			},
			{
				label: 'Money Spending',
				value: currentInfo.price ? currentInfo.price.totalMoneySpent : '0',
				numberDesc: `This is the money you’re spending in a day (or, week / month / year, depending on the selected period). 
					Money Spent =  Fuel Price + Average Insurance Price + Average Maintenance Price 
					*Please note that the average insurance and maintenance prices were taken from a report published by the Australian Automobile Association in 2018`,
				unit: '$',
				increase: true,
				attrs: { md: '6', sm: '6' }
			},
			{
				label: 'Carbon Footprint',
				value: currentInfo.environment
					? currentInfo.environment.carCarbon
					: '0',
				numberDesc: `This is your carbon footprint, i.e. how much carbon dioxide your car emits in a day (or, week / month / year, depending on the selected period) 
					*Please note that this is an average value, actual levels may vary`,
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
				numberDesc: `This is how many trees it would take to undo your carbon footprint, 
					i.e. to absorb the carbon dioxide your car generated in a day (or, week / month / year, depending on the selected period).`,
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

			setDefaultLoading(true);

			fetchDefaultResultIteration3(
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
		? `From ${currentParam.livingSuburb} to ${currentParam.workingSuburb}, The distance is ${currentParam.distance} km`
		: '';

	return (
		<Fade in={true}>
			<Container
				style={{ position: 'relative' }}
				fluid
				className='main-content-container px-4'
			>
				<Row noGutters className='page-header py-4'>
					<Col lg='10' md='12' sm='12'>
						<h6 style={{ fontSize: '1.6rem' }} className='text-sm-left mb-3'>
							Here is your current spending overview
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
								<MenuItem value={'Day'}>Daily</MenuItem>
								<MenuItem value={'Week'}>Weekly</MenuItem>
								<MenuItem value={'Month'}>Monthly</MenuItem>
								<MenuItem value={'Year'}>Yearly</MenuItem>
							</Select>
						</FormControl>
					</Col>
				</Row>

				<Row>
					{loading ? (
						<Col lg='8' md='6' sm='12' className='mb-4'>
							<CircularProgress
								style={{ position: 'absolute', left: '50%', top: '40%' }}
							/>
						</Col>
					) : (
						<>
							<Col lg='4' md='12' sm='12' className='mb-4'>
								{smallStats.map((stats, idx) =>
									idx < 2 ? (
										<Col
											style={{ height: '50%' }}
											className='col-lg mb-4'
											key={idx}
											{...stats.attrs}
										>
											<SmallStats
												id={`small-stats-${idx}`}
												variation='1'
												numberDesc={stats.numberDesc}
												chartData={stats.datasets}
												chartLabels={stats.chartLabels}
												label={stats.label}
												labelFontSize='1.15rem'
												numberFontSize='2.6rem'
												unit={stats.unit}
												value={stats.value}
												percentage={stats.percentage}
												increase={stats.increase}
												decrease={stats.decrease}
											/>
										</Col>
									) : (
										<></>
									)
								)}
							</Col>
							<Col lg='4' md='12' sm='12' className='mb-4'>
								{smallStats.map((stats, idx) =>
									idx >= 2 ? (
										<Col
											style={{ height: '50%' }}
											className='col-lg mb-4'
											key={idx}
											{...stats.attrs}
										>
											<SmallStats
												id={`small-stats-${idx}`}
												variation='1'
												numberDesc={stats.numberDesc}
												chartData={stats.datasets}
												chartLabels={stats.chartLabels}
												label={stats.label}
												labelFontSize='1.15rem'
												numberFontSize='2.6rem'
												unit={stats.unit}
												value={stats.value}
												percentage={stats.percentage}
												increase={stats.increase}
												decrease={stats.decrease}
											/>
										</Col>
									) : (
										<></>
									)
								)}
							</Col>
						</>
					)}

					<Col lg='4' md='6' sm='12' className='mb-4'>
						<LearnMoreCard
							cardHeader='Want a way to stop this?'
							title='Make Change'
							img={Bike}
							text='Save up to $1000 yearly by changing the way your travel'
							buttonText='Learn More &rarr;'
							btnTheme='warning'
							to='/comparison'
						/>
					</Col>
				</Row>
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
			label: 'Time wasted in traffic ',
			value: '0',
			unit: 'Mins',
			numberDesc: `This is the time you’re wasting because of traffic congestion in a day (or, week / month / year, depending on the selected period). 
				Time Wasted = Travel Time With Traffic - Travel Time Without Traffic
				*Data Source: Google API`,
			increase: true,
			attrs: { md: '12', sm: '6' }
		},
		{
			label: 'Money Spending',
			value: '0',
			unit: '$',
			numberDesc: `This is the money you’re spending in a day (or, week / month / year, depending on the selected period). 
				Money Spent = Fuel Price + Average Insurance Price + Average Maintenance Price 
				*Please note that the average insurance and maintenance prices were taken from a report published by the Australian Automobile Association in 2018`,

			increase: true,
			attrs: { md: '12', sm: '6' }
		},
		{
			label: 'Carbon Footprint',
			value: '0',
			unit: 'Kg CO2e',
			numberDesc: `This is your carbon footprint, i.e. how much carbon dioxide your car emits in a day (or, week / month / year, depending on the selected period) 
				*Please note that this is an average value, actual levels may vary`,
			increase: false,
			decrease: true,
			attrs: { md: '12', sm: '6' }
		},
		{
			label: 'Environmental Impact',
			value: '0',
			unit: 'Num Of Trees',
			numberDesc: `This is how many trees it would take to undo your carbon footprint, 
						i.e. to absorb the carbon dioxide your car generated in a day (or, week / month / year, depending on the selected period).`,
			increase: false,
			decrease: true,
			attrs: { md: '12', sm: '6' }
		}
	]
};

const mapStateToProps = ({ info, loading }) => {
	return {
		currentInfo: info.currentInfo,
		currentParam: info.currentParam,
		loading: loading.fetchDefaultloading
	};
};

export default connect(mapStateToProps, {
	fetchDefaultResultIteration3,
	setDefaultLoading
})(Overview);
