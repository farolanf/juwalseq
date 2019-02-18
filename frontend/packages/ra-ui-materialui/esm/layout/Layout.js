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
import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withRouter } from 'react-router';
import { MuiThemeProvider, createMuiTheme, withStyles, } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import AppBar from './AppBar';
import Sidebar from './Sidebar';
import Menu from './Menu';
import Notification from './Notification';
import Error from './Error';
import defaultTheme from '../defaultTheme';
var styles = function (theme) {
    var _a;
    return ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1,
            minHeight: '100vh',
            backgroundColor: theme.palette.background.default,
            position: 'relative',
            minWidth: 'fit-content',
            width: '100%',
        },
        appFrame: {
            display: 'flex',
            flexDirection: 'column',
        },
        contentWithSidebar: {
            display: 'flex',
            flexGrow: 1,
        },
        content: (_a = {
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                padding: theme.spacing.unit * 3
            },
            _a[theme.breakpoints.up('xs')] = {
                paddingLeft: 5,
            },
            _a[theme.breakpoints.down('sm')] = {
                padding: 0,
            },
            _a),
    });
};
var sanitizeRestProps = function (_a) {
    var staticContext = _a.staticContext, history = _a.history, location = _a.location, match = _a.match, props = __rest(_a, ["staticContext", "history", "location", "match"]);
    return props;
};
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { hasError: false, errorMessage: null, errorInfo: null };
        /**
         * Reset the error state upon navigation
         *
         * @see https://stackoverflow.com/questions/48121750/browser-navigation-broken-by-use-of-react-error-boundaries
         */
        props.history.listen(function () {
            if (_this.state.hasError) {
                _this.setState({ hasError: false });
            }
        });
        return _this;
    }
    Layout.prototype.componentDidCatch = function (errorMessage, errorInfo) {
        this.setState({ hasError: true, errorMessage: errorMessage, errorInfo: errorInfo });
    };
    Layout.prototype.render = function () {
        var _a = this.props, appBar = _a.appBar, children = _a.children, classes = _a.classes, className = _a.className, customRoutes = _a.customRoutes, error = _a.error, dashboard = _a.dashboard, logout = _a.logout, menu = _a.menu, notification = _a.notification, open = _a.open, sidebar = _a.sidebar, title = _a.title, props = __rest(_a, ["appBar", "children", "classes", "className", "customRoutes", "error", "dashboard", "logout", "menu", "notification", "open", "sidebar", "title"]);
        var _b = this.state, hasError = _b.hasError, errorMessage = _b.errorMessage, errorInfo = _b.errorInfo;
        return (React.createElement("div", __assign({ className: classnames('layout', classes.root, className) }, sanitizeRestProps(props)),
            React.createElement("div", { className: classes.appFrame },
                createElement(appBar, { title: title, open: open, logout: logout }),
                React.createElement("main", { className: classes.contentWithSidebar },
                    createElement(sidebar, {
                        children: createElement(menu, {
                            logout: logout,
                            hasDashboard: !!dashboard,
                        }),
                    }),
                    React.createElement("div", { className: classes.content }, hasError
                        ? createElement(error, {
                            error: errorMessage,
                            errorInfo: errorInfo,
                            title: title,
                        })
                        : children)),
                createElement(notification))));
    };
    return Layout;
}(Component));
var componentPropType = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
]);
Layout.propTypes = {
    appBar: componentPropType,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    classes: PropTypes.object,
    className: PropTypes.string,
    customRoutes: PropTypes.array,
    dashboard: componentPropType,
    error: componentPropType,
    history: PropTypes.object.isRequired,
    logout: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func,
        PropTypes.string,
    ]),
    menu: componentPropType,
    notification: componentPropType,
    open: PropTypes.bool,
    sidebar: componentPropType,
    title: PropTypes.node.isRequired,
};
Layout.defaultProps = {
    appBar: AppBar,
    error: Error,
    menu: Menu,
    notification: Notification,
    sidebar: Sidebar,
};
var mapStateToProps = function (state) { return ({
    open: state.admin.ui.sidebarOpen,
}); };
var EnhancedLayout = compose(connect(mapStateToProps, {} // Avoid connect passing dispatch in props
), withRouter, withStyles(styles))(Layout);
var LayoutWithTheme = /** @class */ (function (_super) {
    __extends(LayoutWithTheme, _super);
    function LayoutWithTheme(props) {
        var _this = _super.call(this, props) || this;
        _this.theme = createMuiTheme(props.theme);
        return _this;
    }
    LayoutWithTheme.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.theme !== this.props.theme) {
            this.theme = createMuiTheme(nextProps.theme);
        }
    };
    LayoutWithTheme.prototype.render = function () {
        var _a = this.props, theme = _a.theme, rest = __rest(_a, ["theme"]);
        return (React.createElement(MuiThemeProvider, { theme: this.theme },
            React.createElement(EnhancedLayout, __assign({}, rest))));
    };
    return LayoutWithTheme;
}(Component));
LayoutWithTheme.propTypes = {
    theme: PropTypes.object,
};
LayoutWithTheme.defaultProps = {
    theme: defaultTheme,
};
export default LayoutWithTheme;
