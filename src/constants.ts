import { I_PoptartConfig } from '.';

export const defaultConfig: I_PoptartConfig = {
	// Default colors for the Poptart notifications
	colors: {
		success: '#07bc0c', // Green color for success notifications
		error: '#e74c3c', // Red color for error notifications
		warning: '#f1c40f', // Yellow color for warning notifications
		info: '#3498db', // Blue color for info notifications
		loading: '#4b5155', // Gray color for loading notifications
		textLight: '#fcfcfc', // Light contrasting color for text
		textDark: '#171717', // Dark contrasting color for text
		invertedBackground: '#f6f6f6', // Background color for inverted notifications
	},
	// Override styles for various Poptart components
	styleOverrides: {
		container: {}, // Custom styles for the Poptart container
		poptart: {}, // Custom styles for individual Poptart notifications
		progressBar: {}, // Custom styles for the progress bar
		alertContainer: {}, // Custom styles for the alert container
		alert: {}, // Custom styles for the alert itself
	},
	// Default alignment of Poptarts (possible values: 'tl' - top-left, 'tc' - top-center, 'tr' - top-right, 'bl'
	// - bottom-left, 'bc' - bottom-center, 'br' - bottom-right)
	defaultPoptartStyle: 'default', // Default style of the notification (possible values: 'default', 'filled', 'inverted')
	defaultAlign: 'br',
	// Default type of notification (possible values: 'success', 'error', 'warning', 'info')
	defaultType: 'info',
	// Default duration for which the notification is displayed (in milliseconds)
	defaultDuration: 5000,
	// Default width of the notification poptart
	defaultWidth: '450px',
	// Default animation for the notification appearance (possible values: 'bounceIn', 'fadeIn', 'slideFromLeft',
	// 'slideFromRight', 'slideFromTop', 'slideFromBottom')
	defaultAnimation: 'bounceIn',
	// Default animation duration for notifications (in seconds)
	defaultAnimationDuration: 0.6,
	// Default font size used in the notification text
	fontSize: 16,
	// Factor to adjust the size of icons relative to the font size
	iconSizeFactor: 2.5,
	// Customization for the progress bar in the notification
	progressBar: {
		lightColor: '#D6D6D6', // Color for the light theme of the progress bar
		darkColor: '#454545', // Color for the dark theme of the progress bar
		height: 5, // Height of the progress bar
	},
	// Minimum contrast threshold for readability (used in calculating appropriate text color contrasts)
	contrastThreshold: 0.32,
	// Padding around the Poptart notification (X-axis)
	paddingX: 20,
	// Padding around the Poptart notification (Y-axis)
	paddingY: 16,
	// The z-index to control stacking order of the notification
	zIndex: 10,

	// Default settings for alerts (confirm/cancel dialog boxes)
	alerts: {
		defaultWidth: '600px', // Default width of the alert
		paddingX: 30, // Padding (X-axis) inside the alert box
		paddingY: 26, // Padding (Y-axis) inside the alert box
		borderRadius: 10, // Border radius for rounded corners of the alert box
		defaultType: 'info', // Default type of alert (info, success, error, or warning)
		defaultBackgroundColor: '#ffffff', // Default background color of the alert
		defaultFontColor: '#000', // Default text color inside the alert
		defaultFontSize: 20, // Default font size for the alert text
		defaultTitleFontSize: 28, // Font size for the alert title
		iconSizeFactor: 2, // Factor to adjust the size of icons within alerts
		borderWidth: 3, // Border width around the alert box
		defaultConfirmButtonColor: '#2d2d2d', // Color of the confirm button
		defaultCancelButtonColor: '#6B6B6B', // Color of the cancel button
		defaultConfirmButtonLabel: 'Ok', // Label text for the confirm button
		defaultCancelButtonLabel: 'Cancel', // Label text for the cancel button
		defaultShowCancelButton: false, // Whether the cancel button is shown by default
		defaultShowConfirmButton: true, // Whether the confirm button is shown by default
		defaultAnimation: 'slideFromBottom', // Default animation for alert boxes
		defaultAnimationDuration: 0.25, // Default duration for alert box animations (in seconds)
		allowClickOffDismissal: true, // Whether clicking outside the alert dismisses it

		// Default input styles for alerts (if input is used)
		input: {
			backgroundColor: '#fcfcfcac', // Background color for input fields in alerts
			fontColor: '#000', // Text color for input fields
			borderRadius: 5, // Border radius for the input field
			borderWidth: 1, // Border width around the input field
			paddingX: 10, // Padding (X-axis) for the input field
			paddingY: 8, // Padding (Y-axis) for the input field
			maxWidth: '70%', // Maximum width of the input field
			errorFeedbackColor: '#d12c2c', // Color used to indicate errors in input validation
			placeholderColor: '#a0a0a0', // Placeholder text color
		},
	},
	// Default settings for the spinner component
	spinner: {
		strokeWidth: 7, // Thickness of the spinner ring
		baseColor: '#f3f3f3', // Background color of the spinner ring
		accentColor: '#bbbbbb', // Accent color of the spinner ring
		animationDuration: 1, // Duration of the spinner animation (in seconds)
	},
};
