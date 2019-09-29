import React, { useContext } from "react";
import ReactMapGL, {
  Marker,
  LinearInterpolator,
  FlyToInterpolator,
  Popup
} from "react-map-gl";
import { easeCubic } from "d3-ease";
import { PropertyConsumer } from "../../contexts/properties-context";
import "./index.css";

const featureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [120.9738, 14.59992]
      },
      properties: {
        title: "WANTED BEDSPACER CALAMBA, LAGUNA",
        description: "NEWLY REFURNISED ROOM AVAILABLE FOR RENT",
        listID: "039e8dhf8w749f0"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [120.9822006, 14.6042004]
      },
      properties: {
        title: "Somewhere out there 2 ",
        description: "a place somewhere out there 2",
        listID: "18"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [120.9678802, 14.6495304]
      },
      properties: {
        title: "Somewhere out there 3",
        description: "a place somewhere out there 3",
        listID: "19"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [124.4397202, 7.2041702]
      },
      properties: {
        title: "Somewhere out there 4",
        description: "a place somewhere out there 4",
        listID: "20"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [123.8907089, 10.31672]
      },
      properties: {
        title: "Somewhere out there 5",
        description: "a place somewhere out there 5",
        listID: "21"
      }
    }
  ]
};

const featureCollection1 = {
  features: [
    {
      title: "room for rent newly refurnised apartment ",
      description:
        "looking for a newly refurnied aprtment? with lots of amenities including free wifi, pets playground, free parking, free netflix",
      startingPrice: 5000,
      city: "calamba",
      province: "laguna",
      feature: {
        geometry: {
          type: "Point",
          coordinates: [121.17397400000002, 14.221998]
        },
        _id: "5d86327f912528190865afca"
      },
      address: "villa de calamba, blk 64 lot 23, phase 3"
    },
    {
      title: "laguna area bedspacer now available",
      description: "limited bedspace slots contact for details laguna area",
      startingPrice: 1500,
      city: "calamba",
      province: "laguna",
      feature: {
        geometry: {
          type: "Point",
          coordinates: [120.9738, 14.59992]
        },
        _id: "5d8631b4912528190865afc8"
      },
      address:
        "Villa Remedios Subdivision – Blk-05 Lot-05 – Brgy. Salitran III, City of Calamba, Laguna"
    }
  ]
};

function AddMapLayer({ features }) {}

class MapGLRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 13.1162,
        longitude: 121.0794,
        width: "100%",
        height: "100vh" /*100% */,
        zoom: 12,
        center: [13.1162, 121.0794],
        transitionDuration: 5000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeCubic,
        maxZoom: 12
      },
      toMark: {
        features: []
      },
      mounted: false,
      token:
        "pk.eyJ1IjoiYmVyYmVyb2thIiwiYSI6ImNrMG90cnpzNTA5YzUzbmtyMjFlano1ZDYifQ.pBd7NWQF3lCnVQWH8xeliQ"
    };
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.mapProperties.position.lat !==
      this.props.mapProperties.position.lat
    ) {
      const transition = {
        ...this.state.viewport,
        latitude: this.props.mapProperties.position.lat,
        longitude: this.props.mapProperties.position.lng,
        center: [
          this.props.mapProperties.position.lat,
          this.props.mapProperties.position.lng
        ]
      };
      this.handleViewPortChange(transition);
    }
  }

  static getDerivedStateFromProps(props, state) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (props.queryResult.features.length !== state.toMark.features.length) {
      return {
        toMark: props.queryResult
      };
    }
    return null;
  }

  componentDidMount() {
    this.setState({
      mounted: true
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
    const { viewport, token, toMark } = this.state;
    return (
      <PropertyConsumer>
        {props => {
          return (
            <ReactMapGL
              {...viewport}
              mapboxApiAccessToken={token}
              mapStyle="mapbox://styles/berberoka/ck0p00jjm1vfl1co2kyhqfrik"
              onViewportChange={viewport => this.handleViewPortChange(viewport)}
            >
              {toMark && toMark.features.length
                ? toMark.features.map(prop => (
                    <Marker
                      latitude={prop.feature.geometry.coordinates[1]}
                      longitude={prop.feature.geometry.coordinates[0]}
                    >
                      <button
                        className="marker"
                        onClick={e => {
                          e.preventDefault();
                          props.setSelectedProperty(prop);
                          props.setScrollToView(prop.feature._id);
                        }}
                      ></button>
                    </Marker>
                  ))
                : null}
              {props.selectedProperty && props.selectedProperty.feature ? (
                <Popup
                  latitude={
                    props.selectedProperty.feature.geometry.coordinates[1]
                  }
                  longitude={
                    props.selectedProperty.feature.geometry.coordinates[0]
                  }
                  onClose={() => {
                    props.setSelectedProperty([]);
                  }}
                >
                  <div className="property-popup-container">
                    <div className="property-popup-image">
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src="https://www.lamudi.com.ph/static/media/bm9uZS9ub25l/2x2x2x380x244/acf06097e27f7f.jpg"
                        alt="Placeholder image"
                      />
                    </div>
                    <div className="property-popup-details">
                      <strong>
                        <p className="is-size-6">
                          ₱{props.selectedProperty.startingPrice}
                        </p>
                      </strong>
                      <p className="has-text-black">
                        {props.selectedProperty.address}
                      </p>
                      <a href="#" class="has-text-primary">
                        Contact Property
                      </a>
                    </div>
                  </div>
                </Popup>
              ) : null}
            </ReactMapGL>
          );
        }}
      </PropertyConsumer>
    );
  }
}

export default MapGLRenderer;
