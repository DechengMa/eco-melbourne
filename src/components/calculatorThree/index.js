import React, { Component } from 'react';
import OverviewNew from './OverviewNew';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/shards-dashboards.1.1.0.css';
import Navigation from '../headerThree/Nav/Navigation';
import FooterThree from '../footerThree';
import GoHomeBtn from '../utils/GoHomeBtn';

class index extends Component {
	render() {
		return (
			<>
				<Navigation />
				<OverviewNew />
				<FooterThree />
				<GoHomeBtn />
			</>
		);
	}
}

export default index;
