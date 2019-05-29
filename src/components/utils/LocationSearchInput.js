import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
	ListGroup,
	ListGroupItem,
	FormInput,
	FormGroup,
	FormFeedback
} from 'shards-react';
import { GoogleApiWrapper } from 'google-maps-react';
import { GOOGLEMAPAPI } from '../../config/keys';

class LocationSearchInput extends React.Component {
	state = {
		address: this.props.value,
		bounds: []
	};

	handleChange = address => {
		this.setState({ address });
	};

	handleSelect = address => {
		const { handleSelect } = this.props;
		this.setState({ address });

		// parents value
		handleSelect(address);
	};

	componentWillReceiveProps(props) {
		this.setState({ address: props.value });
	}

	render() {
		const { google } = this.props;
		var defaultBounds = new google.maps.LatLngBounds(
			new google.maps.LatLng(-38.444781, 144.507981),
			new google.maps.LatLng(-37.428945, 145.509429)
		);

		var options = {
			// types: ['(cities)'],
			componentRestrictions: { country: 'au' },
			bounds: defaultBounds,
			restriction: {
				latLngBounds: defaultBounds,
				strictBounds: true
			}
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
						<div
							style={{
								position: 'absolute',
								zIndex: '1000',
								border: 'solid',
								borderWidth: '1px',
								borderColor: '#e1e5ea',
								borderRadius: '5px'
							}}
							className='autocomplete-dropdown-container'
						>
							{loading && <ListGroupItem>Loading...</ListGroupItem>}

							{suggestions.map(suggestion => {
								const className = suggestion.active
									? 'suggestion-item--active'
									: 'suggestion-item';

								const style = suggestion.active
									? {
											backgroundColor: '#fafafa',
											cursor: 'pointer'
									  }
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

export default GoogleApiWrapper({
	apiKey: GOOGLEMAPAPI
})(LocationSearchInput);
