import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Button } from 'shards-react';
import RangeDatePicker from '../common/RangeDatePicker';

// import RangeDatePicker from '../common/RangeDatePicker';
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
					// xAxis: {
					// 	labels: {
					// 		align: 'right'
					// 	},
					// 	min: 100,
					// 	gridLines: false
					// },
					// xAxes: [
					// 	{
					// 		gridLines: false
					// 	}
					// ],
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
		const { title } = this.props;

		return (
			<Card small className='h-100' style={{ maxHeight: '400px !important' }}>
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
						// height='120'
						ref={this.canvasRef}
						style={{
							// maxWidth: '100% !important',
							maxHeight: '100% !important'
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

export default UsersOverview;
