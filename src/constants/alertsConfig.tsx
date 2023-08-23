import React from "react";
import { IconError, IconSuccess, IconInfo, IconWarn } from "../components/Icons";

const alertsConfig = {
    colors: {
        error: 'bg-red-500',
        success: 'bg-green-600',
        info: 'bg-sky-600',
        warn: 'bg-yellow-600'
    },
    icons: {
        error: <IconError />,
        success: <IconSuccess />,
        info: <IconInfo />,
        warn: <IconWarn />
    }
}

export default alertsConfig;