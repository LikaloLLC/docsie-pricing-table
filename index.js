import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Button, Row, Col } from 'reactstrap';

// import * as tiers from './tiers.json';
// import * as plans_and_features from './plans_and_features.json';

import PricingPage from './pricing-page';
import PricingPageResponsive from './pricing-page-responsive.js';

// ========================================

ReactDOM.render(React.createElement(PricingPage, null), document.getElementById('root'));