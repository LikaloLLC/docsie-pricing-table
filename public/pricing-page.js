
    // import * as tiers from '../../../../forked-docsie-pricing-table/docsie-pricing-table/src/tiers.json';
    // import * as plans_and_features from '../../../../forked-docsie-pricing-table/docsie-pricing-table/src/tiers.json';
    
      // const tiers = require('./tiers.json');

    // "Import" the components from Reactstrap
    const {Container, Button, Row, Col} = Reactstrap;

    const { 
      Accordion,
      AccordionItem,
      AccordionItemHeading,
      AccordionItemPanel,
      AccordionItemButton } = reactAccessibleAccordion;

    const {MediaQuery} = MediaQuery;

    const ReactTooltip = ReactTooltip;

    class LikeButton extends React.Component {

      render() {
        // if (this.state.liked) {
        //   return 'You liked this.';
        // }

        return (
          // <button onClick={() => this.setState({ liked: true }) }>
          //   Like Button
          // </button>
          <div>
            <Button>
              duh
            </Button>
          </div>
        );
      }
    }

    class SimplePlanTier extends React.Component {


  render() {

      // console.log("props in SimplePlanTier", this.props);

      const rows = [];

      console.log("props in simple pkan tier", this.props);

      this.props.tiers.forEach((tier) => {

        console.log("found tier is", tier);

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
                                  <div className="pricing-panel-footer">
                                      <div className="cta-wrapper">
                                          <Button className="sign-up-btn">
                                              <a href={tier.call_to_action.url} className="action-link-lg">{tier.call_to_action.text}</a>
                                          </Button>
                                      </div>
                                      <p className="compare-plans" onClick={() => this.props.onClick()}>compare plans</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </Col>
          );

      });

      return (
        <Container>
          <Row>
              {rows}
          </Row>
        </Container>
      );
}
};

// <FaInfoCircle data-tip={item.info}/></div>
                                  
//                                 <ReactTooltip />

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
                          <div sm="2" className="category-feature-xs">
                              <div>{item.values[val]}&nbsp;{item.name}&nbsp;
                                  <span className="tooltip-info"><i className="fa fa-info-circle" aria-hidden="true" data-tip={item.info}></i>
                                      <span className="tooltiptext-info">{item.info}</span>
                                  </span>
                              </div>
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

      this.props.plans.forEach((plan) => {

          plansAccordion.push(
              <AccordionItem key={plan.name}>
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
                  <AccordionItemPanel style={{background: '#f5505017', textAlign: 'center'}}>
                          <p className="text-light-gray">{plan.yearly_price} when you pay yearly</p>
                          <p>{plan.description}</p>
                          <Button className="sign-up-btn-xs">
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

class PricingPage extends React.Component {

constructor (props) {
  super(props);

  this.state = {
      showDetailedPlanOveriew: false,
      tiers: [],
      categories: [],
      plans: [],
      tooltipOpen: false
  };
}

handleClick() {

  // console.log("about to hide simple plan tier and show detailed plan view");
  this.setState({ showDetailedPlanOveriew: !this.state.showDetailedPlanOveriew });
}

// get pricing page details from a remote page
// componentDidMount() {
//     fetch("https://www.docsie.io/pricing/plans.json")
//         .then(res => res.json())
//         .then(
//             (result) => {

//                 // console.log("result response for plans.json from docsie endpoint", result);

//                 // this.setState({
//                 //     // tiers: tiers.default.tiers,
//                 //     categories: plans_and_features.default.categories
//                 //     // categories: result.categories
//                 // });

//                 // console.log("result from fetch API in pricing page", result)
//             },
//             // Note: it's important to handle errors here
//             // instead of a catch() block so that we don't swallow
//             // exceptions from actual bugs in components.
//             (error) => {
//                 //   this.setState({
//                 //     isLoaded: true,
//                 //     error
//                 //   });
//             }
//         )

//     fetch("https://www.docsie.io/pricing/tiers.json")
//         .then(res => res.json())
//         .then(
//             (result) => {

//                 // console.log("result response for tiers.json from docsie endpoint", result);

//                 // this.setState({
//                 //     tiers: tiers.default.tiers,
//                 //     // categories: plans_and_features.default.categories
//                 //     // tiers: result.tiers
//                 // });

//                 // console.log("result from fetch API in pricing page", result);


//             },
//             // Note: it's important to handle errors here
//             // instead of a catch() block so that we don't swallow
//             // exceptions from actual bugs in components.
//             (error) => {
//                 //   this.setState({
//                 //     isLoaded: true,
//                 //     error
//                 //   });
//             }
//         )
// }

// get pricing page details from a remote page
componentDidMount() {

var mydata = data;
console.log("./tiers.json mydata", mydata);    

var mydata2 = data2;
console.log("./plans_and/-features.json mydata2", mydata2);

// get this json for mobile responsive data
var mydata3 = plans;
console.log("plans in mydata3", mydata3);

this.setState({
                tiers: mydata.tiers,
                categories: mydata2.categories,
                plans: mydata3.plans
            });
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

  // <FaInfoCircle data-tip={item.info}/>
  //                             <ReactTooltip />

  // <div className="tooltip-info">Hover over me
  //                                 <span className="tooltiptext-info">Tooltip text</span>
  //                             </div>

  this.state.categories.forEach((category, i) => {
      category.features.forEach((item, j) => {

              categoryFeatures.push(
                  <Container key={item.name}>

                      { i!= 0 && j == 0 ?
                      <h4 className="category-type-1">{category.name}</h4>
                       : ''}
                      
                      <Row style={{ textAlign: 'center', textAlign: 'center', margin: 'auto' }}>
                          <Col sm="2" className="category-feature">

                              <div style={{display: 'inline-block'}}>{item.name}&nbsp;
                                  <span className="tooltip-info"><i className="fa fa-info-circle" aria-hidden="true" data-tip={item.info}></i>
                                      <span className="tooltiptext-info">{item.info}</span>
                                  </span>
                              </div>
                              
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
                    <div className="accrd-view">
                        <PlansAccordion plans={this.state.plans} className="accordion-plan-tier"/>
                    </div>
                  </MediaQuery>
                  
                  <MediaQuery query="(min-device-width: 1024px)">
                    <div className="simple-plan-container">
                        <SimplePlanTier tiers={this.state.tiers} onClick={() => this.handleClick()} 
                            className="plan-tier"/>
                    </div>
                </MediaQuery>
              </div>
              :
              <div>
                <MediaQuery query="(max-device-width: 1023px)">
                  <div className="accrd-view">
                    <PlansAccordion plans={this.state.plans} className="accordion-plan-tier"/>
                  </div>
                </MediaQuery>
                <MediaQuery query="(min-device-width: 1024px)">
                  
                  <div className="detail-plan-container">
                      <Container style={{background: '#f5505017'}}>
                          
                              <Row>

                                  <Col sm="2">

                                      <h4 className="category-type-1">{this.state.categories[0].name}</h4>
                                  </Col>

                                  {detailRows}
                              </Row>

                              {categoryFeatures}

                              <br />

                              <Button className="sign-up-btn view-simple-tier-btn" onClick={() => this.handleClick()}>
                                <div className="action-link-lg view-simple-tier">View Simple Plan Tier</div>
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

    // Render a Reactstrap Button element onto root
    // <Button color="danger">Hello, world!</Button>
    //     <LikeButton />
    ReactDOM.render(
      <div>
        <PricingPage />
      </div>,
      document.getElementById('root')
    );