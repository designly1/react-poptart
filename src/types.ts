import React from 'react';

import type { ReactNode } from 'react';

// Context interface
export interface I_PoptartContext {
	poptarts: I_PoptartItem[];
	config: I_PoptartConfig;
	currentAlert: I_AlertProps | null;
	push: (props: I_PoptartProps) => void;
	promise: (message: string, promise: I_PoptartPromise, overrides?: Partial<I_PoptartProps>) => string;
	dismiss: (id: string) => void;
	alert: (props: I_AlertProps) => void;
	dismissAlert: () => void;
}

// Enumerations
export enum E_PoptartType {
	success = 'Success',
	error = 'Error',
	warning = 'Warning',
	info = 'Info',
	loading = 'Loading',
}

export enum E_PoptartAlign {
	tl = 'Top Left',
	tc = 'Top Center',
	tr = 'Top Right',
	bl = 'Bottom Left',
	bc = 'Bottom Center',
	br = 'Bottom Right',
}

export enum E_PoptartStyle {
	default = 'Default',
	filled = 'Filled',
	outlined = 'Outlined',
}

export enum E_PoptartAnimation {
	bounceIn = 'Bounce In',
	fadeIn = 'Fade In',
	slideFromLeft = 'Slide From Left',
	slideFromRight = 'Slide From Right',
	slideFromTop = 'Slide From Top',
	slideFromBottom = 'Slide From Bottom',
}

// Poptart types
export type T_PoptartType = keyof typeof E_PoptartType;
export type T_PoptartAlign = keyof typeof E_PoptartAlign;
export type T_PoptartStyle = keyof typeof E_PoptartStyle;
export type T_PoptartAnimation = keyof typeof E_PoptartAnimation;

export interface I_PoptartPromise {
	promise: Promise<void>;
	successMessage: string;
	errorMessage: string;
}

// Interface for user callable poptart.push()
export interface I_PoptartProps {
	message: string;
	type?: T_PoptartType;
	duration?: number;
	width?: string;
	animation?: T_PoptartAnimation;
	animationDuration?: number;
	onClick?: () => void;
	promise?: I_PoptartPromise;
}

export interface I_PoptartItem {
	id: string;
	props: I_PoptartProps;
	expires: Date | null;
	foregroundColor: string;
}

// Poptart colors interface
export type T_PoptartColors = {
	success: string;
	error: string;
	warning: string;
	info: string;
	textLight: string;
	textDark: string;
	loading: string;
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
	input: {
		backgroundColor: string;
		fontColor: string;
		borderRadius: number;
		borderWidth: number;
		paddingX: number;
		paddingY: number;
		maxWidth: string;
		errorFeedbackColor: string;
		placeholderColor: string;
	};
}

// Spinner config interface
export interface I_PoptartSpinnerConfig {
	strokeWidth: number;
	baseColor: string;
	accentColor: string;
	animationDuration: number;
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
	spinner: I_PoptartSpinnerConfig;
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
	alerts?: Partial<Omit<I_AlertConfig, 'input'>> & {
		input?: Partial<I_AlertConfig['input']>;
	};
	spinner?: Partial<I_PoptartSpinnerConfig>;
}

// Provider interface
export interface I_PoptartProviderProps {
	children: ReactNode;
	config?: I_PoptartUserConfig;
}

export interface I_AlertButton {
	label: string;
	backgroundColor: string;
	onClick: () => void;
}

export enum E_AlertInputType {
	text = 'text',
	password = 'password',
	email = 'email',
	number = 'number',
	tel = 'tel',
	url = 'url',
}

export type T_AlertInputType = keyof typeof E_AlertInputType;

export interface I_AlertInput {
	type?: T_AlertInputType;
	placeholder?: string;
	required?: boolean;
	validationCallback?: (value: string | undefined) => string | boolean;
}

export interface I_AlertProps {
	title: string;
	message: string;
	type?: T_PoptartType;
	confirmButtonLabel?: string;
	confirmButtonBackgroundColor?: string;
	confirmButtonCallback?: (value: string | undefined) => void;
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
	input?: I_AlertInput;
	allowClickOffDismissal?: boolean;
}
