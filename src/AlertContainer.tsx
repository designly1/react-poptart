import React, { useEffect, useState } from 'react';
import Alert from './Alert';

import { I_PoptartConfig, I_AlertProps } from './types';

interface Props {
	config: I_PoptartConfig;
	currentAlert: I_AlertProps | null;
	dismissAlert: () => void;
}

export default function AlertContainer(props: Props) {
	const { config, currentAlert, dismissAlert } = props;

	const [showModal, setShowModal] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	useEffect(() => {
		if (currentAlert) {
			setShowModal(true);

			setTimeout(() => {
				setShowAlert(true);
			}, 200);
		} else {
			setShowAlert(false);
			setShowModal(false);
		}
	}, [currentAlert]);

	const styles: React.CSSProperties = {
		position: 'fixed',
		inset: 0,
		pointerEvents: 'none',
		display: 'flex',
		zIndex: config.zIndex + 1,
		...config.styleOverrides.container,
	};

	const modalStyles: React.CSSProperties = {
		pointerEvents: 'auto',
		position: 'absolute',
		inset: 0,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	};

	const handleModalClick = () => {
		if (config.alerts.allowClickOffDismissal) {
			dismissAlert();
		}
	};

	return (
		<div style={styles}>
			{showModal ? (
				<div style={modalStyles} onClick={handleModalClick}>
					<>
						{showAlert && currentAlert ? (
							<Alert config={config} alert={currentAlert} dismissAlert={dismissAlert} />
						) : null}
					</>
				</div>
			) : null}
		</div>
	);
}
