import React from "react";
import { IconError, IconSuccess, IconInfo, IconWarn } from "../components/Icons";
var alertsConfig = {
    colors: {
        error: 'bg-red-500',
        success: 'bg-green-600',
        info: 'bg-sky-600',
        warn: 'bg-yellow-600'
    },
    icons: {
        error: React.createElement(IconError, null),
        success: React.createElement(IconSuccess, null),
        info: React.createElement(IconInfo, null),
        warn: React.createElement(IconWarn, null)
    }
};
export default alertsConfig;
