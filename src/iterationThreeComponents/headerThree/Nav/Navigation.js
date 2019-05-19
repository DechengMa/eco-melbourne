import React, { Component } from 'react';
import { withRouter, NavLink as NavLinkRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	Collapse
} from 'shards-react';
import { Link } from 'react-router-dom';

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

	componentDidUpdate(prevProps) {
		console.log(this.props.location.pathname, prevProps.location.pathname);
		if (this.props.location.pathname !== prevProps.location.pathname) {
			this.onRouteChanged();
		}
	}

	onRouteChanged() {
		console.log('ROUTE CHANGED');
	}

	renderNav = () => {
		if (!this.props.currentInfo) {
			return navWithoutInput.map(e => {
				return (
					<NavLinkRouter
						style={{ color: '#fff', marginLeft: '20px' }}
						activeStyle={{ color: '#fff', textDecoration: 'underline' }}
						to={e.url}
					>
						{/* <NavItem>
							<NavLink

							// active
							> */}
						{e.name}
						{/* </NavLink>
						</NavItem> */}
					</NavLinkRouter>
				);
			});
		} else {
			return navWithInput.map(e => {
				return (
					<NavLinkRouter
						style={{ color: '#fff', marginLeft: '20px' }}
						activeStyle={{ color: '#fff', textDecoration: 'underline' }}
						to={e.url}
					>
						{/* <NavItem> */}
						{/* <NavLink> */}
						{e.name}
						{/* </NavLink> */}
						{/* </NavItem> */}
					</NavLinkRouter>
				);
			});
		}
	};

	render() {
		return (
			<Navbar type='dark' theme='primary' expand='md'>
				<Link to='/'>
					<NavbarBrand href='#'>Eco-Melbourne</NavbarBrand>
				</Link>
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

export default connect(mapStateToProps)(withRouter(Navigation));
