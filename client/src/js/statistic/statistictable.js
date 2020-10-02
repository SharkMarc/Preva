import React from "react";
import Expand from "../../assets/expand.png";

import linksHat from "../../assets/links_hat.png";


export default  class StatisticTable extends React.Component {
	render() {
		const status = this.props.status;
		const name = this.props.name;
		const id = this.props.id;
		const handleSwitch = this.props.handleSwitch;
		const selectedStatistic = this.props.selectedStatistic;

		return (
			<tr id={id}
				className={selectedStatistic === name ? "activeStatistic" : "cursor-pointer"}
				onClick={handleSwitch} key={id}>
				<td scope="row">
					{name}
				</td>
				<td scope="row" className="text-center">
					{status}
				</td>
				<td scope="row" className="text-center">
					<div><img src={Expand} className="tableIcon"/></div>
				</td>
			</tr>
		);
	}
}
