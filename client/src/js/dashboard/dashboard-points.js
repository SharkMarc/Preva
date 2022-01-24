import React from 'react';
import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFusioncharts from 'react-fusioncharts';
import GaugeChart from 'react-gauge-chart'

export const ProcessModel = (props) => (
	<div className="show-processModel d-none w-100">
		<section id="bpmn" style={{ width: '100%', height: 500, backgroundColor: 'white' }}/>
	</div>
);

export default class Trends extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
	}

	render() {


		return (
			<div className="flex-wrap show-trend w-100 d-none">
				<div className="col-lg-6 col-xl-4 col-md-12 p-1 min-height-statistic">
					<div className="card no-border-top border-shadow-statistic">
						<div className="table min-height-statistic mb-0 flex-wrap">
							<div id="Categories" className="flex-wrap col-12">
								<h5 className="my-auto p-0">
									Understandability
									<hr className="w-100"/>
								</h5>
							</div>

							<div className="col-12 p-0">
								<GaugeChart id="gauge-chart1"
									nrOfLevels={15}
									colors={["#fa595f", "#21cda4"]}
									arcWidth={0.3}
									percent={0.37}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-6 col-xl-4 col-md-12 p-1 min-height-statistic">
					<div className="card no-border-top border-shadow-statistic">
						<div className="table min-height-statistic mb-0 flex-wrap">
							<div id="Categories" className="flex-wrap col-12">
								<h5 className="my-auto col-6 p-0">test
									<hr className="w-100"/>
								</h5>
								<h5 className="my-auto col-6 p-0 text-center">test
									<hr className="w-100"/>
								</h5>
							</div>

							<div className="col-12 p-0">

							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-6 col-xl-4 col-md-12 p-1 min-height-statistic">
					<div className="card no-border-top border-shadow-statistic">
						<div className="table min-height-statistic mb-0 flex-wrap">
							<div id="Categories" className="flex-wrap col-12">
								<h5 className="my-auto col-6 p-0">test
									<hr className="w-100"/>
								</h5>
								<h5 className="my-auto col-6 p-0 text-center">test
									<hr className="w-100"/>
								</h5>
							</div>

							<div className="col-12 p-0">
								{/*<hr className="category-hr"/>*/}
								test
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}}