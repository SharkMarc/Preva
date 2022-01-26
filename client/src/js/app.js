import React from 'react';
import {render} from 'react-dom';
import Blogadmin from './blogadmin';
import Bloguser from './bloguser';
import Contact from './contact';
import Upload from './upload';
import Nav from './nav';
import Homepage from './homepage';
import Impressum from './impressum';
import DataPolicy from './data-policy';
import AboutUs from './aboutus';
import Product from './product';
import Login from './login';
import Register from './register';
import Motivation from './motivation';

//css
import '../css/style.scss';
import BurgerNav from '../assets/burger-nav.png';
import PrevaGif from '../assets/preva.gif';
import WIP from '../assets/MarthaMitHelm.png';

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
			backdrop:      false,
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

	handleSidebar(fixed) {
		let id = document.getElementById('sidebar');
		if (window.innerWidth < 992) {
			if (id.classList.contains('slide-in')) {
				id.classList.remove('slide-in');
				id.classList.add('slide-out');
				document.getElementById('navbarBackdrop').classList.remove('showing');

				if (document.querySelector('body').classList.contains('overflow-hidden')) {
					document.querySelector('body').classList.remove('overflow-hidden');
				}

				this.setState({ backdrop: false });
			} else {
				id.classList.add('slide-in');
				id.classList.remove('slide-out');
				id.classList.remove('d-none');
				document.getElementById('navbarBackdrop').classList.add('showing');

				if (fixed) {
					document.querySelector('body').classList.add('overflow-hidden');
				}

				this.setState({ backdrop: true });
			}
		}
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
		return new Promise(function(resolve, reject) {
			var reader = new FileReader();
			reader.onload = resolve;
			reader.readAsDataURL(file);
		})
			.then(function(f){
				const content = f.target.result;
				const data = {
					content: content,
				};
				return fetch(Route.upload, {
					method:  'POST',
					headers: {
						'Content-Type': 'application/json',
//						"Access-Control-Allow-Origin": "*",
//						"Access-Control-Allow-Methods": "*"
					},
					body:    JSON.stringify(data),
					cache:   'no-cache'
				})
//					.then(data => data.json())
					.catch(e => console.error(e));
			});
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

	handlePage(page, sidebar = false) {
		if (sidebar) {
			this.handleSidebar();
		}
		this.setState({ page: page });
	}

	handleStatisticPage() {
		this.setState({ statisticPage: true });
	}

	handleStartPage() {
		let id = document.getElementById('sidebar');

		if (id.classList.contains('slide-in')) {
			id.classList.remove('slide-in');
			id.classList.add('slide-out');
		}

		this.setState({ page: 'upload', statisticPage: false });
	}

	render() {
		const underConstruction =
			<section id={'wip'}>
				<h1 className="col-12">Work in progress</h1>
				<hr/>
				<img src={WIP} className="d-flex wip-martha my-auto"/>
			</section>;

		const navbarBottom =
			<nav className="footer w-100">
				<div className="d-flex nav-height my-auto col-12 text-center pl-0">
					<div className="col-lg-3"/>
					<div className="col-md-4 col-lg-2 mt-auto mb-auto cursor-pointer hover-header"
						onClick={() => this.handlePage('impressum')}>Impressum
					</div>
					<div className="col-md-4 col-lg-2 mt-auto mb-auto cursor-pointer hover-header"
						onClick={() => this.handlePage('dataPolicy')}>Datenschutz
					</div>
					<div className="col-md-4 col-lg-2 mt-auto mb-auto cursor-pointer hover-header"
						onClick={() => this.handlePage('contact')}>Kontakt
					</div>
					<div className="col-lg-3"/>
				</div>
			</nav>;

		const header =
			<div id={'headerNavigation'}>
				<div className="header medium-width d-flex">
					<div className="my-auto preva-image" onClick={() => this.handleSidebar()}>
						<div className="d-flex">
							<img onClick={() => this.handleStartPage()} src={PrevaGif} className="preva-icon cursor-pointer" alt={'preva'}/>
							<h1 onClick={() => this.handleStartPage()} className="header-preva cursor-pointer">Preva</h1>
						</div>
					</div>
					<div className="border-left-preva d-flex">
						<div className="header-item" onClick={() => this.handlePage('product', true)}>Product</div>
						<div className="header-item" onClick={() => this.handlePage('motivation', true)}>Motivation</div>
						<div className="header-item" onClick={() => this.handlePage('aboutus', true)}>Team</div>
					</div>
				</div>

				<div className="mobile-width">
					<div className="d-flex col-12 header">
						<div className="col-lg-1 col-md-2 my-auto" onClick={() => this.handleSidebar('fixed')}>
							<img src={BurgerNav} className={'burger-nav'}/>
						</div>
						<div className="col-10 d-flex border-right-left justify-content-center">
							<img onClick={() => this.handleStartPage()} src={PrevaGif} className="preva-icon cursor-pointer" alt={'preva'}/>
							<h1 onClick={() => this.handleStartPage()} className="header-preva  cursor-pointer">Preva</h1>
						</div>
					</div>
					<div id="sidebar" className="d-none">
						<ul>
							<li onClick={() => this.handlePage('upload', true)}>
								<div>Home</div>
							</li>
							<li onClick={() => this.handlePage('product', true)}>
								<div>Product</div>
							</li>

							<li onClick={() => this.handlePage('motivation', true)}>
								<div>Motivation</div>
							</li>
							<li onClick={() => this.handlePage('aboutus', true)}>
								<div>Team</div>
							</li>
						</ul>
					</div>
				</div>
				<div id="dummyHeader"/>

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

			case 'dataPolicy': {
				html = <DataPolicy
					handleBackToUpload={(e) => this.handleBackToUpload(e)}
					status={this.status}
					statisticPage={this.state.statisticPage}
					handleStartPage={() => this.handleStartPage()}
					handlePage={(p) => this.handlePage(p)}
					handleStatisticPage={() => this.handleStatisticPage()}
					uploadAjax={(d, p) => this.uploadAjax(d, p)}/>;
			}
				break;

			case 'motivation': {
				html = <Motivation
					handleBackToUpload={(e) => this.handleBackToUpload(e)}
					status={this.status}
					statisticPage={this.state.statisticPage}
					handleStartPage={() => this.handleStartPage()}
					handlePage={(p) => this.handlePage(p)}
					handleStatisticPage={() => this.handleStatisticPage()}
					uploadAjax={(d, p) => this.uploadAjax(d, p)}/>;
			}
				break;

			case 'aboutus': {
				html = <AboutUs
					handleBackToUpload={(e) => this.handleBackToUpload(e)}
					status={this.status}
					statisticPage={this.state.statisticPage}
					handleStartPage={() => this.handleStartPage()}
					handlePage={(p) => this.handlePage(p)}
					handleStatisticPage={() => this.handleStatisticPage()}
				/>;
			}
				break;
			case 'product': {
				html = <Product
					handleBackToUpload={(e) => this.handleBackToUpload(e)}
					status={this.status}
					statisticPage={this.state.statisticPage}
					handleStartPage={() => this.handleStartPage()}
					handlePage={(p) => this.handlePage(p)}
					handleStatisticPage={() => this.handleStatisticPage()}
				/>;
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
				html = <Contact
					handlePage={(p) => this.handlePage(p)}
					handleBackToUpload={(e) => this.handleBackToUpload(e)}
					status={this.status}
					statisticPage={this.state.statisticPage}
					handleStartPage={() => this.handleStartPage()}
					handleStatisticPage={() => this.handleStatisticPage()}
					uploadAjax={(d, p) => this.uploadAjax(d, p)}
				/>;
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
				<div id="navbarBackdrop" onClick={() => this.handleSidebar()}></div>
				{header}
				{/*{page === "login" || page === "register" ?*/}
				{/*	null : <div>{nav}</div>*/}
				{/*}*/}
				<div className="mb-5">
					{html}
				</div>
				{page === 'impressum' || page === 'dataPolicy' || page === 'Contact' ? underConstruction : null}

				{navbarBottom}
				<div className="dummy-footer"/>
			</div>
		);
	}
}

render(<App/>, document.getElementById('root'));