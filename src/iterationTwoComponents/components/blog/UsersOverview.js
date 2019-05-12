import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody } from 'shards-react';
import Chart from '../../utils/chart';

class UsersOverview extends React.Component {
	constructor(props) {
		super(props);

		this.canvasRef = React.createRef();
	}

	state = {
		chartData: this.props.chartData
	};

	componentDidMount() {
		const chartOptions = {
			...{
				responsive: true,
				legend: {
					position: 'top'
				},
				elements: {
					line: {
						// A higher value makes the line look skewed at this ratio.
						tension: 0.3
					},
					point: {
						radius: 0
					}
				},
				scales: {
					xAxes: [
						{
							gridLines: false
						}
					],
					yAxes: [
						{
							ticks: {
								suggestedMax: 5,
								callback(tick) {
									if (tick === 0) {
										return tick;
									}
									// Format the amounts using Ks for thousands.
									return tick > 999 ? `${(tick / 1000).toFixed(1)}K` : tick;
								}
							}
						}
					]
				},
				hover: {
					mode: 'nearest',
					intersect: false
				},
				tooltips: {
					custom: false,
					mode: 'nearest',
					intersect: false
				}
			},
			...this.props.chartOptions
		};

		const BlogUsersOverview = new Chart(this.canvasRef.current, {
			type: 'LineWithLine',
			data: this.state.chartData,
			options: chartOptions
		});

		// They can still be triggered on hover.
		const buoMeta = BlogUsersOverview.getDatasetMeta(0);
		buoMeta.data[0]._model.radius = 0;
		buoMeta.data[
			this.state.chartData.datasets[0].data.length - 1
		]._model.radius = 0;

		// Render the chart.
		BlogUsersOverview.render();
	}

	componentWillReceiveProps(props) {
		var canvas = document.getElementById('canvasId');
		const context = canvas.getContext('2d');

		context.clearRect(0, 0, canvas.width, canvas.height);
		this.setState({ chartData: props.chartData });
		this.componentDidMount();
	}

	render() {
		return (
			<Card small className='h-100'>
				<CardHeader className='border-bottom'>
					<h6 className='m-0'>Your Daily Average Delay Time Prediction </h6>
				</CardHeader>
				<CardBody className='pt-0'>
					<Row className='border-bottom py-2 bg-light'>
						<Col sm='12' className='d-flex mb-2 mb-sm-0'>
							{/* <RangeDatePicker /> */}
							Here's how many minutes you'll be wasting on the road daily
						</Col>
						{/* <Col>
							<Button
								size='sm'
								className='d-flex btn-white ml-auto mr-auto ml-sm-auto mr-sm-0 mt-3 mt-sm-0'
							>
								View Full Report &rarr;
							</Button>
						</Col> */}
					</Row>

					<canvas
						id='canvasId'
						height='160'
						ref={this.canvasRef}
						style={{
							maxWidth: '100% !important'
						}}
					/>
				</CardBody>
			</Card>
		);
	}
}

UsersOverview.propTypes = {
	/**
	 * The component's title.
	 */
	title: PropTypes.string,
	/**
	 * The chart dataset.
	 */
	chartData: PropTypes.object,
	/**
	 * The Chart.js options.
	 */
	chartOptions: PropTypes.object
};

UsersOverview.defaultProps = {
	title: 'Congestion Time Prediction Daily (Mins)',
	chartData: {
		// labels: Array.from(new Array(10), (_, i) => (i === 0 ? 1 : i)),
		labels: [
			'2019',
			'2020',
			'2021',
			'2022',
			'2023',
			'2024',
			'2025',
			'2026',
			'2027',
			'2028',
			'2029',
			'2030'
		],
		datasets: [
			{
				label: 'Time Wasted',
				fill: 'start',
				data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				backgroundColor: 'rgba(0,123,255,0.1)',
				borderColor: 'rgba(0,123,255,1)',
				pointBackgroundColor: '#ffffff',
				pointHoverBackgroundColor: 'rgb(0,123,255)',
				borderWidth: 1.5,
				pointRadius: 0,
				pointHoverRadius: 3
			}
			// ,
			// {
			// 	label: 'Time Wasted',
			// 	fill: 'start',
			// 	data: [25, 26, 28, 30, 31, 32],
			// 	backgroundColor: 'rgba(255,65,105,0.1)',
			// 	borderColor: 'rgba(255,65,105,1)',
			// 	pointBackgroundColor: '#ffffff',
			// 	pointHoverBackgroundColor: 'rgba(255,65,105,1)',
			// 	borderDash: [3, 3],
			// 	borderWidth: 1,
			// 	pointRadius: 0,
			// 	pointHoverRadius: 2,
			// 	pointBorderColor: 'rgba(255,65,105,1)'
			// }
		]
	}
};

export default UsersOverview;
