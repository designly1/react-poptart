import React from 'react';
import Icon from './Icon';
import ProgressBar from './ProgressBar';

import type { I_PoptartItem, I_PoptartConfig } from './types';

interface Props extends I_PoptartItem {
	config: I_PoptartConfig;
	dismiss: (id: string) => void;
}

const Poptart: React.FC<Props> = superProps => {
	const { props, id, progress, foregroundColor, config, dismiss } = superProps;
	const { message, onClick } = props;

	const type = props.type || config.defaultType;
	const backgroundColor = config.colors[type];
	const width = props.width || config.defaultWidth;
	const fontSize = config.fontSize;
	const paddingX = config.paddingX;
	const paddingY = config.paddingY;
	const progressBarHeight = config.progressBar.height;
	const duration = props.duration || config.defaultDuration;
	const hasDuration = duration > 0;
	const animation = props.animation || config.defaultAnimation;
	const animationDuration = props.animationDuration || config.defaultAnimationDuration;

	// Dynamic styles
	const dynamicStyles: React.CSSProperties = {
		backgroundColor,
		color: foregroundColor,
		width,
		maxWidth: '100%',
		paddingTop: `${paddingY}px`,
		paddingLeft: `${paddingX}px`,
		paddingRight: `${paddingX}px`,
		paddingBottom: `${paddingY + (hasDuration ? progressBarHeight : 0)}px`,
		borderRadius: '10px',
		overflow: 'hidden',
		cursor: 'pointer',
		position: 'relative',
		pointerEvents: 'auto',
		fontSize,
		animation: `${animation} ${animationDuration}s ease-out`,
		...config.styleOverrides.poptart,
	};

	const innerStyle: React.CSSProperties = {
		display: 'flex',
		alignItems: 'center',
		gap: '10px',
	};

	const textStyle: React.CSSProperties = {
		wordBreak: 'break-word',
		hyphens: 'auto',
		overflowWrap: 'break-word',
	};

	const handleClick = () => {
		dismiss(id);
		onClick && onClick();
	};

	const iconSize = fontSize * config.iconSizeFactor;

	return (
		<div style={dynamicStyles} onClick={handleClick}>
			<div style={innerStyle}>
				<div style={{ width: iconSize }}>
					<Icon type={type} color={foregroundColor} size={iconSize} />
				</div>
				<span style={textStyle}>{message}</span>
			</div>
			<ProgressBar
				progress={progress}
				height={config.progressBar.height}
				backgroundColor={backgroundColor}
				config={config}
			/>
		</div>
	);
};

export default Poptart;
