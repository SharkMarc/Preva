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
	}

	handleColor(id, all, size, structure, operator, cognitive) {
		console.log(id);

		let counter = 0;

		if (id === 'All') {

			for (let i = 0; i < all.length; i++) {
				if (!all[i]) {
					counter++;
				}

				if (counter === all.length) {
					this.setState({ color: 'red' });
				} else if (counter) {
					this.setState({ color: 'orange' });
				} else {
					this.setState({ color: 'green' });
				}
			}
		}
		if (id === 'Size') {
			for (let i = 0; i < size.length; i++) {
				if (!size[i]) {
					counter++;
				}

				if (counter === size.length) {
					this.setState({ color: 'red' });
				} else if (counter) {
					this.setState({ color: 'orange' });
				} else {
					this.setState({ color: 'green' });
				}
			}
		}
		if (id === 'Structure') {
			for (let i = 0; i < structure.length; i++) {
				if (!structure[i]) {
					counter++;
				}

				if (counter === structure.length) {
					this.setState({ color: 'red' });
				} else if (counter) {
					this.setState({ color: 'orange' });
				} else {
					this.setState({ color: 'green' });
				}
			}
		}

		if (id === 'Operator') {
			for (let i = 0; i < operator.length; i++) {
				if (!operator[i]) {
					counter++;
				}

				if (counter === operator.length) {
					this.setState({ color: 'red' });
				} else if (counter) {
					this.setState({ color: 'orange' });
				} else {
					this.setState({ color: 'green' });
				}
			}
		}

		if (id === 'Cognitive') {
			for (let i = 0; i < cognitive.length; i++) {
				if (!cognitive[i]) {
					counter++;
				}

				if (counter === cognitive.length) {
					this.setState({ color: 'red' });
				} else if (counter) {
					this.setState({ color: 'orange' });
				} else {
					this.setState({ color: 'green' });
				}

			}
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

		let all = [
			allLists['noa'],
			allLists['noac'],
			allLists['sequenceFlow'],
			attributes['sequenceFlow'],
			allLists['cognitiveWeight']
		];

		let size = [
			allLists['noa'],
			allLists['noac'],
			attributes['sequenceFlow'],
			allLists['density'],
		];

		let structure = [
			allLists['separability'],
			allLists['sequentiality'],
			allLists['diameter'],
		];

		let operator = [
			allLists['maxNestingDepth'],
			allLists['avgDegreeOfConnectors'],
			allLists['binaryDecisions'],
			allLists['controlFlowComplexity'],
			allLists['concurrency'],
		];

		let cognitive = [
			allLists['cognitiveWeight'],
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
