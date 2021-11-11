import React from 'react';
import Expand from '../../assets/expand.png';
import Green from '../../assets/green.png';
import Orange from '../../assets/orange.png';
import linksHat from '../../assets/links_hat.png';
//import Red from '../../assets/red.png';
import Red from '../../assets/red.png';

export default class StatisticTable extends React.Component {
	render() {
		const status = this.props.status;
		const name = this.props.name;
		const id = this.props.id;
		const handleSwitch = this.props.handleSwitch;
		const selectedStatistic = this.props.selectedStatistic;

		return (
			<div id={id}
				className={selectedStatistic === name ? 'activeStatistic flex-wrap min-height-50' : 'cursor-pointer flex-wrap min-height-50'}
				onClick={handleSwitch} key={id}>
				<div className="col-6 my-auto">
					{name}
				</div>
				<div className="col-6 my-auto text-center">
					<img src={!status ? Green :(status === 1 ? Orange : Red)} className={'traffic-light'}/>
				</div>
			</div>
		);
	}
}
