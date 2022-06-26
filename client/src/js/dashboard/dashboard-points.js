import React from 'react';

export const ProcessModel =( { dataName }) => {
	return (
		<div className="show-processModel w-100">
			<h3 className="black">Process: { dataName }</h3>
			<div id="canvas" style={{ width: '100%', height: 600, backgroundColor: 'white' }}/>
		</div>
	);
}