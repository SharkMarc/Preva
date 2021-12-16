import React from 'react';

export const SuccessBox = ({ dnone, PrevaIcon }) => (
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

export const ErrorBox = ({ dnone, PrevaIcon }) => (
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