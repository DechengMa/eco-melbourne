import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Grid } from '@material-ui/core';

const styles = theme => ({
	nav: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'block'
		}
	}
});

const FooterThree = ({ copyright }) => (
	<footer className='bg-white border-top'>
		<Grid container direction='row' justify='space-around' alignItems='center'>
			<Grid item md={9} xs={12}>
				<p style={{ margin: '20px' }}>
					All the information on this website - www.ecomelbourne.com - is
					published in good faith and for general information purpose only.
					ecomelbourne does not make any warranties about the completeness,
					reliability and accuracy of this information. Any action you take upon
					the information you find on this website (ecomelbourne), is strictly
					at your own risk. ecomelbourne will not be liable for any losses
					and/or damages in connection with the use of our website.
				</p>
			</Grid>
			<Grid
				style={{ textAlign: 'center', marginBottom: '20px' }}
				item
				md={3}
				xs={12}
			>
				<span className='copyright ml-auto my-auto mr-2'>{copyright}</span>
			</Grid>
		</Grid>
	</footer>
);

FooterThree.propTypes = {
	/**
	 * Whether the content is contained, or not.
	 */
	contained: PropTypes.bool,
	/**
	 * The menu items array.
	 */
	menuItems: PropTypes.array,
	/**
	 * The copyright info.
	 */
	copyright: PropTypes.string
};

FooterThree.defaultProps = {
	contained: false,
	copyright: 'Copyright © 2019 Star Tech',
	menuItems: [
		{
			title: 'Home',
			to: '/'
		}
	]
};

export default withStyles(styles)(FooterThree);
