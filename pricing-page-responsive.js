var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import 'bootstrap/dist/css/bootstrap.css';

import { Container, Button, Row, Col } from 'reactstrap';

import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';

import * as plans_and_features_responsive from './plans_and_features_responsive.json';

import MediaQuery from 'react-responsive';

import { FaInfoCircle } from "react-icons/fa";

import ReactTooltip from 'react-tooltip';

var CategoryFeatures = function (_React$Component) {
    _inherits(CategoryFeatures, _React$Component);

    function CategoryFeatures() {
        _classCallCheck(this, CategoryFeatures);

        return _possibleConstructorReturn(this, (CategoryFeatures.__proto__ || Object.getPrototypeOf(CategoryFeatures)).apply(this, arguments));
    }

    _createClass(CategoryFeatures, [{
        key: 'render',
        value: function render() {

            var categoryFeatures = [];

            var val = void 0;

            this.props.categories.forEach(function (category, i) {

                val = category.plan_name;

                category.features.forEach(function (item, j) {

                    categoryFeatures.push(React.createElement(
                        'div',
                        { key: item.values[val], className: 'plan-desc' },
                        j == 0 ? React.createElement(
                            'span',
                            { style: { color: '#b50000bf', marginTop: '10px', fontWeight: 'bold' } },
                            category.name
                        ) : '',
                        React.createElement(
                            'div',
                            { className: 'plan-desc-feature' },
                            React.createElement(
                                'div',
                                { sm: '2', className: 'category-feature-xs' },
                                React.createElement(
                                    'div',
                                    null,
                                    item.values[val],
                                    '\xA0',
                                    item.name,
                                    ' ',
                                    React.createElement(FaInfoCircle, { 'data-tip': item.info })
                                ),
                                React.createElement(ReactTooltip, null)
                            )
                        )
                    ));
                });
            });

            return React.createElement(
                'div',
                null,
                categoryFeatures
            );
        }
    }]);

    return CategoryFeatures;
}(React.Component);

;

var PlansAccordion = function (_React$Component2) {
    _inherits(PlansAccordion, _React$Component2);

    function PlansAccordion() {
        _classCallCheck(this, PlansAccordion);

        return _possibleConstructorReturn(this, (PlansAccordion.__proto__ || Object.getPrototypeOf(PlansAccordion)).apply(this, arguments));
    }

    _createClass(PlansAccordion, [{
        key: 'render',
        value: function render() {

            var plansAccordion = [];

            plans_and_features_responsive.default.plans.forEach(function (plan) {

                plansAccordion.push(React.createElement(
                    AccordionItem,
                    { key: plan.name },
                    React.createElement(
                        AccordionItemHeading,
                        null,
                        React.createElement(
                            AccordionItemButton,
                            null,
                            React.createElement(
                                'span',
                                { className: 'plan-name' },
                                plan.name
                            ),
                            React.createElement(
                                'h2',
                                { className: 'product-price product-price-sm' },
                                React.createElement(
                                    'span',
                                    { className: 'currency', 'data-alt-text': '$' },
                                    '$'
                                ),
                                React.createElement(
                                    'span',
                                    { className: 'price', 'data-alt-text': '79' },
                                    '99'
                                ),
                                React.createElement(
                                    'span',
                                    { className: 'period' },
                                    '/mo'
                                )
                            )
                        )
                    ),
                    React.createElement(
                        AccordionItemPanel,
                        { style: { background: '#ffffff', textAlign: 'center' } },
                        React.createElement(
                            'p',
                            { className: 'text-light-gray' },
                            plan.yearly_price,
                            ' when you pay yearly'
                        ),
                        React.createElement(
                            'p',
                            null,
                            plan.description
                        ),
                        React.createElement(
                            Button,
                            { className: 'sign-up-btn-xs' },
                            React.createElement(
                                'a',
                                { href: plan.call_to_action.url, className: 'action-link' },
                                plan.call_to_action.text
                            )
                        ),
                        React.createElement(CategoryFeatures, { categories: plan.categories })
                    ),
                    React.createElement('br', null)
                ));
            });

            return React.createElement(
                'div',
                null,
                React.createElement(
                    Accordion,
                    { allowZeroExpanded: true },
                    plansAccordion
                )
            );
        }
    }]);

    return PlansAccordion;
}(React.Component);

;

var PricingPageResponsive = function (_React$Component3) {
    _inherits(PricingPageResponsive, _React$Component3);

    function PricingPageResponsive(props) {
        _classCallCheck(this, PricingPageResponsive);

        var _this3 = _possibleConstructorReturn(this, (PricingPageResponsive.__proto__ || Object.getPrototypeOf(PricingPageResponsive)).call(this, props));

        _this3.state = {
            activeIndex: 0
        };
        return _this3;
    }

    _createClass(PricingPageResponsive, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                { className: 'price-page-mobile' },
                React.createElement(PlansAccordion, null)
            );
        }
    }]);

    return PricingPageResponsive;
}(React.Component);

;

export default PricingPageResponsive;