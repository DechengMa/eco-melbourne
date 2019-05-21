import React, { Component } from 'react';
import { withRouter, NavLink as NavLinkRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import {
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	Collapse
} from 'shards-react';

const navWithInput = [
	{
		url: '/iteration3/home',
		name: 'Home'
	},
	{
		url: '/iteration3/calculator',
		name: 'Calculator'
	},
	{
		url: '/iteration3/comparison',
		name: 'Comparison'
	},
	{
		url: '/iteration3/explore',
		name: 'Explore'
	}
];
const navWithoutInput = [
	{
		url: '/iteration3/home',
		name: 'Home'
	},
	{
		url: '/iteration3/explore',
		name: 'Explore'
	}
];

const styles = theme => ({
	navLink: {
		marginTop: '10px',
		marginBottom: '10px',
		color: '#fff',
		marginLeft: '20px',
		[theme.breakpoints.up('md')]: {
			marginLeft: '15px',
			marginTop: '0',
			marginBottom: '0'
		}
	}
});

class Navigation extends Component {
	state = {
		dropdownOpen: false,
		collapseOpen: false,
		path: '/'
	};

	toggleDropdown = () => {
		this.setState({
			...this.state,
			...{
				dropdownOpen: !this.state.dropdownOpen
			}
		});
	};

	toggleNavbar = () => {
		this.setState({
			...this.state,
			...{
				collapseOpen: !this.state.collapseOpen
			}
		});
	};

	renderNav = () => {
		const { classes } = this.props;
		if (!this.props.currentInfo) {
			return navWithoutInput.map(e => {
				return (
					<NavLinkRouter
						key={e.name}
						activeStyle={{ color: '#fff', textDecoration: 'underline' }}
						to={e.url}
						className={classes.navLink}
					>
						{e.name}
					</NavLinkRouter>
				);
			});
		} else {
			return navWithInput.map(e => {
				return (
					<NavLinkRouter
						key={e.name}
						activeStyle={{ color: '#fff', textDecoration: 'underline' }}
						to={e.url}
						className={classes.navLink}
					>
						{e.name}
					</NavLinkRouter>
				);
			});
		}
	};

	render() {
		return (
			<Navbar type='dark' theme='primary' expand='md'>
				<NavbarBrand
					onClick={e => {
						e.preventDefault();
						this.props.history.push('/');
					}}
					href='/'
				>
					Eco-Melbourne
				</NavbarBrand>
				<NavbarToggler onClick={this.toggleNavbar} />

				<Collapse open={this.state.collapseOpen} navbar>
					<Nav navbar className='ml-auto'>
						{this.renderNav()}
					</Nav>
				</Collapse>
			</Navbar>
		);
	}
}

const mapStateToProps = ({ info }) => {
	return {
		currentInfo: info.currentInfo,
		currentParam: info.currentParam
	};
};

export default connect(mapStateToProps)(
	withRouter(withStyles(styles)(Navigation))
);
