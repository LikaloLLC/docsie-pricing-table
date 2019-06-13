import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import 'bootstrap/dist/css/bootstrap.css';

import {
    Container, Button, Row, Col
} from 'reactstrap';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';

import * as plans_and_features_responsive from './plans_and_features_responsive.json';

import MediaQuery from 'react-responsive';

class CategoryFeatures extends React.Component {
    render() {

        let categoryFeatures = [];

        let val;

        this.props.categories.forEach((category, i) => {

            val = category.plan_name;

            category.features.forEach((item, j) => {
                
                categoryFeatures.push(
                    <div key={item.values[val]} className="plan-desc">

                        { j == 0 ?
                            <span style={{color: '#b50000bf', marginTop: '10px', fontWeight: 'bold'}}>{category.name}</span>
                             : ''}
                        <div className="plan-desc-feature">
                            <div sm="2" className="category-feature">
                                <div>{item.values[val]}&nbsp;{item.name}</div>
                            </div>
                        </div>
                    </div>
                )
            })
        })

        return (
            <div>
                {categoryFeatures}
            </div>
        );
    }
};

class PlansAccordion extends React.Component {
    render() {

        let plansAccordion = [];

        plans_and_features_responsive.default.plans.forEach((plan) => {

            plansAccordion.push(
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <span className="plan-name">{plan.name}</span>
                            {/* <span>{plan.monthly_price}</span> */}
                            <h2 className="product-price product-price-sm">
                                <span className="currency" data-alt-text="$">$</span>
                                <span className="price" data-alt-text="79">99</span>
                                <span className="period">/mo</span>
                            </h2>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel style={{background: '#ffffff', textAlign: 'center'}}>
                            <p className="text-light-gray">{plan.yearly_price} when you pay yearly</p>
                            <p>{plan.description}</p>
                            <Button className="sign-up-btn accrd-btn">
                                <a href={plan.call_to_action.url} className="action-link">{plan.call_to_action.text}</a>
                            </Button>
                            <CategoryFeatures categories={plan.categories}/>
                    </AccordionItemPanel>
                    <br /> 
                </AccordionItem>
            );
    })

        return (
            <div>
                <Accordion allowZeroExpanded={true}>
                    {plansAccordion}
                </Accordion>
            </div>
        );
    }
};

class PricingPageResponsive extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            activeIndex: 0
        };
    }

    render() {


    return (
        <div className="price-page-mobile">
            <PlansAccordion />
        </div>
    )
    }
};

export default PricingPageResponsive;