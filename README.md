# react-poptart

[![All Tests](https://github.com/designly1/react-poptart/actions/workflows/alltests.yml/badge.svg)](https://github.com/designly1/react-poptart/actions/workflows/alltests.yml)

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

## Alert Inputs with Custom Validation

You can add custom validation to alert inputs using a validation callback function. This function should return `true` if the input is valid or return a string message if the validation fails. The string message will be displayed as an error.

### Example with Custom Validation:

```tsx
import React, { useState } from 'react';
import { usePoptart } from 'react-poptart';

const CustomValidationAlertButton = () => {
  const { alert } = usePoptart();
  const [error, setError] = useState<string | null>(null);

  const handleCustomValidation = (value: string) => {
    // Simple validation example: email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      return 'Email is required';
    } else if (!emailPattern.test(value)) {
      return 'Please enter a valid email address';
    }
    return true;
  };

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
        const validationResult = handleCustomValidation(value);
        if (validationResult === true) {
          setError(null);
          console.log('Valid input:', value);
        } else {
          setError(validationResult as string);
        }
      },
      error, // Pass the error to display it in the alert input
    });
  };

  return <button onClick={handleAlertClick}>Show Custom Validation Alert</button>;
};
```

### Custom Validation Workflow:

1. The `handleCustomValidation` function validates the input.
2. If the input is valid, it returns `true`.
3. If the input is invalid, it returns a string that will be displayed as an error message.
4. The error message is passed to the alert component and displayed below the input field.

## Configuration

You can customize the appearance and behavior of notifications and alerts by passing a configuration object to the `PoptartProvider`.

### Default Configuration:

```tsx
const defaultConfig = {
  colors: {
    success: '#1a7e38',
    error: '#e4002d',
    warning: '#e4bf00',
    info: '#1FA2FF',
    textLight: '#E8E8E8',
    textDark: '#1F1F1F',
  },
  styleOverrides: {
    container: {},   // Override styles for the container
    poptart: {},     // Override styles for each notification
    progressBar: {}, // Override styles for the progress bar
    alertContainer: {}, // Override styles for the alert container
    alert: {},       // Override styles for each alert
  },
  defaultAlign: 'br',           // Align notifications: 'tl', 'tc', 'tr', 'bl', 'bc', 'br'
  defaultType: 'info',          // Default notification type: 'info', 'success', 'error', 'warning'
  defaultDuration: 5000,        // Default duration for notifications (in milliseconds)
  defaultWidth: '450px',        // Default width of the notification
  defaultAnimation: 'bounceIn', // Default animation for notifications
  defaultAnimationDuration: 0.6, // Animation duration (in seconds)
  fontSize: 16,                  // Font size (in pixels)
  iconSizeFactor: 2.5,           // Icon size multiplier relative to font size
  progressBar: {
    lightColor: '#D6D6D6',
    darkColor: '#454545',
    height: 5,                   // Height of the progress bar (in pixels)
  },
  contrastThreshold: 0.32,       // Threshold for contrast calculations
  paddingX: 20,                  // Horizontal padding inside the notification
  paddingY: 16,                  // Vertical padding inside the notification
  zIndex: 10,                    // Z-index for the notification container

  alerts: {
    defaultWidth: '800px',
    paddingX: 30,
    paddingY: 26,
    borderRadius: 10,
    defaultType: 'info',
    defaultBackgroundColor: '#F5F5F5',
    defaultFontColor: '#000',
    defaultFontSize: 20,
    defaultTitleFontSize: 28,
    iconSizeFactor: 2,
    borderWidth: 8,
    defaultConfirmButtonColor: '#1a7e38',
    defaultCancelButtonColor: '#e4002d',
    defaultConfirmButtonLabel: 'Ok',
    defaultCancelButtonLabel: 'Cancel',
    defaultShowCancelButton: true,
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

### Alert Input Configuration

You can customize input fields in alerts using the configuration object in `PoptartProvider` or inline for individual alerts.

### Input Configuration:

| Property                 | Type     | Default     | Description                                 |
| ------------------------ | -------- | ----------- | ------------------------------------------- |
| `type`                   | string   | `text`      | The type of input (e.g., `text

`, `email`)   |
| `placeholder`            | string   | `""`        | Placeholder text                            |
| `required`               | boolean  | `false`     | Whether the input is required               |
| `backgroundColor`        | string   | `#fcfcfcac` | Background color of the input               |
| `fontColor`              | string   | `#000`      | Font color of the input text                |
| `borderRadius`           | number   | `5`         | Border radius of the input                  |
| `borderWidth`            | number   | `1`         | Border width of the input                   |
| `paddingX`               | number   | `10`        | Horizontal padding inside the input         |
| `paddingY`               | number   | `8`         | Vertical padding inside the input           |
| `maxWidth`               | string   | `'70%'`     | Maximum width of the input                  |
| `errorFeedbackColor`     | string   | `#d12c2c`   | Color for error messages                    |
| `placeholderColor`       | string   | `#a0a0a0`   | Color of the placeholder text               |

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

## Changelog

You can checkout the changelog [here](https://github.com/designly1/react-poptart/blob/master/CHANGELOG.md).

## Contributing

All pull requests are welcome. For major changes, please file an [issue](https://github.com/designly1/react-poptart/issues) first to discuss what you would like to change.
