import React from "react";

export default class Upload extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			bpmn:       "",
			bpmndiList: "",
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getData = this.getData.bind(this);
		this.chart = this.chart.bind(this);
		this.click = this.click.bind(this);
		this.showUploadButton = this.showUploadButton.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
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
					data:            ["1", "3", "2", "4", "5", "6"],
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

	componentWillMount() {
		this.getData();
	}

	showUploadButton() {
		let file = document.getElementById("userfile");
		let fileValue = document.getElementById("userfile").value;
		let uploadButton = document.getElementById("uploadButton2");
		let fileName = document.getElementById("fileName");

		if (file.files.length !== 0) {
			var startIndex = (fileValue.indexOf("\\") >= 0 ? fileValue.lastIndexOf("\\") : fileValue.lastIndexOf("/"));
			var filename = fileValue.substring(startIndex);

			if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
				filename = filename.substring(1);
			}

			uploadButton.classList.remove("d-none");
			fileName.innerHTML = filename;
		} else {
			uploadButton.classList.add("d-none");
			fileName.innerHTML = "";
		}
	}

	componentDidMount() {
//		this.chart();
	}

	click() {
		let file = document.getElementById("userfile");
		file.click();
	}

	toggleModal(modalId){
		console.log(modalId);
		console.log(modalId.style.display);
		if(modalId.style.display==="none"){
			modalId.style.display="block";

		}else{
			modalId.style.display="none";
			console.log("ich bin hier");
			console.log(modalId.style.display);
		}
	}

	handleSubmit({ target }) {
		const file = target.files[0];
		fetch("http://localhost:6318/controller/upload.php", {
			method:  "GET",
			headers: { "Content-Type": "application/json" },
			cache:   "no-cache"
		})
			.then(r => {return r.json();})
			.then((data) => this.setState({ bpmndiList: data }));
		this.props.uploadAjax(file);
	};

	getData() {
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
		let dnone = {
			display:       "none",
		};
		return (
			<div className=" h-100 mt-5 col-12 p-5 h-100 mx-auto my-auto font-family-arial">
				<div className="row mt-2 col-12">
					<h1>Preva</h1>
					<div className="my-auto ml-2 image-preva"/>
				</div>
				<hr className="mt-0 hr-line"/>
				<div className="h-75 d-flex justify-content-center align-items-center">
					<form className="col-12" action="http://localhost:6318/controller/upload.php" encType="multipart/form-data" method="post"
						id="formUpload"
						onSubmit={(e) => this.handleSubmit(e)}>
						<div className="col-7 mx-auto text-left">
							<input type="hidden" name="MAX_FILE_SIZE" value="30000"/>
							<div className="col-12 pl-0">Please select your process model...</div>
							<div className="row col-12">
								<button type="button" onClick={() => this.click(status)}>Search document</button>
								<input onChange={() => this.showUploadButton()} name="userfile" id="userfile" className="d-none" type="file"/>
								<div id={"fileName"}/>
								<div id={"uploadButton2"} onClick={()=>this.toggleModal(document.getElementById("loadingScreen"))} className={"cursor-pointer col-2 p-2 btn-success text-center d-none"}
									>TEST
								</div>
								<button id={"uploadButton"} className={"cursor-pointer col-2 p-2 btn-success text-center d-none"}
									type="submit">i am real upload
								</button>

							</div>
						</div>
					</form>
				</div>
				<button onClick={() => this.getData()}>create diagrams</button>
				<div>
					{/*<canvas id="myChart" width="150" height="150"></canvas>*/}
				</div>
				<div className="text-black modal-style bg-white" id="loadingScreen" style={dnone}>
					<div className="" role="document">
						<div className="p-4 border-rounded row">
							<div className="animate-flicker1">Converting Model</div>
							<div className="animate-flicker2">Analyzing Model</div>
							<div className="animate-flicker3">Prepare Analysis</div>
							<div className="saving"><span>.</span><span>.</span><span>.</span></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

