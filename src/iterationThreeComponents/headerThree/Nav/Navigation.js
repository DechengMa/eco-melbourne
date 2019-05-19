import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Collapse
} from 'shards-react';
import { Link } from 'react-router-dom';

const navWithInput = [
	{
		url: '/',
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
		url: '/iteration3/future',
		name: 'Explore'
	}
];
const navWithoutInput = [
	{
		url: '/',
		name: 'Home'
	},
	{
		url: '/iteration3/explore',
		name: 'Explore'
	}
];

class Navigation extends Component {
	constructor(props) {
		super(props);

		this.toggleDropdown = this.toggleDropdown.bind(this);
		this.toggleNavbar = this.toggleNavbar.bind(this);

		this.state = {
			dropdownOpen: false,
			collapseOpen: false
		};
	}

	toggleDropdown() {
		this.setState({
			...this.state,
			...{
				dropdownOpen: !this.state.dropdownOpen
			}
		});
	}

	toggleNavbar() {
		this.setState({
			...this.state,
			...{
				collapseOpen: !this.state.collapseOpen
			}
		});
	}

	renderNav = () => {
		if (!this.props.currentInfo) {
			return navWithoutInput.map(e => {
				return (
					<Link to={e.url}>
						<NavItem>
							<NavLink active>{e.name}</NavLink>
						</NavItem>
					</Link>
				);
			});
		} else {
			return navWithInput.map(e => {
				return (
					<Link to={e.url}>
						<NavItem>
							<NavLink active>{e.name}</NavLink>
						</NavItem>
					</Link>
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

export default connect(mapStateToProps)(Navigation);
