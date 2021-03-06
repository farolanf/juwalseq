"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var recompose_1 = require("recompose");
var react_dropzone_1 = __importDefault(require("react-dropzone"));
var compose_1 = __importDefault(require("recompose/compose"));
var styles_1 = require("@material-ui/core/styles");
var FormHelperText_1 = __importDefault(require("@material-ui/core/FormHelperText"));
var classnames_1 = __importDefault(require("classnames"));
var ra_core_1 = require("ra-core");
var Labeled_1 = __importDefault(require("./Labeled"));
var FileInputPreview_1 = __importDefault(require("./FileInputPreview"));
var sanitizeRestProps_1 = __importDefault(require("./sanitizeRestProps"));
var styles = styles_1.createStyles({
    dropZone: {
        background: '#efefef',
        cursor: 'pointer',
        padding: '1rem',
        textAlign: 'center',
        color: '#999',
    },
    preview: {},
    removeButton: {},
    root: { width: '100%' },
});
var FileInput = /** @class */ (function (_super) {
    __extends(FileInput, _super);
    function FileInput(props) {
        var _this = _super.call(this, props) || this;
        _this.onDrop = function (files) {
            var updatedFiles = _this.props.multiple
                ? _this.state.files.concat(files.map(_this.transformFile)) : files.map(_this.transformFile).slice();
            _this.setState({ files: updatedFiles });
            if (_this.props.multiple) {
                // Use onBlur to ensure redux-form set the input as touched
                _this.props.input.onBlur(updatedFiles);
            }
            else {
                _this.props.input.onBlur(updatedFiles[0]);
            }
        };
        _this.onRemove = function (file) { return function () {
            var filteredFiles = _this.state.files.filter(function (stateFile) { return !recompose_1.shallowEqual(stateFile, file); });
            _this.setState({ files: filteredFiles });
            // Use onBlur to ensure redux-form set the input as touched
            if (_this.props.multiple) {
                _this.props.input.onBlur(filteredFiles);
            }
            else {
                _this.props.input.onBlur(null);
            }
        }; };
        // turn a browser dropped file structure into expected structure
        _this.transformFile = function (file) {
            var _a;
            if (!(file instanceof File)) {
                return file;
            }
            var _b = react_1.Children.only(_this.props.children).props, source = _b.source, title = _b.title;
            var transformedFile = (_a = {
                    rawFile: file
                },
                _a[source] = file.preview,
                _a);
            if (title) {
                transformedFile[title] = file.name;
            }
            return transformedFile;
        };
        var files = props.input.value || [];
        if (!Array.isArray(files)) {
            files = [files];
        }
        _this.state = {
            files: files.map(_this.transformFile),
        };
        return _this;
    }
    FileInput.prototype.componentWillReceiveProps = function (nextProps) {
        var files = nextProps.input.value || [];
        if (!Array.isArray(files)) {
            files = [files];
        }
        this.setState({ files: files.map(this.transformFile) });
    };
    FileInput.prototype.label = function () {
        var _a = this.props, translate = _a.translate, placeholder = _a.placeholder, labelMultiple = _a.labelMultiple, labelSingle = _a.labelSingle;
        if (placeholder) {
            return placeholder;
        }
        if (this.props.multiple) {
            return react_1.default.createElement("p", null, translate(labelMultiple));
        }
        return react_1.default.createElement("p", null, translate(labelSingle));
    };
    FileInput.prototype.render = function () {
        var _this = this;
        var _a = this.props, accept = _a.accept, children = _a.children, _b = _a.classes, classes = _b === void 0 ? {} : _b, className = _a.className, disableClick = _a.disableClick, id = _a.id, isRequired = _a.isRequired, label = _a.label, maxSize = _a.maxSize, meta = _a.meta, minSize = _a.minSize, multiple = _a.multiple, resource = _a.resource, source = _a.source, translate = _a.translate, _c = _a.options, options = _c === void 0 ? {} : _c, rest = __rest(_a, ["accept", "children", "classes", "className", "disableClick", "id", "isRequired", "label", "maxSize", "meta", "minSize", "multiple", "resource", "source", "translate", "options"]);
        return (react_1.default.createElement(Labeled_1.default, __assign({ id: id, label: label, className: classnames_1.default(classes.root, className), source: source, resource: resource, isRequired: isRequired, meta: meta }, sanitizeRestProps_1.default(rest)),
            react_1.default.createElement("span", null,
                react_1.default.createElement(react_dropzone_1.default, __assign({ onDrop: this.onDrop, accept: accept, disableClick: disableClick, maxSize: maxSize, minSize: minSize, multiple: multiple, className: classes.dropZone }, options, { inputProps: __assign({ id: id }, options.inputProps) }), this.label()),
                children && (react_1.default.createElement("div", { className: "previews" }, this.state.files.map(function (file, index) { return (react_1.default.createElement(FileInputPreview_1.default, { key: index, file: file, onRemove: _this.onRemove(file), className: classes.removeButton }, react_1.cloneElement(react_1.Children.only(children), {
                    record: file,
                    className: classes.preview,
                }))); }))),
                meta && meta.touched && meta.error && (react_1.default.createElement(FormHelperText_1.default, null, translate(meta.error))))));
    };
    FileInput.propTypes = {
        accept: prop_types_1.default.string,
        children: prop_types_1.default.element,
        classes: prop_types_1.default.object,
        className: prop_types_1.default.string,
        disableClick: prop_types_1.default.bool,
        id: prop_types_1.default.string,
        input: prop_types_1.default.object,
        isRequired: prop_types_1.default.bool,
        label: prop_types_1.default.string,
        labelMultiple: prop_types_1.default.string,
        labelSingle: prop_types_1.default.string,
        maxSize: prop_types_1.default.number,
        minSize: prop_types_1.default.number,
        multiple: prop_types_1.default.bool,
        options: prop_types_1.default.object,
        resource: prop_types_1.default.string,
        source: prop_types_1.default.string,
        translate: prop_types_1.default.func.isRequired,
        placeholder: prop_types_1.default.node,
    };
    FileInput.defaultProps = {
        labelMultiple: 'ra.input.file.upload_several',
        labelSingle: 'ra.input.file.upload_single',
        multiple: false,
        onUpload: function () { },
        translate: function (id) { return id; },
    };
    return FileInput;
}(react_1.Component));
exports.FileInput = FileInput;
exports.default = compose_1.default(ra_core_1.addField, ra_core_1.translate, styles_1.withStyles(styles))(FileInput);
