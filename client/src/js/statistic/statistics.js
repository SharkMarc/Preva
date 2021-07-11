import React from 'react';
import linksHat from '../../assets/links_hat.png';

export default class Statistics extends React.Component {

	render() {
		const text = this.props.text;
		const title = this.props.title;
		const attributes = this.props.attributes;
		const noaAmount = this.props.noa ? this.props.noa : '';
		const noacAmount = noaAmount ? noaAmount + attributes['exclusiveGateway'] : '';

		return (
			<div className="min-height-statistic col-12">
				<h2 className="text-center">
					<b>{title}</b>
				</h2>
				<hr className="mt-0 hr-border"/>
				<div>{text}</div>
				<br/>
				{title === 'Size' ?
					<div>
						<div>Number of ativities (NOA):
							<b>{noaAmount?noaAmount:"0.00"}</b>
						</div>
						<div>Number of activities control-flow elements (NOAC):
							<b>{noacAmount}</b>
						</div>
						<div>Coefficient of Network Complexity (CNC):
							<b>{(attributes['sequenceFlow'] / noacAmount).toFixed(2)}</b>
						</div>
						<div>Density:
							<b>{(attributes['sequenceFlow'] /
								(noacAmount + attributes['startEvent'] + attributes['endEvent'])
								* (noacAmount + attributes['startEvent'] + attributes['endEvent'] - 1)).toFixed(2)}</b>
						</div>
					</div>
					: null}
			</div>
		);
	}

}


