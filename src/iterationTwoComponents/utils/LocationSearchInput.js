import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
	ListGroup,
	ListGroupItem,
	FormInput,
	FormGroup,
	FormFeedback
} from 'shards-react';

class LocationSearchInput extends React.Component {
	state = {
		address: this.props.value
	};

	handleChange = address => {
		this.setState({ address });
	};

	handleSelect = address => {
		const { handleSelect } = this.props;
		this.setState({ address });

		// parents value
		handleSelect(address);

		// geocodeByAddress(address)
		// 	.then(results => getLatLng(results[0]))
		// 	.then(latLng => this.props.returnCenterPoint(latLng))
		// 	.catch(error => console.error('Error', error));
	};

	componentWillReceiveProps(props) {
		this.setState({ address: props.value });
	}

	render() {
		var options = {
			// types: ['(cities)'],
			componentRestrictions: { country: 'au' }
		};

		return (
			<PlacesAutocomplete
				value={this.state.address}
				onChange={this.handleChange}
				onSelect={this.handleSelect}
				searchOptions={options}
			>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<div style={{ position: 'relative' }}>
						<FormGroup>
							<FormInput
								{...getInputProps({
									placeholder: 'Search Places ...',
									className: 'input location-search-input'
								})}
								required
								invalid={this.props.error}
							/>
							<FormFeedback>{this.props.errorMsg}</FormFeedback>
						</FormGroup>
						<div className='autocomplete-dropdown-container'>
							{loading && <ListGroupItem>Loading...</ListGroupItem>}

							{suggestions.map(suggestion => {
								const className = suggestion.active
									? 'suggestion-item--active'
									: 'suggestion-item';

								const style = suggestion.active
									? { backgroundColor: '#fafafa', cursor: 'pointer' }
									: { backgroundColor: '#ffffff', cursor: 'pointer' };
								return (
									<ListGroup
										{...getSuggestionItemProps(suggestion, {
											className,
											style
										})}
									>
										<ListGroupItem>{suggestion.description}</ListGroupItem>
									</ListGroup>
								);
							})}
						</div>
					</div>
				)}
			</PlacesAutocomplete>
		);
	}
}

export default LocationSearchInput;
