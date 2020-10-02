import React from "react";
import Statistics from "./statistic/statistics";
import StatisticTable from "./statistic/statistictable";
import PrevaIcon from "../assets/preva_icon.png";
import SearchIcon from "../assets/search_png.png";
import UploadIcon from "../assets/upload_icon.png";
import PrevaGif from "../assets/preva.gif";

export default class Upload extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bpmn:              "",
			bpmndiList:        "",
			statisticPage:     false,
			statisticSwitch:   "size",
			selectedStatistic: "size",
		};

		this.handleSubmit = this.handleSubmit.bind(this);
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
	}

	handleStatisticArray() {
	}

	handleSwitch(changeStatistic, id) {
		this.setState({ statisticSwitch: changeStatistic, selectedStatistic: id });
	}

	mixedChart() {
	}

	chart() {
		let bpmndiList = this.bpmndiList;
		let status = this.props.status;

		var ctx = document.getElementById("myChart").getContext("2d");
		var myChart = new Chart(ctx, {
			type:    "bar",
			data:    {
				labels:   ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
				datasets: [{
					label:           "# of Votes",
					data:            [12, 19, 3, 5, 2, 3],
					backgroundColor: [
						"rgba(255, 99, 132, 0.2)",
						"rgba(54, 162, 235, 0.2)",
						"rgba(255, 206, 86, 0.2)",
						"rgba(75, 192, 192, 0.2)",
						"rgba(153, 102, 255, 0.2)",
						"rgba(255, 159, 64, 0.2)"
					],
					borderColor:     [
						"rgba(255, 99, 132, 1)",
						"rgba(54, 162, 235, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(75, 192, 192, 1)",
						"rgba(153, 102, 255, 1)",
						"rgba(255, 159, 64, 1)"
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

	componentWillMount() {

	}

	showUploadButton() {
		let file = document.getElementById("userfile");
		let fileValue = document.getElementById("userfile").value;
		let uploadButton = document.getElementById("uploadButton2");
		let fileName = document.getElementById("fileName");
		if (file.files.length !== 0) {
			var startIndex = (fileValue.indexOf("\\") >= 0 ? fileValue.lastIndexOf("\\") : fileValue.lastIndexOf("/"));
			var filename = fileValue.substring(startIndex);
			var str = filename;
			var patt = /.bpmn/g;

			if (!str.match(patt)) {
				window.setTimeout(function() {
						document.getElementById("errorMessage").classList.add("success-box-fade-out");
					}
					, 1500);
				window.setTimeout(function() {
						document.getElementById("errorMessage").classList.remove("success-box-fade-out");
						document.getElementById("errorMessage").style.display = "none";
					}
					, 4500);

				uploadButton.classList.add("d-none");
				fileName.innerHTML = "";

				document.getElementById("errorMessage").style.display = "block";
				document.getElementById("successBox").style.display = "none";
				return;
			}

			if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
				filename = filename.substring(1);
			}
			uploadButton.classList.remove("d-none");
			fileName.innerHTML = filename;

			window.setTimeout(function() {
					document.getElementById("successBox").classList.add("success-box-fade-out");
				}
				, 1500);
			window.setTimeout(function() {
					document.getElementById("successBox").classList.remove("success-box-fade-out");
					document.getElementById("successBox").style.display = "none";
				}
				, 4500);

			document.getElementById("errorMessage").style.display = "none";
			document.getElementById("successBoxItem").innerHTML = filename;
			document.getElementById("successBox").style.display = "block";
		} else {
			uploadButton.classList.add("d-none");
			fileName.innerHTML = "";
			document.getElementById("successBox").style.display = "none";
			document.getElementById("errorMessage").style.display = "none";
		}
	}

	componentDidMount() {
//		this.chart();
	}

	click() {
		let file = document.getElementById("userfile");
		file.click();
	}

	toggleModal(modalId) {
		if (modalId.style.display === "none") {
			modalId.style.display = "block";
		} else {
			modalId.style.display = "none";
		}
		window.setTimeout(() => this.setState({ statisticPage: true }), 9000);
	}

	handleStatisticPage() {
		this.setState({ statisticPage: true });
	}

	handleSubmit({ target }) {
		const file = target.files[0];
		this.props.uploadAjax(file);
		this.getData();
	};

	getData() {
		console.log("drinnen");
		fetch("http://localhost:6318/controller/upload.php", {
			method:  "GET",
			headers: { "Content-Type": "application/json" },
			cache:   "no-cache"
		})
			.then(r => {return r.json();})
			.then((data) => this.setState({ bpmndiList: data }));
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
			display: "none",
		};
		switch (statisticSwitch) {
			case "size": {
				html = <Statistics title={"size"} text={"hier wird die statistik angezeit"}/>;
			}
				break;
			case "separability": {
				html = <Statistics title={"Separability"} text={"hier wird die statistik angezeit"}/>;
			}
				break;
			case "sequentiality": {
				html = <Statistics title={"Sequentiality"} text={"hier wird die statistik angezeit"}/>;
			}
				break;
			case "structuredness": {
				html = <Statistics title={"Structuredness"} text={"hier wird die statistik angezeit"}/>;
			}
				break;
			case "cyclicity": {
				html = <Statistics title={"Cyclicity"} text={"hier wird die statistik angezeit"}/>;
			}
				break;
			case "concurrency": {
				html = <Statistics title={"Concurrency"} text={"hier wird die statistik angezeit"}/>;
			}
				break;
			case "cognitive": {
				html = <Statistics title={"Cognitive"} text={"hier wird die statistik angezeit"}/>;
			}
				break;
			default:
				console.log("Unknown Page Sorry for that :-/ :" + statisticSwitch);
		}
		let array = ["size", "separability", "sequentiality", "structuredness", "cyclicity", "concurrency", "cognitive"];

		let statisticPage = this.state.statisticPage;
		return (

			<div className=" h-100 mt-5 col-12 p-5 h-100 mx-auto my-auto font-family-arial">
				<div className="row mt-2 col-12">
					<h1>Preva</h1>
				</div>

				<hr className="mt-0 hr-line"/>
				<div className="col-12 text-center mt-4 mb-5">
					<img src={PrevaGif} className="preva-icon" alt={"preva"}/>
				</div>
				{!statisticPage ?
					<div>
						<div className="pt-5 justify-content-center">
							<form className="col-12" action="http://localhost:6318/controller/upload.php" encType="multipart/form-data"
								method="post"
								id="formUpload"
								onSubmit={this.handleSubmit}>
								<div className="col-12 text-center mb-3">
									<div className="col-7 mx-auto text-left">
										<input className="form-control" accept="image/*" type="hidden" name="MAX_FILE_SIZE" value="30000"/>
										<h4 className="col-12 mb-3 text-center">Please select your process model...</h4>
										<div className="row col-12 justify-content-center">
											<div className="cursor-pointer py-2 px-4 text-center">
												<div className="p-2 search-icon hover-upload"
													onClick={() => this.click(status)}>
													<img src={UploadIcon} className="icon"/>
												</div>
												<div>Upload</div>
												<input onChange={() => this.showUploadButton()} name="userfile" id="userfile" className="d-none"
													type="file"/>
											</div>
											<div id="uploadButton2"
												onClick={() => this.toggleModal(document.getElementById("loadingScreen"))}
												className="cursor-pointer py-2 px-4 text-center d-none"
											>
												<div className="p-2 search-icon success-color">
													<img src={SearchIcon} className="icon"/>
												</div>
												<div>Analysis</div>
											</div>
											<div className="col-4 my-auto" style={dnone}>
												<div id="fileName"/>
											</div>
										</div>
										<button onClick={this.handleSubmit}>go test it</button>
										<button id="uploadButton"
											className="cursor-pointer col-2 p-2 btn-success border-shadow-statistic text-center d-none"
											type="submit">i am real upload
										</button>
									</div>
								</div>
							</form>
						</div>

						{/* SUCCESS-BOX*/}
						<SuccessBox PrevaIcon={PrevaIcon} dnone={dnone}/>

						{/* Error-box */}
						<ErrorBox PrevaIcon={PrevaIcon} dnone={dnone}/>

						<div className="overlay" id="loadingScreen" style={dnone}>
							<div className="container">
								<div className="rounded-button modal-style bg-preva-loadingscreen">
									<div className="h-100" role="document">
										<div className="h-100 p-4 border-rounded row">
											<div id="test1" className="col-12 text-center animate-flicker1 animation-style"/>
											<div className="col-12 text-center saving animation-style-points">
												<span> .</span><span>.</span><span>. </span></div>
										</div>
									</div>
									{/*	 Converting Model Analyzing Model Prepare Analysis*/}
								</div>
							</div>
						</div>
					</div>
					:
					<div>
						<div className="container">
							<div className="row">
								<div className="col-4 p-1 min-height-statistic">
									<div className="card border-shadow-statistic">
										<table className="table min-height-statistic mb-0">
											<thead>
											<tr>
												<th scope="col"><b>Type</b></th>
												<th scope="col" className="text-center"><b>Status</b></th>
												<th scope="col" className="text-center"><b>Action</b></th>
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
													status={"!"}
												/>;
											})}
											</tbody>
										</table>
									</div>
								</div>
								<div className="col-4 p-1">
									<div className="card border-shadow-statistic">
										<div>{html}</div>
									</div>
								</div>
								<div className="col-4 p-1">
									<div className="card border-shadow-statistic min-height-statistic">
										<canvas id="myChart" width="400" height="400"></canvas>
									</div>
								</div>
								<div className="py-3 pl-3 ml-auto">
									<button className="btn border-shadow-statistic button-border hover-upload"
										onClick={() => this.handleBackToUpload(this.state.statisticPage)}> Back
										Button
									</button>
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
			<div className="col-2">
				<img src={PrevaIcon} className="icon"/>
			</div>
			<div className="col-10 pr-0">
				<b>Success!</b>
				<p>Process model <b id="successBoxItem"/> uploaded successfully!</p>
			</div>
		</div>
	</div>
);

const ErrorBox = ({ dnone, PrevaIcon }) => (
	<div className="card p-3 error-box-style" id="errorMessage" style={dnone}>
		<div className="row">
			<div className="col-3">
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