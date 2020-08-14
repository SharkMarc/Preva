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
	}

	chart() {
		let bpmndiList=this.bpmndiList;

		var ctx = document.getElementById("myChart").getContext("2d");
		var myChart = new Chart(ctx, {
			type:    "bar",
			data:    {
				labels:   ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
				datasets: [{
					label:           "# of Votes",
					data:           ["1", "3", "2", "4", "5", "6"],
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
	componentWillMount(){
		this.getData();
	}
	componentDidMount() {
		this.chart();
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
		return (
			<div className="mt-5 col-12 p-5 h-100 mx-auto my-auto">
				<form action="http://localhost:6318/controller/upload.php" encType="multipart/form-data" method="post" id="formUpload"
					onSubmit={(e) => this.handleSubmit(e)}>

					{/*<input type="file"*/}
					{/*	name="datei"*/}
					{/*	cam-variable-name="INVOICE_DOCUMENT"*/}
					{/*	cam-variable-type="File"*/}
					{/*	cam-max-filesize="10000000"*/}
					{/*	value={this.state.bpmn} onChange={this.handleChange}*/}
					{/*/>*/}

					<input type="hidden" name="MAX_FILE_SIZE" value="30000"/>

					Diese Datei hochladen: <input name="userfile" type="file"/>

					<button className={"cursor-pointer col-2 p-2 button-success text-center"}
						type="submit"> i am upload
					</button>
				</form>
				<button onClick={() => this.getData()}>create diagrams</button>
				<div>
					<canvas id="myChart" width="150" height="150" ></canvas>

				</div>

			</div>
		);
	}
}

