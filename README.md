# react-poptart

[![All Tests](https://github.com/designly1/react-poptart/actions/workflows/alltests.yml/badge.svg)](https://github.com/designly1/react-poptart/actions/workflows/alltests.yml)

## Overview

The `react-poptart` an easy-to-use notification system for React apps. It includes features like multiple animations, auto-dismiss, progress bars, and flexible theming.

This documentation will guide you on how to set up, use, and customize the Poptart Notification component.

## Installation

`npm install react-poptart`

## Setup

To use the Poptart component in your React app, you need to wrap your application in the `PoptartProvider`. This will ensure that all children components can trigger notifications.

```ts
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

## Usage

To trigger a notification, you can use the `usePoptart()` hook, which provides access to the `push()` and `dismiss()` methods.

### Example:

```ts
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

## Configuration

You can customize the appearance and behavior of the notifications by passing a configuration object to the `PoptartProvider`.

### Default Configuration:

```ts
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
  },
  defaultAlign: 'br',           // Align notifications: 'tl', 'tc', 'tr', 'bl', 'bc', 'br'
  defaultType: 'info',          // Default notification type: 'info', 'success', 'error', 'warning'
  defaultDuration: 5000,        // Default duration for notifications
  defaultWidth: '450px',        // Default width of the notification
  defaultAnimation: 'bounceIn', // Default animation
  defaultAnimationDuration: 0.6, // Animation duration in seconds
  fontSize: 16,                  // Font size in pixels
  iconSizeFactor: 2.5,           // Multiplier for icon size relative to font size
  progressBar: {
    lightColor: '#D6D6D6',
    darkColor: '#454545',
    height: 5,                   // Height of the progress bar
  },
  contrastThreshold: 0.32,       // Threshold for contrast calculations
  paddingX: 20,                  // Horizontal padding inside the notification
  paddingY: 16,                  // Vertical padding inside the notification
  zIndex: 10,                    // Z-index for the notification container
};
```

### Notification Types

The `type` property determines the style of the notification. Available types:

- `success`
- `error`
- `warning`
- `info`

### Notification Properties

| Property            | Type   | Default    | Description                                              |
| ------------------- | ------ | ---------- | -------------------------------------------------------- |
| `type`              | string | `info`     | Defines the notification type (`success`, `error`, etc.) |
| `message`           | string | N/A        | The message displayed inside the notification            |
| `duration`          | number | `5000`     | How long the notification stays on the screen (in ms)    |
| `width`             | string | `450px`    | The width of the notification                            |
| `animation`         | string | `bounceIn` | CSS animation to apply when the notification appears     |
| `animationDuration` | number | `0.6`      | Duration of the animation (in seconds)                   |

## Dismissing Notifications

Notifications will dismiss automatically after the specified `duration`, but they can also be dismissed manually.

```ts
const { push, dismiss } = usePoptart();

const notificationId = push({
    type: 'success',
    message: 'This is a success notification!',
});

dismiss(notificationId);
```

## Custom Styling

Override the styles by providing a `styleOverrides` object in the configuration.

```jsx
<PoptartProvider config={{
  styleOverrides: {
    poptart: {
      borderRadius: '8px',
      boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
    },
    progressBar: {
      backgroundColor: '#FFCC00',
    },
  },
}}>
  <YourApp />
</PoptartProvider>
```

## Issues

To report a bug or issue, please use the [GitHub Repo Issues Tracker](https://github.com/designly1/react-poptart/issues).

## Contributing

All PRs are welcome. For major changes, please file an [issue](https://github.com/designly1/react-poptart/issues) first.