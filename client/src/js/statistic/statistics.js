import React from "react";

import linksHat from "../../assets/links_hat.png";


export default  class Statistics extends React.Component {
	render() {
		const text = this.props.text;
		const title = this.props.title;
		return (
			<div className="min-height-statistic col-12">
				<h1 className="text-center "><b>{title}</b></h1>
				<div>{text}</div>
			</div>
		);
	}
}
