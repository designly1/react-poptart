import React, { useState, useEffect } from 'react';

import { getContrastColor } from './helpers';

import { I_PoptartConfig, I_PoptartProps } from './types';

interface ProgressBarProps {
	poptart: I_PoptartProps;
	height: number;
	backgroundColor: string;
	config: I_PoptartConfig;
	colorOverride?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ poptart, height, backgroundColor, config, colorOverride }) => {
	const color =
		colorOverride ??
		getContrastColor({
			backgroundColor,
			lightColor: config.progressBar.lightColor,
			darkColor: config.progressBar.darkColor,
		});

	const [width, setWidth] = useState(100);

	const duration = poptart.duration !== undefined ? poptart.duration : config.defaultDuration;

	useEffect(() => {
		setTimeout(() => {
			setWidth(0);
		}, 100);
	}, []);

	const dynamicStyles: React.CSSProperties = {
		position: 'absolute',
		bottom: 0,
		left: 0,
		height: `${height}px`,
		backgroundColor: color,
		width: `${width}%`,
		transition: `width ${duration}ms linear`,
		...config.styleOverrides.progressBar,
	};

	return <div className="poptart-progress" style={dynamicStyles} />;
};

export default ProgressBar;
