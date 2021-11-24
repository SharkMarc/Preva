import React from "react";

export default class Datapolicy extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		window.scrollTo({top:0,left: 0, behavior: 'smooth'})

		return (
			<section className="col-12 h-100">
				<h1 className="text-center">Data policy</h1>
			</section>
		);
	}
}