import React from 'react';

import { I_PoptartSpinnerConfig } from './types';

interface Props extends I_PoptartSpinnerConfig {
	size: number;
}

export default function Spinner(props: Props) {
	const { size, strokeWidth, baseColor, accentColor, animationDuration } = props;

	return (
		<div
			id="react-poptart-spinner"
			style={{
				border: `${strokeWidth}px solid ${baseColor}`,
				borderTop: `${strokeWidth}px solid ${accentColor}`,
				borderBottom: `${strokeWidth}px solid ${accentColor}`,
				borderRadius: '50%',
				width: `${size}px`,
				height: `${size}px`,
				animation: `spin ${animationDuration}s linear infinite`,
			}}
		/>
	);
}
