import React, { Component } from 'react';
import {
	Card,
	CardHeader,
	ListGroup,
	ListGroupItem,
	FormInput,
	Button
} from 'shards-react';
import CustomSelect from '../components/components-overview/CustomSelect';
import LocationSearchInput from '../utils/LocationSearchInput';

class QuestionBox extends Component {
	state = {
		livingSuburb: '',
		workingSuburb: '',
		vehicle: '',
		daysWork: '',
		fuelType: '',
		fuelConsumption: 0,
		distance: '',
		period: 'Week',
		loading: false,
		errorOrNot: false,
		error: {}
	};

	render() {
		return (
			<Card small style={{ padding: '15px' }}>
				<CardHeader className='border-bottom'>
					<h5 className='m-0'>Change the way you travel, from today</h5>
				</CardHeader>

				<ListGroup flush>
					<ListGroupItem className='px-3'>
						<strong className='text-muted d-block mb-2'>
							Where do you live?
						</strong>
						{/* <FormInput id='feEmailAddress' type='email' placeholder='Suburb' /> */}
						<LocationSearchInput />

						<strong className='text-muted d-block mb-2'>
							Where do you work?
						</strong>
						{/* <FormInput id='feEmailAddress' type='email' placeholder='Suburb' /> */}
						<LocationSearchInput />
						<strong className='text-muted d-block mb-2'>
							How many days do you work weekly?
						</strong>
						<CustomSelect />
						<Button type='submit'>Search</Button>
					</ListGroupItem>
				</ListGroup>
			</Card>
		);
	}
}

export default QuestionBox;
