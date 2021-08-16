import React from 'react';
import FloIcon from '../assets/flo-bg.png';
import MarcIcon from '../assets/marc-final.png';
import MarthaIcon from '../assets/martha-final.png';

export default class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};

	}

	render() {
		return (
			<div id={'aboutUs'}>
				<div className='container-one'>
					<div className='col-12 row'>
						<div className='col-12 col-md-6'>
							<div className='panel row'>
								<div className='point-header col-5'><span className={'my-auto point-header-text'}>Name:</span></div>
								<span className='col-1 border-right-side'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

								<div className='point-text col-12'>Florian</div>
							</div>

							<div className='panel row'>
								<div className='point-header col-5'><span className={'my-auto point-header-text'}>Position:</span></div>
								<span className='col-1 border-right-side'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

								<div className='point-text col-12'>Founder and Concept</div>
							</div>

							<div className='panel row'>
								<div className='point-header col-10 col-md-7'><span
									className={'my-auto point-header-text'}>What you want to tell the world:</span></div>
								<span className='col-1 border-right-side'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

								<div className='point-text col-12'>
									Believe in yourself and support your environment!
									<br/>
									Dont waste too much time on 9gag.
								</div>
							</div>
						</div>
						<div className='col-12 col-md-6 text-center'>
							<img src={FloIcon} className="teamimg my-auto"/>
						</div>
					</div>
				</div>
				<hr className='content-hr'/>

				<div className='container-two'>
					<div className='col-12 row'>
						<div className='col-12 col-md-6 text-center marc-icon'>
							<img src={MarcIcon} className="teamimg my-auto"/>
						</div>

						<div className='col-12 col-md-6 '>
							<div className='panel row'>
								<div className='point-header col-5'><span className={'my-auto point-header-text'}>Name:</span></div>
								<span className='col-1 border-right-side'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

								<div className='point-text col-12'>Marc</div>
							</div>

							<div className='panel row'>
								<div className='point-header col-5'><span className={'my-auto point-header-text'}>Position:</span></div>
								<span className='col-1 border-right-side'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

								<div className='point-text col-12'>Head of Development</div>
							</div>

							<div className='panel row'>
								<div className='point-header col-10 col-md-7'><span
									className={'my-auto point-header-text'}>What you want to tell the world:</span></div>
								<span className='col-1 border-right-side'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

								<div className='point-text col-12'>
									Lorem Ipsum ☻
									<br/>
								</div>
							</div>

						</div>
					</div>
				</div>
				<hr className='content-hr'/>

				<div className='container-three'>
					<div className='col-12 row'>
						<div className='col-12 col-md-6'>
							<div className='panel row'>
								<div className='point-header col-5'><span className={'my-auto point-header-text'}>Name:</span></div>
								<span className='col-1 border-right-side'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

								<div className='point-text col-12'>Martha</div>
							</div>

							<div className='panel row'>
								<div className='point-header col-5'><span className={'my-auto point-header-text'}>Position:</span></div>
								<span className='col-1 border-right-side'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

								<div className='point-text col-12'>Motivationcoach and Gourmet</div>
							</div>

							<div className='panel row'>
								<div className='point-header col-10 col-md-7'><span
									className={'my-auto point-header-text'}>What you want to tell the world:</span></div>
								<span className='col-1 border-right-side'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

								<div className='point-text col-12'>
									Wau wau wuff * barks in german
								</div>
							</div>
						</div>
						<div className='col-12 col-md-6 text-center'>
							<img src={MarthaIcon} className="teamimg my-auto"/>
						</div>

					</div>
					<hr className='content-hr'/>
				</div>
			</div>
		);
	}
}