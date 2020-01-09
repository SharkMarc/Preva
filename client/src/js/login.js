import React from "react";
import {render} from "react-dom";

export default class Login extends React.Component {
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
		this.props.loginAjax(data);
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
				<h1 className="text-center pt-5"><u>Welcome to MarcsBlog</u></h1>
				<div className="card position-absolute border p-3 bg-dark login text-center mt-auto mb-auto">
					<form id="formLogin" role="form" className="form-signin" action="http://192.168.50.2/marcsblog/controller/login.php"
						  encType="multipart/form-data" method="post">
						<div className="form-group">
							<label className="label-small">Email</label>
							<div>
								<input type="text" className="form-control ASD" name="email" required autoFocus
									   value={this.state.email} onChange={this.handleChange}/>
							</div>
							{errorNumber === 2 ?
								<div className="text-danger p-2 kkk">{this.props.errorText}</div>
								: null}
						</div>
						<div className="form-group dsfajk">
							<label className="label-small">Enter pw!</label>
							<div>
								<input type="password" className="form-control pw-form" name="password" required
									   value={this.state.password} onChange={this.handleChange}/>
							</div>
							{errorNumber === 1 ?
								<div className="text-danger p-2">{this.props.errorText}</div>
								: null}
						</div>
						<div className="form-group">
							<button onClick={this.handleSubmit} className="login-btn round-border btn btn-success"
									type="submit">Log in !
							</button>
						</div>
						{errorNumber === 5 ?
							<div className="text-success">{this.props.errorText}</div>
							: null}
					</form>
					<div className="cursor-pointer" onClick={() => this.props.handlePage("register")}><u>Registrieren ?</u></div>
				</div>
			</div>
		);
	}
}