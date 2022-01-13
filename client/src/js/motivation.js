import React from 'react';
import Easytouse from '../assets/Easytouse.png';
import ClarityofThought from '../assets/ClarityofThought.png';
import BurgerNav from '../assets/burger-nav.png';

export default class Homepage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		window.scrollTo({top:0,left: 0, behavior: 'smooth'})
		return (
			<div className="light-background">
				<section className="white-background">
					<h2 className="text-center pt-5">Motivation</h2>
					<div className="text-center font-weight-bold">Preva creats a value for all processes around the world</div>

					<div className="motivation-background">
						<div className="motivation-left flex-wrap">
							<div className="col-6">
								<h3 className="">
									Clarity of Thought
									<hr/>
								</h3>
								<div className="">
									Preva provides enough knowledge for you so you can clearly understand and explain circumstances.
								</div>
							</div>
							<img src={ClarityofThought} className="colournew"/>
						</div>

						<div className="motivation-right flex-wrap">
							<img src={BurgerNav} className="colournew ml-auto"/>

							<div className="col-6 text-right">
								<h3 className="">
									Competence
									<hr/>
								</h3>
								<div className="">
									Preva is your partner to quantify and demonstrate facts, that enable and enhance the efficiency or performance of your business process models
								</div>
							</div>
						</div>

						<div className="motivation-left flex-wrap">
							<div className="col-6">
								<h3 className="">
									Easy to use
									<hr className="publicity-hr"/>
								</h3>
								<div>
									Preva is as simple as it gets. No room for incomprehensible information!
								</div>
							</div>
							<img src={Easytouse} className="colournew"/>
						</div>

					</div>
				</section>
			</div>
		);
	}
}