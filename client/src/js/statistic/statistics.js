import React from 'react';

export default class Statistics extends React.Component {

	render() {
		const allLists = this.props.allLists;
		const title = this.props.title;
		const attributes = this.props.attributes;
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
							<div className="amount">{allLists['noa'] ? allLists['noa'].toFixed(2) : '0.00'}</div>
							<hr/>
						</div>
						<div className="text col-12">Structure:<br/>
							<div className="amount">{allLists['noac'] ? allLists['noac'].toFixed(2) : '0.00'}</div>
							<hr/>
						</div>
						<div className="text col-12">Operators:<br/>
							<div className="amount">{(attributes['sequenceFlow'] / allLists['noac']).toFixed(2)}</div>
							<hr/>
						</div>
						<div className="text col-12">Cognitive weight:<br/>
							<div className="amount">{allLists['cognitiveWeight'] ? allLists['cognitiveWeight'].toFixed(2) : '0.00'}</div>
							<hr/>
						</div>
					</div>
					: null}

				{title === 'Size' ?
					<div className="statistics flex-wrap">
						<div className="text col-12">Number of ativities (NOA):<br/>
							<div className="amount">{allLists['noa'] ? allLists['noa'].toFixed(2) : '0.00'}</div>
							<hr/>
						</div>
						<div className="text col-12">Number of activities control-flow elements (NOAC):<br/>
							<div className="amount">{allLists['noac'] ? allLists['noac'].toFixed(2) : '0.00'}</div>
							<hr/>
						</div>
						<div className="text col-12">Coefficient of Network Complexity (CNC):<br/>
							<div className="amount">{(attributes['sequenceFlow'] / allLists['noac']).toFixed(2)}</div>
							<hr/>
						</div>
						<div className="text col-12">
							Density:<br/>
							<div className="amount">{allLists['density'] ? allLists['density'].toFixed(2) : '0.00'}</div>
							<hr/>
						</div>
					</div>
					: null}

				{title === 'Structure' ?
					<div className="statistics flex-wrap">
						<div className="text col-12">Seperability:<br/>
							<div className="amount">{allLists['separability'] ? allLists['separability'].toFixed(2) : '0.00'}</div>
							<hr/>
						</div>
						<div className="text col-12">Sequentiality:<br/>
							<div className="amount">{allLists['sequentiality'] ? allLists['sequentiality'].toFixed(2) : '0.00'}</div>
							<hr/>
						</div>
						<div className="text col-12">Diameter:<br/>
							<div className="amount">{allLists['diameter'] ? allLists['diameter'].toFixed(2) : '0.00'}</div>
							<hr/>
						</div>
					</div>
					: null}

				{title === 'Operator' ?
					<div className="statistics flex-wrap">
						<div className="text col-12">Maximum nesting depth:<br/>
							<div className="amount">{allLists['maxNestingDepth'] ? allLists['maxNestingDepth'].toFixed(2) : '0.00'}</div>
							<hr/>
						</div>
						<div className="text col-12">Average degree of connectors:<br/>
							<div
								className="amount">{allLists['avgDegreeOfConnectors'] ? allLists['avgDegreeOfConnectors'].toFixed(2) : '0.00'}</div>
							<hr/>
						</div>
						<div className="text col-12">Maximum degree of Connectors:<br/>
							<div
								className="amount">{allLists['maxDegreeOfConnectors'] ? allLists['maxDegreeOfConnectors'].toFixed(2) : '0.00'}</div>
							<hr/>
						</div>
						<div className="text col-12">Binary decissions:<br/>
							<div className="amount">{allLists['binaryDecisions'] ? allLists['binaryDecisions'].toFixed(2) : '0.00'}</div>
							<hr/>
						</div>
						<div className="text col-12">Control flow complexity (CFC):<br/>
							<div
								className="amount">{allLists['controlFlowComplexity'] ? allLists['controlFlowComplexity'].toFixed(2) : '0.00'}</div>
							<hr/>
						</div>
						<div className="text col-12">Concurrency:<br/>
							<div className="amount">{allLists['concurrency'] ? allLists['concurrency'].toFixed(2) : '0.00'}</div>
							<hr/>
						</div>
					</div>
					: null}

				{title === 'Cognitive' ?
					<div className="statistics flex-wrap">
						<div className="text col-12">Cognitive weigth:<br/>
							<div className="amount">{allLists['cognitiveWeight'] ? allLists['cognitiveWeight'].toFixed(2) : '0.00'}</div>
							<hr/>
						</div>
					</div>
					: null}
			</div>
		);
	}

}


