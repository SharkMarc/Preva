import React from 'react';

export const ProcessModel =( { dataName }) => {
	return (
		<div className="show-processModel w-100">
			<h3 className="text-center"><u>{ dataName }</u></h3>
			<section id="bpmn" style={{ width: '100%', height: 500, backgroundColor: 'white' }}/>
		</div>
	);
}

