import React from 'react';
import Icon from './Icon';
import ProgressBar from './ProgressBar';
import Spinner from './Spinner';

import type { I_PoptartItem, I_PoptartConfig } from './types';

interface Props extends I_PoptartItem {
	config: I_PoptartConfig;
	dismiss: (id: string) => void;
}

const Poptart: React.FC<Props> = superProps => {
	const { props, id, foregroundColor, config, dismiss } = superProps;
	const { message, onClick } = props;

	const type = props.type || config.defaultType;
	const backgroundColor = config.colors[type];
	const width = props.width || config.defaultWidth;
	const fontSize = config.fontSize;
	const paddingX = config.paddingX;
	const paddingY = config.paddingY;
	const progressBarHeight = config.progressBar.height;
	const duration = props.duration !== undefined ? props.duration : config.defaultDuration;
	const hasDuration = duration > 0;
	const animation = props.animation || config.defaultAnimation;
	const animationDuration = props.animationDuration || config.defaultAnimationDuration;
	const isLoading = props.type === 'loading';
	const useProgressBar = hasDuration && !isLoading;

	const defaultPoptartStyle = config.defaultPoptartStyle === 'default' ? 'filled' : config.defaultPoptartStyle;
	let poptartStyle = defaultPoptartStyle;
	if (props.poptartStyle) {
		poptartStyle = props.poptartStyle === 'default' ? defaultPoptartStyle : props.poptartStyle;
	}
	const isInverted = poptartStyle === 'inverted';

	// Dynamic styles
	const dynamicStyles: React.CSSProperties = {
		backgroundColor: isInverted ? config.colors.invertedBackground : backgroundColor,
		color: isInverted ? backgroundColor : foregroundColor,
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
		boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
		border: '1px solid rgba(0, 0, 0, 0.1)',
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
		animation: isLoading ? 'beacon 1s infinite' : 'none',
	};

	const handleClick = () => {
		dismiss(id);
		onClick && onClick();
	};

	const iconSize = fontSize * config.iconSizeFactor;

	return (
		<div className="poptart" style={dynamicStyles} onClick={handleClick}>
			<div className="poptart-inner" style={innerStyle}>
				{isLoading ? (
					<Spinner size={iconSize} isInverted={isInverted} {...config.spinner} />
				) : (
					<div className="poptart-icon" style={{ width: iconSize }}>
						<Icon type={type} color={isInverted ? backgroundColor : foregroundColor} size={iconSize} />
					</div>
				)}
				<span className="poptart-message" style={textStyle}>
					{message}
				</span>
			</div>
			{useProgressBar ? (
				<ProgressBar
					poptart={props}
					height={config.progressBar.height}
					backgroundColor={backgroundColor}
					colorOverride={isInverted ? backgroundColor : undefined}
					config={config}
				/>
			) : null}
		</div>
	);
};

export default Poptart;
