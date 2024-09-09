import React from 'react';

import { getContrastColor } from './helpers';

import { I_PoptartConfig } from './types';

interface ProgressBarProps {
	progress: number;
	height: number;
	backgroundColor: string;
	config: I_PoptartConfig;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, height, backgroundColor, config }) => {
	const color = getContrastColor({
		backgroundColor,
		lightColor: config.progressBar.lightColor,
		darkColor: config.progressBar.darkColor,
	});

	const dynamicStyles: React.CSSProperties = {
		position: 'absolute',
		bottom: 0,
		left: 0,
		height: `${height}px`,
		backgroundColor: color,
		width: `${progress}%`,
		transition: 'width 0s linear',
		...config.styleOverrides.progressBar,
	};

	return <div style={dynamicStyles} />;
};

export default ProgressBar;
