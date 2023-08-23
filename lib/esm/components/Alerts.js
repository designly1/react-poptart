import React from 'react';
import { v4 } from 'uuid';
import { AnimatePresence, motion } from 'framer-motion';
import alertsConfig from '../constants/alertsConfig';
import { IconClose } from './Icons';
export default function Alerts(_a) {
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
        return (React.createElement(motion.div, { initial: { opacity: 0, translateY: '50px' }, animate: { opacity: 1, translateY: 0 }, exit: { opacity: 0, translateY: '50px' }, transition: {
                type: "spring",
                stiffness: 200,
                damping: 15
            }, className: "flex ".concat(alertsConfig.colors[type], " text-white [&>*]:my-auto p-2 h-[50px]") },
            React.createElement("div", { className: "text-3xl mr-2" }, alertsConfig.icons[type]),
            React.createElement("div", { className: "w-full text-sm" },
                message,
                callback
                    ?
                        React.createElement(React.Fragment, null,
                            " Please ",
                            React.createElement("button", { onClick: handleCallback, className: "underline" }, "Click Here"))
                    :
                        React.createElement(React.Fragment, null)),
            React.createElement("button", { className: "text-3xl", onClick: dismiss },
                React.createElement(IconClose, null))));
    };
    return (React.createElement("div", { className: "fixed bottom-0 left-0 right-0 flex flex-col" },
        React.createElement(AnimatePresence, null, alerts.map(function (a) { return React.createElement(Alert, { key: v4(), id: a.id, type: a.type, message: a.message, dismiss: a.dismiss, callback: a.callback }); }))));
}
