import React from 'react';

export const ProcessModel =( { dataName }) => {
	return (
		<div className="show-processModel w-100">
			<h3 className="text-center"><u>{ dataName }</u></h3>
			<div id="canvas" style={{ width: '100%', height: 700, backgroundColor: 'white' }}/>
			<div id="bpmn" style={{ width: '100%', height: 700, backgroundColor: 'white' }}/>
		</div>
	);
}