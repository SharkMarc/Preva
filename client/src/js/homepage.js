import React from "react";

export default class Homepage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="h-100 background-image-homepage p-5">
				<div className="col-10 card p-3 m-3 card-border text-center text-dark ml-auto mr-auto">
					<h1 className="p-5">Marcs Startseite mit mega vielen tollen informationien für jedermann und frau!</h1>
					<div className="row">
						<div className="text-left col-6">
							Gib mir nen Bild ! mit parallex vielleicht auch über die ganze homepage? oder drei bilder? hmmmm
							Hallo its me und text zu mir Gib mir nen Bild ! mit parallex vielleicht auch über die ganze homepage? oder drei
							bilder? hmmmm
							Hallo its me und text zu mir Gib mir nen Bild ! mit parallex vielleicht auch über die ganze homepage? oder drei
							bilder? hmmmm
							Hallo its me und text zu mir Gib mir nen Bild ! mit parallex vielleicht auch über die ganze homepage? oder drei
							bilder? hmmmm
							Hallo its me und text zu mir
						</div>
						<div className="text-left col-6">
							Mega interesting stuff ! Mega interesting stuff ! Mega interesting stuff ! Mega interesting stuff ! Mega interesting
							stuff ! Mega interesting stuff ! Mega interesting stuff ! Mega interesting stuff ! Mega interesting stuff ! Mega
							interesting stuff ! Mega interesting stuff ! Mega interesting stuff ! Mega interesting stuff ! Mega interesting stuff
							! Mega interesting stuff ! Mega interesting stuff ! Mega interesting stuff ! Mega interesting stuff !
						</div>
					</div>
				</div>
				<div className="row ml-auto mr-auto justify-content-center text-center ">
					<div className="card p-3 m-3 card-border col-5 text-dark">
						<h1>Enjoy it !!</h1>
						<div className="text-left">
							mega toll hier gell? :)
						</div>
						<div className="text-left">
							und ab geht die wilde fahrt ehehhehehehehehehehe
						</div>
						<div className="text-left">
							zack bumm bäng
						</div>
					</div>
					<div className="card p-3 m-3 card-border col-5 text-dark">
						<h1>what is this?!</h1>
						<div className="text-left">
							Gib mir nen Bild ! mit parallex vielleicht auch über die ganze homepage? oder drei bilder? hmmmm
						</div>
						<br/>
						<div className="text-left">
							Hallo its me und text zu mir
						</div>
						<div className="text-left">
							geb mir dann auch noch ne bottom navbar bitte danke :>
						</div>
					</div>
				</div>
			</div>
		);
	}
}