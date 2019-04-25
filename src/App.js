import React, { useEffect, useState } from 'react';

import { Element } from 'react-scroll';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';

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
import CircularProgress from '@material-ui/core/CircularProgress';

const App = () => {
	const [spinner, setSpinner] = useState(true);

	useEffect(() => {
		setTimeout(() => setSpinner(false), 1000);
	}, []);

	const iteration1 = () => (
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
	const iteration2HomePage = () => <HeaderTwo />;
	const iteration2Calculator = () => <CalculatorTwo />;
	const comparisonTwo = () => <ComparisonTwo />;

	// End of iteration 2 Components

	return spinner ? (
		<div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
			<CircularProgress style={{ position: 'absolute', top: '40%' }} />
		</div>
	) : (
		<Router>
			<Switch>
				<Route path='/iteration1' component={iteration1} />
				<Iteration2>
					<Route exact path='/iteration2' component={iteration2HomePage} />
					<Route
						exact
						path='/iteration2/calculator'
						component={iteration2Calculator}
					/>
					<Route
						exact
						path='/iteration2/comparison'
						component={comparisonTwo}
					/>
				</Iteration2>
				<Route component={NotFoundPage} />
			</Switch>
		</Router>
	);
};

export default App;
