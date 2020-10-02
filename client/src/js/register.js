import React from "react";

import linksHat from "../assets/links_hat.png";

export default class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email:    "",
			password: "",
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const data = {
			email:    this.state.email,
			password: this.state.password
		};
		this.props.registerAjax(data);
	}

	handleChange(e) {
		const target = e.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		this.setState({ [name]: value });
	}

	render() {
		const errorMsg = this.props.errorText;
		const errorNumber = this.props.errorNumber;
		return (
			<div>
				<h1 className="text-center pt-5"><u>Register now !</u></h1>
				<h3 className="text-center pt-3"><u>To be a Part of this awesome Blog !</u></h3>
				<div className="card position-absolute border p-3 bg-dark login text-center mt-auto mb-auto">
					<form id="formRegister" role="form" className="form-signin" action="http://localhost:6318/controller/register.php"
						encType="multipart/form-data" method="post">
						<div className="form-group">
							<label className="label-small">Name/Email/Whatever</label>
							<div>
								{errorNumber === 4 || errorNumber === 6 ?
									<div className="text-danger p-2">{this.props.errorText}</div>
									: null}
								<input type="text" className="form-control" name="email" required autoFocus
									value={this.state.email} onChange={this.handleChange}/>
							</div>
						</div>
						<div className="form-group">
							<label className="label-small">Passwort</label>
							<div>
								{errorNumber === 7 ?
									<div className="text-danger p-2">{this.props.errorText}</div>
									: null}
								<input type="password" className="form-control pw-form" name="password" required
									value={this.state.password} onChange={this.handleChange}/>
							</div>
						</div>
						<div className="form-group">
							<button onClick={this.handleSubmit} className="rounded-button border-shadow-statistic login-btn round-border btn btn-success"
								type="submit">Registrieren
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}