import React from "react";

export default class Nav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<nav className="col-12 mr-0 ml-0 text-center cursor-pointer fixed-top nav-height bg-success row">
				<div className="mt-auto mb-auto col-2"><img src="../assets/links_hat.png"/><img src="../assets/hyrule.jpg"/></div>
				<div className="mt-auto mb-auto col-2 cursor-pointer" onClick={() => this.props.handlePage("homepage")}>Startseite</div>
				<div className="mt-auto mb-auto col-2 cursor-pointer" onClick={() => this.props.handlePage("blog")}>Blog</div>
				<div className="mt-auto mb-auto col-2 cursor-pointer" onClick={() => this.props.handlePage("contact")}>twitch :></div>
				<div className="mt-auto mb-auto col-4">Suchen</div>
			</nav>
		);
	}
}