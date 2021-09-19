import React from 'react';
import FloIcon from '../assets/flo-bg.png';
import MarcIcon from '../assets/marc-final.png';
import MarthaIcon from '../assets/martha-final.png';
import bellregular from '../assets/bell-regular.png';
import lightbulb from '../assets/lightbulb-regular.png';
import spaceshuttle from '../assets/space-shuttle-solid.png';

export default class Product extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<section id={'product'}>
				<h1>Our Productportfolio</h1>
				<hr className="content-hr"/>
				<div className="section-two">
					<div className="carousel">
						<div id="carousel-example-generic" className="carousel slide" data-bs-ride="carousel">
							<div className="carousel-inner">
								<div className="carousel-item active">
									<div className="flex-wrap">
										<div className="col-md-5 col-12">
											<img src={lightbulb} className="colournew"/>
										</div>
										<div className="col-md-7 col-12 text-area">
											<h2>Understandability</h2>
											<hr className="bold-hr"/>
											<div className="content">Evaluate the understandability of your process models</div>
										</div>
									</div>
								</div>
								<div className="carousel-item">
									<div className="flex-wrap">
										<div className="col-md-5 col-12">
											<img src={bellregular} className="colournew"/>
										</div>
										<div className="col-md-7 col-12 main-content text-area">
											<h2>Error probability</h2>
											<hr className="bold-hr"/>
											<div className="content">Evaluate the error probability of your process models</div>

										</div>
									</div>
								</div>

								<div className="carousel-item">
									<div className="flex-wrap">
										<div className="col-md-5 col-12 ">
											<img src={spaceshuttle} className="colournew"/>
										</div>
										<div className="content col-12 col-md-7 text-area">
											<h2 content="text-center">Prediction readyness</h2>
											<hr className="bold-hr"/>
											<div className="content">Evaluate the prediction readyness of your process models</div>
										</div>
									</div>
								</div>
							</div>

							<button className="carousel-control-prev" type="button" data-bs-target="#carousel-example-generic"
								data-bs-slide="prev">
				                    <span className="carousel-control-prev-icon">
				                        <i className="fas fa-chevron-left"></i>
				                    </span>
							</button>

							<button className="carousel-control-next" type="button" data-bs-target="#carousel-example-generic"
								data-bs-slide="next">
					                    <span className="carousel-control-next-icon">
					                        <i className="fas fa-chevron-right"></i>
					                    </span>
							</button>
						</div>
					</div>
				</div>

			</section>
		);
	}
}