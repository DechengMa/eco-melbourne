import React from 'react';
import Navigation from './headerTwo/Nav/Navigation';

const index = props => {
	return (
		<div>
			<Navigation />
			{props.children}
			{/* <Footer /> */}
		</div>
	);
};

export default index;
