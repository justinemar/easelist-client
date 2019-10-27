import React from "react";
import bulmaCarousel from "bulma-carousel";
import "./index.scss";
import ReactMapGL from "react-map-gl";
class SelectedProperty extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    viewport: {
      latitude: 13.1162,
      longitude: 121.0794,
      width: "60%",
      height: "50vh" /*100% */,
      zoom: 12,
      center: [13.1162, 121.0794],
      maxZoom: 12
    }
  };

  componentDidMount() {
    var carousels = bulmaCarousel.attach(".carousel", {
      slidesToScroll: 1,
      slidesToShow: 1
    });
  }

  handleViewPortChange = viewport => {
    const { mounted } = this.state;
    // Avoid dangerous state change on state transition
    if (mounted) {
      this.setState({
        viewport
      });
    }
  };

  render() {
    const { selectedSearch } = this.props.location;
    let title = selectedSearch.facts.title;
    let price = selectedSearch.facts.pricing[1];
    let address = selectedSearch.location.address;
    let numOfBed =
      selectedSearch.facts.numOfBed <= 1
        ? "1"
        : `1-${selectedSearch.facts.numOfBed}`;
    let numOfBath =
      selectedSearch.facts.numOfBath <= 1
        ? "1"
        : `1-${selectedSearch.facts.numOfBath}`;
    let size = selectedSearch.facts.squareFeet;
    let indoor_amenities = selectedSearch.extras.amenities.indoor;
    let outdoor_amenities = selectedSearch.extras.amenities.outdoor;
    let community_amenities = selectedSearch.extras.community_features;
    let parking_covered = selectedSearch.extras.parking.covered;
    let parking_dedicated = selectedSearch.extras.parking.dedicated;
    let dogs_allowed = selectedSearch.extras.policy.dogs;
    let cats_allowed = selectedSearch.extras.policy.cats;
    let pet_policy = selectedSearch.extras.policy.detail;
    let smoking_allowed = selectedSearch.extras.policy.smoking;

    return (
      <>
        <div className="section selected-page">
          <div className="columns">
            <div className="column">
              <div
                className="property-info-container"
                style={{ textAlign: "left" }}
              >
                <h1 className="is-size-2 has-text-weight-bold">{title}</h1>
                <div className="property-info">
                  <p>
                    <span className="is-size-3">
                      <i className="fa fa-tag" />
                      <span style={{ paddingLeft: 5 }}>{price}+</span>
                    </span>
                  </p>

                  <p className="has-text-white has-text-weight-bold">
                    {address}
                  </p>
                  <p>
                    <span className="is-size-3">
                      <i className="fa fa-bed" />
                      <span style={{ paddingLeft: 5 }}>{numOfBed} Beds</span>
                    </span>
                  </p>
                  <p>
                    <span className="is-size-3">
                      <i className="fa fa-bath" />
                      <span style={{ paddingLeft: 5 }}>{numOfBath} Baths</span>
                    </span>
                  </p>
                  <p className="is-size-3 has-text-white has-text-weight-bold">
                    {size} Sqft
                  </p>
                </div>
                <p className="buttons">
                  <button class="button is-fullwidth">
                    <span class="icon">
                      <i class="fa fa-phone"></i>
                    </span>
                    <span>(281) 940-2677</span>
                  </button>
                  <button class="button is-fullwidth">
                    <span class="icon">
                      <i class="fa fa-envelope"></i>
                    </span>
                    <span>Send an Email</span>
                  </button>
                </p>
              </div>
            </div>
            <div className="column is-four-fifths">
              <div
                id="carousel-demo"
                className="carousel carousel-animated carousel-animate-slide"
              >
                <div class="item-1 item">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Repellendus, quod molestiae illum corrupti placeat minus dolor
                  optio pariatur culpa earum cupiditate dignissimos consectetur
                  asperiores, architecto nobis perferendis consequuntur veniam
                  id.
                </div>
                <div class="item-2 item">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Repellendus, quod molestiae illum corrupti placeat minus dolor
                  optio pariatur culpa earum cupiditate dignissimos consectetur
                  asperiores, architecto nobis perferendis consequuntur veniam
                  id.
                </div>
                <div class="item-3 item">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Repellendus, quod molestiae illum corrupti placeat minus dolor
                  optio pariatur culpa earum cupiditate dignissimos consectetur
                  asperiores, architecto nobis perferendis consequuntur veniam
                  id.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section selected-page-features">
          <div className="columns">
            <div className="column">
              <HighLights />
              <div class="is-divider" data-content="OR"></div>
              <PetSmokePolicy
                policy={{
                  dogs: dogs_allowed,
                  cats: cats_allowed,
                  detail: pet_policy,
                  smoking: smoking_allowed
                }}
              />
              <div class="is-divider" data-content="OR"></div>
              <Amenities
                items={{
                  indoor: indoor_amenities,
                  outdoor: outdoor_amenities,
                  community: community_amenities
                }}
              />
              <div class="is-divider" data-content="OR"></div>
              <Parking
                policy={{
                  dedicated: parking_dedicated,
                  covered: parking_covered,
                  garage: "none"
                }}
              />
            </div>
            <div className="column">
              <ReactMapGL
                {...this.state.viewport}
                mapboxApiAccessToken="pk.eyJ1IjoiYmVyYmVyb2thIiwiYSI6ImNrMG90cnpzNTA5YzUzbmtyMjFlano1ZDYifQ.pBd7NWQF3lCnVQWH8xeliQ"
                mapStyle="mapbox://styles/berberoka/ck0p00jjm1vfl1co2kyhqfrik"
                onViewportChange={viewport =>
                  this.handleViewPortChange(viewport)
                }
              />
              <SimilarProperties />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const SimilarProperties = _ => {
  return <div className="property-similar"></div>;
};
const FloorPlans = _ => {
  return (
    <div className="property-floor-plans property-facts">
      <h1 className="is-size-3">FLOOR PLANS</h1>
      <p>5 Floor Plans and 3 units available</p>
      <nav class="level">
        <p class="level-item has-text-left">
          <a class="link is-info has-text-black">ALL (12)</a>
        </p>
        <p class="level-item has-text-centered">
          <a class="link is-info has-text-black">1 BED (2)</a>
        </p>

        <p class="level-item has-text-centered">
          <a class="link is-info has-text-black"> 2 BED (2)</a>
        </p>
        <p class="level-item has-text-centered">
          <a class="link is-info has-text-primary">3 BED (1)</a>
        </p>
      </nav>
      <h1 className="has-text-primary has-text-weight-bold is-size-5">
        3 BEDROOM
      </h1>
      <nav class="level">
        <div class="level-item ">
          <div className="floor-image"></div>
        </div>
        <div class="level-item">
          <div>
            <p className="heading">Plan Title</p>
            <p className="title is-size-5 has-text-primary has-text-weight-bold">
              DELUXE
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">₱rice</p>
            <p class="title is-size-5">8,500-9,500/mo</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Bed and Bath</p>
            <p class="title is-size-5">3 BED | 3 BATH</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Size</p>
            <p class="title is-size-5">1413 Sqft</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Availability</p>
            <p class="title is-size-5">3 Available</p>
          </div>
        </div>
      </nav>
    </div>
  );
};

const Amenities = props => {
  const { items } = props;
  const indoorList = Object.values(items.indoor).map(i => {
    return <li>{i}</li>;
  });
  const outdoorList = Object.values(items.outdoor).map(i => {
    return <li>{i}</li>;
  });
  const communityList = Object.values(items.community).map(i => {
    return <li>{i}</li>;
  });
  return (
    <div className="property-highlights property-facts">
      <h1 className="is-size-3">AMENITIES &amp; COMMUNITY FEATURE</h1>
      <p>See all 7 amenities for this listing</p>
      <div className="columns">
        <div className="column">
          <p>Indoor</p>
          <ul>{indoorList}</ul>
        </div>
        <div className="column">
          <p>Outdoor</p>
          <ul>{outdoorList}</ul>
        </div>
        <div className="column">
          <p>Community</p>
          <ul>{communityList}</ul>
        </div>
      </div>
    </div>
  );
};

const Parking = props => {
  const { policy } = props;
  return (
    <div className="property-highlights property-facts">
      <h1 className="is-size-3">PARKING POLICY</h1>
      <p>See parking details for this listing</p>
      <div className="columns">
        <div className="column">
          <p>Dedicated</p>
          <ul>
            <li>{policy.dedicated}</li>
          </ul>
        </div>
        <div className="column">
          <p>Covered</p>
          <ul>
            <li>{policy.covered}</li>
          </ul>
        </div>
        <div className="column">
          <p>Garage</p>
          <ul>
            <li>{policy.garage}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const HighLights = _ => {
  return (
    <div className="property-highlights property-facts">
      <h1 className="is-size-3">PROPERTY HIGHLIGHTS</h1>
      <p>Here are some of the most popular amenities at this property</p>
      <p className="has-text-primary has-text-weight-bold">
        <span className="is-size-3">
          <i className="fa fa-paw" />
          <span style={{ paddingLeft: 5 }}>Pet Friendly</span>
        </span>
      </p>
      <p className="has-text-primary has-text-weight-bold">
        <span className="is-size-3">
          <i className="fas fa-parking" />
          <span style={{ paddingLeft: 5 }}>Parking Space</span>
        </span>
      </p>
    </div>
  );
};

const PetSmokePolicy = props => {
  const { policy } = props;
  console.log(policy);
  return (
    <div className="property-highlights property-facts">
      <h1 className="is-size-3">PET &amp; SMOKING POLICY</h1>
      <p>Find out if pets are allowed at this property</p>
      <div className="columns">
        <div className="column">
          <p className="has-text-primary has-text-weight-bold">Dogs</p>
          <p>{policy.dogs}</p>

          <p>{policy.detail}</p>
        </div>
        <div className="column">
          <p className="has-text-primary has-text-weight-bold">Cats</p>
          <p>{policy.cats}</p>

          <p>{policy.detail}</p>
        </div>
        <div className="column">
          <p className="has-text-primary has-text-weight-bold">Smoking</p>
          <p>{policy.smoking}</p>
        </div>
      </div>
    </div>
  );
};
export default SelectedProperty;
