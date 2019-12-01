import React, { Component } from 'react';
import QuestionBox from './QuestionBox.js';
import { Grid, withStyles } from '@material-ui/core';
import Nav from './Nav/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import FooterThree from '../footer';
import BannerSection from './BannerSection.js';

const styles = theme => ({
	container: {
		display: 'flex',
		height: 'calc(100vh - 67px)'
	},
	questionBox: {
		// order: 2,
		// marginLeft: '40px',
		// [theme.breakpoints.up('md')]: {
		// 	// order: 1,
		// 	marginLeft: '0'
		// }
	},
	textbox: {
		borderRadius: '10px',
		padding: '20px',
		background: 'rgba(255,255,255,0.6)',
		display: 'none',
		order: 1,
		[theme.breakpoints.up('md')]: {
			order: 2,
			marginLeft: '50px',
			display: 'block'
		}
	},
	text: {
		margin: '2rem',
		fontSize: '1.2rem',
		textAlign: 'left',
		fontWeight: '330',
		color: 'rgba(64,81,110)',
		display: 'none',
		[theme.breakpoints.up('md')]: {
			fontSize: '1.4rem',
			transform: 'translateY(-30px)'
		},
		[theme.breakpoints.up('sm')]: {
			fontSize: '1.3rem',
			display: 'block'
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
			<div
				style={{
					backgroundSize: 'cover',
					backgroundImage:
						'url(https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)',
					backgroundAttachment: 'fixed'
				}}
			>
				<Nav />
				<BannerSection />
				<div className={classes.container}>
					<Grid container justify='center' alignItems='center'>
						<Grid item xs={10} md={4} className={classes.questionBox}>
							<QuestionBox />
						</Grid>
						<Grid
							item
							xs={12}
							sm={10}
							md={4}
							lg={4}
							className={classes.textbox}
						>
							<div className={classes.text}>
								<p className={classes.textPOne}>
									Melbourne roads are choking up. The ever - increasing
									congestion is costing you valuable time and money.
								</p>
								<p>
									Using our calculator, find out how much you’re wasting on the
									road. We will also help you find a better way to travel.
								</p>
							</div>
						</Grid>
					</Grid>
				</div>
				<FooterThree />
			</div>
		);
	};

	render() {
		return <>{this.renderQuestionBox()}</>;
	}
}

export default withStyles(styles)(index);
