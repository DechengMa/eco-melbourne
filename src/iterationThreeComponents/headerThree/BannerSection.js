import React from 'react';
import { Typography } from '@material-ui/core';
import { animateScroll as scroll } from 'react-scroll';
import { Button } from 'shards-react';
import { Link } from 'react-router-dom';

const BannerSection = () => {
	return (
		<div
			style={{
				height: 'calc(100vh - 68px)'
			}}
		>
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '40%',
					transform: 'translate(-50%, -50%)',
					color: '#3D5170 !important'
				}}
			>
				<Typography
					style={{
						color: '#3D5170',
						fontFamily: 'Open Sans',
						fontSize: '2.5rem',
						fontWeight: '800'
					}}
				>
					Find a better way to travel to work
				</Typography>

				<Typography
					style={{
						color: '#3D5170',
						fontFamily: 'Roboto',
						fontSize: '1.3rem',
						fontWeight: '400',
						marginTop: '30px',
						fontWeight: '300',
						width: '70%'
					}}
				>
					60% of all employees in Melbourne drive their cars to work, making
					roads more congested.{' '}
					<Link to='/iteration3/explore'>
						Click here to see what happens in the future
					</Link>
				</Typography>

				<Typography
					style={{
						color: '#3D5170',
						fontFamily: 'Roboto',
						fontSize: '1.3rem',
						fontWeight: '400',
						marginTop: '30px',
						fontWeight: '300',
						width: '70%'
					}}
				>
					Use our calculator to see how much time and money you’re wasting and
					compare with other methods of travel.
				</Typography>

				<Button
					onClick={() => {
						scroll.scrollTo(window.innerHeight);
					}}
					style={{ marginTop: '3.5rem' }}
					size='lg'
				>
					Calculate Now
				</Button>
			</div>
		</div>
	);
};

export default BannerSection;
