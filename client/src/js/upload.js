import React from 'react';
import Statistics from './statistic/statistics';
import StatisticTable from './statistic/statistictable';
import Trends from './dashboard/dashboard-points';
import PrevaIcon from '../assets/preva_icon.png';
import SearchIcon from '../assets/search_png.png';
import UploadIcon from '../assets/upload.png';
import DownloadIcon from '../assets/download.png';
import BackIcon from '../assets/back.png';
import PDFIcon from '../assets/pdf.png';
import Cloudupload from '../assets/cloudupload.png';
import DashboardImg from '../assets/dashboard.png';
import Export from '../assets/export.png';
import ConventionGuide from '../assets/conventionGuide.png';
import {ProcessModel} from './dashboard/dashboard-points';
import {SuccessBox, ErrorBox} from './boxes';
import BpmnJS from 'bpmn-js';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import XMLParser from 'react-xml-parser';
import ReactBpmn from 'react-bpmn';
import 'bpmn-js/dist/assets/diagram-js.css';
import Modeler from 'bpmn-js/lib/Modeler';
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css';

export default class Upload extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bpmn:              '',
			bpmndiList:        [],
			countList:         [],
			noa:               [],
			bpmnList:          [],
			objectSummary:     [],
			testVersion:       [],
			allLists:          [],
			seperability:      [],
			statisticSwitch:   'All',
			selectedStatistic: 'All',
			dataName:          '',
			doitonce:          false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.getData = this.getData.bind(this);
		this.click = this.click.bind(this);
		this.showUploadButton = this.showUploadButton.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSwitch = this.handleSwitch.bind(this);
		this.handleData = this.handleData.bind(this);
		this.handleTabs = this.handleTabs.bind(this);
		this.handleBPMNView = this.handleBPMNView.bind(this);
	}

	handleBPMNView() {
		if (!this.state.doitonce) {
			const viewer = new BpmnJS({
				container: document.getElementById('bpmn'),
				additionalModules: [
//					propertiesPanelModule
				],
				width:     '100%',
				height:    '100%',
				minHeight: '100%',
				minWidth:  '100%',
				keyboard:  {
					bindTo: document
				},
			});
//		fetch('http://localhost:6318/test.xml')
			fetch(Route.getBPMN)
				.then(r => r.text())
				.then(xml => viewer.importXML(xml))
				.then(() => {
//					document.getElementById('bpmn').querySelector('svg').viewBox = '0 0 500 500';
					this.setState({ doitonce: true });
				});
		}
	}

	handleTabs(id) {
		document.getElementById(id).classList.add('active');

		if (id === 'trend') {
			document.getElementById('metrickz').classList.remove('active');
			document.getElementById('processModel').classList.remove('active');
			document.querySelector('.show-metrickz').classList.add('d-none');
			document.querySelector('.show-processModel').classList.add('d-none');
			document.querySelector('.show-trend').classList.remove('d-none');
		} else if (id === 'metrickz') {
			document.getElementById('trend').classList.remove('active');
			document.getElementById('processModel').classList.remove('active');
			document.querySelector('.show-metrickz').classList.remove('d-none');
			document.querySelector('.show-trend').classList.add('d-none');
			document.querySelector('.show-processModel').classList.add('d-none');
		} else {
			document.getElementById('trend').classList.remove('active');
			document.getElementById('metrickz').classList.remove('active');
			document.querySelector('.show-metrickz').classList.add('d-none');
			document.querySelector('.show-trend').classList.add('d-none');
			document.querySelector('.show-processModel').classList.remove('d-none');
			this.handleBPMNView();
		}
	}

	handleSwitch(changeStatistic, id) {
		this.setState({ statisticSwitch: changeStatistic, selectedStatistic: id });
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

	componentDidUpdate() {

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

		window.setTimeout(
			() => this.props.handleStatisticPage(), 9000
		);
	}

	handleSubmit(e) {
		e.preventDefault();
		const file = document.getElementById('userfile').files[0];
		this.props.uploadAjax(file)
			.then(() => this.getData())
			.catch(e => console.error(e));
	};

	handleData(e) {
		e.preventDefault();

		this.handleSubmit(e.target);
	};

	getData() {
		fetch(Route.upload, {
			method:  'GET',
			headers: {
				'Content-Type': 'application/json',
//				'Access-Control-Allow-Origin': '*',
			},
			cache:   'no-cache'
		})
			.then(data => {return data.json();})
			.then((data) => this.setState({
				allLists:      data,
				countList:     data['list'],
				bpmndiList:    data['bpmndiList'],
				objectSummary: data['objectSummary'],
				noaList:       data['noa'],
				noa:           data['noa'],
			}))
		;
	}

	handleChange(e) {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		this.setState({ [name]: value });
	}

	render() {
		let status = this.props.status;
		let statisticSwitch = this.state.statisticSwitch;
		let html;
		let selectedStatistic = this.state.selectedStatistic;
		let dnone = {
			display: 'none',
		};
		let data = [{
			data: {
				size:            this.state.allLists.noa / 10,
				Structure:       0.8,
				Operators:       0.9,
				CognitiveWeight: this.state.allLists.cognitiveWeight / 10
			},
			meta: { color: 'blue' }
		}];

		let captions = {
			// columns
			size:            'Size',
			Structure:       'Structure',
			Operators:       'Operators',
			CognitiveWeight: 'Cognitive weight'
		};

		if (statisticSwitch) {
			switch (statisticSwitch) {
				case 'All': {
					html = <Statistics title={'All'} allLists={this.state.allLists} attributes={this.state.countList} noa={this.state.noa}/>;
				}
					break;

				case 'Size': {
					html = <Statistics title={'Size'} allLists={this.state.allLists} attributes={this.state.countList} noa={this.state.noa}/>;
					data = [
						{
							data: {
								first:  this.state.allLists.noa / 100,
								second: this.state.allLists.noac / 100,
								third:  0.1 / 100,
								forth:  this.state.allLists.density / 100,
							},
							meta: { color: 'blue' }
						}
					];

					captions = {
						first:  'NOA',
						second: 'NOAC',
						third:  'CNC',
						forth:  'Density',
					};
				}
					break;
				case 'Structure': {
					html =
						<Statistics title={'Structure'} allLists={this.state.allLists} attributes={this.state.countList} noa={this.state.noa}/>;
					data = [
						{
							data: {
								first:  this.state.allLists.separability / 100,
								second: this.state.allLists.sequentiality / 100,
								third:  this.state.allLists.diameter / 100,
							},
							meta: { color: 'blue' }
						}
					];
					captions = {
						first:  'Seperability',
						second: 'Sequentiality',
						third:  'Diameter',
					};
				}
					break;

				case 'Operator': {
					html =
						<Statistics title={'Operator'} allLists={this.state.allLists} attributes={this.state.countList} noa={this.state.noa}/>;
					data = [
						{
							data: {
								first:  this.state.allLists.maxNestingDepth / 10,
								second: this.state.allLists.avgDegreeOfConnectors / 10,
								third:  this.state.allLists.maxDegreeOfConnectors / 10,
								forth:  this.state.allLists.binaryDecisions / 10,
								fifth:  this.state.allLists.controlFlowComplexity / 10,
								sixth:  this.state.allLists.concurrency / 10,
							},
							meta: { color: 'blue' }
						}
					];
					captions = {
						first:  'Nesting depth',
						second: 'Average degree of connectors',
						third:  'Maximum degree of connectors',
						forth:  'Binary decissions',
						fifth:  'CFC',
						sixth:  'Concurrency',
					};
				}
					break;

				case 'Cognitive': {
					html =
						<Statistics title={'Cognitive'} allLists={this.state.allLists} attributes={this.state.countList} noa={this.state.noa}/>;
					data = [
						{
							data: {
								first: this.state.allLists.cognitiveWeight / 100,
							},
							meta: { color: 'blue' }
						}
					];

					captions = {
						first: 'cognitiveWeight',
					};
				}
					break;
				default:
					console.log('Unknown Page Sorry for that :-/ :' + statisticSwitch);
			}
		}
		let array = ['All', 'Size', 'Structure', 'Operator', 'Cognitive'];
		let statisticPage = this.props.statisticPage;

		if (statisticSwitch) {
			switch (statisticSwitch) {
				case 'Size': {

				}
					break;
			}
		}

		return (
			<section id="productPage" className="col-12 p-t-0 px-0 mx-auto my-auto font-family-arial">
				{!statisticPage ?
					<div>
						<div id="home" className="justify-content-center">
							<div className="full-height-bg-height full-height-bg col-12">
								<h1>Learn how to mesure<br/>business process models</h1><br/>
								<p>Check out how to generate the best value out of your business process models and enable your business</p>
								<div onClick={() => this.props.handlePage('product', true)} className="preva-btn">Learn more</div>
							</div>
						</div>
						<form className="col-12" action={Route.upload} encType="multipart/form-data"
							method="post"
							id="formUpload"
							onSubmit={(e) => this.handleSubmit(e)}>

							<section>
								<div className="introduction-container">
									<h2>How to get started</h2>
									<p className="font-weight-bold">Use placeholder for better understanding</p>
								</div>

								<div className="mx-auto text-left">
									<input className="form-control" accept="image/*" type="hidden" name="MAX_FILE_SIZE" value="30000"/>

									<div className="row">
										<div className={'col-lg-6 col-md-12 my-auto order-responsive-second'}>
											<div className={'outline-number-content-1'}>
												<h3>Guidance</h3>
												<hr id="guidance"/>
												<input type="text" name="dataName" className="d-none"
													defaultValue={this.state.dataName}/>
												<p>Here u can find a checklist to ensure your Processmodel is set up properly</p>
												<div className="d-flex">
													<a className="preva-btn"
														href={'/ConventionGuidline_Preva_v1.pdf'}
														download>
														<img src={DownloadIcon} className="icon-text"/>
														&nbsp;Download
													</a>
												</div>
												<div className="outline-number">1</div>

											</div>
										</div>
										<div className="col-md-12 col-lg-6 mx-auto pa-2 text-center order-responsive-first">
											<img src={ConventionGuide} className="cloud-upload"/>
										</div>
									</div>

									<hr className={'content-hr'}/>

									<div className="row">
										<div className={'col-lg-6 col-md-12 pa-2 text-center'}>
											<img src={Cloudupload} className="cloud-upload"/>
										</div>
										<div className=" col-lg-6 col-md-12 my-auto">
											<div className="outline-number-content-2">
												<h3>Upload</h3>
												<hr id="uploadTitle"/>
												<p>Click here to upload your Processmodel!</p>
												<div className="ml-auto preva-btn"
													onClick={() => this.click(status)}>
													<img src={UploadIcon} className="icon-text"/>
													&nbsp;Upload
													<input onChange={() => this.showUploadButton()} name="userfile" id="userfile"
														className="d-none"
														type="file"/>
												</div>
												<div className="cursor-pointer py-2 ml-auto">
													<button id="uploadButton2" type="submit"
														onClick={() => this.toggleModal(document.getElementById('loadingScreen'))}
														className="submitButton d-none preva-btn"
													>
														<img src={SearchIcon} className="icon-text my-auto"/>
														&nbsp;Analysis
													</button>
													<div className="col-4 my-auto" style={dnone}>
														<div id="fileName"/>
													</div>
													<div className="outline-number">2</div>
												</div>
											</div>
										</div>
									</div>

									<hr className={'content-hr'}/>

									<div className="row">
										<div className={'col-lg-6 col-md-12 my-auto order-responsive-second'}>
											<div className={'outline-number-content-3'}>
												<h3>Dashboard</h3>
												<hr id="dashboardImg"/>
												<p>Get your process model analyzed and use the dashboard to check out the characteristics of your
													model</p>
												<div className="outline-number">3</div>
											</div>
										</div>
										<div className="col-md-12 col-lg-6 mx-auto pa-2 text-center order-responsive-first">
											<img src={DashboardImg} className="cloud-upload dashboard-img"/>
										</div>
									</div>

									<hr className={'content-hr'}/>

									<div className="row">
										<div className={'col-lg-6 col-md-12 pa-2 text-center export'}>
											<img src={Export} className="cloud-upload"/>
										</div>
										<div className=" col-lg-6 col-md-12 my-auto">
											<div className="outline-number-content-4">
												<h3>Export</h3>
												<hr id="export"/>
												<p>Use the export functionality to share the results with your colleagues</p>
												<div className="outline-number">4</div>
											</div>
										</div>
									</div>
								</div>
							</section>
						</form>

						{/* SUCCESS-BOX*/}
						<SuccessBox PrevaIcon={PrevaIcon} dnone={dnone}/>

						{/* Error-box */}
						<ErrorBox PrevaIcon={PrevaIcon} dnone={dnone}/>
						<div className="overlay" id="loadingScreen" style={dnone}>
							<div className="mx-auto rounded-button modal-style bg-preva-loadingscreen">
								<div className="" role="document">
									<div className=" p-4 border-rounded row">
										<h4 id="test1" className="col-12 text-center animate-flicker1 animation-style"/>
										<div className="col-12 pt-0 mt-0 text-center saving animation-style-points">
											<span style={{ color: '#cf33cf' }}> .</span><span style={{ color: '#0045c6' }}>.</span><span
											style={{ color: '#10d2c4' }}>. </span></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					:
					<section className="flex-wrap">
						<div className="col-12 flex-wrap">
							<h2 id="processModel" className="col-4 text-center" onClick={() => this.handleTabs('processModel')}>
								Processmodel
							</h2>
							<h2 id="metrickz" className="col-4 text-center metrickz active" onClick={() => this.handleTabs('metrickz')}>
								Metrics
							</h2>
							<h2 id="trend" className="col-4 text-center trend" onClick={() => this.handleTabs('trend')}>
								Trend
							</h2>

						</div>

						<ProcessModel/>
						<div className="flex-wrap show-metrickz w-100">
							<div className="col-lg-6 col-xl-4 col-md-12 p-1 min-height-statistic">
								<div className="card no-border-top border-shadow-statistic">
									<div className="table min-height-statistic mb-0 flex-wrap">
										<div id="Categories" className="flex-wrap col-12">
											<h5 className="mb-auto margin-top-h5 col-6 p-0">
												Category
												<hr className="w-100"/>
											</h5>
											<h5 className="mb-auto margin-top-h5 col-6 p-0 text-center">Status
												<hr className="w-100"/>
											</h5>
										</div>

										<div className="col-12 p-0">
											{/*<hr className="category-hr"/>*/}
											{array.map((value, i) => {
												return <StatisticTable
													bpmndiList={this.state.bpmndiList}
													id={array[i]}
													key={i}
													allLists={this.state.allLists}
													attributes={this.state.countList}
													selectedStatistic={selectedStatistic}
													handleSwitch={() => this.handleSwitch(array[i], array[i])}
													name={array[i]}
													status={i}
												/>;
											})}
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-6 col-xl-4 col-md-12 p-1">
								<div className="card border-shadow-statistic">
									<div>{html}</div>
								</div>
							</div>
							<div className="col-lg-6 col-xl-4 col-md-12 d-flex p-1">
								<div className="card border-shadow-statistic min-height-statistic w-100">
									<h3>
										<b>Trend</b>
										<hr/>
									</h3>
									<RadarChart
										className={'testChart'}
										captions={captions}
										data={data}
										dots={true}
										size={300}
									/>
								</div>
							</div>
							<div className="pt-3 mb-5 col-12 analyse-buttons">
								<div className="btn col-md-12 col-lg-2 ml-auto">
									<button
										className="d-flex justify-content-center preva-btn w-100"
										onClick={() => this.props.handleStartPage()}>
										<img src={BackIcon} className="icon-text mr-1 my-auto"/>
										<div>
											back
										</div>
									</button>
								</div>

								{/* CREATE PDF */}
								<form className="btn col-md-12 col-lg-2 " action={Route.createPdf}
									method="post">
									<input type="text" name="dataName" className="d-none" defaultValue={this.state.dataName}/>
									<button
										className="d-flex justify-content-center preva-btn w-100"
										type="submit">
										<img src={PDFIcon} className="icon-text mr-1 my-auto"/>
										<div>Create Pdf</div>
									</button>
								</form>
							</div>
						</div>
						 <Trends
							allLists={this.state.allLists}
						/>
					</section>
				}
			</section>
		);
	}
}