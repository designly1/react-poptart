import React, { createContext, useContext, useState } from 'react';
import Matrix from './Matrix';
import AlertContainer from './AlertContainer';

import { getContrastColor, generateSecureString, deepMerge } from './helpers';

import { defaultConfig } from './constants';

import type {
	I_PoptartProviderProps,
	I_PoptartContext,
	I_PoptartItem,
	I_PoptartProps,
	I_PoptartConfig,
	I_PoptartUserConfig,
	I_AlertProps,
	I_PoptartPromise,
} from './types';

// Create the Poptart context
const PoptartContext = createContext<I_PoptartContext | undefined>(undefined);

export const PoptartProvider: React.FC<I_PoptartProviderProps> = ({ children, config: userConfig }) => {
	// Merge the default options with the user options
	const config = deepMerge<I_PoptartConfig, I_PoptartUserConfig>(defaultConfig, userConfig || {});

	// State
	const [poptarts, setPoptarts] = useState<I_PoptartItem[]>([]);
	const [currentAlert, setCurrentAlert] = useState<I_AlertProps | null>(null);

	// Methods
	const push = (props: I_PoptartProps): string => {
		const id = generateSecureString(64);
		const hasPromise = typeof props.promise !== typeof undefined;

		const type = hasPromise ? 'loading' : props.type || config.defaultType;
		props.type = type;

		const foregroundColor = getContrastColor({
			backgroundColor: config.colors[type],
			lightColor: config.colors.textLight,
			darkColor: config.colors.textDark,
		});

		let duration = config.defaultDuration;
		if (props.duration !== undefined) {
			duration = props.duration;
		}

		setPoptarts(prev => [
			...prev,
			{
				id,
				props,
				expires: new Date(Date.now() + duration),
				progress: duration > 0 ? 100 : 0,
				foregroundColor,
			},
		]);

		if (duration > 0 && !hasPromise) {
			setTimeout(() => {
				dismiss(id);
			}, duration);
		}

		// If the poptart has a promise, return the promise
		if (hasPromise) {
			const promise = props.promise as I_PoptartPromise;
			promise.promise
				.then(() => {
					push({
						message: promise.successMessage,
						type: 'success',
						duration: config.defaultDuration,
					});
					dismiss(id);
				})
				.catch(() => {
					push({
						message: promise.errorMessage,
						type: 'error',
						duration: config.defaultDuration,
					});
					dismiss(id);
				});
		}

		return id;
	};

	const promise = (
		message: string,
		promise: I_PoptartPromise,
		overrides: Partial<I_PoptartProps> | undefined = undefined,
	): string => {
		const props: I_PoptartProps = {
			message,
			promise,
			...overrides,
		};
		return push(props);
	};

	// Dismiss a poptart
	const dismiss = (id: string) => {
		setPoptarts(prev => prev.filter(poptart => poptart.id !== id));
	};

	const alert = (props: I_AlertProps) => {
		setCurrentAlert(props);
	};

	const dismissAlert = () => {
		setCurrentAlert(null);
	};

	return (
		<PoptartContext.Provider
			value={{
				poptarts,
				config,
				currentAlert,
				push,
				promise,
				dismiss,
				alert,
				dismissAlert,
			}}
		>
			{children}
			<Matrix config={config} poptarts={poptarts} dismiss={dismiss} />
			<AlertContainer config={config} currentAlert={currentAlert} dismissAlert={dismissAlert} />
		</PoptartContext.Provider>
	);
};

export const usePoptart = (): I_PoptartContext => {
	const context = useContext(PoptartContext);
	if (!context) {
		throw new Error('usePoptart must be used within a PoptartProvider');
	}
	return context;
};
