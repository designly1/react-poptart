import React from 'react';
import Icon from './Icon';

import { getContrastColor } from './helpers';

import { I_PoptartConfig, I_AlertProps, I_AlertButton } from './types';

interface Props {
	config: I_PoptartConfig;
	alert: I_AlertProps;
	dismissAlert: () => void;
}

export default function Alert(props: Props) {
	const { config, alert, dismissAlert } = props;

	const type = alert.type || config.alerts.defaultType;
	const primaryColor = config.colors[type];
	const backgroundColor = alert.backgroundColor || config.alerts.defaultBackgroundColor;
	const fontColor = alert.fontColor || config.alerts.defaultFontColor;
	const animation = alert.animation || config.alerts.defaultAnimation;
	const animationDuration = alert.animationDuration || config.alerts.defaultAnimationDuration;
	const showCancelButton = alert.showCancelButton !== undefined ? alert.showCancelButton : true;
	const showConfirmButton = alert.showConfirmButton !== undefined ? alert.showConfirmButton : true;

	const alertStyles: React.CSSProperties = {
		pointerEvents: 'auto',
		backgroundColor: backgroundColor,
		border: `${config.alerts.borderWidth}px solid ${primaryColor}`,
		color: fontColor,
		padding: `${config.alerts.paddingY}px ${config.alerts.paddingX}px`,
		borderRadius: `${config.alerts.borderRadius}px`,
		boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
		width: alert.width || config.alerts.defaultWidth,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: '20px',
		minHeight: '300px',
		maxWidth: '90%',
		animation: `${animation} ${animationDuration}s ease-out`,
	};

	const h1Styles: React.CSSProperties = {
		fontSize: `${config.alerts.defaultTitleFontSize}px`,
		color: primaryColor,
	};

	const buttonBaseStyles: React.CSSProperties = {
		padding: '10px 20px',
		borderRadius: '5px',
		cursor: 'pointer',
		minWidth: '80px',
	};

	const iconSize = config.alerts.iconSizeFactor * config.alerts.defaultFontSize;
	const confirmButtonColor = getContrastColor({
		backgroundColor: config.alerts.defaultConfirmButtonColor,
		lightColor: config.colors.textLight,
		darkColor: config.colors.textDark,
	});
	const cancelButtonColor = getContrastColor({
		backgroundColor: config.alerts.defaultCancelButtonColor,
		lightColor: config.colors.textLight,
		darkColor: config.colors.textDark,
	});

	const handleCancel = () => {
		if (alert.confirmButtonCallback) {
			alert.confirmButtonCallback();
		} else {
			dismissAlert();
		}
	};

	const handleConfirm = () => {
		if (alert.confirmButtonCallback) {
			alert.confirmButtonCallback();
		} else {
			dismissAlert();
		}
	};

	const customButtons: I_AlertButton[] = [];
	if (alert.additionalButtons && typeof alert.additionalButtons === 'object') {
		customButtons.push(...alert.additionalButtons);
	}

	return (
		<div
			style={alertStyles}
			onClick={(e: React.MouseEvent<HTMLDivElement>) => {
				e.stopPropagation();
			}}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: '10px',
				}}
			>
				<Icon type="info" color={primaryColor} size={iconSize} />
				<h1 style={h1Styles}>{alert.title}</h1>
			</div>
			<span
				style={{
					fontSize: `${config.alerts.defaultFontSize}px`,
				}}
			>
				{alert.message}
			</span>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					gap: '16px',
				}}
			>
				{showCancelButton ? (
					<button
						style={{
							...buttonBaseStyles,
							backgroundColor: config.alerts.defaultConfirmButtonColor,
							color: confirmButtonColor,
						}}
						onClick={handleConfirm}
					>
						{config.alerts.defaultConfirmButtonLabel}
					</button>
				) : null}
				{showConfirmButton ? (
					<button
						style={{
							...buttonBaseStyles,
							backgroundColor: config.alerts.defaultCancelButtonColor,
							color: cancelButtonColor,
						}}
						onClick={handleCancel}
					>
						{config.alerts.defaultCancelButtonLabel}
					</button>
				) : null}
				{customButtons.map((button, index) => (
					<button
						key={index}
						style={{
							...buttonBaseStyles,
							backgroundColor: button.backgroundColor,
							color: getContrastColor({
								backgroundColor: button.backgroundColor,
								lightColor: config.colors.textLight,
								darkColor: config.colors.textDark,
							}),
						}}
						onClick={button.onClick}
					>
						{button.label}
					</button>
				))}
			</div>
		</div>
	);
}
