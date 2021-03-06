import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import 'bootstrap/dist/css/bootstrap.css';
import {
    Container, Button, Row, Col, Tooltip
} from 'reactstrap';

import * as tiers from './tiers.json';
import * as plans_and_features from './plans_and_features.json';

import PlansAccordion from './pricing-page-responsive.js';

import MediaQuery from 'react-responsive';

import { FaInfoCircle } from "react-icons/fa";

import ReactTooltip from 'react-tooltip';

class SimplePlanTier extends React.Component {

    render() {

        // console.log("props in SimplePlanTier", this.props);

        const rows = [];

        this.props.tiers.forEach((tier) => {

            rows.push(
                <Col sm="3" key={tier.name} className="simple-plan-tier-col">
                    <div className="price-card">
                        <div className="pricing-panel-wrapper">
                            <div className="pricing-panel">
                                <div className="pricing-panel-header">
                                    <h6 className="pricing-panel-tier">{tier.name}</h6>
                                    <h2 className="product-price product-price-lg">
                                        <span className="currency">{tier.pricing.monthly.currency}</span>
                                        <span className="price">{tier.pricing.monthly.price}</span>
                                        <span className="period">/mo</span>
                                    </h2>
                                    <div className="pricing-panel-info">
                                        <div className="text-light-gray">
                                            <p data-alt-text="$950 billed yearly<br />Save $238/year" className="year-pricing">
                                                {tier.pricing.yearly.currency}{tier.pricing.yearly.price}/mo when you <a href="#" className="yearly"> pay yearly</a>
                                            </p>
                                        </div>
                                    </div>
                                    <p></p>
                                    <p>{tier.description}</p>
                                    <p></p>
                                    </div>
                                    <div className="pricing-panel-footer">
                                        <div className="cta-wrapper">
                                            <Button className="sign-up-btn">
                                                <a href={tier.call_to_action.url} className="action-link">{tier.call_to_action.text}</a>
                                            </Button>
                                        </div>
                                        <p className="compare-plans" onClick={() => this.props.onClick()}>compare plans</p>
                                    </div>
                            </div>
                        </div>
                    </div>
                </Col>
            );

        });

        return (
            <Row>
                {rows}
            </Row>
        );
    }
};

class PricingPage extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            showDetailedPlanOveriew: false,
            tiers: [],
            categories: [],
            tooltipOpen: false
        };
    }

    handleClick() {

        // console.log("about to hide simple plan tier and show detailed plan view");
        this.setState({ showDetailedPlanOveriew: !this.state.showDetailedPlanOveriew });
    }

    // get pricing page details from a remote page
    componentDidMount() {
        fetch("https://www.docsie.io/pricing/plans.json")
            .then(res => res.json())
            .then(
                (result) => {

                    // console.log("result response for plans.json from docsie endpoint", result);

                    this.setState({
                        // tiers: tiers.default.tiers,
                        categories: plans_and_features.default.categories
                        // categories: result.categories
                    });

                    // console.log("result from fetch API in pricing page", result)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    //   this.setState({
                    //     isLoaded: true,
                    //     error
                    //   });
                }
            )

        fetch("https://www.docsie.io/pricing/tiers.json")
            .then(res => res.json())
            .then(
                (result) => {

                    // console.log("result response for tiers.json from docsie endpoint", result);

                    this.setState({
                        tiers: tiers.default.tiers,
                        // categories: plans_and_features.default.categories
                        // tiers: result.tiers
                    });

                    // console.log("result from fetch API in pricing page", result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    //   this.setState({
                    //     isLoaded: true,
                    //     error
                    //   });
                }
            )
    }

    render() {

        let detailRows = [];

        let categoryFeatures = [];

        this.state.tiers.forEach((tier) => {

            detailRows.push(
                <Col sm="2" key={tier.name} style={{ textAlign: 'center' }}>

                    <h4 className="pricing-name">{tier.name}</h4>
                    <h2 className="product-price product-price-md">
                        <span className="currency">{tier.pricing.monthly.currency}</span>
                        <span className="price">{tier.pricing.monthly.price}</span>
                        <span className="period">/mo</span>
                    </h2>
                </Col>
            )
        });

        this.state.categories.forEach((category, i) => {
            category.features.forEach((item, j) => {

                    categoryFeatures.push(
                        <Container key={item.name}>

                            { i!= 0 && j == 0 ?
                            <h4 className="category-type-1">{category.name}</h4>
                             : ''}
                            
                            <Row style={{ textAlign: 'center', textAlign: 'center', margin: 'auto' }}>
                                <Col sm="2" className="category-feature">

                                    <div>{item.name} <FaInfoCircle data-tip={item.info}/></div>
                                    
                                    <ReactTooltip />
                                </Col>
                                <Col sm="2" className="category-feature">
                                    <div>{item.values.Standard}</div>
                                </Col>
                                <Col sm="2" className="category-feature">
                                    <div>{item.values.Medium}</div>
                                </Col>
                                <Col sm="2" className="category-feature">
                                    <div>{item.values.Large}</div>
                                </Col>
                                <Col sm="2" className="category-feature">
                                    <div>{item.values.Premium}</div>
                                </Col>
                            </Row>
                        </Container>
                    )
            })
        })

        return (
            <div className="simple-detail-plan-tier-sm-md-lg">
                {!this.state.showDetailedPlanOveriew
                    ?
                    <div>

                        <MediaQuery query="(max-device-width: 1023px)">
                            <PlansAccordion className="accordion-plan-tier"/>
                        </MediaQuery>
                        <div className="simple-plan-container">
                        <Container>

                            <MediaQuery query="(min-device-width: 1024px)"> 
                                <SimplePlanTier tiers={this.state.tiers} onClick={() => this.handleClick()} 
                                    className="plan-tier"/>
                            </MediaQuery>
                        </Container>
                        </div>
                    </div>
                    :
                    <div>
                        <MediaQuery query="(max-device-width: 1023px)">
                            <PlansAccordion className="accordion-plan-tier"/>
                        </MediaQuery>
                        <MediaQuery query="(min-device-width: 1024px)">
                            <div className="detail-plan-container">
                                <Container style={{background: 'white'}}>
                                    
                                        <Row>

                                            <Col sm="2">

                                                <h4 className="category-type-1">{this.state.categories[0].name}</h4>
                                            </Col>

                                            {detailRows}
                                        </Row>

                                        {categoryFeatures}

                                        <br />

                                        <Button className="sign-up-btn accrd-btn" onClick={() => this.handleClick()}>
                                            View Simple Plan Tier
                                        </Button>
                                </Container>
                            </div>
                        </MediaQuery>
                    </div>
                }
            </div>

            
        );
    }
}

export default PricingPage;