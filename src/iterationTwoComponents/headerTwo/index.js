import React, { Component } from 'react';
import NavBar from './Navbar/NavBar.js';
import header from '../../resources/img/header.jpg';
import QuestionBox from './QuestionBox.js';

class index extends Component {
	render() {
		return (
			<header>
				<NavBar />
				<div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
					<img src={header} style={{ height: '100%', width: '100%' }} />
					<div
						style={{
							display: 'inline-block',
							position: 'absolute',
							left: '30%',
							top: '50%',
							transform: 'translate(-50%, -50%)'
						}}
					>
						<QuestionBox />
					</div>
				</div>
			</header>
		);
	}
}

export default index;
