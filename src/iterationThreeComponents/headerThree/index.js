import React, { Component } from 'react';
import header from '../../resources/img/header.jpg';
import QuestionBox from './QuestionBox.js';
import Grid from '@material-ui/core/Grid';
import withWidth from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';
import { animateScroll as scroll } from 'react-scroll';
import Nav from './Nav/Navigation';

import { Button } from 'shards-react';

class index extends Component {
	renderQuestionBox = () => {
		var containerStyle = {
			height: '100%'
		};

		return (
			<>
				{/* <div
					style={{
						height: '100vh',
						backgroundSize: 'cover',
						// backgroundImage:
						// 	'url(https://images.unsplash.com/photo-1494481524892-b1bf38423fd1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)'
						backgroundImage:
							'url(https://images.unsplash.com/photo-1421091242698-34f6ad7fc088?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1949&q=80)'
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
							Find a better way to travel to work everyday
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
							Save money & get fit - Leave your car at home
						</Typography>

						<Button
							onClick={() => {
								scroll.scrollTo(window.innerHeight);
							}}
							style={{ marginTop: '3.5rem' }}
							size='lg'
						>
							Get Started
						</Button>
					</div>
				</div> */}
				<Nav />
				<div
					style={{
						height: 'calc(100vh - 67px)',
						backgroundSize: 'cover',
						backgroundPosition: 'bottom',
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
