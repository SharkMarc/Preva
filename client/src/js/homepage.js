import React from "react";

export default class Homepage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="h-100 pt-5 background-image-homepage container">
				<div className="card p-3 mt-3 card-border mb-3 text-center col-12 text-dark">
					<h1>Marcs Startseite !</h1>
					<div className="col-12">
						Gib mir nen Bild ! mit parallex vielleicht auch über die ganze homepage? oder drei bilder? hmmmm
					</div>
					<div className="col-12">
						Hallo its me und text zu mir
					</div>
					<div className="col-12">
						geb mir dann auch noch ne bottom navbar bitte danke :>
					</div>
				</div>
				<div className="row ml-auto mr-auto text-center ">
					<div className="card p-3 card-border col-6 text-dark">
						<h1>Enjoy it !!</h1>
						<div className="">
							mega toll hier gell? :)
						</div>
						<div className="">
							und ab geht die wilde fahrt ehehhehehehehehehehe
						</div>
						<div>
							zack bumm bäng
						</div>
					</div>
					<div className="card p-3 card-border col-6 text-dark">
						<h1>what is this?!</h1>
						<div className="">
							Gib mir nen Bild ! mit parallex vielleicht auch über die ganze homepage? oder drei bilder? hmmmm
						</div>
						<div className="">
							Hallo its me und text zu mir
						</div>
						<div>
							geb mir dann auch noch ne bottom navbar bitte danke :>
						</div>
					</div>
				</div>
			</div>
		);
	}
}