var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Button, Row, Col, Tooltip } from 'reactstrap';

import * as tiers from './tiers.json';
import * as plans_and_features from './plans_and_features.json';

import PlansAccordion from './pricing-page-responsive.js';

import MediaQuery from 'react-responsive';

import { FaInfoCircle } from "react-icons/fa";

import ReactTooltip from 'react-tooltip';

var SimplePlanTier = function (_React$Component) {
    _inherits(SimplePlanTier, _React$Component);

    function SimplePlanTier() {
        _classCallCheck(this, SimplePlanTier);

        return _possibleConstructorReturn(this, (SimplePlanTier.__proto__ || Object.getPrototypeOf(SimplePlanTier)).apply(this, arguments));
    }

    _createClass(SimplePlanTier, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            // console.log("props in SimplePlanTier", this.props);

            var rows = [];

            this.props.tiers.forEach(function (tier) {

                rows.push(React.createElement(
                    Col,
                    { sm: '3', key: tier.name, className: 'simple-plan-tier-col' },
                    React.createElement(
                        'div',
                        { className: 'price-card' },
                        React.createElement(
                            'div',
                            { className: 'pricing-panel-wrapper' },
                            React.createElement(
                                'div',
                                { className: 'pricing-panel' },
                                React.createElement(
                                    'div',
                                    { className: 'pricing-panel-header' },
                                    React.createElement(
                                        'h6',
                                        { className: 'pricing-panel-tier' },
                                        tier.name
                                    ),
                                    React.createElement(
                                        'h2',
                                        { className: 'product-price product-price-lg' },
                                        React.createElement(
                                            'span',
                                            { className: 'currency' },
                                            tier.pricing.monthly.currency
                                        ),
                                        React.createElement(
                                            'span',
                                            { className: 'price' },
                                            tier.pricing.monthly.price
                                        ),
                                        React.createElement(
                                            'span',
                                            { className: 'period' },
                                            '/mo'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'pricing-panel-info' },
                                        React.createElement(
                                            'div',
                                            { className: 'text-light-gray' },
                                            React.createElement(
                                                'p',
                                                { 'data-alt-text': '$950 billed yearly<br />Save $238/year', className: 'year-pricing' },
                                                tier.pricing.yearly.currency,
                                                tier.pricing.yearly.price,
                                                '/mo when you ',
                                                React.createElement(
                                                    'a',
                                                    { href: '#', className: 'yearly' },
                                                    ' pay yearly'
                                                )
                                            )
                                        )
                                    ),
                                    React.createElement('p', null),
                                    React.createElement(
                                        'p',
                                        null,
                                        tier.description
                                    ),
                                    React.createElement('p', null),
                                    React.createElement(
                                        'div',
                                        { className: 'pricing-panel-footer' },
                                        React.createElement(
                                            'div',
                                            { className: 'cta-wrapper' },
                                            React.createElement(
                                                Button,
                                                { className: 'sign-up-btn' },
                                                React.createElement(
                                                    'a',
                                                    { href: tier.call_to_action.url, className: 'action-link' },
                                                    tier.call_to_action.text
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            'p',
                                            { className: 'compare-plans', onClick: function onClick() {
                                                    return _this2.props.onClick();
                                                } },
                                            'compare plans'
                                        )
                                    )
                                )
                            )
                        )
                    )
                ));
            });

            return React.createElement(
                Row,
                null,
                rows
            );
        }
    }]);

    return SimplePlanTier;
}(React.Component);

;

var PricingPage = function (_React$Component2) {
    _inherits(PricingPage, _React$Component2);

    function PricingPage(props) {
        _classCallCheck(this, PricingPage);

        var _this3 = _possibleConstructorReturn(this, (PricingPage.__proto__ || Object.getPrototypeOf(PricingPage)).call(this, props));

        _this3.state = {
            showDetailedPlanOveriew: false,
            tiers: [],
            categories: [],
            tooltipOpen: false
        };
        return _this3;
    }

    _createClass(PricingPage, [{
        key: 'handleClick',
        value: function handleClick() {

            // console.log("about to hide simple plan tier and show detailed plan view");
            this.setState({ showDetailedPlanOveriew: !this.state.showDetailedPlanOveriew });
        }

        // get pricing page details from a remote page

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this4 = this;

            fetch("https://www.docsie.io/pricing/plans.json").then(function (res) {
                return res.json();
            }).then(function (result) {

                // console.log("result response for plans.json from docsie endpoint", result);

                _this4.setState({
                    // tiers: tiers.default.tiers,
                    categories: plans_and_features.default.categories
                    // categories: result.categories
                });

                // console.log("result from fetch API in pricing page", result)
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            function (error) {
                //   this.setState({
                //     isLoaded: true,
                //     error
                //   });
            });

            fetch("https://www.docsie.io/pricing/tiers.json").then(function (res) {
                return res.json();
            }).then(function (result) {

                // console.log("result response for tiers.json from docsie endpoint", result);

                _this4.setState({
                    tiers: tiers.default.tiers
                    // categories: plans_and_features.default.categories
                    // tiers: result.tiers
                });

                // console.log("result from fetch API in pricing page", result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            function (error) {
                //   this.setState({
                //     isLoaded: true,
                //     error
                //   });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var detailRows = [];

            var categoryFeatures = [];

            this.state.tiers.forEach(function (tier) {

                detailRows.push(React.createElement(
                    Col,
                    { sm: '2', key: tier.name, style: { textAlign: 'center' } },
                    React.createElement(
                        'h4',
                        { className: 'pricing-name' },
                        tier.name
                    ),
                    React.createElement(
                        'h2',
                        { className: 'product-price product-price-md' },
                        React.createElement(
                            'span',
                            { className: 'currency' },
                            tier.pricing.monthly.currency
                        ),
                        React.createElement(
                            'span',
                            { className: 'price' },
                            tier.pricing.monthly.price
                        ),
                        React.createElement(
                            'span',
                            { className: 'period' },
                            '/mo'
                        )
                    )
                ));
            });

            this.state.categories.forEach(function (category, i) {
                category.features.forEach(function (item, j) {
                    var _ref;

                    categoryFeatures.push(React.createElement(
                        Container,
                        { key: item.name },
                        i != 0 && j == 0 ? React.createElement(
                            'h4',
                            { className: 'category-type-1' },
                            category.name
                        ) : '',
                        React.createElement(
                            Row,
                            { style: (_ref = { textAlign: 'center' }, _defineProperty(_ref, 'textAlign', 'center'), _defineProperty(_ref, 'margin', 'auto'), _ref) },
                            React.createElement(
                                Col,
                                { sm: '2', className: 'category-feature' },
                                React.createElement(
                                    'div',
                                    null,
                                    item.name,
                                    ' ',
                                    React.createElement(FaInfoCircle, { 'data-tip': item.info })
                                ),
                                React.createElement(ReactTooltip, null)
                            ),
                            React.createElement(
                                Col,
                                { sm: '2', className: 'category-feature' },
                                React.createElement(
                                    'div',
                                    null,
                                    item.values.Standard
                                )
                            ),
                            React.createElement(
                                Col,
                                { sm: '2', className: 'category-feature' },
                                React.createElement(
                                    'div',
                                    null,
                                    item.values.Medium
                                )
                            ),
                            React.createElement(
                                Col,
                                { sm: '2', className: 'category-feature' },
                                React.createElement(
                                    'div',
                                    null,
                                    item.values.Large
                                )
                            ),
                            React.createElement(
                                Col,
                                { sm: '2', className: 'category-feature' },
                                React.createElement(
                                    'div',
                                    null,
                                    item.values.Premium
                                )
                            )
                        )
                    ));
                });
            });

            return React.createElement(
                'div',
                { className: 'simple-detail-plan-tier-sm-md-lg' },
                !this.state.showDetailedPlanOveriew ? React.createElement(
                    'div',
                    null,
                    React.createElement(
                        MediaQuery,
                        { query: '(max-device-width: 1023px)' },
                        React.createElement(PlansAccordion, { className: 'accordion-plan-tier' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'simple-plan-container' },
                        React.createElement(
                            Container,
                            null,
                            React.createElement(
                                MediaQuery,
                                { query: '(min-device-width: 1024px)' },
                                React.createElement(SimplePlanTier, { tiers: this.state.tiers, onClick: function onClick() {
                                        return _this5.handleClick();
                                    },
                                    className: 'plan-tier' })
                            )
                        )
                    )
                ) : React.createElement(
                    'div',
                    null,
                    React.createElement(
                        MediaQuery,
                        { query: '(max-device-width: 1023px)' },
                        React.createElement(PlansAccordion, { className: 'accordion-plan-tier' })
                    ),
                    React.createElement(
                        MediaQuery,
                        { query: '(min-device-width: 1024px)' },
                        React.createElement(
                            'div',
                            { className: 'detail-plan-container' },
                            React.createElement(
                                Container,
                                { style: { background: 'white' } },
                                React.createElement(
                                    Row,
                                    null,
                                    React.createElement(
                                        Col,
                                        { sm: '2' },
                                        React.createElement(
                                            'h4',
                                            { className: 'category-type-1' },
                                            this.state.categories[0].name
                                        )
                                    ),
                                    detailRows
                                ),
                                categoryFeatures,
                                React.createElement('br', null),
                                React.createElement(
                                    Button,
                                    { className: 'sign-up-btn accrd-btn', onClick: function onClick() {
                                            return _this5.handleClick();
                                        } },
                                    'View Simple Plan Tier'
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return PricingPage;
}(React.Component);

export default PricingPage;