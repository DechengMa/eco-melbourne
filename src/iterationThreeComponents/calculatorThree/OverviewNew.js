import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { Container, Row, Col, Fade } from 'shards-react';
import LearnMoreCard from '../utils/LearnMoreCard';
import { fetchDefaultResultIteration3, setDefaultLoading } from '../../actions';
import Bike from '../../resources/img/bicycle.png';
import PeriodSelector from '../utils/PeriodSelector';
import TimeWastedCard from './TimeWastedCard';
import CarbonDamageCard from './CarbonDamageCard';
import SpendingCard from './SpendingCard';
import { LightSpeed } from 'react-reveal';

class OverviewNew extends Component {
	state = { period: 'Day' };

	fetchDataFromBackEnd = period => {
		const {
			currentParam,
			setDefaultLoading,
			fetchDefaultResultIteration3
		} = this.props;
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
	render() {
		const {
			currentInfo,
			currentParam,
			fetchDefaultResultIteration3,
			setDefaultLoading,
			loading
		} = this.props;
		const subtitle = currentParam
			? `From ${currentParam.livingSuburb} to ${
					currentParam.workingSuburb
			  }, The distance is ${currentParam.distance} km`
			: '';

		var timeWaste = 0;
		var totalMoneySpent = 0;
		var carCarbon = 0;
		var treesRequired = 0;

		if (currentInfo) {
			timeWaste = currentInfo.environment
				? currentInfo.environment.timeWaste
				: '0';
			totalMoneySpent = currentInfo.price
				? currentInfo.price.totalMoneySpent
				: '0';
			carCarbon = currentInfo.environment
				? currentInfo.environment.carCarbon
				: '0';
			treesRequired = currentInfo.environment
				? currentInfo.environment.treesRequired
				: '0';
		}
		return (
			<Container
				style={{ position: 'relative' }}
				fluid
				className='main-content-container px-4'
			>
				<Row className='page-header py-4'>
					<Col lg='10' md='12' sm='12'>
						<h6 style={{ fontSize: '1.6rem' }} className='text-sm-left mb-3'>
							Here is your current spending overview
						</h6>
						<p>{subtitle}</p>
					</Col>
					<Col lg='2' md='12' sm='12' xs='12' style={{ marginTop: '20px' }}>
						<PeriodSelector
							period={this.state.period}
							handleChange={value => {
								this.fetchDataFromBackEnd(value);
								this.setState({ period: value });
							}}
						/>
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
						<Col lg='9' md='9' sm='12' className='mb-4'>
							<LightSpeed left>
								<Row style={{ marginBottom: '20px' }}>
									<TimeWastedCard timeWaste={timeWaste} />
								</Row>
							</LightSpeed>
							<LightSpeed right delay={4000}>
								<Row style={{ marginBottom: '20px' }}>
									<CarbonDamageCard
										carCarbon={carCarbon}
										treesRequired={treesRequired}
									/>
								</Row>
							</LightSpeed>
							<LightSpeed left delay={8000}>
								<Row>
									<SpendingCard totalMoneySpent={totalMoneySpent} />
								</Row>
							</LightSpeed>
						</Col>
					)}

					<Col lg='3' md='3' sm='12' className='mb-4'>
						<LearnMoreCard
							cardHeader='Want a way to stop this?'
							title='Make Change'
							img={Bike}
							text='Save up to $1000 yearly by changing the way your travel'
							buttonText='Learn More &rarr;'
							btnTheme='warning'
							to='/iteration3/comparison'
						/>
					</Col>
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = ({ info, loading }) => {
	return {
		currentInfo: info.currentInfo,
		currentParam: info.currentParam,
		loading: loading.fetchDefaultloading
	};
};

export default connect(
	mapStateToProps,
	{ fetchDefaultResultIteration3, setDefaultLoading }
)(OverviewNew);
