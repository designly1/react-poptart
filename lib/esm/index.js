var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, useContext } from 'react';
import { v4 } from 'uuid';
import Alerts from './components/Alerts';
// Create the alert context
var AlertContext = React.createContext(null);
// Create the alert provider
export var AlertProvider = function (_a) {
    var children = _a.children;
    var _b = useState([]), alerts = _b[0], setAlerts = _b[1];
    var setAlert = function (_a) {
        var message = _a.message, _b = _a.type, type = _b === void 0 ? 'error' : _b, callback = _a.callback, _c = _a.timeout, timeout = _c === void 0 ? 0 : _c;
        var id = v4();
        var newAlert = {
            id: id,
            message: message,
            type: type,
            dismiss: function () {
                dismissAlert(id);
            },
            callback: callback,
        };
        setAlerts(function (old) { return __spreadArray(__spreadArray([], old, true), [newAlert], false); });
        // Auto-dismiss if delay > 0
        if (timeout > 0) {
            setTimeout(function () {
                dismissAlert(id);
            }, timeout);
        }
    };
    // Dismiss alert by its id
    var dismissAlert = function (id) {
        setAlerts(function (oldVal) { return oldVal.filter(function (a) { return a.id !== id; }); });
    };
    return (React.createElement(AlertContext.Provider, { value: { alerts: alerts, setAlert: setAlert, dismissAlert: dismissAlert } },
        children,
        React.createElement(Alerts, { alerts: alerts })));
};
// Create the useAlerts hook
export var useAlerts = function () {
    var _a = useContext(AlertContext), alerts = _a.alerts, setAlert = _a.setAlert, dismissAlert = _a.dismissAlert;
    return {
        alerts: alerts,
        setAlert: setAlert,
        dismissAlert: dismissAlert,
    };
};
