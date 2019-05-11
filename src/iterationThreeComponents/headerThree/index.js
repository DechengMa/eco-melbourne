import React, { Component } from 'react';
import QuestionBox from './QuestionBox.js';
import {
	withWidth,
	Grid,
	Typography,
	withStyles,
	Paper
} from '@material-ui/core';
import { animateScroll as scroll } from 'react-scroll';
import Nav from './Nav/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button } from 'shards-react';
import FooterThree from '../FooterThree';

const styles = theme => ({
	container: {
		display: 'flex',
		height: 'calc(100vh - 67px)',
		backgroundSize: 'cover',
		backgroundPosition: 'bottom',
		backgroundImage:
			'url(https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)'
	},
	paper: {
		height: '100%',
		flex: 1,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 8
	},
	questionBox: {
		order: 2,
		[theme.breakpoints.up('md')]: {
			order: 1
		}
	},
	textbox: {
		order: 1,
		[theme.breakpoints.up('md')]: {
			order: 2
		}
	},
	text: {
		margin: '2rem',
		fontSize: '1rem',
		textAlign: 'left',
		fontWeight: '300',
		color: 'rgba(64,81,110)',
		[theme.breakpoints.up('md')]: {
			fontSize: '1.4rem'
		},
		[theme.breakpoints.up('sm')]: {
			fontSize: '1.2rem'
		}
	},
	textPOne: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block'
		}
	}
});

class index extends Component {
	renderQuestionBox = () => {
		const { classes } = this.props;
		return (
			<>
				<Nav />
				<div className={classes.container}>
					{/* <div > */}
					<Grid
						container
						spacing={16}
						justify='center'
						// style={{
						// 	position: 'absolute',
						// 	left: '50%',
						// 	top: '50%',
						// 	transform: 'translate(-50%, -50%)'
						// }}
					>
						<Grid
							item
							xs={12}
							sm={10}
							md={6}
							lg={6}
							className={classes.questionBox}
						>
							<div className={classes.paper}>
								<QuestionBox />
							</div>
						</Grid>
						<Grid
							item
							xs={12}
							sm={10}
							md={6}
							lg={6}
							className={classes.textbox}
						>
							<div className={classes.paper}>
								<Typography className={classes.text}>
									<p className={classes.textPOne}>
										Melbourne roads are choking up. The ever - increasing
										congestion is costing you valuable time and money.{' '}
									</p>
									<p>
										Using our calculator, find out how much you’re wasting on
										the road. We will also help you find a better way to travel.{' '}
									</p>
								</Typography>
							</div>
						</Grid>
					</Grid>
				</div>
				<FooterThree />
			</>
		);
	};

	render() {
		return <>{this.renderQuestionBox()}</>;
	}
}

export default withStyles(styles)(index);
