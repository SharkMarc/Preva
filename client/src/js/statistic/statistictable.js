import React from 'react';
import Red from '../../assets/red.png';
import Green from '../../assets/green.png';
import Orange from '../../assets/orange.png';

export default class StatisticTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			color: '',
		};

		this.handleColor = this.handleColor.bind(this);
		this.handleColorCounter = this.handleColorCounter.bind(this);
	}

	componentDidMount() {
		if (this.props.allLists) {
			document.getElementById("Size").click();
			document.getElementById("Structure").click();
			document.getElementById("Operator").click();
			document.getElementById("Cognitive").click();
			document.getElementById("All").click();
		}
	}

	handleColorCounter(counter, param){
		for (let i = 0; i < param.length; i++) {
			if (!Number(param[i])) {
				counter++;
			}

			if (counter === param.length) {
				this.setState({ color: 'red' });
			} else if (counter) {
				this.setState({ color: 'orange' });
			} else {
				this.setState({ color: 'green' });
			}
		}
	}
	handleColor(id, all, size, structure, operator, cognitive) {
		let counter = 0;

		if (id === 'All') {
			this.handleColorCounter(counter, all);
		}

		if (id === 'Size') {
			this.handleColorCounter(counter, size);
		}

		if (id === 'Structure') {
			this.handleColorCounter(counter, structure);
		}

		if (id === 'Operator') {
			this.handleColorCounter(counter, operator);
		}

		if (id === 'Cognitive') {
			this.handleColorCounter(counter, cognitive);
		}

		this.props.handleSwitch();
	}

	render() {

		const status = this.props.status;
		const name = this.props.name;
		const id = this.props.id;
		const allLists = this.props.allLists;
		const attributes = this.props.attributes;
		const selectedStatistic = this.props.selectedStatistic;
		let noa = Number(allLists['noa'] ? allLists['noa'] : 0).toFixed(2);
		let noac = Number(allLists['noac'] ? allLists['noac'] : 0).toFixed(2);
		let sequenceFlow = Number(allLists['sequenceFlow'] ? allLists['sequenceFlow'] : 0).toFixed(2);
		let cognitiveWeight = Number(allLists['cognitiveWeight'] ? allLists['cognitiveWeight'] : 0).toFixed(2);
		let density = Number(allLists['density'] ? allLists['density'] : 0).toFixed(2);
		let separability = Number(allLists['separability'] ? allLists['separability'] : 0).toFixed(2);
		let sequentiality = Number(allLists['sequentiality'] ? allLists['sequentiality'] : 0).toFixed(2);
		let diameter = Number(allLists['diameter'] ? allLists['diameter'] : 0).toFixed(2);
		let cnc = (sequenceFlow / noac).toFixed(2);
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

		let all = [
			allSize,
			allStructure,
			allOperator,
			cognitiveWeight
		];

		let size = [
			noa,
			noac,
			cnc,
			density,
		];

		let structure = [
			separability,
			sequentiality,
			diameter,
		];

		let operator = [
			maxNestingDepth,
			avgDegreeOfConnectors,
			binaryDecisions,
			controlFlowComplexity,
			concurrency,
		];

		let cognitive = [
			cognitiveWeight,
		];

//      onChange=(id)=> if Switch for liste if false return red else green

		return (
			<div id={id}
				className={selectedStatistic === name ? 'activeStatistic flex-wrap min-height-50' : 'cursor-pointer flex-wrap min-height-50'}
				onClick={() => this.handleColor(id, all, size, structure, operator, cognitive)} key={id}>
				<div className="col-6 my-auto">
					{name}
				</div>
				<div className="col-6 my-auto text-center">
					<img src={this.state.color === 'red' ? Red : this.state.color === 'green' ? Green : Orange} className={'traffic-light'}/>
				</div>
			</div>
		);
	}
}
