import React from 'react';
import { Link } from 'react-router-dom';
import { Fab } from '@material-ui/core';
import { Home } from '@material-ui/icons';

const GoHomeBtn = () => {
	return (
		<Link to='/'>
			<Fab
				variant='extended'
				style={{
					backgroundColor: '#007bff',
					color: '#fff',
					position: 'fixed',
					bottom: '15px',
					right: '15px'
				}}
			>
				Home
				<Home />
			</Fab>
		</Link>
	);
};

export default GoHomeBtn;
