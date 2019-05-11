import React, { Component } from 'react';
import Overview from './Overview.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/shards-dashboards.1.1.0.css';
import Navigation from '../headerThree/Nav/Navigation';

class index extends Component {
	render() {
		return (
			<>
				<Navigation />
				<Overview />
			</>
		);
	}
}

export default index;
