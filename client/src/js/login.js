import React from "react";
import {render} from "react-dom";

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email:    "",
			password: "",
			errmsg:   false,
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
		this.props.loginAjax(data,{ errmsg: true });
	}

	handleChange(e) {
		const target = e.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		this.setState({ [name]: value });
	}

	render() {
		let errmsg=this.state.errmsg;

		return (
			<div className="container text-center pt-5 mt-5">
				<form id="formLogin" className="form-signin">
					<div className="form-group">
						<label className="label-small">Email</label>
						<div>
							<input type="text" className="form-control" name="email" required autoFocus
								value={this.state.email} onChange={this.handleChange}/>
						</div>
					</div>
					<div className="form-group">
						<label className="label-small">Enter pw!</label>
						<div>
							<input type="password" className="form-control pw-form" name="password" required
								value={this.state.password} onChange={this.handleChange}/>
						</div>
					</div>
					<div className="form-group">
						<button onClick={this.handleSubmit} className="login-btn round-border btn btn-success"
							type="submit">Log in !
						</button>
					</div>
					{errmsg ?
						<div className="col-12 text-danger text-center">
							Error !
						</div> : null
					}
				</form>
			</div>
		);
	}
}