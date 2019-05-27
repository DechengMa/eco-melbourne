import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
	Modal,
	ModalBody,
	ModalHeader,
	InputGroup,
	InputGroupAddon,
	FormInput,
	InputGroupText
} from 'shards-react';
import ScrollToTop from './iterationThreeComponents/utils/_ScrollToTop';
import { CircularProgress } from '@material-ui/core';
import './resources/styles.css';

import HeaderThree from './iterationThreeComponents/headerThree';
import CalculatorThree from './iterationThreeComponents/calculatorThree';
import ComparisonThree from './iterationThreeComponents/comparisonThree';
import FutureThree from './iterationThreeComponents/futureThree';
import AboutUsThree from './iterationThreeComponents/aboutUsThree';
import NotFoundPage from './iterationThreeComponents/NotFoundPage';

const App = () => {
	const [spinner, setSpinner] = useState(true);
	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		setTimeout(() => setSpinner(false), 1000);
	}, []);

	const iteration3HomePage = () => <HeaderThree />;
	const iteration3Calculator = () => <CalculatorThree />;
	const iteration3Comparison = () => <ComparisonThree />;
	const iteration3Future = () => <FutureThree />;
	const iteration3AboutUs = () => <AboutUsThree />;

	// Password
	const inputPassword = event => {
		if (event.target.value === 'ecomelbourne') {
			setShowContent(true);
		}
	};

	const PasswordModal = () => (
		<Modal open={true}>
			<ModalHeader>Password</ModalHeader>
			<ModalBody>
				<InputGroup size='mb-2'>
					<InputGroupAddon type='prepend'>
						<InputGroupText>Password</InputGroupText>
					</InputGroupAddon>
					<FormInput onChange={inputPassword} />
				</InputGroup>
			</ModalBody>
		</Modal>
	);

	if (spinner) {
		return (
			<div
				style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}
			>
				<CircularProgress style={{ position: 'absolute', top: '40%' }} />
			</div>
		);
	} else {
		if (showContent) {
			return (
				<Router>
					<ScrollToTop>
						<Switch>
							<Route exact path='/' component={iteration3HomePage} />
							<Route exact path='/iteration3' component={iteration3HomePage} />
							<Route
								exact
								path='/iteration3/home'
								component={iteration3HomePage}
							/>
							<Route
								exact
								path='/iteration3/calculator'
								component={iteration3Calculator}
							/>
							<Route
								exact
								path='/iteration3/comparison'
								component={iteration3Comparison}
							/>
							<Route
								exact
								path='/iteration3/explore'
								component={iteration3Future}
							/>
							<Route
								exact
								path='/iteration3/aboutus'
								component={iteration3AboutUs}
							/>

							<Route component={NotFoundPage} />
						</Switch>
					</ScrollToTop>
				</Router>
			);
		} else {
			return <PasswordModal />;
		}
	}
};

export default App;
