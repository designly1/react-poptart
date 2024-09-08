import React, { createContext, useContext, useState } from 'react';
import Matrix from './Matrix';

import { getContrastColor, generateSecureString, deepMerge } from './helpers';

import { defaultConfig } from './constants';

import type {
	I_PoptartProviderProps,
	I_PoptartContext,
	I_PoptartItem,
	I_PoptartProps,
	I_PoptartConfig,
	I_PoptartUserConfig,
} from './types';

// Create the Poptart context
const PoptartContext = createContext<I_PoptartContext | undefined>(undefined);

export const PoptartProvider: React.FC<I_PoptartProviderProps> = ({ children, config: userConfig }) => {
	// Merge the default options with the user options
	const config = deepMerge<I_PoptartConfig, I_PoptartUserConfig>(defaultConfig, userConfig || {});

	// State
	const [poptarts, setPoptarts] = useState<I_PoptartItem[]>([]);

	// Methods
	const push = (props: I_PoptartProps): string => {
		const id = generateSecureString(64);

		const foregroundColor = getContrastColor({
			backgroundColor: config.colors[props.type || config.defaultType],
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

		if (duration > 0) {
			const interval = setInterval(() => {
				setPoptarts(prev =>
					prev.map(poptart => {
						if (poptart.id === id && poptart.expires && duration > 0) {
							const progress = (poptart.expires.getTime() - Date.now()) / duration;
							if (progress <= 0) {
								clearInterval(interval);
								dismiss(id);
							}
							return { ...poptart, progress: progress * 100 };
						}
						return poptart;
					}),
				);
			}, 30);
		}

		return id;
	};

	// Dismiss a poptart
	const dismiss = (id: string) => {
		setPoptarts(prev => prev.filter(poptart => poptart.id !== id));
	};

	return (
		<PoptartContext.Provider
			value={{
				poptarts,
				config,
				push,
				dismiss,
			}}
		>
			{children}
			<Matrix />
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
