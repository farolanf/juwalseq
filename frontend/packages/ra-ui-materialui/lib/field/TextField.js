"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var get_1 = __importDefault(require("lodash/get"));
var pure_1 = __importDefault(require("recompose/pure"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var sanitizeRestProps_1 = __importDefault(require("./sanitizeRestProps"));
var TextField = function (_a) {
    var className = _a.className, source = _a.source, _b = _a.record, record = _b === void 0 ? {} : _b, rest = __rest(_a, ["className", "source", "record"]);
    var value = get_1.default(record, source);
    return (react_1.default.createElement(Typography_1.default, __assign({ component: "span", body1: "body1", className: className }, sanitizeRestProps_1.default(rest)), value && typeof value !== 'string' ? JSON.stringify(value) : value));
};
TextField.propTypes = {
    addLabel: prop_types_1.default.bool,
    basePath: prop_types_1.default.string,
    className: prop_types_1.default.string,
    cellClassName: prop_types_1.default.string,
    headerClassName: prop_types_1.default.string,
    label: prop_types_1.default.string,
    record: prop_types_1.default.object,
    sortBy: prop_types_1.default.string,
    source: prop_types_1.default.string.isRequired,
};
// wat? TypeScript looses the displayName if we don't set it explicitly
TextField.displayName = 'TextField';
var PureTextField = pure_1.default(TextField);
PureTextField.defaultProps = {
    addLabel: true,
};
exports.default = PureTextField;
