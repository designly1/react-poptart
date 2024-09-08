import React from 'react';
import Poptart from './Poptart';

import { usePoptart } from './Provider';
import { useAnimations } from './animations';

const Matrix: React.FC = () => {
	const { config, poptarts } = usePoptart();

	// Inject the animation keyframes into the DOM
	useAnimations();

	const styleAdditions: React.CSSProperties = {};

	// Align the matrix based on config
	switch (config.defaultAlign) {
		case 'tl':
			styleAdditions.justifyContent = 'flex-start';
			styleAdditions.alignItems = 'flex-start';
			break;
		case 'tc':
			styleAdditions.justifyContent = 'flex-start';
			styleAdditions.alignItems = 'center';
			break;
		case 'tr':
			styleAdditions.justifyContent = 'flex-start';
			styleAdditions.alignItems = 'flex-end';
			break;
		case 'bl':
			styleAdditions.justifyContent = 'flex-end';
			styleAdditions.alignItems = 'flex-start';
			break;
		case 'bc':
			styleAdditions.justifyContent = 'flex-end';
			styleAdditions.alignItems = 'center';
			break;
		case 'br':
			styleAdditions.justifyContent = 'flex-end';
			styleAdditions.alignItems = 'flex-end';
			break;
		default:
			styleAdditions.justifyContent = 'flex-end';
			styleAdditions.alignItems = 'flex-end';
			break;
	}

	// Main container styles
	const containerStyles: React.CSSProperties = {
		position: 'fixed',
		inset: 0,
		pointerEvents: 'none',
		display: 'flex',
		flexDirection: 'column',
		gap: '20px',
		padding: '20px',
		zIndex: config.zIndex,
		...styleAdditions,
		...config.styleOverrides.container,
	};

	return (
		<div style={containerStyles}>
			{poptarts.map((poptart, index) => (
				<Poptart key={index} {...poptart} />
			))}
		</div>
	);
};

export default Matrix;
