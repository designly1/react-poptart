"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var uuid_1 = require("uuid");
var framer_motion_1 = require("framer-motion");
var alertsConfig_1 = __importDefault(require("../constants/alertsConfig"));
var Icons_1 = require("./Icons");
function Alerts(_a) {
    var alerts = _a.alerts;
    if (!Array.isArray(alerts))
        return null;
    var Alert = function (props) {
        var type = props.type, message = props.message, dismiss = props.dismiss, callback = props.callback;
        var handleCallback = function () {
            if (typeof dismiss === 'function')
                dismiss();
            if (typeof callback === 'function')
                callback();
        };
        return (react_1.default.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, translateY: '50px' }, animate: { opacity: 1, translateY: 0 }, exit: { opacity: 0, translateY: '50px' }, transition: {
                type: "spring",
                stiffness: 200,
                damping: 15
            }, className: "flex ".concat(alertsConfig_1.default.colors[type], " text-white [&>*]:my-auto p-2 h-[50px]") },
            react_1.default.createElement("div", { className: "text-3xl mr-2" }, alertsConfig_1.default.icons[type]),
            react_1.default.createElement("div", { className: "w-full text-sm" },
                message,
                callback
                    ?
                        react_1.default.createElement(react_1.default.Fragment, null,
                            " Please ",
                            react_1.default.createElement("button", { onClick: handleCallback, className: "underline" }, "Click Here"))
                    :
                        react_1.default.createElement(react_1.default.Fragment, null)),
            react_1.default.createElement("button", { className: "text-3xl", onClick: dismiss },
                react_1.default.createElement(Icons_1.IconClose, null))));
    };
    return (react_1.default.createElement("div", { className: "fixed bottom-0 left-0 right-0 flex flex-col" },
        react_1.default.createElement(framer_motion_1.AnimatePresence, null, alerts.map(function (a) { return react_1.default.createElement(Alert, { key: (0, uuid_1.v4)(), id: a.id, type: a.type, message: a.message, dismiss: a.dismiss, callback: a.callback }); }))));
}
exports.default = Alerts;
