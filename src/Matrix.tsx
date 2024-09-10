import React from 'react';
import Poptart from './Poptart';

import { useAnimations } from './animations';

import { I_PoptartConfig, I_PoptartItem } from './types';

interface Props {
	config: I_PoptartConfig;
	poptarts: I_PoptartItem[];
	dismiss: (id: string) => void;
}

const Matrix: React.FC<Props> = props => {
	const { config, poptarts, dismiss } = props;

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
		zIndex: config.zIndex + 2,
		...styleAdditions,
		...config.styleOverrides.container,
	};

	return (
		<div className="poptart-container" style={containerStyles}>
			{poptarts.map((poptart) => (
				<Poptart key={poptart.id} dismiss={dismiss} config={config} {...poptart} />
			))}
		</div>
	);
};

export default Matrix;
