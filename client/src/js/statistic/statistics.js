import React from 'react';

export default class Statistics extends React.Component {

	render() {
		const allLists = this.props.allLists;
		const text = this.props.text;
		const title = this.props.title;
		const attributes = this.props.attributes;
		const noaAmount = allLists["noa"] ? allLists["noa"] : '';
//		onClick={() => this.handlePage('product', true)}
		const handlePage = this.props.handlePage;
		return (

			<div className="min-height-statistic col-12">
				<h3>
					<b>{title}</b>
					<hr/>
				</h3>
				<br/>

				{title === 'All' ?
					<div className="statistics flex-wrap">
						<div className="text col-12">Size:<br/>
							<div className="amount">{allLists["noa"] ? allLists["noa"] : '0.00'}</div>
							<hr/>
						</div>
						<div className="text col-12">Structure:<br/>
							<div className="amount">{allLists["noac"]}</div>
							<hr/>
						</div>
						<div className="text col-12">Operators:<br/>
							<div className="amount">{(attributes['sequenceFlow'] / allLists["noac"]).toFixed(2)}</div>
							<hr/>
						</div>
						<div className="text col-12">
							Cycle:<br/>
							<div className="amount">{allLists["cyclicity"].toFixed(2)}</div>
							<hr/>
						</div>
						<div className="text col-12">Cognitive weight:<br/>
							<div className="amount">{allLists["cognitiveWeight"].toFixed(2)}</div>
							<hr/>
						</div>
					</div>
					: null}

				{title === 'Size' ?
					<div className="statistics flex-wrap">
						<div className="text col-12">Number of ativities (NOA):<br/>
							<div className="amount">{noaAmount ? noaAmount : '0.00'}</div>
							<hr/>
						</div>
						<div className="text col-12">Number of activities control-flow elements (NOAC):<br/>
							<div className="amount">{allLists["noac"]}</div>
							<hr/>
						</div>
						<div className="text col-12">Coefficient of Network Complexity (CNC):<br/>
							<div className="amount">{(attributes['sequenceFlow'] / allLists["noac"]).toFixed(2)}</div>
							<hr/>
						</div>
						<div className="text col-12">
							Density:<br/>
							<div className="amount">{(attributes['sequenceFlow'] /
								(allLists["noac"] + attributes['startEvent'] + attributes['endEvent'])
								* (allLists["noac"] + attributes['startEvent'] + attributes['endEvent'] - 1)).toFixed(2)}</div>
							<hr/>
						</div>
					</div>
					: null}

				{title === 'Structure' ?
					<div className="statistics flex-wrap">
						<div className="text col-12">Seperability:<br/>
							<div className="amount">{noaAmount ? noaAmount : '0.00'}</div>
							<hr/>
						</div>
						<div className="text col-12">Sequentiality:<br/>
							<div className="amount">{allLists["noac"]}</div>
							<hr/>
						</div>
						<div className="text col-12">Diameter:<br/>
							<div className="amount">{(attributes['sequenceFlow'] / allLists["noac"]).toFixed(2)}</div>
							<hr/>
						</div>
					</div>
					: null}

				{title === 'Operator' ?
					<div className="statistics flex-wrap">
						<div className="text col-12">Maximum nesting depth:<br/>
							<div className="amount">{noaAmount ? noaAmount : '0.00'}</div>
							<hr/>
						</div>
						<div className="text col-12">Average degree of connectors:<br/>
							<div className="amount">{allLists["noac"]}</div>
							<hr/>
						</div>
						<div className="text col-12">Maximum degree of Connectors:<br/>
							<div className="amount">{(attributes['sequenceFlow'] / allLists["noac"]).toFixed(2)}</div>
							<hr/>
						</div>
						<div className="text col-12">Binary decissions:<br/>
							<div className="amount">{(attributes['sequenceFlow'] / allLists["noac"]).toFixed(2)}</div>
							<hr/>
						</div>
						<div className="text col-12">Control flow complexity (CFC):<br/>
							<div className="amount">{(attributes['sequenceFlow'] / allLists["noac"]).toFixed(2)}</div>
							<hr/>
						</div>
						<div className="text col-12">Concurrency:<br/>
							<div className="amount">{(attributes['sequenceFlow'] / allLists["noac"]).toFixed(2)}</div>
							<hr/>
						</div>
					</div>
					: null}

				{title === 'Cycle' ?
					<div className="statistics flex-wrap">
						<div className="text col-12">Cyclicity:<br/>
							<div className="amount">{noaAmount ? noaAmount : '0.00'}</div>
							<hr/>
						</div>
						<div className="text col-12">Cyclomatic Number:<br/>
							<div className="amount">{allLists["noac"]}</div>
							<hr/>
						</div>
					</div>
					: null}

				{title === 'Cognitive' ?
					<div className="statistics flex-wrap">
						<div className="text col-12">Cognitive weigth:<br/>
							<div className="amount">{noaAmount ? noaAmount : '0.00'}</div>
							<hr/>
						</div>
					</div>
					: null}
			</div>
		);
	}

}


