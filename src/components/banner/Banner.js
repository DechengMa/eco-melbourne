import React from 'react';
import bannerImg from '../../resources/img/banner.png';

const Banner = () => {
	return (
		<div>
			<img src={bannerImg} alt='Banner' style={{ width: '100vw' }} />
		</div>
	);
};

export default Banner;
