import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScrollToTop from './components/utils/_ScrollToTop';
import { CircularProgress } from '@material-ui/core';
import './resources/styles.css';

import Header from './components/header';
import Calculator from './components/calculator';
import Comparison from './components/comparison';
import Future from './components/future';
import AboutUs from './components/aboutUs';
import NotFoundPage from './components/NotFoundPage';

const App = () => {
	const [spinner, setSpinner] = useState(true);

	useEffect(() => {
		setTimeout(() => setSpinner(false), 1000);
	}, []);

	const homePage = () => <Header />;
	const calculator = () => <Calculator />;
	const comparison = () => <Comparison />;
	const future = () => <Future />;
	const aboutUs = () => <AboutUs />;

	if (spinner) {
		return (
			<div
				style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}
			>
				<CircularProgress style={{ position: 'absolute', top: '40%' }} />
			</div>
		);
	} else {
		return (
			<Router>
				<ScrollToTop>
					<Switch>
						<Route exact path='/' component={homePage} />
						<Route exact path='/calculator' component={calculator} />
						<Route exact path='/comparison' component={comparison} />
						<Route exact path='/explore' component={future} />
						<Route exact path='/aboutus' component={aboutUs} />
						<Route component={NotFoundPage} />
					</Switch>
				</ScrollToTop>
			</Router>
		);
	}
};

export default App;
