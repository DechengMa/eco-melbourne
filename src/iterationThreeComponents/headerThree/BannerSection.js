import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import { animateScroll as scroll } from 'react-scroll';
import { Button } from 'shards-react';
import { Link } from 'react-router-dom';
import HeadShake from 'react-reveal/HeadShake';

const styles = theme => ({
	titleSection: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		color: '#3D5170 !important',
		width: '80%',

		borderRadius: '10px',
		padding: '20px',
		background: 'rgba(255,255,255,0.6)',

		[theme.breakpoints.up('sm')]: {
			width: '50%',
			left: '35%'
		},
		[theme.breakpoints.up('md')]: {
			width: '40%',
			left: '35%'
		}
	},
	titleText: {
		color: '#3D5170',
		fontFamily: 'Open Sans',
		fontSize: '1.4rem',
		fontWeight: '800',

		[theme.breakpoints.up('sm')]: {
			fontSize: '1.8rem'
		},
		[theme.breakpoints.up('md')]: {
			fontSize: '2.2rem'
		}
	},
	subtitleText: {
		color: '#3D5170',
		fontFamily: 'Roboto',
		fontSize: '1.0rem',
		marginTop: '30px',
		fontWeight: '300',
		width: '100%',
		[theme.breakpoints.up('md')]: {
			fontSize: '1.4rem',
			width: '70%'
		},
		[theme.breakpoints.up('sm')]: {
			fontSize: '1.2rem',
			width: '70%'
		}
	}
});

const BannerSection = ({ classes }) => {
	return (
		<div
			style={{
				height: 'calc(100vh - 68px)'
			}}
		>
			<div className={classes.titleSection}>
				<Typography className={classes.titleText}>
					Find a better way to travel to work
				</Typography>

				<Typography className={classes.subtitleText}>
					<strong>74.4%</strong> of all employees in Melbourne drive their cars
					to work, making roads more <strong>congested</strong>.{' '}
					<Link to='/iteration3/explore'>
						Click here to see what happens in the future
					</Link>
				</Typography>

				<Typography className={classes.subtitleText}>
					Use our <strong>calculator</strong> to see how much time and money
					you’re wasting and compare with other methods of travel.
				</Typography>

				<HeadShake forever={true}>
					<Button
						onClick={() => {
							scroll.scrollTo(window.innerHeight);
						}}
						style={{ marginTop: '3rem', height: '35px' }}
					>
						Calculate Now
					</Button>
				</HeadShake>
			</div>
		</div>
	);
};

export default withStyles(styles)(BannerSection);
