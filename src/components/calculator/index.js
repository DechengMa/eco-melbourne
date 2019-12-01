import React, { Component } from 'react';
import OverviewNew from './OverviewNew';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/shards-dashboards.1.1.0.css';
import Navigation from '../header/Nav/Navigation';
import Footer from '../footer';
import GoHomeBtn from '../utils/GoHomeBtn';

class index extends Component {
	render() {
		return (
			<>
				<Navigation />
				<OverviewNew />
				<Footer />
				<GoHomeBtn />
			</>
		);
	}
}

export default index;
