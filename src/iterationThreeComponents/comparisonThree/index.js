import React, { Component } from 'react';
import Comparison from './Comparison';
import Navigation from '../headerThree/Nav/Navigation';
import ComparisonNew from './ComparisonNew';

class index extends Component {
	render() {
		return (
			<>
				<Navigation />
				{/* <Comparison /> */}
				<ComparisonNew />
			</>
		);
	}
}

export default index;
