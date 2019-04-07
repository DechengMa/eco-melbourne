import React from 'react';
import { Colors } from '../utils/Variables';

const Description = props => {
	return (
		<div style={{ margin: '25px 25px' }}>
			<div className='wrapper' style={{ fontSize: '1.5rem' }}>
				{props.description}
			</div>

			<hr style={{ height: '1px', backgroundColor: Colors.mainGreen }} />
		</div>
	);
};

export default Description;
