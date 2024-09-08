import React from 'react';

import { usePoptart } from './Provider';
import { getContrastColor } from './helpers';

interface ProgressBarProps {
	progress: number;
	height: number;
	backgroundColor: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, height, backgroundColor }) => {
	const { config } = usePoptart();

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
