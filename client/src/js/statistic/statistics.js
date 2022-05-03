import React from 'react';

export default class Statistics extends React.Component {

	render() {
		const allLists = this.props.allLists;
		const title = this.props.title;
		const attributes = this.props.attributes;

		let noa = Number(allLists['noa'] ? allLists['noa'] : 0).toFixed(2);
		let noac = Number(allLists['noac'] ? allLists['noac'] : 0).toFixed(2);
		let sequenceFlow = Number(allLists['sequenceFlow'] ? allLists['sequenceFlow'] : 0).toFixed(2);
		let cognitiveWeight = Number(allLists['cognitiveWeight'] ? allLists['cognitiveWeight'] : 0).toFixed(2);
		let density = Number(allLists['density'] ? allLists['density'] : 0).toFixed(2);
		let separability = Number(allLists['separability'] ? allLists['separability'] : 0).toFixed(2);
		let sequentiality = Number(allLists['sequentiality'] ? allLists['sequentiality'] : 0).toFixed(2);
		let diameter = Number(allLists['diameter'] ? allLists['diameter'] : 0).toFixed(2);
		let cnc = (sequenceFlow / noac).toFixed(2);
		let cyclicity = Number(allLists['cyclicity'] ? allLists['cyclicity'] : 0).toFixed(2);
		if (!cyclicity || cyclicity == -1) {
			cyclicity = 0.00;
		}

		let cyclomaticNumber = Number(allLists['sequenceFlow'] ? allLists['sequenceFlow'] - allLists['noac'] + 1 : 0).toFixed(2);
		let maxNestingDepth = Number(allLists['maxNestingDepth'] ? allLists['maxNestingDepth'] : 0).toFixed(2);
		let avgDegreeOfConnectors = Number(allLists['avgDegreeOfConnectors'] ? allLists['avgDegreeOfConnectors'] : 0).toFixed(2);
		let maxDegreeOfConnectors = Number(allLists['maxDegreeOfConnectors'] ? allLists['maxDegreeOfConnectors'] : 0).toFixed(2);
		let binaryDecisions = Number(allLists['binaryDecisions'] ? allLists['binaryDecisions'] : 0).toFixed(2);
		let controlFlowComplexity = Number(allLists['controlFlowComplexity'] ? allLists['controlFlowComplexity'] : 0).toFixed(2);
		let concurrency = Number(allLists['concurrency'] ? allLists['concurrency'] : 0).toFixed(2);

		let allSize = ((Number(noa) + Number(noac) + Number(cnc) + Number(density)) / 4).toFixed(2);
		let allStructure = ((Number(separability) + Number(diameter) + Number(sequentiality)) / 3).toFixed(2);
		let allOperator = ((Number(maxDegreeOfConnectors) + Number(maxNestingDepth) + Number(avgDegreeOfConnectors) +
			Number(binaryDecisions) + Number(concurrency) + Number(controlFlowComplexity)) / 6).toFixed(2);

		let sumUpSize = allLists['noa'] ?
			Number(allLists['noa']) + Number(allLists['noac']) +
			Number(allLists['density']) + Number(attributes['sequenceFlow']) / Number(allLists['noac'])
			: 0;

		let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
		let tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
			return new bootstrap.Tooltip(tooltipTriggerEl);
		});

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
							<div className="amount">
								<span className="cursor-pointer" data-bs-toggle="tooltip" title="test">{'Ø ' + allSize}</span>
							</div>
							<hr/>
						</div>
						<div className="text col-12">Structure:<br/>
							<div className="amount">{'Ø ' + allStructure}</div>
							<hr/>
						</div>
						<div className="text col-12">Operators:<br/>
							<div className="amount">{'Ø ' + allOperator}</div>
							<hr/>
						</div>
						<div className="text col-12">Cognitive weight:<br/>
							<div className="amount">{'Σ ' + cognitiveWeight}</div>
							<hr/>
						</div>
					</div>
					: null}

				{title === 'Size' ?
					<div className="statistics flex-wrap">
						<div className="text col-12">Number of ativities (NOA):<br/>
							<div className="amount">{noa}</div>
							<hr/>
						</div>
						<div className="text col-12">Number of activities control-flow elements (NOAC):<br/>
							<div className="amount">{noac}</div>
							<hr/>
						</div>
						<div className="text col-12">Coefficient of Network Complexity (CNC):<br/>
							<div className="amount">{cnc ? cnc : 0.00}</div>
							<hr/>
						</div>
						<div className="text col-12">
							Density:<br/>
							<div className="amount">{density}</div>
							<hr/>
						</div>
					</div>
					: null}

				{title === 'Structure' ?
					<div className="statistics flex-wrap">
						<div className="text col-12">Cyclicity:<br/>
							<div className="amount">{cyclicity}</div>
							<hr/>
						</div>
						<div className="text col-12">Cyclomatic Number:<br/>
							<div className="amount">{cyclomaticNumber}</div>
							<hr/>
						</div>
						<div className="text col-12">Seperability:<br/>
							<div className="amount">{separability}</div>
							<hr/>
						</div>
						<div className="text col-12">Sequentiality:<br/>
							<div className="amount">{sequentiality}</div>
							<hr/>
						</div>
						<div className="text col-12">Diameter:<br/>
							<div className="amount">{diameter}</div>
							<hr/>
						</div>
					</div>
					: null}

				{title === 'Operator' ?
					<div className="statistics flex-wrap">
						<div className="text col-12">Maximum nesting depth:<br/>
							<div className="amount">{maxNestingDepth}</div>
							<hr/>
						</div>
						<div className="text col-12">Average degree of connectors:<br/>
							<div
								className="amount">{avgDegreeOfConnectors}</div>
							<hr/>
						</div>
						<div className="text col-12">Maximum degree of Connectors:<br/>
							<div
								className="amount">{maxDegreeOfConnectors}</div>
							<hr/>
						</div>
						<div className="text col-12">Binary decissions:<br/>
							<div className="amount">{binaryDecisions}</div>
							<hr/>
						</div>
						<div className="text col-12">Control flow complexity (CFC):<br/>
							<div
								className="amount">{controlFlowComplexity}</div>
							<hr/>
						</div>
						<div className="text col-12">Concurrency:<br/>
							<div className="amount">{concurrency}</div>
							<hr/>
						</div>
					</div>
					: null}

				{title === 'Cognitive' ?
					<div className="statistics flex-wrap">
						<div className="text col-12">Cognitive weigth:<br/>
							<div className="amount">{cognitiveWeight}</div>
							<hr/>
						</div>
					</div>
					: null}
			</div>
		);
	}

}


