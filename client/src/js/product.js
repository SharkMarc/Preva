import React from 'react';
import FloIcon from '../assets/flo-bg.png';
import MarcIcon from '../assets/marc-final.png';
import MarthaIcon from '../assets/martha-final.png';

export default class Product extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div id={'product'}>
				<div className='col-12'>
					<div className='container-one'>
						<div className='section-one flex-wrap'>
							afdasfasdfasdfasdfasfas
							<hr className='content-hr'/>
							bold text
						</div>
						<div className='section-two'>
							<div className='carousel'>
								<div id="carousel-example-generic" className="p-0 carousel slide" data-bs-ride="carousel">
									<div className="carousel-indicators">
										<button data-bs-target="#carousel-example-generic" data-bs-slide-to="0" className="active"></button>
										<button data-bs-target="#carousel-example-generic" data-bs-slide-to="1"></button>
										<button data-bs-target="#carousel-example-generic" data-bs-slide-to="2"></button>
										<button data-bs-target="#carousel-example-generic" data-bs-slide-to="3"></button>
										<button data-bs-target="#carousel-example-generic" data-bs-slide-to="4"></button>
									</div>

									<div className="carousel-inner">
										<div className="carousel-item active">
											<a
											>
												<img src="/images/survey/2020/new/de/carousel/1-titelbild-freelancer-kompass-2020.PNG"
													className="img-responsive"
													alt="titelbild-freelancer-kompass-2020"/>
											</a>
										</div>

										<div className="carousel-item">
											<a
											>
												<img src="/images/survey/2020/new/de/carousel/2-agenda-freelancer-kompass-2020.PNG"
													alt="agenda-freelancer-kompass-2020"/>
											</a>
										</div>

										<div className="carousel-item">
											<a
											>
												<img
													src="/images/survey/2020/new/de/carousel/3-einkommenszufriedenheit-freelancer-kompass-2020.PNG"
													alt="einkommenszufriedenheit-freelancer-kompass-2020"/>
											</a>
										</div>
										<div className="carousel-item">
											<a
											>
												<img src="/images/survey/2020/new/de/carousel/4-stundensatzvergleich-freelancer-kompass-2020.PNG"
													alt="stundensatzvergleich-freelancer-kompass-2020"/>
											</a>
										</div>
										<div className="carousel-item">
											<a
											>
												<img src="/images/survey/2020/new/de/carousel/5-nettomonatseinkommen-freelancer-kompass-2020.PNG"
													alt="nettomonatseinkommen-freelancer-kompass-2020"/>
											</a>
										</div>
									</div>

									<button className="carousel-control-prev" type="button" data-bs-target="#carousel-example-generic"
										data-bs-slide="prev">
                    <span className="carousel-control-prev-icon">
                        <i className="fas fa-chevron-left txt-gr-24 text-black"></i>
                    </span>
									</button>

									<button className="carousel-control-next" type="button" data-bs-target="#carousel-example-generic"
										data-bs-slide="next">
                    <span className="carousel-control-next-icon">
                        <i className="fas fa-chevron-right txt-gr-24 text-black"></i>
                    </span>
									</button>
								</div>
							</div>
						</div>
						<div className='section-three'>
							<hr className='content-hr'/>
							<h3>titel bold text</h3>
							<ul type="1">
								<li>
									asd
								</li>
								<li>
									asdasdf
								</li>
							</ul>

							<div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
								<div className="carousel-inner">
									<div className="carousel-item active">
										<img className="d-block w-100" src="..." alt="First slide"/>
									</div>
									<div className="carousel-item">
										<img className="d-block w-100" src="..." alt="Second slide"/>
									</div>
									<div className="carousel-item">
										<img className="d-block w-100" src="..." alt="Third slide"/>
									</div>
								</div>
								<a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
									<span className="carousel-control-prev-icon" aria-hidden="true"></span>
									<span className="sr-only">Previous</span>
								</a>
								<a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
									<span className="carousel-control-next-icon" aria-hidden="true"></span>
									<span className="sr-only">Next</span>
								</a>
							</div>
							<div className={"mb-5"}/>

						</div>
					</div>
				</div>
			</div>
		);
	}
}