import React from "react";

export default class Contact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contact: {
				firstname: "",
				surname:   "",
				email:     "",
				issue:     "",
				text:      "",
			}
		};
		this.handleContact = this.handleContact.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e, name) {
		let contact = this.state.contact;
		const value = e.value;

		contact[name] = value;

		this.setState({ contact: contact });
	}

	handleContact() {
		const data = {
			contact: this.state.contact,
		};
		fetch("http://localhost:6318/controller/contact.php", {
			method:  "POST",
			headers: { "Content-Type": "application/json" },
			body:    JSON.stringify(data),
			cache:   "no-cache"
		})
			.then(r => {return r.json();})
			.then((data) => this.setState({ contact: data.contact }))
			.then(function(r) {
			})
		.then(contact => this.setState({ contact: contact }));
	}

	render() {
		return (
			<section id={"contactForm"} className="mt-5">
				<h1 className="text-center">Get in touch</h1>
				<hr/>
				<div>
					<form role="form" onSubmit={this.handleContact} action="http://localhost:6318/controller/contact.php"
						encType="multipart/form-data" method="post">
						<div className="col-12 row">
							<input type="text" className="m-3 col-5 ml-auto mr-auto"
								onChange={({ target }) => this.handleChange(target, "firstname")} name="firstname"
								value={this.state.contact.firstname}
								placeholder="Vorname" required/>
							<input type="text" className="m-3 col-5 ml-auto mr-auto"
								onChange={({ target }) => this.handleChange(target, "surname")} name="surname" value={this.state.contact.surname}
								placeholder="Nachname" required/>
							<input type="text" className="m-3 col-5 ml-auto mr-auto"
								onChange={({ target }) => this.handleChange(target, "email")} name="email" value={this.state.contact.email}
								placeholder="Email Adresse" required/>
							<input type="text" className="m-3 col-5 ml-auto mr-auto"
								onChange={({ target }) => this.handleChange(target, "issue")} name="issue" value={this.state.contact.issue}
								placeholder="Anliegen"/>
							<textarea rows="6" className="m-3 col-11 ml-auto mr-auto"
								onChange={({ target }) => this.handleChange(target, "text")} name="text" value={this.state.contact.text}
								placeholder="Was möchtest du uns mitteilen?"/>
							<div className="col-11 px-0 mx-auto text-center">
								<button className="" type="submit" onSubmit={() => this.props.handlePage("homepage")}>Absenden</button>
							</div>
						</div>
					</form>
				</div>
			</section>
		);
	}
}