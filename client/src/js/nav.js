import React from "react";
import PrevaIcon from '../assets/preva_icon.png';
import PrevaGif from '../assets/preva.gif'

export default class Nav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<nav className="col-12 mr-0 ml-0 text-center cursor-pointer fixed-top nav-height bg-preva row">
				<div className="mt-auto mb-auto col-3 hover-header"  onClick={() => this.props.handlePage("homepage")}><img src={PrevaIcon} className="icon px-2 py-2"/></div>
				{/*<div className="mt-auto mb-auto col-2 cursor-pointer hover-header" onClick={() => this.props.handlePage("homepage")}>Startseite</div>*/}
				<div className="mt-auto mb-auto col-3 cursor-pointer hover-header" onClick={() => this.props.handlePage("blog")}>Blog</div>
				<div className="mt-auto mb-auto col-3 cursor-pointer hover-header" onClick={() => this.props.handlePage("contact")}>Kontakt</div>
				<div className="mt-auto mb-auto col-3 cursor-pointer hover-header" onClick={() => this.props.handlePage("upload")}>Upload</div>
				{/*<div className="mt-auto mb-auto col-2"><input className="form-control bg-light col-12" type="text" placeholder="Suche" aria-label="Search"*/}
				{/*	onChange={this.props.search} value={this.props.phrase}/></div>*/}
			</nav>
		);
	}
}