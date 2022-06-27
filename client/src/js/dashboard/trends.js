import React from 'react';
import GaugeChart from 'react-gauge-chart';
import Check from '../../assets/icons8-checkmark-48.png';
import SmileyHappy from '../../assets/smileyHappy.png';
import SmileyOk from '../../assets/smileyOk.png';
import SmileySad from '../../assets/smileySad.png';

export const Trends = (cognitiveWeight) => {
	let cognitiveNumber = Object.values(cognitiveWeight);
	cognitiveNumber=cognitiveNumber[0]

	return (
		<div className={'flex-wrap show-trend w-100 '}>
			<div className="col-lg-6 col-xl-4 col-md-12 p-1 min-height-statistic">
				<div className="card no-border-top border-shadow-statistic">
					<div className="row min-height-statistic">
						<div className="col-12">
							<h5 className="text-center p-2">
								Understandability
								<hr className="w-100"/>
							</h5>
						</div>

						<div className="col-12 p-0 text-center">
							{cognitiveNumber === 0 ?
								<img src={SmileySad} style={{ height: '64px', marginRight: '8px' }}/> :
								<img src={SmileySad} style={{ height: '64px', marginRight: '8px', opacity: 0.2 }}/>}

							{cognitiveNumber > 0 && cognitiveNumber <= 5 ?
								<img src={SmileyOk} style={{ height: '64px', marginRight: '8px' }}/> :
								<img src={SmileyOk} style={{ height: '64px', marginRight: '8px', opacity: 0.2 }}/>
							}
							{cognitiveNumber > 5 ?
								<img src={SmileyHappy} style={{ height: '64px' }}/> :
								<img src={SmileyHappy} style={{ height: '64px', opacity: 0.2 }}/>}
						</div>
					</div>
				</div>
			</div>
			<div className="col-lg-6 col-xl-4 col-md-12 p-1 min-height-statistic">
				<div className="card no-border-top border-shadow-statistic">
					<div className="row min-height-statistic">
						<div className="col-12">
							<h5 className="text-center p-2">Error probability
								<hr className="w-100"/>
							</h5>
						</div>

						<div className="col-12 p-0 text-center" id={'testing'}>
							{/*potenzieller if else cross*/}
							<img src={Check} style={{ height: '64px', marginBottom:"8px" }}/>
							<div>No error is detected.</div>
						</div>
					</div>
				</div>
			</div>
			<div className="col-lg-6 col-xl-4 col-md-12 p-1 min-height-statistic">
				<div className="card no-border-top border-shadow-statistic">
					<div className="row min-height-statistic">
						<div className="col-12">
							<h5 className="text-center p-2">Prediction readyness
								<hr className="w-100"/>
							</h5>
						</div>

						<div className="col-12 p-0">
							<GaugeChart id="gauge-chart3" className="gauge-chart"
								nrOfLevels={3}
								needleColor={'#000'}
								textColor={'#0045c6'}
								colors={['#fa595f', '#21cda4']}
								arcWidth={0.3}
								percent={0.67}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
