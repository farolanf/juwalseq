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
var Clear_1 = __importDefault(require("@material-ui/icons/Clear"));
var Done_1 = __importDefault(require("@material-ui/icons/Done"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var styles_1 = require("@material-ui/core/styles");
var compose_1 = __importDefault(require("recompose/compose"));
var ra_core_1 = require("ra-core");
var sanitizeRestProps_1 = __importDefault(require("./sanitizeRestProps"));
var styles = styles_1.createStyles({
    label: {
        // Move the text out of the flow of the container.
        position: 'absolute',
        // Reduce its height and width to just one pixel.
        height: 1,
        width: 1,
        // Hide any overflowing elements or text.
        overflow: 'hidden',
        // Clip the box to zero pixels.
        clip: 'rect(0, 0, 0, 0)',
        // Text won't wrap to a second line.
        whiteSpace: 'nowrap',
    },
});
exports.BooleanField = function (_a) {
    var className = _a.className, classes = _a.classes, source = _a.source, _b = _a.record, record = _b === void 0 ? {} : _b, translate = _a.translate, valueLabelTrue = _a.valueLabelTrue, valueLabelFalse = _a.valueLabelFalse, rest = __rest(_a, ["className", "classes", "source", "record", "translate", "valueLabelTrue", "valueLabelFalse"]);
    var value = get_1.default(record, source);
    var ariaLabel = value ? valueLabelTrue : valueLabelFalse;
    if (!ariaLabel) {
        ariaLabel =
            value === false
                ? translate('ra.boolean.false')
                : translate('ra.boolean.true');
    }
    if (value === false) {
        return (react_1.default.createElement(Typography_1.default, __assign({ component: "span", body1: "body1", className: className }, sanitizeRestProps_1.default(rest)),
            react_1.default.createElement("span", { className: classes.label }, ariaLabel),
            react_1.default.createElement(Clear_1.default, null)));
    }
    if (value === true) {
        return (react_1.default.createElement(Typography_1.default, __assign({ component: "span", body1: "body1", className: className }, sanitizeRestProps_1.default(rest)),
            react_1.default.createElement("span", { className: classes.label }, ariaLabel),
            react_1.default.createElement(Done_1.default, null)));
    }
    return (react_1.default.createElement(Typography_1.default, __assign({ component: "span", body1: "body1", className: className }, sanitizeRestProps_1.default(rest))));
};
exports.BooleanField.propTypes = {
    addLabel: prop_types_1.default.bool,
    basePath: prop_types_1.default.string,
    className: prop_types_1.default.string,
    cellClassName: prop_types_1.default.string,
    headerClassName: prop_types_1.default.string,
    label: prop_types_1.default.string,
    record: prop_types_1.default.object,
    sortBy: prop_types_1.default.string,
    source: prop_types_1.default.string.isRequired,
    valueLabelTrue: prop_types_1.default.string,
    valueLabelFalse: prop_types_1.default.string,
};
exports.BooleanField.defaultProps = {
    classes: {},
    translate: function (x) { return x; },
};
var PureBooleanField = compose_1.default(pure_1.default, styles_1.withStyles(styles), ra_core_1.translate)(exports.BooleanField);
PureBooleanField.defaultProps = {
    addLabel: true,
};
exports.default = PureBooleanField;
