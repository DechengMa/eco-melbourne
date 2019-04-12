import React from 'react';
import AnimatedNumber from 'react-animated-number';

export const AnimatedNum = props => {
	return (
		<React.Fragment>
			<AnimatedNumber
				style={{
					transition: '0.8s ease-out',
					fontSize: 48,
					transitionProperty: 'background-color, color, opacity',
					color: props.color
				}}
				frameStyle={perc => (perc === 100 ? {} : { opacity: 0.25 })}
				duration={300}
				value={props.value}
			/>
			<span style={{ fontSize: 26 }}>{props.units}</span>
		</React.Fragment>
	);
};
