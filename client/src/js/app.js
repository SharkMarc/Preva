import React from "react";
import {render} from "react-dom";
import Blog from "./blog";
import Contact from "./contact";
import Nav from "./nav";
import Homepage from "./homepage";
import Login from "./login";

//css
import "../css/style.scss";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: "login",
		};
		this.handlePage = this.handlePage.bind(this);
		this.loginAjax = this.loginAjax.bind(this);
	}

	loginAjax(data) {
		const r = new Request("http://192.168.50.2/marcsblog/", { method: "POST", "body": JSON.stringify(data), cache: "no-cache" });

		fetch(r)
			.then(r => {return r.json();})
			.then(j => this.setState({ page: "homepage" }))
		;
	}

	handlePage(page) {
		this.setState({ page: page });
	}

	render() {
		const navbarBottom =
			<nav className="col-12 mr-0 ml-0 fixed-bottom row bg-dark text-center nav-height">
				<div className="col-3"/>
				<div className="col-2 mt-auto mb-auto">Impressum</div>
				<div className="col-2 mt-auto mb-auto">Datenschutz</div>
				<div className="col-2 mt-auto mb-auto">Kontakt</div>
				<div className="col-3"/>
			</nav>;

		const nav = <Nav handlePage={(p) => this.handlePage(p)}/>;
		const page = this.state.page;

		let html;

		switch (page) {
			case "homepage":
				html = <Homepage/>;
				break;
			case "login":
				html = <Login loginAjax={this.loginAjax}/>;
				break;
			case "blog":
				html = <Blog/>;
				break;
			case "contact":
				html = <Contact handleplage={(p) => this.handlePage(p)}/>;
				break;
			default:
				console.log("Unknown Page Sorry for that :-/ :" + page);
		}
		return (

			<div className="h-100 text-white">
				{nav}
				{html}
				{navbarBottom}
			</div>
		);
	}
}

render(<App/>, document.getElementById("root"));