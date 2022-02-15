import React from 'react';

export const SuccessBox = ({ dnone, PrevaIcon }) => (
	<div className="card p-3 success-box-style" id="successBox" style={dnone}>
		<div className="row col-12">
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

// Mandatory graphical elements are missing
// Check for: ($element style="red")
// NOA start/end/task/alle connectoren typen /sequence flow hat gleichen source/target kein target/source
export const ErrorBox = ({ dnone, PrevaIcon }) => (
	<div className="card p-3 error-box-style" id="errorBox" style={dnone}>
		<div className="row">
			<div className="col-3 text-center my-auto">
				<img src={PrevaIcon} className="icon"/>
			</div>
			<div id="errorText" className="col-9 pr-0">
				<b>Error!</b>
				<p className="mb-0">Invalid process model format.</p>
				<p>Data<b>.bpmn</b> only!</p>
			</div>
		</div>
	</div>
);