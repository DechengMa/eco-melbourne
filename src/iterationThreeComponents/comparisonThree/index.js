import React, { Component } from 'react';
import Comparison from './Comparison';
import Navigation from '../headerThree/Nav/Navigation';

class index extends Component {
	render() {
		return (
			<>
				<Navigation />
				<Comparison />
			</>
		);
	}
}

export default index;
