"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Icons_1 = require("../components/Icons");
var alertsConfig = {
    colors: {
        error: 'bg-red-500',
        success: 'bg-green-600',
        info: 'bg-sky-600',
        warn: 'bg-yellow-600'
    },
    icons: {
        error: react_1.default.createElement(Icons_1.IconError, null),
        success: react_1.default.createElement(Icons_1.IconSuccess, null),
        info: react_1.default.createElement(Icons_1.IconInfo, null),
        warn: react_1.default.createElement(Icons_1.IconWarn, null)
    }
};
exports.default = alertsConfig;
