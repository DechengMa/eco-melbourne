import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

const Description = props => {
	return (
		<div style={{ margin: '25px 25px' }}>
			<div className='wrapper' style={{ fontSize: '1.5rem' }}>
				{props.description}
			</div>

			<hr style={{ height: '1px', backgroundColor: '#489e52' }} />
		</div>
	);
};

export default Description;
