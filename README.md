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

## Poptart Properties

| Property           | Type     | Default      | Description                                                             |
| ------------------ | -------- | ------------ | ----------------------------------------------------------------------- |
| `type?`            | string   | `'info'`     | Type of the notification: `'info'`, `'success'`, `'error'`, `'warning'` |
| `message`          | string   | N/A          | The message displayed inside the notification                            |
| `width?`           | string   | `'450px'`    | Width of the notification                                                |
| `duration?`        | number   | `5000`       | How long the notification stays visible (in milliseconds)                |
| `animation?`       | string   | `'bounceIn'` | Animation for the notification. Available options are `'fade'`, `'slide'`, `'bounceIn'`, etc. |
| `animationDuration?`| number  | `0.6`        | Animation duration in seconds                                            |
| `onClick?`         | function | `undefined`  | Callback function for when a Poptart is clicked                           |

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
import { I_PoptartConfig } from '.';

export const defaultConfig: I_PoptartConfig = {
	colors: {
		success: '#229645',
		error: '#e71b44',
		warning: '#ffdc2e',
		info: '#1FA2FF',
		textLight: '#f9f9f9',
		textDark: '#171717',
	},
	styleOverrides:

 {
		container: {},
		poptart: {},
		progressBar: {},
		alertContainer: {},
		alert: {},
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
	alerts: {
		defaultWidth: '600px',
		paddingX: 30,
		paddingY: 26,
		borderRadius: 10,
		defaultType: 'info',
		defaultBackgroundColor: '#ffffff',
		defaultFontColor: '#000',
		defaultFontSize: 20,
		defaultTitleFontSize: 28,
		iconSizeFactor: 2,
		borderWidth: 3,
		defaultConfirmButtonColor: '#2d2d2d',
		defaultCancelButtonColor: '#6B6B6B',
		defaultConfirmButtonLabel: 'Ok',
		defaultCancelButtonLabel: 'Cancel',
		defaultShowCancelButton: false,
		defaultShowConfirmButton: true,
		defaultAnimation: 'slideFromBottom',
		defaultAnimationDuration: 0.25,
		allowClickOffDismissal: true,
		input: {
			backgroundColor: '#fcfcfcac',
			fontColor: '#000',
			borderRadius: 5,
			borderWidth: 1,
			paddingX: 10,
			paddingY: 8,
			maxWidth: '70%',
			errorFeedbackColor: '#d12c2c',
			placeholderColor: '#a0a0a0',
		},
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

To develop `react-poptart`, simply clone and install dependencies and then run `npm run dev`. Run `npm run build` to build and `npm run test` to run all tests.

## Issues

To report a bug or an issue, please use the [GitHub Repo Issues Tracker](https://github.com/designly1/react-poptart/issues).

## Contributing

All pull requests are welcome. For major changes, please file an [issue](https://github.com/designly1/react-poptart/issues) first to discuss what you would like to change.
