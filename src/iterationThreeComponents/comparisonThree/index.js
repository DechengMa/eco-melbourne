import React, { Component } from 'react';
import Comparison from './Comparison';
import Navigation from '../headerThree/Nav/Navigation';
import ComparisonNew from './ComparisonNew';
import FooterThree from '../footerThree';

class index extends Component {
	render() {
		return (
			<>
				<Navigation />
				{/* <Comparison /> */}
				<ComparisonNew />
				<FooterThree />
			</>
		);
	}
}

export default index;
