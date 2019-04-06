import React from 'react';
import { Drawer, List, ListItem } from '@material-ui/core';
import { scroller } from 'react-scroll';

const SideDrawer = props => {
	const scrollToElement = element => {
		scroller.scrollTo(element, {
			duration: 1500,
			delay: 100,
			smooth: true,
			offset: -130
		});

		props.onClose(false);
	};

	return (
		<Drawer anchor='right' open={props.open} onClose={() => props.onClose()}>
			<List>
				<ListItem button onClick={() => scrollToElement('dataVisual')}>
					See what is happening now
				</ListItem>
				<ListItem button onClick={() => scrollToElement('calculator')}>
					Calculator
				</ListItem>
			</List>
		</Drawer>
	);
};

export default SideDrawer;
