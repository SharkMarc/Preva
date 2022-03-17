import React from 'react';
import GaugeChart from 'react-gauge-chart';

export const Trends = (props) => (
	<div className={'flex-wrap show-trend w-100 '}>
		<div className="col-lg-6 col-xl-4 col-md-12 p-1 min-height-statistic">
			<div className="card no-border-top border-shadow-statistic h-100">
				<div className="table min-height-statistic mb-0 flex-wrap">
					<div className="flex-wrap col-12">
						<h5 className="my-auto p-0">
							Understandability
							<hr className="w-100"/>
						</h5>
					</div>


					<div className="col-12 p-0">
						<GaugeChart id="gauge-chart3" className="gauge-chart"
							nrOfLevels={3}
							needleColor={'#000'}
							textColor={'#0045C6'}
							colors={['#fa595f', '#21cda4']}
							arcWidth={0.3}
							percent={0.37}
						/>
					</div>
				</div>
			</div>
		</div>
		<div className="col-lg-6 col-xl-4 col-md-12 p-1 min-height-statistic">
			<div className="card no-border-top border-shadow-statistic  h-100">
				<div className="table min-height-statistic mb-0 flex-wrap">
					<div className="flex-wrap col-12">
						<h5 className="my-auto col-12 p-0">test
							<hr className="w-100"/>
						</h5>
					</div>

					<div className="col-12 p-0" id={'testing'}>
						<GaugeChart id="gauge-chart3"
							nrOfLevels={3}
							colors={['#fa595f', '#21cda4']}
							arcWidth={0.3}
							percent={0.37}
						/>
					</div>
				</div>
			</div>
		</div>
		<div className="col-lg-6 col-xl-4 col-md-12 p-1 min-height-statistic">
			<div className="card no-border-top border-shadow-statistic  h-100">
				<div className="table min-height-statistic mb-0 flex-wrap">
					<div className="flex-wrap col-12">
						<h5 className="my-auto col-12 p-0">test3
							<hr className="w-100"/>
						</h5>
					</div>

					<div className="col-12 p-0">
						<GaugeChart id="gauge-chart5"
							nrOfLevels={3}
							colors={['#fa595f', '#21cda4']}
							arcWidth={0.3}
							percent={0.37}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
);