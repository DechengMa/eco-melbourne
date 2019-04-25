import React from 'react';
import Navigation from './headerTwo/Nav/Navigation';

const index = props => {
	return (
		<>
			<Navigation />
			{props.children}
			{/* <Footer /> */}
		</>
	);
};

export default index;
