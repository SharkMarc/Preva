import React from 'react';
import Easytouse from '../assets/easy_to_use.png';
import ClarityofThought from '../assets/clarity_of_thought.png';
import Competence from '../assets/competence.png';

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
					<h2 className="text-center pt-5">Process models are a powerful source of information</h2>
					<div className="text-center font-weight-bold">Check out how preva supports you</div>

					<div className="motivation-background">
						<div className="motivation-left flex-wrap">
							<div className="col-6">
								<h3 className="">
									Clarity of Thought
									<hr/>
								</h3>
								<div className="">
									Preva provides you with enough detail to clearly understand and explain the circumstances
								</div>
							</div>
							<img src={Easytouse} className="colournew"/>
						</div>

						<div className="motivation-right flex-wrap">
							<img src={Competence} className="colournew ml-auto"/>

							<div className="col-6 text-right">
								<h3 className="">
									Compe&shy;tence
									<hr/>
								</h3>
								<div className="">
									Preva is your partner when it comes to generate facts and interpret insights
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
									Preva is as simple as it gets. No room for excuses
								</div>
							</div>
							<img src={ClarityofThought} className="colournew"/>
						</div>
					</div>
				</section>
			</div>
		);
	}
}