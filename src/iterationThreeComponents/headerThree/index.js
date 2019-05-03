import React, { Component } from 'react';
import header from '../../resources/img/header.jpg';
import QuestionBox from './QuestionBox.js';
import Grid from '@material-ui/core/Grid';
import withWidth from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';
import {
	Link,
	Element,
	Events,
	animateScroll as scroll,
	scrollSpy,
	scroller
} from 'react-scroll';

import { Button } from 'shards-react';
// const textBoxStyle = {
// 	position: absolute,
// 	top: 40%,
// 	left: 50%,
// 	transform: translate(-50%, -50%);
// 	text-align: center;
// }

class index extends Component {
	renderQuestionBox = () => {
		console.log(this.props.width);
		var containerStyle = {
			height: '100%'
		};
		var bgStyle = {
			width: '100vw',
			height: 'calc(100vh - 65px)',
			backgroundImage: `url(${header})`,
			// backgroundImage: `url(https://images.pexels.com/photos/310983/pexels-photo-310983.jpeg?cs=srgb&dl=action-adult-athletes-310983.jpg&fm=jpg)`,
			backgroundSize: 'cover',
			position: 'relative'
		};

		return (
			// <div style={bgStyle}>
			<>
				<div
					style={{
						height: '100vh',
						backgroundSize: 'cover',
						backgroundImage:
							'url(https://images.unsplash.com/photo-1494481524892-b1bf38423fd1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)'
					}}
				>
					<div
						style={{
							position: 'absolute',
							top: '40%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							textAlign: 'center',
							color: '#fff !important'
						}}
					>
						<Typography
							style={{
								color: '#fff',
								fontFamily: 'Roboto',
								fontSize: '2.5rem',
								fontWeight: '800',
								textTransform: 'uppercase'
							}}
						>
							{/* <p style={{ fontSize: '2rem' }}> */}
							Find a better way to travel to work everyday
							{/* </p> */}
						</Typography>
						<Typography
							style={{
								color: '#fff',
								fontFamily: 'Roboto',
								fontSize: '1.3rem',
								fontWeight: '400',
								marginTop: '40px',
								textTransform: 'uppercase'
							}}
						>
							{/* <p style={{ fontSize: '1.4rem' }}> */}
							Save money & get fit - Leave your car at home
							{/* </p> */}
						</Typography>

						<Button
							onClick={() => {
								scroll.scrollTo(window.innerHeight);
							}}
							style={{ marginTop: '3.5rem' }}
							size='lg'
						>
							Learn More
						</Button>
					</div>
				</div>
				<div
					style={{
						height: '100vh',
						backgroundSize: 'cover',
						backgroundImage:
							'url(https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)'
					}}
				>
					<Grid container style={containerStyle} alignItems='center'>
						<Grid item xs={1} md={2} />
						<Grid item xs={9} md={4}>
							<QuestionBox />
						</Grid>
						<Grid item md={1} />
						<Grid item xs={12} md={4}>
							<Typography
								style={{
									margin: '2.5rem',
									fontSize: '1.4rem',
									textAlign: 'left',
									fontWeight: '300',
									color: 'rgba(64,81,110)'
								}}
							>
								<p>
									Melbourne roads are choking up. The ever - increasing
									congestion is costing you valuable time and money.{' '}
								</p>
								<p>
									Using our calculator, find out how much you’re wasting on the
									road. We will also help you find a better way to travel.{' '}
								</p>
								{/* <h4>Get started on the left.</h4> */}
							</Typography>
						</Grid>
					</Grid>
				</div>
			</>
		);
	};

	render() {
		return <>{this.renderQuestionBox()}</>;
	}
}

export default withWidth()(index);
