import React, { useState } from 'react';
import Icon from './Icon';
import AlertInput from './AlertInput';

import { getContrastColor } from './helpers';

import { I_PoptartConfig, I_AlertProps, I_AlertButton } from './types';

interface Props {
	config: I_PoptartConfig;
	alert: I_AlertProps;
	dismissAlert: () => void;
}

export default function Alert(props: Props) {
	const { config, alert, dismissAlert } = props;

	const [value, setValue] = useState<string | undefined>(undefined);
	const [error, setError] = useState<string | undefined>(undefined);

	const type = alert.type || config.alerts.defaultType;
	const primaryColor = config.colors[type];
	const backgroundColor = alert.backgroundColor || config.alerts.defaultBackgroundColor;
	const fontColor = alert.fontColor || config.alerts.defaultFontColor;
	const animation = alert.animation || config.alerts.defaultAnimation;
	const animationDuration = alert.animationDuration || config.alerts.defaultAnimationDuration;
	const showCancelButton =
		alert.showCancelButton !== undefined ? alert.showCancelButton : config.alerts.defaultShowCancelButton;
	const showConfirmButton =
		alert.showConfirmButton !== undefined ? alert.showConfirmButton : config.alerts.defaultShowConfirmButton;

	const iconSize = config.alerts.iconSizeFactor * config.alerts.defaultFontSize;

	const confirmButtonBackgroundColor = alert.confirmButtonBackgroundColor || config.alerts.defaultConfirmButtonColor;
	const cancelButtonBackgroundColor = alert.cancelButtonBackgroundColor || config.alerts.defaultCancelButtonColor;

	const confirmButtonColor = getContrastColor({
		backgroundColor: confirmButtonBackgroundColor,
		lightColor: config.colors.textLight,
		darkColor: config.colors.textDark,
	});
	const cancelButtonColor = getContrastColor({
		backgroundColor: cancelButtonBackgroundColor,
		lightColor: config.colors.textLight,
		darkColor: config.colors.textDark,
	});

	const styles: { [key: string]: React.CSSProperties } = {
		alert: {
			pointerEvents: 'auto',
			position: 'relative',
			backgroundColor: backgroundColor,
			border: `${config.alerts.borderWidth}px solid ${primaryColor}`,
			color: fontColor,
			borderRadius: `${config.alerts.borderRadius}px`,
			boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
			width: alert.width || config.alerts.defaultWidth,
			minHeight: '300px',
			maxWidth: '90%',
			animation: `${animation} ${animationDuration}s ease-out`,
		},
		title: {
			fontSize: `${config.alerts.defaultTitleFontSize}px`,
			color: primaryColor,
		},
		buttonBase: {
			padding: '10px 20px',
			borderRadius: '5px',
			cursor: 'pointer',
			minWidth: '80px',
		},
		titleContainer: {
			display: 'flex',
			alignItems: 'center',
			gap: '10px',
		},
		alertMessage: {
			fontSize: `${config.alerts.defaultFontSize}px`,
		},
		buttonGroup: {
			display: 'flex',
			justifyContent: 'center',
			gap: '16px',
		},
		confirmButton: {
			backgroundColor: config.alerts.defaultConfirmButtonColor,
			color: confirmButtonColor,
		},
		cancelButton: {
			backgroundColor: config.alerts.defaultCancelButtonColor,
			color: cancelButtonColor,
		},
		background: {
			pointerEvents: 'none',
			position: 'absolute',
			inset: 0,
			opacity: 0.1,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'start',
			overflow: 'hidden',
			zIndex: 1,
		},
		foreground: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'space-between',
			gap: '30px',
			width: '100%',
			minHeight: '300px',
			padding: `${config.alerts.paddingY}px ${config.alerts.paddingX}px`,
			zIndex: 2,
		},
		backgroundImage: {
			transform: 'translateX(-100px)',
		},
	};

	const handleCancel = () => {
		if (alert.cancelButtonCallback) {
			alert.cancelButtonCallback();
		} else {
			dismissAlert();
		}
	};

	const handleConfirm = () => {
		setError(undefined);

		if (alert.input && alert.input.required && !value) {
			setError('This field is required');
			return;
		}

		if (alert.input && alert.input.validationCallback) {
			const validationError = alert.input.validationCallback(value);
			if (validationError !== true && typeof validationError === 'string') {
				setError(validationError);
				return;
			}
		}

		if (alert.confirmButtonCallback) {
			alert.confirmButtonCallback(value);
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
			className="poptart-alert"
			style={styles.alert}
			onClick={(e: React.MouseEvent<HTMLDivElement>) => {
				e.stopPropagation();
			}}
		>
			<div className="poptart-alert-background" style={styles.background}>
				<div className="poptart-alert-background-image" style={styles.backgroundImage}>
					<Icon type={type} color={primaryColor} size={500} />
				</div>
			</div>
			<div className="poptart-alert-foreground" style={styles.foreground}>
				<div style={styles.titleContainer}>
					<Icon type={type} color={primaryColor} size={iconSize} />
					<h1 style={styles.title}>{alert.title}</h1>
				</div>
				<span style={styles.alertMessage}>{alert.message}</span>
				{alert.input ? (
					<AlertInput
						input={alert.input}
						config={config}
						value={value}
						setValue={setValue}
						error={error}
						alert={alert}
						onConfirm={handleConfirm}
					/>
				) : null}
				<div style={styles.buttonGroup}>
					{showConfirmButton ? (
						<button
							className="poptart-confirm-button"
							style={{ ...styles.buttonBase, ...styles.confirmButton }}
							onClick={handleConfirm}
						>
							{config.alerts.defaultConfirmButtonLabel}
						</button>
					) : null}
					{showCancelButton || (alert?.input && alert.showCancelButton !== false) ? (
						<button
							className="poptart-cancel-button"
							style={{ ...styles.buttonBase, ...styles.cancelButton }}
							onClick={handleCancel}
						>
							{config.alerts.defaultCancelButtonLabel}
						</button>
					) : null}
					{customButtons.map((button, index) => (
						<button
							key={index}
							className={`poptart-custom-button poptart-custom-button-${index}`}
							style={{
								...styles.buttonBase,
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
		</div>
	);
}
