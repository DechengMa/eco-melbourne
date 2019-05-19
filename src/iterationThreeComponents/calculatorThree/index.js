import React, { Component } from 'react';
import Overview from './Overview.js';
import OverviewNew from './OverviewNew';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/shards-dashboards.1.1.0.css';
import Navigation from '../headerThree/Nav/Navigation';
import FooterThree from '../footerThree';

class index extends Component {
	render() {
		return (
			<>
				<Navigation />
				<OverviewNew />
				<FooterThree />
			</>
		);
	}
}

export default index;
