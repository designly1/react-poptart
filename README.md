# react-poptart

[![All Tests](https://github.com/designly1/react-poptart/actions/workflows/alltests.yml/badge.svg)](https://github.com/designly1/react-poptart/actions/workflows/alltests.yml) [![npm version](https://badge.fury.io/js/react-poptart.svg)](https://badge.fury.io/js/react-poptart) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

[Changelog](https://github.com/designly1/react-poptart/blob/master/CHANGELOG.md)

## Overview

`react-poptart` is an easy-to-use notification and alert system for React apps. It includes features such as multiple animations, auto-dismiss notifications, progress bars, customizable alerts, and flexible theming options.

The bundled size of `react-poptart` is a mere 13kb, much smaller than most other libraries!

This documentation will guide you through the setup, usage, and customization of the Poptart Notification and Alert components.

## Installation

To install the package, use npm:

```bash
npm install react-poptart
```

## Setup

To use the Poptart component in your React app, you must wrap your application in the `PoptartProvider`. This ensures that all child components can trigger notifications and alerts.

```tsx
import React from 'react';
import { PoptartProvider } from 'react-poptart';

function App() {
  return (
    <PoptartProvider>
      <YourAppComponents />
    </PoptartProvider>
  );
}

export default App;
```

## Notifications Usage

To trigger a notification, use the `usePoptart()` hook, which provides access to the `push()` and `dismiss()` methods.

### Example:

```tsx
import React from 'react';
import { usePoptart } from 'react-poptart';

const NotificationButton = () => {
  const { push } = usePoptart();

  const handleClick = () => {
    push({
      type: 'success',
      message: 'This is a success notification!',
      duration: 5000,  // Optional: Specify duration in milliseconds
    });
  };

  return <button onClick={handleClick}>Show Notification</button>;
};
```

### Promises

You can also create a poptart with a loading spinner that resolves to either an error or success poptart:

```ts
// Promise interface 
interface I_PoptartPromise {
	promise: Promise<void>;
	successMessage: string;
	errorMessage: string;
}

// Promise method
promise(message: string, promise: I_PoptartPromise, overrides?: Partial<I_PoptartProps>) => string;
```

### Example:

```ts
const handleCreatePromisePoptart = () => {
	poptart.promise('Saving user data...', {
		promise: new Promise(resolve => {
			setTimeout(() => {
				resolve();
			}, 2000);
		}),
		successMessage: 'User data saved successfully!',
		errorMessage: 'Failed to save user data',
	});
};
```

## Poptart Properties

| Property             | Type             | Default      | Description                                                                                           |
| -------------------- | ---------------- | ------------ | ----------------------------------------------------------------------------------------------------- |
| `type?`              | string           | `'info'`     | Type of the notification: `'info'`, `'success'`, `'error'`, `'warning'`                               |
| `message`            | string           | N/A          | The message displayed inside the notification                                                         |
| `width?`             | string           | `'450px'`    | Width of the notification                                                                             |
| `duration?`          | number           | `5000`       | How long the notification stays visible (in milliseconds)                                             |
| `poptartStyle`       | string           | `'default'`  | Style of poptart container. Options: `'default'`, `'filled'`, or `'inverted'`. Default is `'filled'`. |
| `animation?`         | string           | `'bounceIn'` | Animation for the notification. Available options are `'fade'`, `'slide'`, `'bounceIn'`, etc.         |
| `animationDuration?` | number           | `0.6`        | Animation duration in seconds                                                                         |
| `onClick?`           | function         | `undefined`  | Callback function for when a Poptart is clicked                                                       |
| `promise?`           | I_PoptartPromise | `undefined`  | Create a promise poptart that resolves to either an error or success poptart (see promises section)   |

## Alerts Usage

You can also trigger alerts using the `alert()` method from `usePoptart()`. Alerts provide more detailed interactions like confirmation buttons and more.

### Example:

```tsx
import React from 'react';
import { usePoptart } from 'react-poptart';

const AlertButton = () => {
  const { alert } = usePoptart();

  const handleAlertClick = () => {
    alert({
      title: 'Confirmation',
      message: 'Are you sure you want to proceed?',
      confirmButtonLabel: 'Yes',
      cancelButtonLabel: 'No',
      onConfirm: () => {
        console.log('Confirmed!');
      },
      onCancel: () => {
        console.log('Cancelled!');
      },
    });
  };

  return <button onClick={handleAlertClick}>Show Alert</button>;
};
```

## Alert Properties

| Property                 | Type     | Default       | Description                                                            |
| ------------------------ | -------- | ------------- | ---------------------------------------------------------------------- |
| `title`                  | string   | N/A           | The title of the alert                                                 |
| `message`                | string   | N/A           | The message displayed inside the alert                                 |
| `confirmButtonLabel?`    | string   | `'Ok'`        | The label for the confirm button                                       |
| `cancelButtonLabel?`     | string   | `'Cancel'`    | The label for the cancel button                                        |
| `onConfirm?`             | function | N/A           | Callback function when the confirm button is pressed                   |
| `onCancel?`              | function | N/A           | Callback function when the cancel button is pressed                    |
| `showCancelButton?`      | boolean  | `true`        | Whether to show the cancel button                                      |
| `showConfirmButton?`     | boolean  | `true`        | Whether to show the confirm button                                     |
| `defaultBackgroundColor?`| string   | `#F5F5F5`     | Background color of the alert                                          |
| `defaultFontColor?`      | string   | `#000`        | Font color of the alert text                                           |
| `defaultAnimation?`      | string   | `'slideFromBottom'` | Animation for the alert display                                   |
| `defaultAnimationDuration?`| number | `0.25`        | Animation duration in seconds                                          |
| `allowClickOffDismissal?`| boolean  | `true`        | Whether clicking outside the alert dismisses it                        |

## Alert Inputs

In addition to basic alerts, `react-poptart` also supports input fields inside alerts, allowing for forms or other types of user input to be captured directly within the alert.

### Example:

```tsx
import React from 'react';
import { usePoptart } from 'react-poptart';

const InputAlertButton = () => {
  const { alert } = usePoptart();

  const handleAlertClick = () => {
    alert({
      title: 'Enter Your Email',
      message: 'Please provide your email address.',
      input: {
        type: 'email',
        placeholder: 'your-email@example.com',
        required: true,
      },
      confirmButtonLabel: 'Submit',
      cancelButtonLabel: 'Cancel',
      onConfirm: (value) => {
        console.log('Input value:', value);
      },
    });
  };

  return <button onClick={handleAlertClick}>Show Input Alert</button>;
};
```

### Alert Input Props

| Property                 | Type     | Default     | Description                                 |
| ------------------------ | -------- | ----------- | ------------------------------------------- |
| `type?`                  | string   | `text`      | The type of input (e.g., `text`, `email`)   |
| `placeholder?`           | string   | `""`        | Placeholder text                            |
| `required?`              | boolean  | `false`     | Whether the input is required               |
| `validationCallback?`    | function | `undefined` | Callback for custom input validation        |

## Alert Inputs with Custom Validation

You can add custom validation to alert inputs by passing a `validationCallback` to the input configuration. This function should return `true` if the input is valid or return a string message if the validation fails. The string message will be displayed as an error.

### Example with Custom Validation:

```tsx
import React from 'react';
import { usePoptart } from 'react-poptart';

const CustomValidationAlertButton = () => {
  const { alert } = usePoptart();

  const handleAlertClick = () => {
    alert({
      title: 'Enter Your Email',
      message: 'Please provide your email address.',
      input: {
        type: 'email',
        placeholder: 'your-email@example.com',
        required: true,
        validationCallback: (value) => {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!value) {
            return 'Email is required';
          } else if (!emailPattern.test(value)) {
            return 'Please enter a valid email address';
          }
          return true;
        },
      },
      confirmButtonLabel: 'Submit',
      cancelButtonLabel: 'Cancel',
      onConfirm: (value) => {
        console.log('Valid input:', value);
      },
    });
  };

  return <button onClick={handleAlertClick}>Show Custom Validation Alert</button>;
};
```

### Custom Validation Workflow:

1. The `validationCallback` function is passed to the alert input.
2. If the input is valid, the callback returns `true`.
3. If the input is invalid, the callback returns a string which will be displayed as an error message below the input field.

## Default Configuration

Below is the default configuration for `react-poptart`. You can override these settings by passing a custom configuration object to the `PoptartProvider`.

```tsx
export const defaultConfig: I_PoptartConfig = {
	// Default colors for the Poptart notifications
	colors: {
		success: '#229645', // Green color for success notifications
		error: '#e71b44', // Red color for error notifications
		warning: '#e9c514', // Yellow color for warning notifications
		info: '#1FA2FF', // Blue color for info notifications
		loading: '#4b5155', // Gray color for loading notifications
		textLight: '#f9f9f9', // Light contrasting color for text
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
```

## Dismissing Alerts

Alerts can be dismissed by clicking on the cancel button, clicking off the alert if `allowClickOffDismissal` is set to `true`, or programmatically using `dismissAlert()`.

```tsx
const { alert, dismissAlert } = usePoptart();

const handleDismiss = () => {
  dismissAlert();
};
```

## Custom Styling

You can override the styles of both notifications and alerts by providing a `styleOverrides` object in the configuration.

```tsx
<PoptartProvider config={{
  styleOverrides: {
    poptart: {
      borderRadius: '8px',
      boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
    },
    alert: {
      borderRadius: '10px',
      backgroundColor: '#333',
      color: '#FFF',
    },
    progressBar: {
      backgroundColor: '#FFCC00',
    },
  },
}}>
  <YourApp />
</PoptartProvider>
```

## Development

To develop `react-poptart`, simply clone and install dependencies and then run `pnpm run dev`.

To test in a React development project, in the `react-poptart` root directory run:

```
pnpm link --global
```

Then in your React project root, run:

```
pnpm link react-poptart
```

When you're done with development, simply run:

```
pnpm unlink react-poptart
```

Run `pnpm run build` to build and `pnpm run test` to run all tests.

## Issues

To report a bug or an issue, please use the [GitHub Repo Issues Tracker](https://github.com/designly1/react-poptart/issues).

## Contributing

All pull requests are welcome. For major changes, please file an [issue](https://github.com/designly1/react-poptart/issues) first to discuss what you would like to change.
