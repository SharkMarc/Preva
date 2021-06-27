import React from 'react';
import {render} from 'react-dom';
import Blogadmin from './blogadmin';
import Bloguser from './bloguser';
import Contact from './contact';
import Upload from './upload';
import Nav from './nav';
import Homepage from './homepage';
import Impressum from './impressum';
import Login from './login';
import Register from './register';

//css
import '../css/style.scss';
import BurgerNav from '../assets/burger-nav.png';
import PrevaGif from '../assets/preva.gif';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page:          'upload',
			username:      null,
			daten:         '',
			error:         '',
			errorNumber:   null,
			isAdmin:       null,
			phrase:        '',
			status:        '',
			statisticPage: false,
			textContent:   'test test drei drei vier',
		};
		this.handlePage = this.handlePage.bind(this);
		this.loginAjax = this.loginAjax.bind(this);
		this.registerAjax = this.registerAjax.bind(this);
		this.uploadAjax = this.uploadAjax.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.search = this.search.bind(this);
		this.handleStartPage = this.handleStartPage.bind(this);
		this.handleBackToUpload = this.handleBackToUpload.bind(this);
		this.handleStatisticPage = this.handleStatisticPage.bind(this);
		this.handleSidebar = this.handleSidebar.bind(this);
	}

	handleSidebar(e) {
		let id = document.getElementById('sidebar');
		if (id.classList.contains('slide-in')) {
			id.classList.remove('slide-in');
			id.classList.add('slide-out');

		} else {
			id.classList.add('slide-in');
			id.classList.remove('slide-out');
			id.classList.remove('d-none');

		}
//	document.getElementById("sidebar").classList.toggle("d-none");
	}

	search({ target }) {
		this.setState({ phrase: target.value });

		console.log(target.value); // searchbar text
		let object = this.state.textContent; // get your div element using refs

		let searchBarText = target.value;

		if (object.includes(searchBarText) && searchBarText.length > 2) {
			console.log('ist dabei');

			let res = object.replace(/test/g, searchBarText => (
				<span style={{ color: 'red' }}>{searchBarText}</span>
			));

			this.setState({ textContent: res });
		} else {
			console.log('the div text doesn\'t contain search text');
		}

	}

	handleBackToUpload(statisticPage) {
		this.setState({ statisticPage: !statisticPage });
	}

	loginAjax(data) {
		fetch(Route.login, {
			method:  'POST',
			headers: { 'Content-Type': 'application/json' },
			body:    JSON.stringify(data),
			cache:   'no-cache'
		}).then(r => r.json())
			.then((r) => this.handleLogin(r))
			.then(function(r) {})
			.catch(
				err => console.error('Caught error: ', err)
			);
	}

	uploadAjax(file, type) {
		var reader = new FileReader();
		reader.onload = function(f) {
			const content = f.target.result;
			const data = {
				content: content,
			};
			fetch(Route.upload, {
				method:  'POST',
				headers: { 'Content-Type': 'application/json' },
				body:    JSON.stringify(data),
				cache:   'no-cache'
			}).then(data => data.json());
		};
		reader.readAsDataURL(file);
	}

	registerAjax(data) {
		fetch(Route.register, {
			method:  'POST',
			headers: { 'Content-Type': 'application/json' },
			body:    JSON.stringify(data),
			cache:   'no-cache'
		}).then(r => r.json())
			.then((r) => this.handleLogin(r))
			.then(function(r) {
			})
			.catch(
				err => console.error('Caught error: ', err)
			);
	}

	handleLogin(r) {
		if (r.error === 5) {
			this.handlePage('login');
			this.setState({ error: r.message, errorNumber: r.error, isAdmin: r.isAdmin });
		}
		if (r.error === 1 || r.error === 2 || r.error === 4 || r.error === 6 || r.error === 7) {
			this.setState({ error: r.message, errorNumber: r.error, isAdmin: r.isAdmin });
		}
		if (r.error === 3) {
			this.handlePage('homepage');
			this.setState({ isAdmin: r.isAdmin, username: r.username });

		}
	}

	handlePage(page) {
		console.log(page);
		this.setState({ page: page });
	}

	handleStatisticPage() {
		this.setState({ statisticPage: true });
	}

	handleStartPage() {
		this.setState({ page: 'upload', statisticPage: false });
	}

	render() {
		const navbarBottom =
			<nav className="footer col-12 mr-0 ml-0 d-flex text-center nav-height">
				<div className="col-lg-3"/>
				<div className="col-md-4 col-lg-2 mt-auto mb-auto cursor-pointer hover-header" onClick={() => this.handlePage('impressum')}>Impressum</div>
				<div className="col-md-4 col-lg-2 mt-auto mb-auto cursor-pointer hover-header">Datenschutz</div>
				<div className="col-md-4 col-lg-2 mt-auto mb-auto cursor-pointer hover-header">Kontakt</div>
				<div className="col-lg-3"/>
			</nav>;

		const header =
			<div className="d-flex col-12 header">
				<div className='col-lg-1 col-md-2 my-auto' onClick={() => this.handleSidebar()}>
					<img src={BurgerNav} className={'burger-nav'}/>
				</div>
				<div className='col-10 d-flex border-right-left justify-content-center'
					onClick={() => this.props.handleStartPage()}>
					<img src={PrevaGif} className="preva-icon" alt={'preva'}/>
					<h1 className={'header-preva'}>Preva</h1>
				</div>
			</div>;

		const nav = <Nav handlePage={(p) => this.handlePage(p)} phrase={this.state.phrase} search={this.search}/>;
		const page = this.state.page;
		const isAdmin = this.state.isAdmin;
		let html;

		switch (page) {
			case 'homepage': {
				isAdmin !== null ?
					html = <Homepage search={this.search} textContent={this.state.textContent}/> : null;
			}
				break;

			case 'impressum': {
					html = <Impressum
						handleBackToUpload={(e) => this.handleBackToUpload(e)}
						status={this.status}
						statisticPage={this.state.statisticPage}
						handleStartPage={() => this.handleStartPage()}
						handlePage={(p) => this.handlePage(p)}
						handleStatisticPage={() => this.handleStatisticPage()}
						uploadAjax={(d, p) => this.uploadAjax(d, p)}/>;

			}
				break;
			case 'login':
				html = <Login handlePage={(p) => this.handlePage(p)} loginAjax={this.loginAjax} errorNumber={this.state.errorNumber}
					errorText={this.state.error}/>;
				break;
			case 'blog': {
				isAdmin !== null ?
					(isAdmin ?
						html = <Blogadmin user={this.state.username}/> : html = <Bloguser/>) : null;
			}
				break;
			case 'contact': {
				isAdmin !== null ?
					html = <Contact handlePage={(p) => this.handlePage(p)}/> : null;
			}
				break;
			case 'upload': {
				html = <Upload
					handleBackToUpload={(e) => this.handleBackToUpload(e)}
					status={this.status}
					statisticPage={this.state.statisticPage}
					handleStartPage={() => this.handleStartPage()}
					handlePage={(p) => this.handlePage(p)}
					handleStatisticPage={() => this.handleStatisticPage()}
					uploadAjax={(d, p) => this.uploadAjax(d, p)}/>;
			}
				break;
			case 'register':
				html = <Register handlePage={(p) => this.handlePage(p)} registerAjax={this.registerAjax} errorNumber={this.state.errorNumber}
					errorText={this.state.error}/>;
				break;
			default:
				console.log('Unknown Page Sorry for that :-/ :' + page);
		}
		return (

			<div className="h-100">
				{header}
				{/*{page === "login" || page === "register" ?*/}
				{/*	null : <div>{nav}</div>*/}
				{/*}*/}

				{html}

				{navbarBottom}
			</div>
		);
	}
}

render(<App/>, document.getElementById('root'));