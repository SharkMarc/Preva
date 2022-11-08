import React from 'react';
import PrevaIcon from '../assets/preva_icon.png';
import {SuccessBox} from './boxes';

export default class Contact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contact: {
				firstname: '',
				surname:   '',
				email:     '',
				issue:     '',
				text:      '',
			}
		};
		this.handleContact = this.handleContact.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSuccess = this.handleSuccess.bind(this);
		this.handleBoxes = this.handleBoxes.bind(this);
	}

	handleBoxes(type, message) {
		let boxId = document.getElementById(type + 'Box');

		window.setTimeout(function() {
				boxId.classList.add('box-fade-out');
			}
			, 750);
		window.setTimeout(function() {
				boxId.classList.remove('box-fade-out');
				boxId.style.display = 'none';
			}
			, 2300);
	}

	handleSuccess(){
		this.handleBoxes('success');

		document.getElementById('successBoxItem').innerHTML = "Success! Message has been sent!";
		document.getElementById('successBox').style.display = 'block';
	}

	handleChange(e, name) {
		let contact = this.state.contact;
		const value = e.value;

		contact[name] = value;

		this.setState({ contact: contact });
	}

	handleContact(e) {
		e.preventDefault();
		const data = {
			contact: this.state.contact,
		};
		fetch(Route.contact, {
			method:  'POST',
			headers: { 'Content-Type': 'application/json' },
			body:    JSON.stringify(data),
		})
			.then(r => {return r.json();})
			.then((data) => this.setState({ contact: data.contact }))
			.then((data) => this.handleSuccess())
			.then(function(r) {
			})
			.then(contact => this.setState({ contact: contact }));
	}

	render() {
		let dnone = { display: 'none' };

		return (
			<section id="contactForm">
				<h2 className="text-center">Get in touch</h2>
				<hr/>
				<div>
					<SuccessBox PrevaIcon={PrevaIcon} dnone={dnone}/>
					<form role="form" onSubmit={(e) => this.handleSubmit(e)} action={Route.contact} encType="multipart/form-data" method="post">
						<div className="col-12 row">
							<div className={'input-field col-12 col-sm-6'}>
								<label htmlFor={'firstname'}>Firstname:</label>
								<input type="text" id={"firstname"}
									onChange={({ target }) => this.handleChange(target, 'firstname')} name="firstname"
									value={this.state.contact.firstname}
									placeholder="Max" required/>
							</div>
							<div className={'input-field col-12 col-sm-6'}>
								<label htmlFor={'surname'}>
									Surname:
								</label>

								<input type="text" id={"surname"}
									onChange={({ target }) => this.handleChange(target, 'surname')} name="surname"
									value={this.state.contact.surname}
									placeholder="Musterman" required/>
							</div>
							<div className={'input-field col-12 col-sm-6'}>
								<label htmlFor={'email'}>
									E-mail:
								</label>
								<input type="email" id={"email"}
									onChange={({ target }) => this.handleChange(target, 'email')} name="email" value={this.state.contact.email}
									placeholder="Email address" required/>
							</div>
							<div className={'input-field col-12 col-sm-6'}>
								<label htmlFor={'issue'}>
									Subject:
								</label>
								<input type="text" id={"issue"}
									onChange={({ target }) => this.handleChange(target, 'issue')} name="issue" value={this.state.contact.issue}
									placeholder="Subject"/>
							</div>
							<div className={'input-field col-12'}>
								<label htmlFor={'issue'}>
									Message:
								</label>
								<textarea rows="6" id={"text"}
									onChange={({ target }) => this.handleChange(target, 'text')} name="text" value={this.state.contact.text}
									placeholder="Please contact me."/>
							</div>
							<div className="col-12 mt-5 px-0 mx-auto text-center">
								<button className="preva-btn" type="submit">Absenden</button>
							</div>
						</div>
					</form>
				</div>
			</section>
		);
	}
}