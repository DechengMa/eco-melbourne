import React from 'react';
import { Colors } from '../utils/Variables';

const Description = props => {
	return (
		<div style={{ margin: '25px 25px' }}>
			<div style={{ marginLeft: '30px', fontSize: '1.5rem',fontWeight: "300",lineHeight:'1.5' }}>
				{props.description}
			</div>

			<hr style={{ height: '1px', backgroundColor: Colors.mainGreen }} />
		</div>
	);
};

export default Description;
