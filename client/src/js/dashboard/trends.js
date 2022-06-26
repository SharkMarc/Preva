import React from 'react';
import GaugeChart from 'react-gauge-chart';
import PrevaIcon from '../../assets/preva_icon.png';
import SearchIcon from '../../assets/search_png.png';
import Check from '../../assets/icons8-checkmark-48.png';
import Cross from '../../assets/icons8-cross-mark-48.png';
import DownloadIcon from '../../assets/download.png';
import BackIcon from '../../assets/back.png';
import PDFIcon from '../../assets/pdf.png';

export const Trends = (allLists) => (
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

					<div className="col-12 p-0 text-center">
						{Number(allLists['cognitiveWeight']) === 0 ?
							<img src={BackIcon}/> : Number(allLists['cognitiveWeight']) < 5 ?
								<img src={PDFIcon}/> :
								<img src={DownloadIcon}/>}
					</div>
				</div>
			</div>
		</div>
		<div className="col-lg-6 col-xl-4 col-md-12 p-1 min-height-statistic">
			<div className="card no-border-top border-shadow-statistic  h-100">
				<div className="table min-height-statistic mb-0 flex-wrap">
					<div className="flex-wrap col-12">
						<h5 className="my-auto col-12 p-0">Error probability
							<hr className="w-100"/>
						</h5>
					</div>

					<div className="col-12 p-0 text-center" id={'testing'}>
						{/*potenzieller if else cross*/}
						<img src={Check}/>
						<div>No error is detected.</div>
					</div>
				</div>
			</div>
		</div>
		<div className="col-lg-6 col-xl-4 col-md-12 p-1 min-height-statistic">
			<div className="card no-border-top border-shadow-statistic  h-100">
				<div className="table min-height-statistic mb-0 flex-wrap">
					<div className="flex-wrap col-12">
						<h5 className="my-auto col-12 p-0">Prediction readyness
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
							percent={0.37}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
);