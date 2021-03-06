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
import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual } from 'recompose';
import Dropzone from 'react-dropzone';
import compose from 'recompose/compose';
import { withStyles, createStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import classnames from 'classnames';
import { addField, translate } from 'ra-core';
import Labeled from './Labeled';
import FileInputPreview from './FileInputPreview';
import sanitizeRestProps from './sanitizeRestProps';
var styles = createStyles({
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
            var filteredFiles = _this.state.files.filter(function (stateFile) { return !shallowEqual(stateFile, file); });
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
            var _b = Children.only(_this.props.children).props, source = _b.source, title = _b.title;
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
            return React.createElement("p", null, translate(labelMultiple));
        }
        return React.createElement("p", null, translate(labelSingle));
    };
    FileInput.prototype.render = function () {
        var _this = this;
        var _a = this.props, accept = _a.accept, children = _a.children, _b = _a.classes, classes = _b === void 0 ? {} : _b, className = _a.className, disableClick = _a.disableClick, id = _a.id, isRequired = _a.isRequired, label = _a.label, maxSize = _a.maxSize, meta = _a.meta, minSize = _a.minSize, multiple = _a.multiple, resource = _a.resource, source = _a.source, translate = _a.translate, _c = _a.options, options = _c === void 0 ? {} : _c, rest = __rest(_a, ["accept", "children", "classes", "className", "disableClick", "id", "isRequired", "label", "maxSize", "meta", "minSize", "multiple", "resource", "source", "translate", "options"]);
        return (React.createElement(Labeled, __assign({ id: id, label: label, className: classnames(classes.root, className), source: source, resource: resource, isRequired: isRequired, meta: meta }, sanitizeRestProps(rest)),
            React.createElement("span", null,
                React.createElement(Dropzone, __assign({ onDrop: this.onDrop, accept: accept, disableClick: disableClick, maxSize: maxSize, minSize: minSize, multiple: multiple, className: classes.dropZone }, options, { inputProps: __assign({ id: id }, options.inputProps) }), this.label()),
                children && (React.createElement("div", { className: "previews" }, this.state.files.map(function (file, index) { return (React.createElement(FileInputPreview, { key: index, file: file, onRemove: _this.onRemove(file), className: classes.removeButton }, cloneElement(Children.only(children), {
                    record: file,
                    className: classes.preview,
                }))); }))),
                meta && meta.touched && meta.error && (React.createElement(FormHelperText, null, translate(meta.error))))));
    };
    FileInput.propTypes = {
        accept: PropTypes.string,
        children: PropTypes.element,
        classes: PropTypes.object,
        className: PropTypes.string,
        disableClick: PropTypes.bool,
        id: PropTypes.string,
        input: PropTypes.object,
        isRequired: PropTypes.bool,
        label: PropTypes.string,
        labelMultiple: PropTypes.string,
        labelSingle: PropTypes.string,
        maxSize: PropTypes.number,
        minSize: PropTypes.number,
        multiple: PropTypes.bool,
        options: PropTypes.object,
        resource: PropTypes.string,
        source: PropTypes.string,
        translate: PropTypes.func.isRequired,
        placeholder: PropTypes.node,
    };
    FileInput.defaultProps = {
        labelMultiple: 'ra.input.file.upload_several',
        labelSingle: 'ra.input.file.upload_single',
        multiple: false,
        onUpload: function () { },
        translate: function (id) { return id; },
    };
    return FileInput;
}(Component));
export { FileInput };
export default compose(addField, translate, withStyles(styles))(FileInput);
