import React, { Component } from 'react';
import './resources/styles.css';
import Header from './components/header_footer/Header';
import Banner from './components/banner/Banner';
import Description from './components/description/Description';
import Charts from './components/charts';
import Calculator from './components/calculator';
import { Element } from 'react-scroll';

class App extends Component {
	render() {
		return (
			<div className='App'>
				<Header />
				<div style={{ marginTop: '88px' }}>
					<Banner />
				</div>

				<Description description='Let see some data first' />
				<Element name='chart'>
					<Charts />
				</Element>
				<Description description='Come and try our calculcator feature!' />
				<Element name='calculator'>
					<Calculator />
				</Element>
			</div>
		);
	}
}

export default App;
