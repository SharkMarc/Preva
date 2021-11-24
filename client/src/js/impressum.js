import React from "react";

export default class Homepage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		window.scrollTo({top:0,left: 0, behavior: 'smooth'})

		return (
			<div className="col-12 h-100">

			Owner: <br/>
			Florian Spree, Marc Spree
			</div>
		);
	}
}