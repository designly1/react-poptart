import { I_PoptartConfig } from '.';

export const defaultConfig: I_PoptartConfig = {
	colors: {
		success: '#1a7e38',
		error: '#e4002d',
		warning: '#e4bf00',
		info: '#1FA2FF',
		textLight: '#E8E8E8',
		textDark: '#1F1F1F',
	},
	styleOverrides: {
		container: {},
		poptart: {},
		progressBar: {},
	},
	defaultAlign: 'br',
	defaultType: 'info',
	defaultDuration: 5000,
	defaultWidth: '450px',
	defaultAnimation: 'bounceIn',
	defaultAnimationDuration: 0.6,
	fontSize: 16,
	iconSizeFactor: 2.5,
	progressBar: {
		lightColor: '#D6D6D6',
		darkColor: '#454545',
		height: 5,
	},
	contrastThreshold: 0.32,
	paddingX: 20,
	paddingY: 16,
	zIndex: 10,
};
