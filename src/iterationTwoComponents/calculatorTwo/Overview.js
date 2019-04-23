import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	Container,
	Row,
	Col,
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
	FormInput,
	Form,
	FormGroup,
	Fade
} from 'shards-react';
// import { Fab } from '@material-ui/core';
import { Link } from 'react-router-dom';

import PageTitle from './../components/common/PageTitle';
import SmallStats from './../components/common/SmallStats';
import UsersOverview from './../components/blog/UsersOverview';
import UsersByDevice from './../components/blog/UsersByDevice';

const Overview = ({ smallStats }) => {
	const [open, toggle] = useState(false);

	useEffect(() => {
		window.scrollTo(0, document.body.scrollHeight);
	});

	return (
		<Fade in={true}>
			<Container fluid className='main-content-container px-4'>
				<Row noGutters className='page-header py-4'>
					<PageTitle
						title='Your Current Spending Overview'
						subtitle='Dashboard'
						className='text-sm-left mb-3'
					/>
				</Row>

				<Row>
					{smallStats.map((stats, idx) => (
						<Col className='col-lg mb-4' key={idx} {...stats.attrs}>
							<SmallStats
								id={`small-stats-${idx}`}
								variation='1'
								chartData={stats.datasets}
								chartLabels={stats.chartLabels}
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
						<UsersOverview />
					</Col>

					<Col lg='4' md='6' sm='12' className='mb-4'>
						<UsersByDevice />
					</Col>
				</Row>
				<Button
					onClick={() => toggle(!open)}
					style={{ position: 'absolute', top: '100px', right: '50px' }}
				>
					{/* <NavigationIcon className={classes.extendedIcon} /> */}
					Advanced Search
				</Button>
				<Modal open={open} toggle={() => toggle(!open)}>
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
				</Modal>

				<Row>
					<Col lg='12' md='12' sm='12' className='mb-4'>
						<Link to='/iteration2/comparison'>
							<Button style={{ width: '100%' }} theme='danger'>
								I think this is too much !!! I want to save money and time!
							</Button>
						</Link>
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
			label: 'Time Wasted',
			value: '2,390',
			percentage: '4.7%',
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
			label: 'Spending',
			value: '182',
			percentage: '12.4%',
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
		},
		{
			label: 'Comments',
			value: '8,147',
			percentage: '3.8%',
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
					data: [2, 3, 3, 3, 4, 3, 3]
				}
			]
		},
		{
			label: 'New Customers',
			value: '29',
			percentage: '2.71%',
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
					data: [1, 7, 1, 3, 1, 4, 8]
				}
			]
		},
		{
			label: 'Subscribers',
			value: '17,281',
			percentage: '2.4%',
			increase: false,
			decrease: true,
			chartLabels: [null, null, null, null, null, null, null],
			attrs: { md: '4', sm: '6' },
			datasets: [
				{
					label: 'Today',
					fill: 'start',
					borderWidth: 1.5,
					backgroundColor: 'rgb(0,123,255,0.1)',
					borderColor: 'rgb(0,123,255)',
					data: [3, 2, 3, 2, 4, 5, 4]
				}
			]
		}
	]
};

export default Overview;
