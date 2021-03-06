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
import React, { Children, isValidElement, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CardContentInner from '../layout/CardContentInner';
import Labeled from '../input/Labeled';
var sanitizeRestProps = function (_a) {
    var children = _a.children, className = _a.className, record = _a.record, resource = _a.resource, basePath = _a.basePath, version = _a.version, initialValues = _a.initialValues, translate = _a.translate, rest = __rest(_a, ["children", "className", "record", "resource", "basePath", "version", "initialValues", "translate"]);
    return rest;
};
/**
 * Simple Layout for a Show view, showing fields in one column.
 *
 * Receives the current `record` from the parent `<Show>` component,
 * and passes it to its childen. Children should be Field-like components.
 *
 * @example
 *     // in src/posts.js
 *     import React from 'react';
 *     import { Show, SimpleShowLayout, TextField } from 'react-admin';
 *
 *     export const PostShow = (props) => (
 *         <Show {...props}>
 *             <SimpleShowLayout>
 *                 <TextField source="title" />
 *             </SimpleShowLayout>
 *         </Show>
 *     );
 *
 *     // in src/App.js
 *     import React from 'react';
 *     import { Admin, Resource } from 'react-admin';
 *
 *     import { PostShow } from './posts';
 *
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" show={PostShow} />
 *         </Admin>
 *     );
 *     export default App;
 */
export var SimpleShowLayout = function (_a) {
    var basePath = _a.basePath, className = _a.className, children = _a.children, record = _a.record, resource = _a.resource, version = _a.version, rest = __rest(_a, ["basePath", "className", "children", "record", "resource", "version"]);
    return (React.createElement(CardContentInner, __assign({ className: className, key: version }, sanitizeRestProps(rest)), Children.map(children, function (field) {
        return field && isValidElement(field) ? (React.createElement("div", { key: field.props.source, className: classnames("ra-field ra-field-" + field.props.source, field.props.className) }, field.props.addLabel ? (React.createElement(Labeled, { record: record, resource: resource, basePath: basePath, label: field.props.label, source: field.props.source, disabled: false }, field)) : typeof field.type === 'string' ? (field) : (cloneElement(field, {
            record: record,
            resource: resource,
            basePath: basePath,
        })))) : null;
    })));
};
SimpleShowLayout.propTypes = {
    basePath: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    record: PropTypes.object,
    resource: PropTypes.string,
    version: PropTypes.number,
};
export default SimpleShowLayout;
