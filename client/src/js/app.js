import React from "react";
import {render} from "react-dom";
import Blogadmin from "./blogadmin";
import Bloguser from "./bloguser";
import Contact from "./contact";
import Upload from "./upload";
import Nav from "./nav";
import Homepage from "./homepage";
import Login from "./login";
import Register from "./register";

//css
import "../css/style.scss";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page:        "login",
			username:    null,
			daten:       "",
			error:       "",
			errorNumber: null,
			isAdmin:     null,
			phrase:      "",
			textContent: "test test drei drei vier",
		};
		this.handlePage = this.handlePage.bind(this);
		this.loginAjax = this.loginAjax.bind(this);
		this.registerAjax = this.registerAjax.bind(this);
		this.uploadAjax = this.uploadAjax.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.search = this.search.bind(this);
	}

	search({ target }) {
		this.setState({ phrase: target.value });

		console.log(target.value); // searchbar text
		let object = this.state.textContent; // get your div element using refs

		let searchBarText = target.value;

		if (object.includes(searchBarText) && searchBarText.length > 2) {
			console.log("ist dabei");

			let pos = object.indexOf(searchBarText);
			let res = object.replace(/test/g, searchBarText => (
				<span style={{ color: "red" }}>{searchBarText}</span>
			));

			this.setState({ textContent: res });
//			console.log(object.indexOf(searchBarText));
//			object.replace(searchBarText, <span className="bg-red">searchBarText</span>);
//			object.split(searchBarText);
		} else {
			console.log("the div text doesn't contain search text");
		}

	}

	loginAjax(data) {
		fetch("http://localhost:6318/controller/login.php", {
			method:  "POST",
			headers: { "Content-Type": "application/json" },
			body:    JSON.stringify(data),
			cache:   "no-cache"
		}).then(r => r.json())
			.then((r) => this.handleLogin(r))
			.then(function(r) {})
			.catch(
				err => console.error("Caught error: ", err)
			);
	}

	uploadAjax(file, type){

		var reader = new FileReader();
		reader.onload = function(f) {
			const content=f.target.result;
			console.log(content);
//			var parser = new DOMParser();
//			var doc = parser.parseFromString(content, "application/xml");
//			console.log(doc);
			const data= {
				content:content,
			};
			console.log("data" + data);
			fetch("http://localhost:6318/controller/upload.php", {
				method:  "POST",
				headers: { "Content-Type": "application/json" },
				body:    JSON.stringify(data),
				cache:   "no-cache"
			}).then((data)=>console.log(data));
		};
		reader.readAsDataURL(file);
	}

	registerAjax(data) {
		fetch("http://localhost:6318/controller/register.php", {
			method:  "POST",
			headers: { "Content-Type": "application/json" },
			body:    JSON.stringify(data),
			cache:   "no-cache"
		}).then(r => r.json())
			.then((r) => this.handleLogin(r))
			.then(function(r) {
			})
			.catch(
				err => console.error("Caught error: ", err)
			);

	}

	handleLogin(r) {
		if (r.error === 5) {
			this.handlePage("login");
			this.setState({ error: r.message, errorNumber: r.error, isAdmin: r.isAdmin });
		}
		if (r.error === 1 || r.error === 2 || r.error === 4 || r.error === 6 || r.error === 7) {
			this.setState({ error: r.message, errorNumber: r.error, isAdmin: r.isAdmin });
		}
		if (r.error === 3) {
			this.handlePage("homepage");
			this.setState({ isAdmin: r.isAdmin, username: r.username });

		}
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

		const nav = <Nav handlePage={(p) => this.handlePage(p)} phrase={this.state.phrase} search={this.search}/>;
		const page = this.state.page;
		const isAdmin = this.state.isAdmin;
		let html;

		switch (page) {
			case "homepage": {
				isAdmin !== null ?
					html = <Homepage search={this.search} textContent={this.state.textContent}/> : null;
			}
				break;
			case "login":
				html = <Login handlePage={(p) => this.handlePage(p)} loginAjax={this.loginAjax} errorNumber={this.state.errorNumber}
					errorText={this.state.error}/>;
				break;
			case "blog": {
				isAdmin !== null ?
					(isAdmin ?
						html = <Blogadmin user={this.state.username}/> : html = <Bloguser/>) : null;
			}
				break;
			case "contact": {
				isAdmin !== null ?
					html = <Contact handlePage={(p) => this.handlePage(p)}/> : null;
			}
				break;
			case "upload": {
					html = <Upload handlePage={(p) => this.handlePage(p)} uploadAjax={this.uploadAjax}/>
			}
				break;
			case "register":
				html = <Register handlePage={(p) => this.handlePage(p)} registerAjax={this.registerAjax} errorNumber={this.state.errorNumber}
					errorText={this.state.error}/>;
				break;
			default:
				console.log("Unknown Page Sorry for that :-/ :" + page);
		}
		return (

			<div className="h-100 text-white">
				{page === "login" || page === "register" ?
					null : <div>{nav}</div>
				}

				<div className="h-100">{html}</div>

				{page === "login" || page === "register" ?
					null : <div>
						{navbarBottom}</div>}
			</div>
		);
	}
}

render(<App/>, document.getElementById("root"));