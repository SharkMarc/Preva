import React from 'react';
import lightbulb from '../assets/lightbulb-regular.png';
import BurgerNav from '../assets/burger-nav.png';

export default class Homepage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="light-background">
				<section className="white-background">
					<h2 className="text-center pt-5">Motivation</h2>
					<div className="text-center font-weight-bold">Preva creats a value for all processes around the world</div>

					<div className="motivation-background">
						<div className="motivation-left flex-wrap">
							<div className="col-6">
								<h3 className="">
									Create value
									<hr/>
								</h3>
								<div className="">
									Preva is a business process management (BPM) <br/>
									software that allows you to evaluate business process models.
								</div>
							</div>
							<img src={BurgerNav} className="colournew"/>
						</div>

						<div className="motivation-right flex-wrap">
							<img src={BurgerNav} className="colournew ml-auto"/>

							<div className="col-6 text-right">
								<h3 className="">
									EAT SOCKS
									<hr/>
								</h3>
								<div className="">
									Preva is a business process management (BPM) <br/>
									software that allows you to evaluate business process models.
								</div>
							</div>
						</div>

						<div className="motivation-left flex-wrap">
							<div className="col-6">
								<h3 className="">
									Publicity Available
									<hr className="publicity-hr"/>
								</h3>
								<div className="">
									Preva is a business process management (BPM) <br/>
									software that allows you to evaluate business process models.
								</div>
							</div>
							<img src={BurgerNav} className="colournew"/>
						</div>

					</div>
				</section>
			</div>
		);
	}
}