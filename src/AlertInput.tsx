import React, { useEffect } from 'react';
import { injectStyle } from './helpers';
import { I_AlertInput, I_PoptartConfig, I_AlertProps } from './types';

interface Props {
	input: I_AlertInput;
	alert: I_AlertProps;
	config: I_PoptartConfig;
	value: string | undefined;
	setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
	onConfirm: () => void;
	error: string | undefined;
}

export default function AlertInput(props: Props) {
	const { input, config, value, setValue, error, alert, onConfirm } = props;

	const { type, placeholder, required } = input;

	const backgroundColor = config.alerts.input.backgroundColor;
	const fontColor = config.alerts.input.fontColor;
	const borderRadius = config.alerts.input.borderRadius;
	const borderWidth = config.alerts.input.borderWidth;
	const paddingX = config.alerts.input.paddingX;
	const paddingY = config.alerts.input.paddingY;
	const maxWidth = config.alerts.input.maxWidth;
	const errorFeedbackColor = config.alerts.input.errorFeedbackColor;
	const alertBackgroundColor = alert.backgroundColor || config.alerts.defaultBackgroundColor;
	const placeholderColor = config.alerts.input.placeholderColor;

	useEffect(() => {
		injectStyle(
			'poptart-input-styles',
			`
            .poptart-native-input::placeholder {
                color: ${placeholderColor};
            }
        `,
		);
	}, [placeholderColor]);

	const styles: { [key: string]: React.CSSProperties } = {
		container: {
			width: '100%',
			display: 'flex',
			flexDirection: 'column' as 'column',
			alignItems: 'center',
			gap: '5px',
		},
		outer: {
			backgroundColor,
			borderRadius: `${borderRadius}px`,
			borderWidth: `${borderWidth}px`,
			padding: `${paddingY}px ${paddingX}px`,
			width: '100%',
			maxWidth,
		},
		input: {
			backgroundColor: 'transparent',
			color: fontColor,
			border: 'none',
			outline: 'none',
			width: '100%',
		},
		errorFeedback: {
			color: error ? errorFeedbackColor : alertBackgroundColor,
			fontSize: '0.8em',
			textAlign: 'center' as 'center',
		},
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onConfirm();
		}
	};

	return (
		<div className="poptart-input-container" style={styles.container}>
			<div className="poptart-form-control" style={styles.outer}>
				<input
					className="poptart-native-input"
					type={type}
					placeholder={placeholder}
					required={required}
					style={styles.input}
					value={value}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				/>
			</div>
			<span className="poptart-error-feedback" style={styles.errorFeedback}>
				{error || '.'}
			</span>
		</div>
	);
}
