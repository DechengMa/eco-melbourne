import React, { Component } from 'react';
import header from '../../resources/img/header.JPG';
import QuestionBox from './QuestionBox.js';
import Grid from '@material-ui/core/Grid';
import withWidth from '@material-ui/core/withWidth';

class index extends Component {
	renderQuestionBox = () => {
		console.log(this.props.width);
		var containerStyle = {
			height: '100%'
		};
		var bgStyle = {
			width: '100vw',
			height: 'calc(100vh - 65px)',
			backgroundImage: `url(${header})`,
			// backgroundImage: `url(https://images.pexels.com/photos/310983/pexels-photo-310983.jpeg?cs=srgb&dl=action-adult-athletes-310983.jpg&fm=jpg)`,
			backgroundSize: 'cover',
			position: 'relative'
		};

		return (
			<div style={bgStyle}>
				<Grid container style={containerStyle} alignItems='center'>
					<Grid item xs={1} md={2} />
					<Grid item xs={8} md={4}>
						<QuestionBox />
					</Grid>
				</Grid>
			</div>
		);
	};

	render() {
		return <>{this.renderQuestionBox()}</>;
	}
}

export default withWidth()(index);
