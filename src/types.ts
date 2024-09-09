import React from 'react';

import type { ReactNode } from 'react';

// Context interface
export interface I_PoptartContext {
	poptarts: I_PoptartItem[];
	config: I_PoptartConfig;
	currentAlert: I_AlertProps | null;
	push: (props: I_PoptartProps) => void;
	dismiss: (id: string) => void;
	alert: (props: I_AlertProps) => void;
	dismissAlert: () => void;
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

export interface I_AlertConfig {
	defaultWidth: string;
	paddingX: number;
	paddingY: number;
	borderRadius: number;
	defaultType: T_PoptartType;
	defaultBackgroundColor: string;
	defaultFontColor: string;
	defaultFontSize: number;
	defaultTitleFontSize: number;
	iconSizeFactor: number;
	borderWidth: number;
	defaultConfirmButtonColor: string;
	defaultCancelButtonColor: string;
	defaultConfirmButtonLabel: string;
	defaultCancelButtonLabel: string;
	defaultShowCancelButton: boolean;
	defaultShowConfirmButton: boolean;
	defaultAnimation: T_PoptartAnimation;
	defaultAnimationDuration: number;
	allowClickOffDismissal: boolean;
}

// Poptart config interface
export interface I_PoptartConfig {
	colors: T_PoptartColors;
	styleOverrides: {
		container: React.CSSProperties;
		poptart: React.CSSProperties;
		progressBar: React.CSSProperties;
		alertContainer: React.CSSProperties;
		alert: React.CSSProperties;
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
	alerts: I_AlertConfig;
}

// Popart user config interface
export interface I_PoptartUserConfig {
	colors?: Partial<T_PoptartColors>;
	styleOverrides?: {
		container?: React.CSSProperties;
		poptart?: React.CSSProperties;
		progressBar?: React.CSSProperties;
		alertContainer?: React.CSSProperties;
		alert?: React.CSSProperties;
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
	alerts?: Partial<I_AlertConfig>;
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

export interface I_AlertButton {
	label: string;
	backgroundColor: string;
	onClick: () => void;
}

export interface I_AlertProps {
	title: string;
	message: string;
	type?: T_PoptartType;
	confirmButtonLabel?: string;
	confirmButtonBackgroundColor?: string;
	confirmButtonCallback?: () => void;
	cancelButtonLabel?: string;
	cancelButtonBackgroundColor?: string;
	cancelButtonCallback?: () => void;
	showCancelButton?: boolean;
	showConfirmButton?: boolean;
	additionalButtons?: I_AlertButton[];
	width?: string;
	backgroundColor?: string;
	fontColor?: string;
	animation?: T_PoptartAnimation;
	animationDuration?: number;
}
