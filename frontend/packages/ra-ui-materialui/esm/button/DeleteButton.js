var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ActionDelete from '@material-ui/icons/Delete';
import classnames from 'classnames';
import { translate, crudDelete, startUndoable } from 'ra-core';
import Button from './Button';
var styles = function (theme) { return ({
    deleteButton: {
        color: theme.palette.error.main,
        '&:hover': {
            backgroundColor: fade(theme.palette.error.main, 0.12),
            // Reset on mouse devices
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
    },
}); };
var sanitizeRestProps = function (_a) {
    var basePath = _a.basePath, classes = _a.classes, dispatchCrudDelete = _a.dispatchCrudDelete, filterValues = _a.filterValues, label = _a.label, resource = _a.resource, selectedIds = _a.selectedIds, startUndoable = _a.startUndoable, undoable = _a.undoable, redirect = _a.redirect, rest = __rest(_a, ["basePath", "classes", "dispatchCrudDelete", "filterValues", "label", "resource", "selectedIds", "startUndoable", "undoable", "redirect"]);
    return rest;
};
var DeleteButton = /** @class */ (function (_super) {
    __extends(DeleteButton, _super);
    function DeleteButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleDelete = function (event) {
            event.stopPropagation();
            var _a = _this.props, dispatchCrudDelete = _a.dispatchCrudDelete, startUndoable = _a.startUndoable, resource = _a.resource, record = _a.record, basePath = _a.basePath, redirect = _a.redirect, undoable = _a.undoable, onClick = _a.onClick;
            if (undoable) {
                startUndoable(crudDelete(resource, record.id, record, basePath, redirect));
            }
            else {
                dispatchCrudDelete(resource, record.id, record, basePath, redirect);
            }
            if (typeof onClick === 'function') {
                onClick();
            }
        };
        return _this;
    }
    DeleteButton.prototype.render = function () {
        var _a = this.props, _b = _a.label, label = _b === void 0 ? 'ra.action.delete' : _b, _c = _a.classes, classes = _c === void 0 ? {} : _c, className = _a.className, icon = _a.icon, onClick = _a.onClick, rest = __rest(_a, ["label", "classes", "className", "icon", "onClick"]);
        return (React.createElement(Button, __assign({ onClick: this.handleDelete, label: label, className: classnames('ra-delete-button', classes.deleteButton, className), key: "button" }, sanitizeRestProps(rest)), icon));
    };
    return DeleteButton;
}(Component));
DeleteButton.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    dispatchCrudDelete: PropTypes.func.isRequired,
    label: PropTypes.string,
    record: PropTypes.object,
    redirect: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.func,
    ]),
    resource: PropTypes.string.isRequired,
    startUndoable: PropTypes.func,
    translate: PropTypes.func,
    undoable: PropTypes.bool,
    icon: PropTypes.element,
};
DeleteButton.defaultProps = {
    redirect: 'list',
    undoable: true,
    icon: React.createElement(ActionDelete, null),
};
export default compose(connect(null, { startUndoable: startUndoable, dispatchCrudDelete: crudDelete }), translate, withStyles(styles))(DeleteButton);
