import React from 'react';
import { Typography, withStyles, Grid } from '@material-ui/core';
import { animateScroll as scroll } from 'react-scroll';
import { Button } from 'shards-react';
import { Link } from 'react-router-dom';
import HeadShake from 'react-reveal/HeadShake';

const styles = theme => ({
	titleSection: {
		color: '#3D5170 !important',
		borderRadius: '10px',
		padding: '20px',
		background: 'rgba(255,255,255,0.6)'
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
		<Grid
			container
			style={{
				height: 'calc(100vh - 68px)'
			}}
			justify='center'
			alignItems='center'
		>
			<Grid item xs={10} md={6}>
				<div className={classes.titleSection}>
					<Typography className={classes.titleText}>
						Find a better way to travel to work
					</Typography>

					<Typography className={classes.subtitleText}>
						<strong>74.4%</strong> of all employees in Melbourne drive their
						cars to work, making roads more <strong>congested</strong>.{' '}
						<Link to='/explore'>
							Click here to see what happens in the future
						</Link>
					</Typography>

					<Typography className={classes.subtitleText}>
						Use our <strong>calculator</strong> to see how much time and money
						you could save using other methods of travel.
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
			</Grid>
			<Grid item xs={12} sm={10} md={4} lg={4} />
		</Grid>
	);
};

export default withStyles(styles)(BannerSection);
