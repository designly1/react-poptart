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
  },
};
```

### Alert Properties

| Property                 | Type     | Default   | Description                                          |
| ------------------------ | -------- | --------- | ---------------------------------------------------- |
| `title`                  | string   | N/A       | The title of the alert                               |
| `message`                | string   | N/A       | The message displayed inside the alert               |
| `confirmButtonLabel`     | string   | 'Ok'      | The label for the confirm button                     |
| `cancelButtonLabel`      | string   | 'Cancel'  | The label for the cancel button                      |
| `onConfirm`              | function | N/A       | Callback function when the confirm button is pressed |
| `onCancel`               | function | N/A       | Callback function when the cancel button is pressed  |
| `defaultBackgroundColor` | string   | `#F5F5F5` | Background color of the alert                        |
| `defaultFontColor`       | string   | `#000`    | Font color of the alert text                         |
| `iconSizeFactor`         | number   | `2`       | Size factor for icons relative to font size          |
| `allowClickOffDismissal` | boolean  | `true`    | Whether clicking outside the alert dismisses it      |

## Dismissing Alerts

Alerts can be dismissed by clicking on the cancel button or clicking off the alert if `allowClickOffDismissal` is set to `true`. You can also dismiss alerts programmatically using `dismissAlert()`.

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
