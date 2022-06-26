import React from 'react';
import Statistics from './statistic/statistics';
import StatisticTable from './statistic/statistictable';
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
import {Trends} from './dashboard/trends';
import {SuccessBox, ErrorBox} from './boxes';
import BpmnViewer from 'bpmn-js';
import bpmnView from './bpmnView';
import RadarChart from 'react-svg-radar-chart';

import propertiesPanelModule from 'bpmn-js-properties-panel';
import XMLParser from 'react-xml-parser';
import ReactBpmn from 'react-bpmn';
import 'bpmn-js/dist/assets/diagram-js.css';
import Modeler from 'bpmn-js/lib/Modeler';
import 'react-svg-radar-chart/build/css/index.css';
import Viewer from 'bpmn-js';

export default class Upload extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bpmn:                  '',
			bpmndiList:            [],
			countList:             [],
			noa:                   [],
			bpmnList:              [],
			objectSummary:         [],
			allLists:              [],
			seperability:          [],
			processTab:            'metrickz',
			statisticSwitch:       'All',
			selectedStatistic:     'All',
			dataName:              '',
			doitonce:              0,
			errorMsg:              false,
			scale:                 0,
			allSize:               0,
			allStructure:          0,
			allOperator:           0,
			defaultScaleSize:      0,
			defaultScaleStructure: 0,
			defaultScaleOperator:  0,
			cnc:                   0,
			cognitiveWeight:       0,
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
		this.handleMPDF = this.handleMPDF.bind(this);
		this.handleBoxes = this.handleBoxes.bind(this);
		this.handleScale = this.handleScale.bind(this);
	}

	handleBoxes(type, message) {
		let textId = document.getElementById(type + 'Text');
		let boxId = document.getElementById(type + 'Box');
		if (type === 'error') {
			if (message) {
				textId.innerHTML = '<b>Mandatory graphical elements are missing</b><p>Check for: <b>' + message + '</b></p>';
			} else {
				textId.innerHTML = '<b>Error!</b><p>Invalid process model format.</p><p>Data<b>.bpmn</b> only!</p>';
			}

			boxId.style.display = 'block';
		}

		window.setTimeout(function() {
				boxId.classList.add('box-fade-out');
			}
			, 750);
		window.setTimeout(function() {
				boxId.classList.remove('box-fade-out');
				boxId.style.display = 'none';
			}
			, 2300);
	}

	toggleModal(type, msg) {
		let modalId = document.getElementById('loadingScreen');

		if (type && modalId.style.display === 'none') {
			modalId.style.display = 'block';
		} else {
			modalId.style.display = 'none';
		}

		if (type) {
			window.setTimeout(
				() => this.props.handleStatisticPage(), 9000
			);
		} else {
			this.handleBoxes('error', msg);
		}
	}

	handleMPDF() {
		fetch(Route.createPdf, {
			headers: {
				'Content-Type': 'application/json',
			},
			method:  'POST',
			cache:   'no-cache'
		}).then();
	}

	handleBPMNView() {
		if (this.state.doitonce < 2) {
			let canvas = null;
			const container = document.getElementById('canvas');
			const modeler = new Modeler({
				container,
				keyboard:        {
					bindTo: document
				},
				propertiesPanel: {
					parent: container
				}
			});
			fetch(Route.getBPMN)
				.then(r => r.text())
				.then(xml => modeler.importXML(xml).then(() => {
					canvas = modeler.get('canvas');
				}))
				.then(() => this.handleTabs('processModel'));
		}
	}

	handleTabs(id) {
		document.getElementById(id).classList.add('active');

		if (id === 'trend') {
			document.getElementById('metrickz').classList.remove('active');
			document.getElementById('processModel').classList.remove('active');

			this.setState({ processTab: 'trend', doitonce: 0 });
		} else if (id === 'metrickz') {
			document.getElementById('trend').classList.remove('active');
			document.getElementById('processModel').classList.remove('active');

			this.setState({ processTab: 'metrickz', doitonce: 0 });
		} else {
			document.getElementById('trend').classList.remove('active');
			document.getElementById('metrickz').classList.remove('active');
			let doitonce = this.state.doitonce;
			doitonce++;
			this.handleBPMNView();

			this.setState({ processTab: 'processModel', doitonce: doitonce });
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
		let uploadButton = document.getElementById('uploadButton');

		// get fileName
		let fileName = document.getElementById('fileName');

		if (file.files.length !== 0) {
			// filter the name "example.bpmn" from "C:\fakepath\example.bpmn"
			let startIndex = (fileValue.indexOf('\\') >= 0 ? fileValue.lastIndexOf('\\') : fileValue.lastIndexOf('/'));

			//transform to string
			let filename = fileValue.substring(startIndex);
			let str = filename;
			// validation of bpmn
			let patt = /.bpmn/g;

			// if no .bpmn we stop here
			if (!str.match(patt)) {
				this.handleBoxes('error');

				uploadButton.classList.add('d-none');
				fileName.innerHTML = '';

				document.getElementById('errorBox').style.display = 'block';
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

			this.handleBoxes('success');

			document.getElementById('errorBox').style.display = 'none';
			document.getElementById('successBoxItem').innerHTML = filename;
			document.getElementById('successBox').style.display = 'block';

			fileName.innerHTML = filename;
			let saveName = filename.slice(0, filename.length - 5);

			this.setState({ dataName: saveName });
		} else {
			uploadButton.classList.add('d-none');
			fileName.innerHTML = '';
			document.getElementById('successBox').style.display = 'none';
			document.getElementById('errorBox').style.display = 'none';
		}
	}

	click() {
		let file = document.getElementById('userfile');
		file.click();
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
			},
			cache:   'no-cache'
		})
			.then(data => {return data.json();})
			.then(data => {
				if (data.error) {
					this.toggleModal(false, data.error);

					this.setState({ errorMsg: data.error });
				} else {
					this.toggleModal(true);
					this.setState({
						allLists:      data,
						countList:     data['list'],
						bpmndiList:    data['bpmndiList'],
						objectSummary: data['objectSummary'],
						noaList:       data['noa'],
						noa:           data['noa'],
					});
					if (this.state.allLists) {
						this.handleScale();
					}
				}
			})
			.catch((error) => console.log(error));
	}

//	scale = höchste zahl von noa noac etc. ist scale
	handleChange(e) {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		this.setState({ [name]: value });
	}

	handleScale() {
		let allLists = this.state.allLists;
		let noa = Number(allLists['noa'] ? allLists['noa'] : 0).toFixed(2);
		let noac = Number(allLists['noac'] ? allLists['noac'] : 0).toFixed(2);
		let sequenceFlow = Number(allLists['sequenceFlow'] ? allLists['sequenceFlow'] : 0).toFixed(2);
		let cognitiveWeight = Number(allLists['cognitiveWeight'] ? allLists['cognitiveWeight'] : 0).toFixed(2);
		let density = Number(allLists['density'] ? allLists['density'] : 0).toFixed(2);
		let separability = Number(allLists['separability'] ? allLists['separability'] : 0).toFixed(2);
		let sequentiality = Number(allLists['sequentiality'] ? allLists['sequentiality'] : 0).toFixed(2);
		let diameter = Number(allLists['diameter'] ? allLists['diameter'] : 0).toFixed(2);
		let cnc = (sequenceFlow - noac + 1).toFixed(2);
		let maxNestingDepth = Number(allLists['maxNestingDepth'] ? allLists['maxNestingDepth'] : 0).toFixed(2);
		let avgDegreeOfConnectors = Number(allLists['avgDegreeOfConnectors'] ? allLists['avgDegreeOfConnectors'] : 0).toFixed(2);
		let maxDegreeOfConnectors = Number(allLists['maxDegreeOfConnectors'] ? allLists['maxDegreeOfConnectors'] : 0).toFixed(2);
		let binaryDecisions = Number(allLists['binaryDecisions'] ? allLists['binaryDecisions'] : 0).toFixed(2);
		let controlFlowComplexity = Number(allLists['controlFlowComplexity'] ? allLists['controlFlowComplexity'] : 0).toFixed(2);
		let concurrency = Number(allLists['concurrency'] ? allLists['concurrency'] : 0).toFixed(2);
		let allSize = ((Number(noa) + Number(noac) + Number(cnc) + Number(density)) / 4).toFixed(2);
		let cyclicity = Number(allLists['cyclicity'] ? allLists['cyclicity'] : 0).toFixed(2);
		let allStructure = ((Number(separability) + Number(diameter) + Number(sequentiality)) / 3).toFixed(2);
		let cyclomaticNumber = Number(allLists['cyclomaticNumber'] ? allLists['cyclomaticNumber'] : 0).toFixed(2);
		let allOperator = ((Number(maxDegreeOfConnectors) + Number(maxNestingDepth) + Number(avgDegreeOfConnectors) +
			Number(binaryDecisions) + Number(concurrency) + Number(controlFlowComplexity)) / 6).toFixed(2);

		let defaultScale = 0;

		allSize = Number(allSize);
		allStructure = Number(allStructure);
		allOperator = Number(allOperator);
		cognitiveWeight = Number(cognitiveWeight);

		if (allSize > allStructure && allSize > allOperator && allSize > cognitiveWeight) {
			defaultScale = allSize;
		} else if (allStructure > allSize && allStructure > allOperator && allStructure > cognitiveWeight) {
			defaultScale = allStructure;
		} else if (allOperator > allSize && allOperator > allStructure && allOperator > cognitiveWeight) {
			defaultScale = allOperator;
		} else {
			defaultScale = cognitiveWeight;
		}

		let defaultScaleSize = 0;
		noa = Number(noa);
		noac = Number(noac);
		cnc = Number(cnc);
		density = Number(density);

		if (noa > noac && noa > cnc && noa > density) {
			defaultScaleSize = noa;
		} else if (noac > noa && noac > cnc && noac > density) {
			defaultScaleSize = noac;
		} else if (cnc > noac && cnc > noa && cnc > density) {
			defaultScaleSize = cnc;
		} else {
			defaultScaleSize = density;
		}

		let defaultScaleStructure = 0;
		cyclicity = Number(cyclicity);
		cyclomaticNumber = Number(cyclomaticNumber);
		separability = Number(separability);
		sequentiality = Number(sequentiality);
		diameter = Number(diameter);

		if (cyclicity > cyclomaticNumber && cyclicity > separability && cyclicity > sequentiality && cyclicity > diameter) {
			defaultScaleStructure = cyclicity;
		} else if (cyclomaticNumber > cyclicity && cyclomaticNumber > separability && cyclomaticNumber > sequentiality && cyclomaticNumber > diameter) {
			defaultScaleStructure = cyclomaticNumber;
		} else if (separability > cyclomaticNumber && separability > cyclicity && separability > sequentiality && separability > diameter) {
			defaultScaleStructure = separability;
		} else if (diameter > cyclomaticNumber && diameter > separability && diameter > sequentiality && diameter > cyclicity) {
			defaultScaleStructure = diameter;
		} else {
			defaultScaleStructure = sequentiality;
		}

		let defaultScaleOperator = 0;
		maxNestingDepth = Number(maxNestingDepth);
		avgDegreeOfConnectors = Number(avgDegreeOfConnectors);
		maxDegreeOfConnectors = Number(maxDegreeOfConnectors);
		binaryDecisions = Number(binaryDecisions);
		concurrency = Number(concurrency);
		controlFlowComplexity = Number(controlFlowComplexity);

		if (maxNestingDepth && maxNestingDepth > avgDegreeOfConnectors && maxNestingDepth > maxDegreeOfConnectors && maxNestingDepth > binaryDecisions && maxNestingDepth > controlFlowComplexity && maxNestingDepth > concurrency) {
			defaultScaleOperator = maxNestingDepth;
		} else if (avgDegreeOfConnectors && avgDegreeOfConnectors > maxNestingDepth && avgDegreeOfConnectors > maxDegreeOfConnectors && avgDegreeOfConnectors > binaryDecisions && avgDegreeOfConnectors > controlFlowComplexity && avgDegreeOfConnectors > concurrency) {
			defaultScaleOperator = avgDegreeOfConnectors;
		} else if (maxDegreeOfConnectors && maxDegreeOfConnectors > avgDegreeOfConnectors && maxDegreeOfConnectors > maxNestingDepth && maxDegreeOfConnectors > binaryDecisions && maxDegreeOfConnectors > controlFlowComplexity && maxDegreeOfConnectors > concurrency) {
			defaultScaleOperator = maxDegreeOfConnectors;
		} else if (binaryDecisions && binaryDecisions > avgDegreeOfConnectors && binaryDecisions > maxDegreeOfConnectors && binaryDecisions > maxNestingDepth && binaryDecisions > controlFlowComplexity && binaryDecisions > concurrency) {
			defaultScaleOperator = binaryDecisions;
		} else if (concurrency && concurrency > avgDegreeOfConnectors && concurrency > maxDegreeOfConnectors && concurrency > binaryDecisions && concurrency > controlFlowComplexity && concurrency > maxNestingDepth) {
			defaultScaleOperator = concurrency;
		} else if (controlFlowComplexity && controlFlowComplexity > avgDegreeOfConnectors && controlFlowComplexity > maxDegreeOfConnectors && controlFlowComplexity > binaryDecisions && controlFlowComplexity > maxNestingDepth && controlFlowComplexity > concurrency) {
			defaultScaleOperator = controlFlowComplexity;
		}

		let defaultScaleCognitive = 0;

//		defaultScale=1

		this.setState({
			scale:                 defaultScale,
			allSize:               allSize,
			allStructure:          allStructure,
			allOperator:           allOperator,
			defaultScaleSize:      defaultScaleSize,
			cnc:                   cnc,
			defaultScaleStructure: defaultScaleStructure,
			defaultScaleOperator:  defaultScaleOperator
		});
	}

	render() {
		let status = this.props.status;
		let statisticSwitch = this.state.statisticSwitch;
		let html;
		let selectedStatistic = this.state.selectedStatistic;
		let dnone = { display: 'none' };

		let data = [{
			data: {
				size:            this.state.allSize / this.state.scale,
				Structure:       this.state.allStructure / this.state.scale,
				Operators:       this.state.allOperator / this.state.scale,
				CognitiveWeight: this.state.allLists.cognitiveWeight / this.state.scale,
			},

			meta: { fill: 'none', color: 'blue' }
		}];

		let captions = {
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
								first:  this.state.allLists.noa / this.state.defaultScaleSize,
								second: this.state.allLists.noac / this.state.defaultScaleSize,
								third:  this.state.cnc / this.state.defaultScaleSize,
								forth:  this.state.allLists.density / this.state.defaultScaleSize,
							},
							meta: { fill: 'none', color: 'blue' }
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
								first:  this.state.allLists.cyclicity / this.state.defaultScaleStructure,
								second: this.state.allLists.cyclomaticNumber / this.state.defaultScaleStructure,
								third:  this.state.allLists.separability / this.state.defaultScaleStructure,
								fourth: this.state.allLists.sequentiality / this.state.defaultScaleStructure,
								fifth:  this.state.allLists.diameter / this.state.defaultScaleStructure,
							},
							meta: { fill: 'none', color: 'blue' }
						}
					];
					captions = {
						first:  'Cyclicity',
						second: 'Cyclomatic Number',
						third:  'Seperability',
						fourth: 'Sequentiality',
						fifth:  'Diameter',
					};
				}
					break;

				case 'Operator': {
					html =
						<Statistics title={'Operator'} allLists={this.state.allLists} attributes={this.state.countList} noa={this.state.noa}/>;
					data = [
						{
							data: {
								first:  this.state.allLists.maxNestingDepth / this.state.defaultScaleOperator,
								second: this.state.allLists.avgDegreeOfConnectors / this.state.defaultScaleOperator,
								third:  this.state.allLists.maxDegreeOfConnectors / this.state.defaultScaleOperator,
								forth:  this.state.allLists.binaryDecisions / this.state.defaultScaleOperator,
								fifth:  this.state.allLists.controlFlowComplexity / this.state.defaultScaleOperator,
								sixth:  this.state.allLists.concurrency / this.state.defaultScaleOperator,
							},
							meta: { fill: 'none', color: 'blue' }
						}
					];
					captions = {
						first:  'MND',
						second: 'ADC',
						third:  'MDCs',
						forth:  'Binary decisions',
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
							meta: { fill: 'none', color: 'blue' }
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
								<h1>The BPMN<br/>METRIC SUITE</h1><br/>
								<p>Generate unique insights by analyzing your business process models</p>
								<div onClick={() => this.props.handlePage('product', true)} className="preva-btn">Learn more</div>
							</div>
						</div>
						<form className="col-12" action={Route.upload} encType="multipart/form-data"
							method="post"
							id="formUpload"
							onSubmit={(e) => this.handleSubmit(e)}>
							<section>
								<div className="introduction-container">
									<h2>GET STARTED</h2>
									<p className="font-weight-bold">Learn how to generate business process model insights in four easy steps</p>
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
												<p>Read the convention guidlines to properly prepare your business process model</p>
												<div className="d-flex">
													<a className="preva-btn"
														href={'/ConventionGuidline_Preva.pdf'}
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
												<p>Click here to upload your process model</p>
												<div className="ml-auto preva-btn"
													onClick={() => this.click(status)}>
													<img src={UploadIcon} className="icon-text"/>
													&nbsp;Upload
													<input onChange={() => this.showUploadButton()} name="userfile" id="userfile"
														className="d-none"
														type="file"/>
												</div>
												<div className="cursor-pointer py-2 ml-auto">
													<button id="uploadButton" type="submit"
														//														onClick={() => this.toggleModal(document.getElementById('loadingScreen'))}
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
												<p>Preva analyzes and visualizes relevant information about your business process model</p>
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
						<div id="uploadTabs" className="col-12 flex-wrap">
							<h2 id="processModel" className="col-4 text-center" onClick={() => this.handleBPMNView()}>
								Process model
							</h2>
							<h2 id="metrickz" className="col-4 text-center metrickz active" onClick={() => this.handleTabs('metrickz')}>
								Metrics
							</h2>
							<h2 id="trend" className="col-4 text-center trend" onClick={() => this.handleTabs('trend')}>
								Trend
							</h2>
						</div>

						{/* <--- processModel ---> */}
						{this.state.processTab === 'processModel' ? <ProcessModel dataName={this.state.dataName}/> : null}

						{/* <--- metrickz ---> */}
						{this.state.processTab === 'metrickz' ?
							<div className="flex-wrap show-metrickz w-100">
								<div className="col-lg-6 col-xl-4 col-md-12 p-1 min-height-statistic">
									<div className="card h-100 no-border-top border-shadow-statistic">
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
									<div className="card h-100 border-shadow-statistic">
										<div>{html}</div>
									</div>
								</div>
								<div className="col-lg-6 col-xl-4 col-md-12 d-flex p-1">
									<div className="card h-100 border-shadow-statistic min-height-statistic w-100">
										<h3>
											<b>Radar Chart</b>
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
								<div className="my-5 col-12 analyse-buttons">
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
									<form className="btn col-md-12 col-lg-2 " onSubmit={() => this.handleMPDF()} action={Route.createPdf}
										method="POST">
										<input type="text" name="dataName" className="d-none" defaultValue={this.state.dataName}/>
										<button type="submit"
											className="d-flex justify-content-center preva-btn w-100">
											<img src={PDFIcon} className="icon-text mr-1 my-auto"/>
											<div>Create Pdf</div>
										</button>
									</form>
								</div>
							</div>
							: null}

						{/* <--- TREND ---> */}
						{this.state.processTab === 'trend' ?
							<Trends allLists={this.state.allLists}/> : null}
					</section>
				}
			</section>
		);
	}
}