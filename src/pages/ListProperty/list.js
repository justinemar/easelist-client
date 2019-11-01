import React from "react";
import { AuthServiceContext } from "../../utils/index";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import { easeCubic } from "d3-ease";
import "./index.scss";
import Fields from "./fields";

class ListProperty extends React.Component {
  constructor(props) {
    super(props);
    this.imageUpload = React.createRef();
    this.state = {
      viewport: {
        latitude: 13.1162,
        longitude: 121.0794,
        width: "100%",
        height: "100vh" /*100% */,
        zoom: 5,
        center: [13.1162, 121.0794],
        transitionDuration: 5000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeCubic,
        maxZoom: 20
      },
      popUpProps: {
        lat: 14.5995,
        lng: 120.9842
      },
      properties: {
        first_name: "",
        last_name: "",
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
        },
        ImagesData: []
      },
      previewImages: [],
      mounted: false,
      token: process.env.REACT_APP_MAPBOX_TOKEN
    };
  }

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

  submitListing = () => {
    const { fetch, _getToken } = this.context;
    const { properties, mock } = this.state;

    if (properties.first_name === "" || properties.last_name === "") {
      return alert("Required missing inputs");
    }

    if (properties.title === "" || properties.description === "") {
      return alert("Required missing inputs");
    }

    if (properties.starting_price === "" || properties.city === "") {
      return alert("Required missing inputs");
    }

    if (properties.province === "" || properties.zip_code === "") {
      return alert("Required missing inputs");
    }

    if (properties.coords.lat === "" || properties.coords.lng === "") {
      alert("Confirm your coordinates!");
      return;
    }

    if (!_getToken()) {
      alert("You must login to do this..");
      return;
    }

    const formData = new FormData();
    formData.append("properties", JSON.stringify(properties));
    properties.ImagesData.forEach(image => {
      formData.append("image", image);
    });

    fetch(
      `${process.env.REACT_APP_API_URL}/api/property`,
      {
        method: "POST",
        body: formData
      },
      {
        headers: {}
      }
    ).then(res => {
      alert("success now awaiting verification.");
    });
  };

  trackAddons = e => {
    const { properties } = this.state;
    const { name: key } = e.target;
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

  addImageData = fileList => {
    const { properties } = this.state;

    this.setState(prevState => ({
      properties: {
        ...prevState.properties,
        ImagesData: [...prevState.properties.ImagesData, ...fileList]
      }
    }));
  };

  removeImageData = index => {
    const { properties } = this.state;
    const data = [...properties.ImagesData];
    data.splice(index, 1);
    this.setState(prevState => ({
      properties: {
        ...prevState.properties,
        ImagesData: data
      }
    }));
  };

  render() {
    const { viewport, token, properties } = this.state;
    return (
      <div className="columns is-gapless">
        <div className="column is-two-third panel-wrapper">
          <div className="panel listing-panel">
            <Fields
              properties={properties}
              trackAddons={this.trackAddons}
              addImageData={this.addImageData}
              removeImageData={this.removeImageData}
              handleInputChange={this.handleInputChange}
            />
            <h1 className="panel-heading is-size-3 has-text-black">
              Map display
            </h1>
            <div className="field is-horizontal">
              <div className="listing-popup-container">
                <div className="listing-popup-details">
                  <strong>
                    <p className="is-size-6">
                      Locate your property on the map by dragging the blue
                      pointer icon or by providing the coordinates below (use
                      the mouse wheel to zoom-in and zoom-out) Note: You can
                      offset your coordinates if you dont want potential clients
                      to know the exact location.
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
                      Confirm Coordinates
                    </a>
                  </strong>
                </div>
              </div>
            </div>
            <button
              className="button is-extended is-info"
              onClick={() => this.submitListing()}
            >
              PROCEED
            </button>
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

ListProperty.contextType = AuthServiceContext;

export default ListProperty;
