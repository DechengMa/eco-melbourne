import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

import { TextField, MenuItem, FormHelperText } from '@material-ui/core';
// import './LocationSearchInput.css';

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
				// value={this.state.address}
				// onChange={this.handleChange}
				// onSelect={this.handleSelect}
				value={this.state.address}
				onChange={this.handleChange}
				onSelect={this.handleSelect}
				searchOptions={options}
			>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<div style={{ display: 'inline-block', position: 'relative' }}>
						<TextField
							{...getInputProps({
								placeholder: 'Search Places ...',
								className: 'input location-search-input'
							})}
							style={{ width: '200px' }}
							error={this.props.error}
							label={this.props.name}
							name={this.props.name}
						/>
						<FormHelperText
							style={{
								color: '#e45342',
								position: 'absolute'
							}}
							id='component-error-text'
						>
							{this.props.errorMsg}
						</FormHelperText>
						<div className='autocomplete-dropdown-container'>
							{loading && <MenuItem>Loading...</MenuItem>}

							{suggestions.map(suggestion => {
								const className = suggestion.active
									? 'suggestion-item--active'
									: 'suggestion-item';

								const style = suggestion.active
									? { backgroundColor: '#fafafa', cursor: 'pointer' }
									: { backgroundColor: '#ffffff', cursor: 'pointer' };
								return (
									<MenuItem
										{...getSuggestionItemProps(suggestion, {
											className,
											style
										})}
									>
										<span>{suggestion.description}</span>
									</MenuItem>
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
