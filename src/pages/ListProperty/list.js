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
      lat: "",
      lng: ""
    },
    mounted: false,
    token:
      "pk.eyJ1IjoiYmVyYmVyb2thIiwiYSI6ImNrMG90cnpzNTA5YzUzbmtyMjFlano1ZDYifQ.pBd7NWQF3lCnVQWH8xeliQ"
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
        lat: e.target.value
      }
    });
  };

  handleLngChange = e => {
    this.setState({
      popUpProps: {
        ...this.state.popUpProps,
        lng: e.target.value
      }
    });
  };

  render() {
    const { viewport, token } = this.state;
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
                      class="input is-light"
                      type="text"
                      placeholder="Name"
                      value="John"
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
                      class="input is-light"
                      type="text"
                      placeholder="Name"
                      value="Doe"
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
                      className="input is-light"
                      type="email"
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
                      <select>
                        <option selected>Apartment</option>
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
                      className="input is-light"
                      type="email"
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
                      className="input is-light"
                      type="email"
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
                      className="input is-light"
                      type="email"
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
                  <label className="label">Add more</label>
                  <div className="field has-addons">
                    <div className="control has-icons-left is-expanded">
                      <input
                        className="input is-light"
                        type="email"
                        placeholder="Add Barangay or neighborhood"
                      />
                      <span class="icon is-small is-left">
                        <i class="fa fa-search-location"></i>
                      </span>
                    </div>
                    <div class="control">
                      <a class="button is-info">Add</a>
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
                      <select>
                        <option selected>Studio</option>
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
                      <select>
                        <option selected>1</option>
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
                      className="is-checkradio"
                      id="six-months"
                      type="checkbox"
                      name="six-months"
                    />
                    <label for="six-months">6 Months</label>
                  </div>
                  <div className="control has-icons-left has-text-black">
                    <input
                      className="is-checkradio"
                      id="one-year"
                      type="checkbox"
                      name="one-year"
                    />
                    <label for="one-year">1 Year</label>
                  </div>
                  <div className="control has-icons-left has-text-black">
                    <input
                      className="is-checkradio"
                      id="nine-months"
                      type="checkbox"
                      name="nine-months"
                    />
                    <label for="nine-months">9 Months</label>
                  </div>
                  <div className="control has-icons-left has-text-black">
                    <input
                      className="is-checkradio"
                      id="month-to-month"
                      type="checkbox"
                      name="month-to-month"
                    />
                    <label for="month-to-month">Month to Month</label>
                  </div>
                  <div className="control has-icons-left has-text-black">
                    <input
                      className="is-checkradio"
                      id="rent-to-own"
                      type="checkbox"
                      name="rent-to-own"
                    />
                    <label for="rent-to-own">rent to own</label>
                  </div>
                  <div className="control has-icons-left has-text-black">
                    <input
                      className="is-checkradio"
                      id="eighteen-months"
                      type="checkbox"
                      name="eighteen-months"
                    />
                    <label for="eighteen-months">18 Months</label>
                  </div>
                  <div className="control has-icons-left has-text-black">
                    <input
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
                  <div className="field has-addons">
                    <div className="control has-icons-left is-expanded">
                      <input
                        className="input is-light"
                        type="email"
                        placeholder="Basketball Court, Mall, School, Pool"
                      />
                      <span class="icon is-small is-left">
                        <i class="fa fa-search-location"></i>
                      </span>
                    </div>
                    <div class="control">
                      <a class="button is-info">Add</a>
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
                      <select>
                        <option selected>Allowed</option>
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
                      <select>
                        <option selected>Allowed</option>
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
                      <select>
                        <option selected>Allowed</option>
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
                  <div className="field has-addons">
                    <div className="control has-icons-left is-expanded">
                      <input
                        className="input is-light"
                        type="email"
                        placeholder="Air Conditioning, Washer and Dryer, CCTV, Wifi"
                      />
                      <span class="icon is-small is-left">
                        <i class="fa fa-wifi"></i>
                      </span>
                    </div>
                    <div class="control">
                      <a class="button is-info">Add</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <label className="label">Outdoor Amenities</label>
                  <div className="field has-addons">
                    <div className="control has-icons-left is-expanded">
                      <input
                        className="input is-light"
                        type="email"
                        placeholder="Access Gate, Balcony, Garden"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-tree"></i>
                      </span>
                    </div>
                    <div class="control">
                      <a class="button is-info">Add</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <label className="label">Flooring</label>
                  <div className="field has-addons">
                    <div className="control has-icons-left is-expanded">
                      <input
                        className="input is-light"
                        type="email"
                        placeholder="Ceramic Tile, Hard wood, Vinyl"
                      />
                      <span class="icon is-small is-left">
                        <i class="fa fa-th"></i>
                      </span>
                    </div>
                    <div class="control">
                      <a class="button is-info">Add</a>
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
                      <select>
                        <option selected>None</option>
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
                      <select>
                        <option selected>None</option>
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
                      <select>
                        <option selected>None</option>
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
              latitude={this.state.viewport.latitude}
              longitude={this.state.viewport.longitude}
              draggable={true}
              onDrag={e => this.handleMarkerDrag(e)}
              onDragEnd={e => this.handlePositionMark(e)}
            >
              <button className="marker"></button>
            </Marker>
            <Popup
              latitude={this.state.viewport.latitude}
              longitude={this.state.viewport.longitude}
            >
              <div className="listing-popup-container">
                <div className="listing-popup-details">
                  <strong>
                    <p className="is-size-6">
                      Locate your property by dragging the blue house icon or by
                      providing the coordinates below (use the mouse wheel to
                      zoom-in and zoom-out)
                    </p>
                    <input
                      onChange={e => this.handleLatChange(e)}
                      className="input is-light"
                      type="text"
                      placeholder="Latitude"
                      value={this.state.popUpProps.lat}
                    />
                    <input
                      onChange={e => this.handleLngChange(e)}
                      className="input is-light"
                      type="text"
                      placeholder="Longitude"
                      value={this.state.popUpProps.lng}
                    />
                    <a className="button is-info">Confirm Location</a>
                  </strong>
                </div>
              </div>
            </Popup>
          </ReactMapGL>
        </div>
      </div>
    );
  }
}

export default ListProperty;
