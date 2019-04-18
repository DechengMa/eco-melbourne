import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import './NavBar.css';

const NavBar = () => {
	return (
		<AppBar color='transparant'>
			<ToolBar className='toolbar'>
				<div style={{ flexGrow: 1 }}>
					<div>ECO-MEL</div>
				</div>
				<div>
					<Button>Home</Button>
				</div>
				<div>
					<Button>Calculator</Button>
				</div>
			</ToolBar>
		</AppBar>
	);
};

export default NavBar;
