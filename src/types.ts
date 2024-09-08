import React from 'react';

import type { ReactNode } from 'react';

// Context interface
export interface I_PoptartContext {
	poptarts: I_PoptartItem[];
	config: I_PoptartConfig;
	push: (props: I_PoptartProps) => void;
	dismiss: (id: string) => void;
}

// Poptart types
export type T_PoptartType = 'success' | 'error' | 'warning' | 'info';
export type T_PoptartAlign = 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br';
export type T_PoptartAnimation =
	| 'bounceIn'
	| 'fadeIn'
	| 'slideFromLeft'
	| 'slideFromRight'
	| 'slideFromTop'
	| 'slideFromBottom';

// Interface for user callable poptart.push()
export interface I_PoptartProps {
	message: string;
	type?: T_PoptartType;
	duration?: number;
	width?: string;
	animation?: T_PoptartAnimation;
	animationDuration?: number;
	onClick?: () => void;
}

// Poptart colors interface
export type T_PoptartColors = {
	success: string;
	error: string;
	warning: string;
	info: string;
	textLight: string;
	textDark: string;
};

// Interface for the progress bar
export interface I_PoptartProgressBarProps {
	lightColor: string;
	darkColor: string;
	height: number;
}

// Poptart config interface
export interface I_PoptartConfig {
	colors: T_PoptartColors;
	styleOverrides: {
		container: React.CSSProperties;
		poptart: React.CSSProperties;
		progressBar: React.CSSProperties;
	};
	defaultAlign: T_PoptartAlign;
	defaultType: T_PoptartType;
	defaultDuration: number;
	defaultWidth: string;
	defaultAnimation: T_PoptartAnimation;
	defaultAnimationDuration: number;
	fontSize: number;
	iconSizeFactor: number;
	progressBar: I_PoptartProgressBarProps;
	contrastThreshold: number;
	paddingX: number;
	paddingY: number;
	zIndex: number;
}

// Popart user config interface
export interface I_PoptartUserConfig {
	colors?: Partial<T_PoptartColors>;
	styleOverrides?: {
		container?: React.CSSProperties;
		poptart?: React.CSSProperties;
		progressBar?: React.CSSProperties;
	};
	defaultAlign?: T_PoptartAlign;
	defaultType?: T_PoptartType;
	defaultDuration?: number;
	defaultWidth?: string;
	defaultAnimation?: T_PoptartAnimation;
	defaultAnimationDuration?: number;
	fontSize?: number;
	iconSizeFactor?: number;
	progressBar?: Partial<I_PoptartProgressBarProps>;
	contrastThreshold?: number;
	paddingX?: number;
	paddingY?: number;
	zIndex?: number;
}

// Provider interface
export interface I_PoptartProviderProps {
	children: ReactNode;
	config?: I_PoptartUserConfig;
}

export interface I_PoptartItem {
	id: string;
	props: I_PoptartProps;
	expires: Date | null;
	progress: number;
	foregroundColor: string;
}
