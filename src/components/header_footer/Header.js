import React, { Component } from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SideDrawer from './SideDrawer';

class Header extends Component {
	state = { drawerOpen: false, headerShow: false };

	toggleDrawer = value => {
		this.setState({ drawerOpen: value });
	};

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	handleScroll = () => {
		if (window.scrollY > 0) {
			this.setState({ headerShow: true });
		} else {
			this.setState({ headerShow: false });
		}
	};

	render() {
		return (
			<div>
				<AppBar
					position='fixed'
					style={{
						backgroundColor: this.state.headerShow ? '#efefef' : 'transparent',
						boxShadow: 'none',
						padding: '10px 0px'
					}}
				>
					<Toolbar>
						<div className='header_logo'>
							<div className='font_righteous header_logo_venue'>
								Eco Melbourne
							</div>
							<div className='header_logo_title'>Your travel way changer</div>
						</div>

						<IconButton
							aria-label='Menu'
							color='black'
							onClick={() => {
								this.toggleDrawer(true);
							}}
						>
							<MenuIcon />
						</IconButton>

						<SideDrawer
							open={this.state.drawerOpen}
							onClose={value => this.toggleDrawer(value)}
						/>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default Header;
