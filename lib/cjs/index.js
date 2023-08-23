"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAlerts = exports.AlertProvider = void 0;
var react_1 = __importStar(require("react"));
var uuid_1 = require("uuid");
var Alerts_1 = __importDefault(require("./components/Alerts"));
// Create the alert context
var AlertContext = react_1.default.createContext(null);
// Create the alert provider
var AlertProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)([]), alerts = _b[0], setAlerts = _b[1];
    var setAlert = function (_a) {
        var message = _a.message, _b = _a.type, type = _b === void 0 ? 'error' : _b, callback = _a.callback, _c = _a.timeout, timeout = _c === void 0 ? 0 : _c;
        var id = (0, uuid_1.v4)();
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
    return (react_1.default.createElement(AlertContext.Provider, { value: { alerts: alerts, setAlert: setAlert, dismissAlert: dismissAlert } },
        children,
        react_1.default.createElement(Alerts_1.default, { alerts: alerts })));
};
exports.AlertProvider = AlertProvider;
// Create the useAlerts hook
var useAlerts = function () {
    var _a = (0, react_1.useContext)(AlertContext), alerts = _a.alerts, setAlert = _a.setAlert, dismissAlert = _a.dismissAlert;
    return {
        alerts: alerts,
        setAlert: setAlert,
        dismissAlert: dismissAlert,
    };
};
exports.useAlerts = useAlerts;
