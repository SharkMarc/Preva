import React from 'react';
import FloIcon from '../assets/flo-bg.png';
import MarcIcon from '../assets/marc-final.png';
import MarthaIcon from '../assets/martha-final.png';
import PropTypes from "prop-types";
import bellregular from '../assets/bell-regular.png';
import lightbulb from '../assets/lightbulb-regular.png';
import spaceshuttle from '../assets/space-shuttle-solid.png';

export default class Product extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		window.scrollTo({top:0,left: 0, behavior: 'smooth'})

		const YoutubeEmbed = ({ embedId }) => (
			<div className="d-flex video-responsive col-12 justify-content-center">
				<iframe
					src={`https://www.youtube.com/embed/${embedId}`}
					width="853"
					height="480"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					title="Embedded youtube"
					className="video yt-video"
				/>
			</div>
		);
		return (
			<div>
				<div id="home" className="justify-content-center">
					<div className="full-height-bg-height full-height-bg col-12 youtube-video">
						<h1>The new <br/> state of the art</h1><br/>
						<p>Check out the features</p>
						<YoutubeEmbed embedId="suE3J0agZr8" />
					</div>
				</div>
				<section id='product'>
					<h2 className="text-center">What value preva provides</h2>
					<p className="text-center font-weight-bold">Preva creates a value for all processes around the world</p>
					<div className="section-two">
						<div className="carousel">
							<div id="carousel-example-generic" className="carousel slide" data-bs-ride="carousel">
								<div className="carousel-indicators">
									<button data-bs-target="#carousel-example-generic" data-bs-slide-to="0" className="active"></button>
									<button data-bs-target="#carousel-example-generic" data-bs-slide-to="1"></button>
									<button data-bs-target="#carousel-example-generic" data-bs-slide-to="2"></button>
								</div>

								<div className="carousel-inner">
									<div className="carousel-item active">
										<div className="flex-wrap">
											<div className="col-md-5 col-12">
												<img src={lightbulb} className="colournew"/>
											</div>
											<div className="col-md-7 col-12 text-area">
												<h3 className="responsive smaller">Understand&shy;ability</h3>
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
												<h3>Error probability</h3>
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
												<h3 content="text-center">Prediction readyness</h3>
												<hr className="bold-hr"/>
												<div className="content">Evaluate the prediction readyness of your process models</div>
											</div>
										</div>
									</div>
								</div>
								<div className='text-right mt-2 d-none'>
									<button className="carousel-icon" type="button" data-bs-target="#carousel-example-generic"
										data-bs-slide="prev">
				                    <span className="carousel-control-prev-icon">
				                    </span>
									</button>

									<button className="carousel-icon ml-2" type="button" data-bs-target="#carousel-example-generic"
										data-bs-slide="next">
					                    <span className="carousel-control-next-icon">
					                    </span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

