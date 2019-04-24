import React, { Component } from 'react';

import { Element } from 'react-scroll';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './resources/styles.css';

// Iteration 1
import Header from './iterationOneComponents/header_footer/Header';
import Banner from './iterationOneComponents/banner/Banner';
import Description from './iterationOneComponents/description/Description';
import Charts from './iterationOneComponents/charts';
import Calculator from './iterationOneComponents/calculator';

// Iteration 2
import HeaderTwo from './iterationTwoComponents/headerTwo';
import CalculatorTwo from './iterationTwoComponents/calculatorTwo';
import ComparisonTwo from './iterationTwoComponents/comparisonTwo';
// import Navigation from './iterationTwoComponents/headerTwo/Nav/Navigation';
// import PriceComparison from './iterationTwoComponents/PriceComparison';
import Iteration2 from './iterationTwoComponents';
import NotFoundPage from './iterationTwoComponents/NotFoundPage';

class App extends Component {
	iteration1 = () => (
		<div className='App'>
			<Header />
			<div style={{ marginTop: '88px' }}>
				<Banner />
			</div>
			<Element name='chart'>
				<Description description='Melbourne is changing. With growing population and more cars congesting the roads, it is important to start changing the way people travel. Take a look at the charts below:' />
				<Charts />
			</Element>

			<Element name='calculator'>
				<Description description='Calculate your impact now:' />
				<Calculator />
			</Element>
		</div>
	);

	// Iteration 2 Components
	iteration2HomePage = () => <HeaderTwo />;
	iteration2Calculator = () => <CalculatorTwo />;
	comparisonTwo = () => <ComparisonTwo />;

	// End of iteration 2 Components

	render() {
		return (
			<Router>
				<Route path='/iteration1' component={this.iteration1} />
				<Iteration2>
					<Switch>
						<Route
							path='/iteration2'
							exact
							component={this.iteration2HomePage}
						/>
						<Route
							path='/iteration2/calculator'
							component={this.iteration2Calculator}
						/>
						<Route
							path='/iteration2/comparison'
							component={this.comparisonTwo}
						/>
						<Route exact component={NotFoundPage} />
					</Switch>
				</Iteration2>
			</Router>
		);
	}
}

export default App;
