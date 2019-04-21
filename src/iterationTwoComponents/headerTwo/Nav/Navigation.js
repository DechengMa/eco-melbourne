import React, { Component } from 'react';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

	render() {
		return (
			<Navbar type='dark' theme='primary' expand='md'>
				<NavbarBrand href='#'>Eco-Melbourne</NavbarBrand>
				<NavbarToggler onClick={this.toggleNavbar} />

				<Collapse open={this.state.collapseOpen} navbar>
					<Nav navbar className='ml-auto'>
						<Link to='/iteration2'>
							<NavItem>
								<NavLink active>Home</NavLink>
							</NavItem>
						</Link>
						<Link to='/iteration2/calculator'>
							<NavItem>
								<NavLink active>Calculator</NavLink>
							</NavItem>
						</Link>
						<Link to='/iteration2/comparison'>
							<NavItem>
								<NavLink active>Comparison</NavLink>
							</NavItem>
						</Link>
					</Nav>
				</Collapse>
			</Navbar>
		);
	}
}

export default Navigation;
