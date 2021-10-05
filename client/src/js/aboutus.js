import React from 'react';
import FloIcon from '../assets/flo-bg.png';
import MarcIcon from '../assets/marc-final.png';
import MarthaIcon from '../assets/martha-final.png';

export default class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			aboutus:
				[{
					id:           1,
					name:         'Florian',
					position:     'Founder and Concept',
					telltheworld: 'Flo has been there at the very beginning. He \n' +
						              'helped to create the vision and shaped Preva \n' +
						              'the way the world knows it today. His vision is \n' +
						              'to improve processes based on facts and allow \n' +
						              'everyone to participate',
					img:          FloIcon,
				}, {
					id:           2,
					name:         'Marc',
					position:     'Head of Development',
					telltheworld: 'Marc has proven himself to be an \n' +
						              'outstanding teamplayer and ambitious \n' +
						              'developer. His hard work and dedication \n' +
						              'shows that if you have the right mind you \n' +
						              'can do it.',
					img:          MarcIcon,
				}, {
					id:           3,
					name:         'Martha',
					position:     'Motivationcoach and Gourmet',
					telltheworld: 'Martha is the soul of our team and provides a \n' +
						              'daily smile to every face. Futher, she likes to \n' +
						              'have a walk outside and eat.',
					img:          MarthaIcon,
				}

				],
		};

	}

	render() {
		const aboutus = this.state.aboutus;

		const aboutusArray =
			aboutus.map(function(aboutus) {
				return (
					<div className="p-0 col-12 col-md-6 col-lg-4 d-flex">
						<div className={'card'}>
							<div className="flex-wrap panel">
								<div className="col-12 text-center">
									<img src={aboutus.img} className="teamimg my-auto"/>
								</div>

								<div className="point-header d-flex col-9"><span className={'my-auto point-header-text'}>Name:</span></div>
								<span className="col-2 border-right-side">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
								<div className="point-text pb-3 col-12">{aboutus.name}</div>

								<div className="point-header d-flex col-9"><span className={'my-auto point-header-text'}>Position:</span></div>
								<span className="col-2 border-right-side">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
								<div className="point-text pb-3 col-12">{aboutus.position}</div>

								<div className="point-header d-flex col-9">
									<span className={'my-auto point-header-text'}>About me:</span>
								</div>
								<span className="col-2 border-right-side">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

								<div className="point-text col-12">
									{aboutus.telltheworld}
								</div>
							</div>
						</div>
					</div>
				);
			}, this);
		return (
			<section id={'aboutUs'} className={'flex-wrap'}>
				{aboutusArray}
			</section>
		);
	}
}