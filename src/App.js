import React, { useEffect, useState } from 'react';

import { Element } from 'react-scroll';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';
import {
	Modal,
	ModalBody,
	ModalHeader,
	InputGroup,
	InputGroupAddon,
	FormInput,
	InputGroupText
} from 'shards-react';

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
import NotFoundPage from './iterationTwoComponents/NotFoundPage';
import CircularProgress from '@material-ui/core/CircularProgress';

// Iteration 3
import HeaderThree from './iterationThreeComponents/headerThree';
import CalculatorThree from './iterationThreeComponents/calculatorThree';
import ComparisonThree from './iterationThreeComponents/comparisonThree';

const App = () => {
	const [spinner, setSpinner] = useState(true);
	const [showContent, setShowContent] = useState(true);

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
	const iteration2Comparison = () => <ComparisonTwo />;

	// End of iteration 2 Components

	// Iteration 3 Components
	const iteration3HomePage = () => <HeaderThree />;
	const iteration3Calculator = () => <CalculatorThree />;
	const iteration3Comparison = () => <ComparisonThree />;

	// End of iteration 3 Components

	// Password
	const inputPassword = event => {
		if (process.env.NODE_ENV === 'development') {
			setShowContent(true);
		}

		if (event.target.value === process.env.REACT_APP_PASSWORD) {
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
					<Switch>
						{/* iteration 1 */}
						<Route path='/iteration1' component={iteration1} />
						{/* iteration 1 */}

						{/* iteration 2 */}

						<Route exact path='/iteration2' component={iteration2HomePage} />
						<Route
							exact
							path='/iteration2/calculator'
							component={iteration2Calculator}
						/>
						<Route
							exact
							path='/iteration2/comparison'
							component={iteration2Comparison}
						/>
						{/* iteration 2 */}

						{/* iteration 3 */}
						<Route exact path='/' component={iteration3HomePage} />
						<Route exact path='/iteration3' component={iteration3HomePage} />
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
						{/* iteration 3 */}

						<Route component={NotFoundPage} />
					</Switch>
				</Router>
			);
		} else {
			return <PasswordModal />;
		}
	}

	// return spinner ? (
	// 	<div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
	// 		<CircularProgress style={{ position: 'absolute', top: '40%' }} />
	// 	</div>
	// ) : (
	// 	<PasswordModal />

	// 	<Router>
	// 		<Switch>
	// 			<Route path='/iteration1' component={iteration1} />
	// 			<Iteration2>
	// 				<Route exact path='/iteration2' component={iteration2HomePage} />
	// 				<Route
	// 					exact
	// 					path='/iteration2/calculator'
	// 					component={iteration2Calculator}
	// 				/>
	// 				<Route
	// 					exact
	// 					path='/iteration2/comparison'
	// 					component={comparisonTwo}
	// 				/>
	// 			</Iteration2>
	// 			<Route component={NotFoundPage} />
	// 		</Switch>
	// 	</Router>
	// );
};

export default App;
