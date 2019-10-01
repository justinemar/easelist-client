import React from "react";
import ReactMapGL, {
  Marker,
  LinearInterpolator,
  FlyToInterpolator,
  Popup
} from "react-map-gl";
import { easeCubic } from "d3-ease";
import "./index.scss";
class ListProperty extends React.Component {
  state = {
    viewport: {
      latitude: 13.1162,
      longitude: 121.0794,
      width: "100%",
      height: "100vh" /*100% */,
      zoom: 5,
      center: [13.1162, 121.0794],
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic
    },
    popUpProps: {
      lat: 14.5995,
      lng: 120.9842
    },
    mounted: false,
    token:
      "pk.eyJ1IjoiYmVyYmVyb2thIiwiYSI6ImNrMG90cnpzNTA5YzUzbmtyMjFlano1ZDYifQ.pBd7NWQF3lCnVQWH8xeliQ",
    properties: {
      first_name: "John",
      last_name: "Doe",
      telephone: "",
      email_address: "",
      lease: {
        terms: [],
        detail: ""
      },
      addons: {
        amenities: {
          indoor: [],
          outdoor: []
        },
        flooring: [],
        community_features: [],
        extra_loc: []
      },
      coords: {
        lat: "",
        lng: ""
      }
    }
  };

  componentDidMount() {
    this.setState({
      mounted: true
    });
  }

  handleViewPortChange = viewport => {
    this.setState({
      viewport
    });
  };

  handleMarkerDrag = e => {
    console.log(e.lngLat);
  };

  confirmCoords = e => {
    const { popUpProps, viewport, properties } = this.state;
    this.setState({
      viewport: {
        ...viewport,
        latitude: popUpProps.lat,
        longitude: popUpProps.lng
      },
      properties: {
        ...properties,
        coords: {
          lat: popUpProps.lat,
          lng: popUpProps.lng
        }
      }
    });
  };

  handlePositionMark = e => {
    const [lng, lat] = e.lngLat;
    this.setState({
      viewport: {
        ...this.state.viewport,
        latitude: lat,
        longitude: lng
      },
      popUpProps: {
        lat,
        lng
      }
    });

    console.log(lng, lat);
  };

  handleLatChange = e => {
    this.setState({
      popUpProps: {
        ...this.state.popUpProps,
        lat: parseFloat(e.target.value)
      }
    });
  };

  handleLngChange = e => {
    this.setState({
      popUpProps: {
        ...this.state.popUpProps,
        lng: parseFloat(e.target.value)
      }
    });
  };

  trackAddons = e => {
    const { properties } = this.state;
    const { name: key, value, type } = e.target;
    console.log(key);
    if (key === "indoor" || key === "outdoor") {
      this.setState({
        properties: {
          ...properties,
          addons: {
            ...properties.addons,
            amenities: {
              ...properties.addons.amenities,
              [key]: [...properties.addons.amenities[key], properties[key]]
            }
          }
        }
      });

      return;
    }

    this.setState({
      properties: {
        ...properties,
        addons: {
          ...properties.addons,
          [key]: [...properties.addons[key], properties[key]]
        }
      }
    });
  };

  handleInputChange = e => {
    const { properties, lease } = this.state;
    const { name: key, value, type } = e.target;
    // addons:{
    //   amenities: [],
    //   flooring: [],
    //   community_features: []
    // }
    if (key === "least_detail") {
      this.setState({
        properties: {
          ...properties,
          lease: {
            ...properties.lease,
            detail: value
          }
        }
      });

      return;
    }

    if (type === "checkbox") {
      if (properties.lease.terms.includes(value)) {
        this.setState({
          properties: {
            ...properties,
            lease: {
              ...properties.lease,
              terms: properties.lease.terms.filter((i, _) => i !== value)
            }
          }
        });

        return;
      }

      this.setState({
        properties: {
          ...properties,
          lease: {
            ...properties.lease,
            terms: [...properties.lease.terms, value]
          }
        }
      });

      return;
    }

    this.setState({
      properties: {
        ...properties,
        [key]: value
      }
    });
  };

  render() {
    const { viewport, token, properties } = this.state;
    return (
      <div className="columns is-gapless">
        <div className="column is-two-third panel-wrapper">
          <div className="panel listing-panel">
            <h1 className="panel-heading is-size-3 has-text-black">Contact</h1>
            <div className="field is-horizontal">
              <div className="field-body">
                <div class="field">
                  <label class="label">First Name</label>
                  <p class="control is-expanded has-icons-left">
                    <input
                      onChange={this.handleInputChange}
                      class="input is-light"
                      type="text"
                      placeholder="First Name"
                      name="first_name"
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-user"></i>
                    </span>
                  </p>
                </div>
                <div class="field">
                  <label class="label">Last Name</label>
                  <p class="control is-expanded">
                    <input
                      onChange={this.handleInputChange}
                      class="input is-light"
                      type="text"
                      placeholder="Last Name"
                      name="last_name"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <label class="label">Phone Number</label>
                  <div class="field has-addons">
                    <p class="control">
                      <a class="button is-static">+63</a>
                    </p>
                    <p class="control is-expanded">
                      <input
                        onChange={this.handleInputChange}
                        name="telephone"
                        class="input is-light"
                        type="tel"
                        placeholder="Your phone number"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <label class="label">Email Address</label>
                  <div className="control has-icons-left">
                    <input
                      onChange={this.handleInputChange}
                      className="input is-light"
                      type="email"
                      name="email_address"
                      placeholder="Email Address"
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="panel-heading is-size-3 has-text-black">
              Property Information
            </h1>
            <div class="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <label className="label">Property Type</label>
                  <div className="control has-icons-left">
                    <span class="select">
                      <select
                        name="property_type"
                        onChange={this.handleInputChange}
                        value={properties.property_type}
                      >
                        <option>Apartment</option>
                        <option>Commercial</option>
                        <option>Condo</option>
                        <option>Duplex/Triplex/Fourplex</option>
                        <option>Foreclosures</option>
                      </select>
                    </span>
                    <span class="icon is-small is-left">
                      <i class="fa fa-building"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Property Street Address</label>
                  <div className="control has-icons-left">
                    <input
                      name="street_address"
                      onChange={this.handleInputChange}
                      className="input is-light"
                      type="text"
                      placeholder="Street Address"
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-road"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <label className="label">City</label>
                  <div className="control has-icons-left">
                    <input
                      onChange={this.handleInputChange}
                      name="city"
                      className="input is-light"
                      type="text"
                      placeholder="City"
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-map"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Province</label>
                  <div className="control has-icons-left">
                    <input
                      onChange={this.handleInputChange}
                      name="province"
                      className="input is-light"
                      type="text"
                      placeholder="Province"
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-map"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <label className="label">Zip Code</label>
                  <div class="field has-addons">
                    <p class="control">
                      <a class="button is-static"></a>
                    </p>
                    <p class="control is-expanded">
                      <input
                        onChange={this.handleInputChange}
                        name="zip_code"
                        class="input is-light"
                        type="number"
                        placeholder="Zip Code"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <label className="label">
                    Add a location tag (This will make your listing more
                    searchable)
                  </label>
                  <div className="buttons">
                    {properties.addons.extra_loc
                      ? properties.addons.extra_loc.map(i => {
                          return <a className="button is-info">{i}</a>;
                        })
                      : null}
                  </div>
                  <div className="field has-addons">
                    <div className="control has-icons-left is-expanded">
                      <input
                        className="input is-light"
                        type="text"
                        name="extra_loc"
                        placeholder="Add Barangay, neighborhood or subdivision"
                        onChange={this.handleInputChange}
                      />
                      <span class="icon is-small is-left">
                        <i class="fa fa-search-location"></i>
                      </span>
                    </div>
                    <div class="control">
                      <a
                        class="button is-info"
                        name="extra_loc"
                        onClick={e => this.trackAddons(e)}
                      >
                        Add
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="panel-heading is-size-3 has-text-black">
              Property Facts
            </h1>
            <div className="field is-horizontal">
              <div className="field-body">
                <div class="field">
                  <label class="label">Staring Price</label>
                  <div class="field has-addons">
                    <p class="control">
                      <a class="button is-static">₱</a>
                    </p>
                    <p class="control is-expanded">
                      <input
                        onChange={this.handleInputChange}
                        name="starting_price"
                        class="input is-light"
                        type="number"
                        placeholder="Staring Price"
                      />
                    </p>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Deposit</label>
                  <div class="field has-addons">
                    <p class="control">
                      <a class="button is-static">₱</a>
                    </p>
                    <p class="control is-expanded">
                      <input
                        onChange={this.handleInputChange}
                        name="deposit"
                        class="input is-light"
                        type="number"
                        placeholder="Deposit"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <label className="label"># of Bedrooms</label>
                  <div className="control has-icons-left">
                    <span class="select">
                      <select
                        name="num_of_bed"
                        onChange={this.handleInputChange}
                      >
                        <option>Studio</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5+</option>
                        <option>Not applicable</option>
                      </select>
                    </span>
                    <span class="icon is-small is-left">
                      <i class="fa fa-bed"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label"># of Bathrooms</label>
                  <div className="control has-icons-left">
                    <span class="select">
                      <select
                        name="num_of_bath"
                        onChange={this.handleInputChange}
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5+</option>
                        <option>Not applicable</option>
                      </select>
                    </span>
                    <span class="icon is-small is-left">
                      <i class="fa fa-bath"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div class="field">
                  <label class="label">Square Feet</label>
                  <div class="field has-addons">
                    <p class="control">
                      <a class="button is-static"></a>
                    </p>
                    <p class="control is-expanded">
                      <input
                        name="square_feet"
                        onChange={this.handleInputChange}
                        class="input is-light"
                        type="number"
                        placeholder="Square Feet"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div class="field">
                  <label class="label">Title</label>
                  <div class="control">
                    <input
                      name="title"
                      onChange={this.handleInputChange}
                      class="input is-light"
                      type="text"
                      placeholder="Studio Room For Rent-Fully Furnished near Makati City"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div class="field">
                  <label class="label">
                    Briefly describe your property. List any outstanding
                    features{" "}
                  </label>
                  <div class="control">
                    <textarea
                      name="description"
                      onChange={this.handleInputChange}
                      class="textarea is-light"
                      placeholder="Property description"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="panel-heading is-size-3 has-text-black">
              Lease details/terms
            </h1>
            <div className="field">
              <div className="field-body">
                <div className="field is-grouped is-grouped-multiline">
                  <div className="control has-icons-left has-text-black">
                    <input
                      onChange={this.handleInputChange}
                      className="is-checkradio"
                      id="six-months"
                      type="checkbox"
                      name="six-months"
                      value="6 Months"
                    />
                    <label for="six-months">6 Months</label>
                  </div>
                  <div className="control has-icons-left has-text-black">
                    <input
                      onChange={this.handleInputChange}
                      value="1 Year"
                      className="is-checkradio"
                      id="one-year"
                      type="checkbox"
                      name="one-year"
                      onChange={this.handleInputChange}
                    />
                    <label for="one-year">1 Year</label>
                  </div>
                  <div className="control has-icons-left has-text-black">
                    <input
                      onChange={this.handleInputChange}
                      value="9 Months"
                      className="is-checkradio"
                      id="nine-months"
                      type="checkbox"
                      name="nine-months"
                    />
                    <label for="nine-months">9 Months</label>
                  </div>
                  <div className="control has-icons-left has-text-black">
                    <input
                      onChange={this.handleInputChange}
                      value="Month to Month"
                      className="is-checkradio"
                      id="month-to-month"
                      type="checkbox"
                      name="month-to-month"
                    />
                    <label for="month-to-month">Month to Month</label>
                  </div>
                  <div className="control has-icons-left has-text-black">
                    <input
                      onChange={this.handleInputChange}
                      value="Rent to Own"
                      className="is-checkradio"
                      id="rent-to-own"
                      type="checkbox"
                      name="rent-to-own"
                    />
                    <label for="rent-to-own">rent to own</label>
                  </div>
                  <div className="control has-icons-left has-text-black">
                    <input
                      onChange={this.handleInputChange}
                      value="18 Months"
                      className="is-checkradio"
                      id="eighteen-months"
                      type="checkbox"
                      name="eighteen-months"
                    />
                    <label for="eighteen-months">18 Months</label>
                  </div>
                  <div className="control has-icons-left has-text-black">
                    <input
                      onChange={this.handleInputChange}
                      value="2 Years"
                      className="is-checkradio"
                      id="two-years"
                      type="checkbox"
                      name="two-years"
                    />
                    <label for="two-years">2 Years</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div class="field">
                  <label class="label">List any lease disclosures here </label>
                  <div class="control">
                    <textarea
                      onChange={this.handleInputChange}
                      name="least_detail"
                      class="textarea is-light"
                      placeholder="lease disclosures"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="panel-heading is-size-3 has-text-black">
              Community features
            </h1>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <label className="label">Add community features</label>
                  <div className="buttons">
                    {properties.addons.community_features
                      ? properties.addons.community_features.map(i => {
                          return <a className="button is-info">{i}</a>;
                        })
                      : null}
                  </div>
                  <div className="field has-addons">
                    <div className="control has-icons-left is-expanded">
                      <input
                        className="input is-light"
                        type="text"
                        name="community_features"
                        placeholder="Basketball Court, Mall, School, Pool"
                        onChange={this.handleInputChange}
                      />
                      <span class="icon is-small is-left">
                        <i class="fa fa-search-location"></i>
                      </span>
                    </div>
                    <div class="control">
                      <a
                        class="button is-info"
                        name="community_features"
                        onClick={e => this.trackAddons(e)}
                      >
                        Add
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="panel-heading is-size-3 has-text-black">
              Pets and Smoking Policies
            </h1>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <label className="label">Dogs</label>
                  <div className="control has-icons-left">
                    <span class="select">
                      <select
                        name="dogs_policy"
                        onChange={this.handleInputChange}
                      >
                        <option>Allowed</option>
                        <option>Not Allowed</option>
                        <option>Call for Info</option>
                        <option>Not Specified</option>
                      </select>
                    </span>
                    <span class="icon is-small is-left">
                      <i class="fa fa-paw"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Cats</label>
                  <div className="control has-icons-left">
                    <span class="select">
                      <select
                        name="cats_policy"
                        onChange={this.handleInputChange}
                      >
                        <option>Allowed</option>
                        <option>Not Allowed</option>
                        <option>Call for Info</option>
                        <option>Not Specified</option>
                      </select>
                    </span>
                    <span class="icon is-small is-left">
                      <i class="fas fa-cat"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Smoking</label>
                  <div className="control has-icons-left">
                    <span class="select">
                      <select
                        name="smoking_policy"
                        onChange={this.handleInputChange}
                      >
                        <option>Allowed</option>
                        <option>Not Allowed</option>
                        <option>Outside Only</option>
                        <option>Not Specified</option>
                      </select>
                    </span>
                    <span class="icon is-small is-left">
                      <i class="fa fa-smoking"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div class="field">
                  <label class="label">Pet Policy Details</label>
                  <div class="control">
                    <textarea
                      name="pets_policy_detail"
                      onChange={this.handleInputChange}
                      class="textarea is-light"
                      placeholder="Pet policy details"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="panel-heading is-size-3 has-text-black">
              Amenities
            </h1>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <label className="label">Indoor Amenities</label>
                  <div className="buttons">
                    {properties.addons.amenities.indoor
                      ? properties.addons.amenities.indoor.map(i => {
                          return <a className="button is-info">{i}</a>;
                        })
                      : null}
                  </div>
                  <div className="field has-addons">
                    <div className="control has-icons-left is-expanded">
                      <input
                        className="input is-light"
                        type="text"
                        name="indoor"
                        placeholder="Air Conditioning, Washer and Dryer, CCTV, Wifi"
                        onChange={this.handleInputChange}
                      />
                      <span class="icon is-small is-left">
                        <i class="fa fa-wifi"></i>
                      </span>
                    </div>
                    <div class="control">
                      <a
                        class="button is-info"
                        name="indoor"
                        onClick={e => this.trackAddons(e)}
                      >
                        Add
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <label className="label">Outdoor Amenities</label>
                  <div className="buttons">
                    {properties.addons.amenities.outdoor
                      ? properties.addons.amenities.outdoor.map(i => {
                          return <a className="button is-info">{i}</a>;
                        })
                      : null}
                  </div>
                  <div className="field has-addons">
                    <div className="control has-icons-left is-expanded">
                      <input
                        className="input is-light"
                        type="text"
                        name="outdoor"
                        onChange={this.handleInputChange}
                        placeholder="Access Gate, Balcony, Garden"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-tree"></i>
                      </span>
                    </div>
                    <div class="control">
                      <a
                        class="button is-info"
                        name="outdoor"
                        onClick={e => this.trackAddons(e)}
                      >
                        Add
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <label className="label">Flooring</label>
                  <div className="buttons">
                    {properties.addons.flooring
                      ? properties.addons.flooring.map(i => {
                          return <a className="button is-info">{i}</a>;
                        })
                      : null}
                  </div>
                  <div className="field has-addons">
                    <div className="control has-icons-left is-expanded">
                      <input
                        className="input is-light"
                        type="text"
                        name="flooring"
                        placeholder="Ceramic Tile, Hard wood, Vinyl"
                        onChange={this.handleInputChange}
                        value={properties.flooring}
                      />
                      <span class="icon is-small is-left">
                        <i class="fa fa-th"></i>
                      </span>
                    </div>
                    <div class="control">
                      <a
                        class="button is-info"
                        name="flooring"
                        onClick={e => this.trackAddons(e)}
                      >
                        Add
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="panel-heading is-size-3 has-text-black">Parking</h1>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <label className="label">Dedicated</label>
                  <div className="control has-icons-left">
                    <span class="select">
                      <select
                        name="num_of_dedicated_parking"
                        onChange={this.handleInputChange}
                      >
                        <option>None</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5+</option>
                      </select>
                    </span>
                    <span class="icon is-small is-left">
                      <i class="fas fa-parking"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Covered</label>
                  <div className="control has-icons-left">
                    <span class="select">
                      <select
                        name="num_of_covered_parking"
                        onChange={this.handleInputChange}
                      >
                        <option>None</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5+</option>
                      </select>
                    </span>
                    <span class="icon is-small is-left">
                      <i class="fas fa-parking"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Garage</label>
                  <div className="control has-icons-left">
                    <span class="select">
                      <select
                        name="num_of_garage_parking"
                        onChange={this.handleInputChange}
                      >
                        <option>None</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5+</option>
                      </select>
                    </span>
                    <span class="icon is-small is-left">
                      <i class="fas fa-parking"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="listing-popup-container">
                <div className="listing-popup-details">
                  <strong>
                    <p className="is-size-6">
                      Locate your property on the map by dragging the blue house
                      icon or by providing the coordinates below (use the mouse
                      wheel to zoom-in and zoom-out) Note: You can offset your
                      coordinates if you dont want potential clients to know the
                      exact location.
                    </p>
                    <input
                      onChange={e => this.handleLatChange(e)}
                      className="input is-light"
                      type="number"
                      placeholder="Latitude"
                      value={this.state.popUpProps.lat}
                    />
                    <input
                      onChange={e => this.handleLngChange(e)}
                      className="input is-light"
                      type="number"
                      placeholder="Longitude"
                      value={this.state.popUpProps.lng}
                    />
                    <a
                      className="button is-info"
                      onClick={() => this.confirmCoords()}
                    >
                      Fly to coordinate
                    </a>
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={token}
            mapStyle="mapbox://styles/berberoka/ck0p00jjm1vfl1co2kyhqfrik"
            onViewportChange={viewport => this.handleViewPortChange(viewport)}
          >
            <Marker
              latitude={this.state.popUpProps.lat}
              longitude={this.state.popUpProps.lng}
              draggable={true}
              onDrag={e => this.handleMarkerDrag(e)}
              onDragEnd={e => this.handlePositionMark(e)}
            >
              <button className="marker"></button>
            </Marker>
          </ReactMapGL>
        </div>
      </div>
    );
  }
}

export default ListProperty;