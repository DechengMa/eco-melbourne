import React, { Component } from 'react';
import Navigation from '../header/Nav/Navigation';
import ComparisonNew from './ComparisonNew';
import FooterThree from '../footer';
import GoHomeBtn from '../utils/GoHomeBtn';

class index extends Component {
	render() {
		return (
			<>
				<Navigation />
				<ComparisonNew />
				<FooterThree />
				<GoHomeBtn />
			</>
		);
	}
}

export default index;
