import React from "react";

export default class Contact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="mt-5">
				<h1 className="text-center">Kontaktiere mich:</h1>
				<div>
					<form role="form" action="http://192.168.50.2/marcsblog/post-method.php" encType="multipart/form-data" method="post">
						<div className="col-12 row">
							<input type="text" className="m-3 col-5 ml-auto mr-auto" name="firstname" placeholder="Vorname" required/>
							<input type="text" className="m-3 col-5 ml-auto mr-auto" name="surname" placeholder="Nachname" required/>
							<input type="text" className="m-3 col-5 ml-auto mr-auto" name="email" placeholder="Email Adresse" required/>
							<input type="text" className="m-3 col-5 ml-auto mr-auto" name="issue" placeholder="Anliegen"/>
							<textarea rows="6" className="m-3 col-11 ml-auto mr-auto" name="text" placeholder="Anliegen"/>
							<div className="col-12 text-center">
								<button className="" type="submit" onSubmit={() => this.props.handlePage("homepage")}>Absenden</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}