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

				<Description description='Melbourne is changing. With growing population and more cars congesting the roads, it is important to start changing the way people travel. Take a look at the charts below:' />
				<Element name='chart'>
					<Charts />
				</Element>
				<Description description='Calculate your impact now:' />
				<Element name='calculator'>
					<Calculator />
				</Element>
			</div>
		);
	}
}

export default App;
