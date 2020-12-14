import React from 'react';
import linksHat from '../../assets/links_hat.png';

export default class Statistics extends React.Component {

	render() {
		const text = this.props.text;
		const title = this.props.title;
		const attributes = this.props.attributes;

		return (
			<div className="min-height-statistic col-12">
				<h2 className="text-center">
					<b>{title}</b>
				</h2>
				<hr className="mt-0 hr-border"/>
				<div>{text}</div>
				<br/>
				{attributes ?
					<div>
						<div>Example metric "Start event": <b>{attributes['startEvent']}</b></div>
						<div>Example metric "Task": <b>{attributes['task']}</b></div>
						<div>Example metric "Exclusive gateways": <b>{attributes['exclusiveGateway']}</b></div>
						<div>Example metric "End event": <b>{attributes['endEvent']}</b></div>
					</div>
					: null}
			</div>
		);
	}
}


