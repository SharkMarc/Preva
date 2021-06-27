import React from 'react';
import Statistics from './statistic/statistics';
import StatisticTable from './statistic/statistictable';
import PrevaIcon from '../assets/preva_icon.png';
import SearchIcon from '../assets/search_png.png';
import BurgerNav from '../assets/burger-nav.png';
import UploadIcon from '../assets/upload.png';
import DownloadIcon from '../assets/download.png';
import BackIcon from '../assets/back.png';
import PDFIcon from '../assets/pdf.png';
import PrevaGif from '../assets/preva.gif';
import Speedometa from '../assets/speedometer.png';

export default class Upload extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bpmn:              'test attribut1',
			bpmndiList:        [],
			countList:         [],
			bpmnList:          [],
			allLists:          [],
			statisticPage:     false,
			statisticSwitch:   'Size',
			selectedStatistic: 'Size',
			dataName:          '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.getData = this.getData.bind(this);
		this.chart = this.chart.bind(this);
		this.click = this.click.bind(this);
		this.showUploadButton = this.showUploadButton.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleBackToUpload = this.handleBackToUpload.bind(this);
		this.handleSwitch = this.handleSwitch.bind(this);
		this.mixedChart = this.mixedChart.bind(this);
		this.handleStatisticPage = this.handleStatisticPage.bind(this);
		this.handleStatisticArray = this.handleStatisticArray.bind(this);
		this.handleData = this.handleData.bind(this);
		this.handleSidebar = this.handleSidebar.bind(this);
	}

	handleStatisticArray() {
	}

	handleSwitch(changeStatistic, id) {
		this.setState({ statisticSwitch: changeStatistic, selectedStatistic: id });
	}

	mixedChart() {
	}

	chart() {
//		let bpmndiList = this.bpmndiList;

		let status = this.props.status;

		var ctx = document.getElementById('myChart').getContext('2d');
		var myChart = new Chart(ctx, {
			type:    'bar',
			data:    {
				labels:   ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
				datasets: [{
					label:           '# of Votes',
					data:            [12, 19, 3, 5, 2, 3],
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(255, 159, 64, 0.2)'
					],
					borderColor:     [
						'rgba(255, 99, 132, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 159, 64, 1)'
					],
					borderWidth:     1
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}
			}
		});
	}

	handleBackToUpload(statisticPage) {
		this.setState({ statisticPage: !statisticPage });
	}

	showUploadButton() {
		// get any fileType
		let file = document.getElementById('userfile');

		// get fileValue
		let fileValue = document.getElementById('userfile').value;

		// get uploadButtonId
		let uploadButton = document.getElementById('uploadButton2');

		// get fileName
		let fileName = document.getElementById('fileName');

		if (file.files.length !== 0) {
			// filter the name "example.bpmn" from "C:\fakepath\example.bpmn"
			var startIndex = (fileValue.indexOf('\\') >= 0 ? fileValue.lastIndexOf('\\') : fileValue.lastIndexOf('/'));

			//transform to string
			var filename = fileValue.substring(startIndex);
			var str = filename;
			// validation of bpmn
			var patt = /.bpmn/g;

			// if no .bpmn we stop here
			if (!str.match(patt)) {
				window.setTimeout(function() {
						document.getElementById('errorMessage').classList.add('success-box-fade-out');
					}
					, 1500);
				window.setTimeout(function() {
						document.getElementById('errorMessage').classList.remove('success-box-fade-out');
						document.getElementById('errorMessage').style.display = 'none';
					}
					, 4500);

				uploadButton.classList.add('d-none');
				fileName.innerHTML = '';

				document.getElementById('errorMessage').style.display = 'block';
				document.getElementById('successBox').style.display = 'none';
				return;
			}

			//deleting all slashes from fileName
			if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
				filename = filename.substring(1);
			}

			// allow upload of the file
			uploadButton.classList.remove('d-none');
			fileName.innerHTML = filename;

			window.setTimeout(function() {
					document.getElementById('successBox').classList.add('success-box-fade-out');
				}
				, 1500);
			window.setTimeout(function() {
					document.getElementById('successBox').classList.remove('success-box-fade-out');
					document.getElementById('successBox').style.display = 'none';
				}
				, 4500);

			document.getElementById('errorMessage').style.display = 'none';
			document.getElementById('successBoxItem').innerHTML = filename;
			document.getElementById('successBox').style.display = 'block';

			fileName.innerHTML = filename;
			let saveName = filename.slice(0, filename.length - 5);

			this.setState({ dataName: saveName });
		} else {
			uploadButton.classList.add('d-none');
			fileName.innerHTML = '';
			document.getElementById('successBox').style.display = 'none';
			document.getElementById('errorMessage').style.display = 'none';
		}
	}

	componentDidMount() {
//		this.chart();
	}

	click() {
		let file = document.getElementById('userfile');
		file.click();
	}

	toggleModal(modalId) {
		if (modalId.style.display === 'none') {
			modalId.style.display = 'block';
		} else {
			modalId.style.display = 'none';
		}
		window.setTimeout(() => this.setState({ statisticPage: true }), 9000);
	}

	handleStatisticPage() {
		this.setState({ statisticPage: true });
	}

	handleSubmit(e) {
		e.preventDefault();
		const file = document.getElementById('userfile').files[0];
		console.log(file);
		this.props.uploadAjax(file);
		this.getData();

	};

	handleData(e) {
		e.preventDefault();

		this.handleSubmit(e.target);
	};

	getData() {
		fetch(Route.upload, {
			method:  'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			cache:   'no-cache'
		})
			.then(data => {return data.json();})
			.then((data) => this.setState({ allLists: data, countList: data['list'] }))
			.then(function(data) {
			});
	}

	handleChange(e) {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		this.setState({ [name]: value });
	}

	handleSidebar(e) {
		let id = document.getElementById('sidebar');
		if (id.classList.contains('slide-in')) {
			id.classList.remove('slide-in');
			id.classList.add('slide-out');

		} else {
			id.classList.add('slide-in');
			id.classList.remove('slide-out');
			id.classList.remove('d-none');

		}
//	document.getElementById("sidebar").classList.toggle("d-none");
	}

	render() {
		let status = this.props.status;
		let statisticSwitch = this.state.statisticSwitch;
		let html;
		let selectedStatistic = this.state.selectedStatistic;
		let dnone = {
			display: 'none',
		};
		if (statisticSwitch) {
			switch (statisticSwitch) {
				case 'Size': {
					html = <Statistics title={'Size'} attributes={this.state.countList} text={'This card is an example.'}/>;
				}
					break;
				case 'Separability': {
					html = <Statistics title={'Separability'} attributes={false} text={'This card is empty.'}/>;
				}
					break;
				case 'Sequentiality': {
					html = <Statistics title={'Sequentiality'} attributes={this.state.countList} text={'hier wird die statistik angezeit'}/>;
				}
					break;
				case 'Structuredness': {
					html = <Statistics title={'Structuredness'} attributes={this.state.countList} text={'hier wird die statistik angezeit'}/>;
				}
					break;
				case 'Cyclicity': {
					html = <Statistics title={'Cyclicity'} attributes={this.state.countList} text={'hier wird die statistik angezeit'}/>;
				}
					break;
				case 'Concurrency': {
					html = <Statistics title={'Concurrency'} attributes={this.state.countList} text={'hier wird die statistik angezeit'}/>;
				}
					break;
				case 'Cognitive': {
					html = <Statistics title={'Cognitive'} attributes={this.state.countList} text={'hier wird die statistik angezeit'}/>;
				}
					break;
				default:
					console.log('Unknown Page Sorry for that :-/ :' + statisticSwitch);
			}
		}
		let array = ['Size', 'Separability', 'Sequentiality', 'Structuredness', 'Cyclicity', 'Concurrency', 'Cognitive'];
		let statisticPage = this.state.statisticPage;

		return (
			<div className="  col-12 p-t-0 px-0 mx-auto my-auto font-family-arial">
				<div className="d-flex mt-2 col-12">
					<div className='col-lg-1 col-md-2 my-auto' onClick={() => this.handleSidebar()}>
						<img src={BurgerNav} className={'burger-nav'}/>
					</div>
					<div className='col-10 d-flex border-right-left justify-content-center'>
						<img src={PrevaGif} className="preva-icon" alt={'preva'}/>
						<h1 className={'header-preva'}>Preva</h1>
					</div>
				</div>

				<hr className="mt-0 hr-line"/>
				<div id={'sidebar'} className={'d-none'}>
					<ul>
						<li>
							<div>Product</div>
						</li>
						<hr className={'hr-content'}/>

						<li>
							<div>Motivation</div>
						</li>
						<hr className={'hr-content'}/>

						<li>
							<div>Team</div>
						</li>
						<hr className={'hr-content'}/>

					</ul>
				</div>
				{!statisticPage ?
					<div>
						<div className="pt-5 justify-content-center">
							<form className="col-12" action="http://localhost:6318/controller/upload.php" encType="multipart/form-data"
								method="post"
								id="formUpload"
								onSubmit={(e) => this.handleSubmit(e)}>
								<div className="col-12 text-center mb-3">
									<div className="mx-auto text-left">
										<input className="form-control" accept="image/*" type="hidden" name="MAX_FILE_SIZE" value="30000"/>
										{/*<h4 className="col-12 mb-3 text-center">Please select your process model...</h4>*/}
										<div className={'row'}>
											<div className={' col-lg-6 col-md-12 my-auto'}>
												<div className='card mx-0'>
													<h3>Upload</h3>
													Click here to upload your Processmodel!
													<div className="cursor-pointer py-2 text-center">

														<div className="p-2 search-icon hover-upload"
															onClick={() => this.click(status)}>
															<img src={UploadIcon} className="icon-text"/>
															&nbsp;Upload
															<input onChange={() => this.showUploadButton()} name="userfile" id="userfile"
																className="d-none"
																type="file"/>
														</div>
													</div>
													<div className="cursor-pointer py-2 text-center">

														<button id="uploadButton2" type="submit"
															onClick={() => this.toggleModal(document.getElementById('loadingScreen'))}
															className="cursor-pointer success-color py-2 text-center submitButton d-none search-icon justify-content-center w-100"
														>
															<img src={SearchIcon} className="icon-text my-auto"/>
															&nbsp;Analysis
														</button>
														<div className="col-4 my-auto" style={dnone}>
															<div id="fileName"/>
														</div>
													</div>
												</div>
											</div>
											<div className={'col-lg-6 col-md-12 pa-2'}>
												<div className="image-upload list-container my-4"/>
											</div>
										</div>
										<hr className={'content-hr'}/>
										<div className="row">

											<div className="col-md-12 col-lg-6 mx-auto pa-2 second-list-order-image">
												<div className='get-started list-container my-4'/>
											</div>
											<div className={'col-lg-6 col-md-12 my-auto second-list-order-text'}>
												<div className={'card mx-0'}>
													<h3>Guidance</h3>
													Here u can find a checklist to ensure your Processmodel is set up properly
													<div className="p-2 search-icon hover-upload">
														<img src={DownloadIcon} className="icon-text"/>
														&nbsp;Download
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>

						{/* SUCCESS-BOX*/}
						<SuccessBox PrevaIcon={PrevaIcon} dnone={dnone}/>

						{/* Error-box */}
						{/*TODO: delete input field if error */}
						<ErrorBox PrevaIcon={PrevaIcon} dnone={dnone}/>
						<div className="overlay" id="loadingScreen" style={dnone}>
							<div className="mx-auto rounded-button modal-style bg-preva-loadingscreen">
								<div className="" role="document">
									<div className=" p-4 border-rounded row">
										<h4 id="test1" className="col-12 text-center animate-flicker1 animation-style"/>
										<div className="col-12 pt-0 mt-0 text-center saving animation-style-points">
											<span> .</span><span>.</span><span>. </span></div>
									</div>
								</div>
								{/*	 Converting Model Analyzing Model Prepare Analysis*/}
							</div>
						</div>
					</div>
					:
					<div>
						<div className="container">
							<div className="row">
								<div className="col-lg-6 col-xl-4 col-md-12 p-1 min-height-statistic">
									<div className="card border-shadow-statistic">
										<table className="table min-height-statistic mb-0">
											<thead>
											<tr>
												<th scope="col" className={'table-heading-padding'}><h5 className="my-auto"><b>Category</b></h5>
												</th>
												<th scope="col" className="table-heading-padding text-center"><h5 className="my-auto">
													<b>Status</b></h5></th>
												<th scope="col" className="table-heading-padding text-center"><h5 className="my-auto">
													<b>Action</b></h5></th>
											</tr>
											</thead>
											<tbody>
											{array.map((value, i) => {
												return <StatisticTable
													bpmndiList={this.state.bpmndiList}
													id={array[i]}
													key={i}
													selectedStatistic={selectedStatistic}
													handleSwitch={() => this.handleSwitch(array[i], array[i])}
													name={array[i]}
													status={i}
												/>;
											})}
											</tbody>
										</table>
									</div>
								</div>
								<div className="col-lg-6 col-xl-4 col-md-12 p-1">
									<div className="card border-shadow-statistic">
										<div>{html}</div>
									</div>
								</div>
								<div className="col-lg-6 col-xl-4 col-md-12 d-flex p-1">
									<div className="card border-shadow-statistic min-height-statistic w-100">
										{/*<canvas id="myChart" width="400" height="400"></canvas>*/}
										<div><h2 className='text-center'><b>Trend</b></h2>
											<hr className='mt-0 hr-border'/>
											<div>This card is an example.</div>
											<br/>
											<div className="text-center">
												<img src={Speedometa} className='messureIcon'/>
											</div>
										</div>
									</div>
								</div>
								<div className="pt-3 col-12 analyse-buttons">
									<div className="btn col-md-12 col-lg-2 ml-auto">
										<button
											className="d-flex justify-content-center  btn border-shadow-statistic button-border hover-upload w-100"
											onClick={() => this.handleBackToUpload(this.state.statisticPage)}>
											<img src={BackIcon} className='icon-text mr-1 my-auto'/>
											<div>
												back
											</div>
										</button>
									</div>

									{/*<div className="btn">*/}
									{/*	<button className="btn border-shadow-statistic button-border hover-upload"*/}
									{/*		onClick={() => this.getData()}> get data*/}
									{/*	</button>*/}
									{/*</div>*/}

									{/* CREATE PDF */}
									<form className="btn col-md-12 col-lg-2 " action={'http://localhost:6318/controller/makepdf.php'}
										method="post">
										<input type="text" name="dataName" className="d-none" defaultValue={this.state.dataName}/>
										<button
											className="d-flex justify-content-center  btn w-100 border-shadow-statistic button-border hover-upload"
											type='submit'>
											<img src={PDFIcon} className='icon-text mr-1 my-auto'/>
											<div>Create Pdf</div>
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				}
			</div>
		);
	}

}
const SuccessBox = ({ dnone, PrevaIcon }) => (
	<div className="card p-3 success-box-style" id="successBox" style={dnone}>
		<div className="row">
			<div className="col-3 text-center my-auto">
				<img src={PrevaIcon} className="icon"/>
			</div>
			<div className="col-9 pr-0">
				<b>Success!</b>
				<p>Process model <b id="successBoxItem"/> uploaded successfully!</p>
			</div>
		</div>
	</div>
);

const ErrorBox = ({ dnone, PrevaIcon }) => (
	<div className="card p-3 error-box-style" id="errorMessage" style={dnone}>
		<div className="row">
			<div className="col-3 text-center my-auto">
				<img src={PrevaIcon} className="icon"/>
			</div>
			<div className="col-9 pr-0">
				<b>Error!</b>
				<p className="mb-0">Invalid process model format.</p>
				<p>Data<b>.bpmn</b> only!</p>
			</div>
		</div>
	</div>
);
