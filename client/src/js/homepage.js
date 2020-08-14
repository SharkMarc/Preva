import React from "react";

export default class Homepage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="h-100 overflow-scroll background-image-homepage p-5">
				<div className="col-10 card p-3 m-3 card-border text-center text-dark ml-auto mr-auto">
					<h1 className="p-5">Marcs Startseite mit mega vielen tollen informationien für jedermann und frau!</h1>
					<div className="row">
						<div className="text-left col-6" ref="Progress1">
							{this.props.textContent}
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
					<div className="card p-3 m-3 card-border col-5 text-dark">
						<h1>Zielsetzung Meeting am 07.07:</h1>
						<div className="text-left">
							<ul>
								<li>BPMN Datei wird erstellt und in XML<a href={"https://demo.bpmn.io/"}> exportiert (https://demo.bpmn.io/)</a>
								</li>
								<li>XML wird in Preva eingelesen</li>
							</ul>
						</div>
					</div>
					<div className="card p-3 m-3 card-border col-5 text-dark">
						<h1>Zielsetzung Meeting am 04.08:</h1>
						<ul>
							<li>BPMN Datei wird erstellt und in XML<a href={"https://demo.bpmn.io/"}> exportiert (https://demo.bpmn.io/)</a></li>
							<li>XML wird in Preva eingelesen</li>
							<li>Eingeschränkte Analyse wird in Text oder Diagramm dargestellt</li>
							<ol>
								<li>Untersuchung von Verknüpfungen</li>
								<li>Untersuchung von Kanten</li>
								<li>Untersuchung von Aktivitäten</li>
								<li>Untersuchung von Knoten</li>
							</ol>
						</ul>
					</div>
					<div className="card p-3 m-3 card-border col-5 text-dark">
						<h1>Zielsetzung Meeting am 01.09:</h1>
						<ul>
							<li>XML Files können eingelesen werden</li>
							<ol>
								<li>3 Varianten (1x easy, 1x medium, 1x difficult in Bezug auf Anzahl der Symbole und Beziehungen)</li>
							</ol>
							<li>Es kann der Präsentationsusecase vorgestellt werden:</li>
							<ol>
								<li>BPMN Datei wird erstellt und in XML
									<a href={"https://demo.bpmn.io/"}> exportiert (https://demo.bpmn.io/)</a>
								</li>
								<li>XML wird in Preva eingelesen</li>
								<li>Analyse wird in Text oder Diagramm dargestellt</li>
							</ol>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}