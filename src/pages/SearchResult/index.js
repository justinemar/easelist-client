import React, { createRef } from "react";
import queryString from "query-string";
import MapGLRenderer from "../mapgl/index";
import { PropertyConsumer } from "../../contexts/properties-context";
// const staticData = [{
//   "_id":"039e8dhf8w749f0",
//   "publisher": "Yll Peng",
//   "createdAt": "9/18/2019-3:52PMPHT",
//   "title": "WANTED BEDSPACER BINONDO, MANILA",
//   "description": "NEWLY REFURNISED ROOM AVAILABLE FOR RENT",
//   "type": {
//     "variant": "room",
//     "size": "844-1221 Sqft"
//   },
//   "location": {
//     "city": "Manila"
//   },
//   "startingPrice": "$1,280+",
//   "variations": [
//     {
//       "title": "one bed",
//       "units": [
//         {
//           "title": "Unit A2",
//           "price": "$1,355+/mo",
//           "description": "1 Bed | 1 Bath | 946 Sqft",
//           "image": [
//             "image1",
//             "image2",
//             "image3"
//           ]
//         },
//         {
//           "title": "Unit C with Den/Dining",
//           "price": "$1,370 - $1,395/mo",
//           "description": "1 Bed | 1 Bath | 914 Sqft",
//           "image": [
//             "image1",
//             "image2",
//             "image3"
//           ]
//         }
//       ]
//     },
//     {
//       "title": "two bed",
//       "units": [
//         {
//           "title": "Unit D",
//           "price": "$1,560 - $1,585/mo",
//           "description": "2 Beds | 2 Baths 1102 Sqft",
//           "image": [
//             "image1",
//             "image2",
//             "image3"
//           ]
//         },
//         {
//           "title": "Unit E corner unit",
//           "price": "$1,625 - $1,650/mo",
//           "description": "2 Beds | 2 Baths 1221 Sqft",
//           "image": [
//             "image1",
//             "image2",
//             "image3"
//           ]
//         }
//       ]
//     }
//   ],
//   "amenities": [
//     {
//       "title": "Perks",
//       "listItem": [
//         "Cable Ready",
//         "Extra Storage",
//         "High Speed Internet Access",
//         "New/Renovated Interior"
//       ]
//     }
//   ],
//   "feature":  {
//     type: 'feature',
//     geometry: {
//       type: 'Point',
//       coordinates: [
//         14.221998,
//         121.17397400000002

//       ]
//     }
//   }
// }]
const staticData = {
  features: [
    {
      type: "feature",
      geometry: {
        type: "Point",
        coordinates: [14.221998, 121.17397400000002]
      },
      properties: {
        title: "My house in calamba",
        description: "my house",
        listID: "123131312"
      }
    }
  ]
};

function CardLoader() {
  return (
    <div class="property-card loader-card-hover">
      <div class="property-image-wrapper">
        <div class="loader-card gradient property-image"></div>
      </div>
      <div class="property-details-wrapper has-text-black is-size-7">
        <h1 class="loader-title gradient"></h1>
        <p class="loader-bar gradient"></p>
        <p class="loader-bar gradient"></p>
        <p class="loader-bar gradient"></p>
      </div>
    </div>
  );
}

//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   height: 100%;

//   display: flex;
//     flex-direction: column;
//     width: 100%;
//     height: 100%;
// }

function ResultCard({ refs, queryResult, showPopUp, selectedProperty }) {
  let isHighlighted = "_x17sx";

  return queryResult && queryResult.features.length ? (
    queryResult.features.map((data, key) => {
      if (data && selectedProperty.feature) {
        isHighlighted =
          data.feature._id === selectedProperty.feature._id
            ? "selected-search"
            : "_x17sx";
      }

      const handleMouseOver = () => {
        showPopUp(data);
      };

      const handleMouseOut = () => {
        showPopUp([]);
      };
      return (
        <div
          ref={refs[data.feature._id]}
          key={data.feature._id}
          class={`property-card ${isHighlighted}`}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <div class="property-image-wrapper">
            <div
              class="property-image"
              style={{
                backgroundImage:
                  "url(https://www.lamudi.com.ph/static/media/bm9uZS9ub25l/2x2x2x380x244/acf06097e27f7f.jpg)"
              }}
            ></div>
          </div>
          <div class="property-details-wrapper has-text-black is-size-7">
            <h1 class="is-size-6">{data.title}</h1>
            <p class="is-size-5">
              <strong>₱{data.startingPrice}</strong>
            </p>
            <p class="is-size-6" style={{ fontWeight: 500 }}>
              {data.description}
            </p>
            <div class="property-control">
              <a class="button is-primary">Contact</a>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <CardLoader />
  );
}

function SelectedSearch() {
  return (
    <div class="property-card">
      <div class="property-image-wrapper">
        <div
          class="property-image"
          style={{
            backgroundImage:
              "url(https://www.lamudi.com.ph/static/media/bm9uZS9ub25l/2x2x2x380x244/acf06097e27f7f.jpg)"
          }}
        ></div>
      </div>
      <div class="property-details-wrapper has-text-black is-size-7">
        <h1 class="is-size-6">amazing new apartment</h1>
        <p class="is-size-5">
          <strong>₱515151</strong>
        </p>
        <p class="is-size-6" style={{ fontWeight: 500 }}>
          you'll be amazeddddd
        </p>
        <div class="property-control">
          <a class="button is-primary">Contact</a>
        </div>
      </div>
    </div>
  );
}
class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    const param = props.match.params.searchParam;
    console.log(param, props.match.params);
    this.state = {
      inputs: {
        query: param,
        refinements: ["APARTMENT", "CONDOS", "TOWNHOUSE", "HOUSES"],
        priceRange: null
      },
      newSearchValue: null,
      selectedSearch: null,
      mapProperties: {
        position: {
          lat: 13.1162,
          lng: 121.0794
        },
        markers: null,
        placeToMarks: param
      }
    };
  }

  mapSearch = () => {
    const { inputs } = this.state;
    const { provinceParam } = this.props.match.params;
    fetch(
      `https://cors-anywhere.herokuapp.com/http://www.datasciencetoolkit.org/maps/api/geocode/json?sensor=false&address=${inputs.query}`,
      {
        method: "GET"
      }
    )
      .then(res => res.json())
      .then(res => {
        if (res.results && res.results.length) {
          this.setState({
            mapProperties: {
              position: res.results[0].geometry.location
            }
          });
        } else {
          this.props.history.push(`/${provinceParam}`);
        }
      });
  };

  componentWillMount() {
    this.mapSearch();
  }

  componentDidMount() {
    const { selectedData } = this.props.location;
    // const acquiredPosition = {
    //   lat: selectedData.feature.geometry.coordinates[1],
    //   lng: selectedData.feature.geometry.coordinates[0]
    // }
    this.setState({
      selectedSearch: selectedData,
      newSearchValue: this.props.match.params.searchParam
      // mapProperties: {
      //   position: {...acquiredPosition}
      // }
    });
  }

  handleChange = e => {
    this.setState({
      newSearchValue: e.target.value
    });
  };

  // handleSearchInput(){
  //   const { newSearchValue } = this.state;
  //   fetch(`/api/search`, {
  //     method: 'POST',
  //     body: {
  //       searchTerm: newSearchValue
  //     }
  //   })
  //   .then((res) => {
  //       res.json().then(parsed => this.setState({queryResult: [...parsed]}))
  //   })
  // }

  render() {
    const { query } = this.state.inputs;
    const { mapProperties, newSearchValue } = this.state;

    return (
      <PropertyConsumer>
        {props => {
          return (
            <div class="section is-paddingless">
              <div class="columns">
                {props.queryResult !== null ? (
                  <div class="column is-one-third properties">
                    <div class="filter-control">
                      <div class="field has-addons">
                        <p class="control has-icons-left">
                          <input
                            class="input is-info is-rounded"
                            type="text"
                            placeholder="place, zip, neighborhood"
                            value={newSearchValue}
                            onChange={this.handleChange}
                          />
                          <span class="icon is-small is-left">
                            <i class="fa fa-map-marker"></i>
                          </span>
                        </p>
                        <p class="control">
                          <span class="select is-info">
                            <select>
                              <option>Max Price (₱)</option>
                              <option>₱1,000</option>
                              <option>₱2,000</option>
                            </select>
                          </span>
                        </p>
                        <p class="control">
                          <a class="button is-primary">More filters</a>
                        </p>
                      </div>
                      <div class="field">
                        <div class="control">
                          <input
                            class="is-checkradio"
                            id="exampleRadioInline1"
                            type="radio"
                            name="exampleRadioInline"
                            checked="checked"
                          />
                          <label for="exampleRadioInline1">Rent</label>
                          <input
                            class="is-checkradio"
                            id="exampleRadioInline2"
                            type="radio"
                            name="exampleRadioInline"
                          />
                          <label for="exampleRadioInline2">Buy</label>
                        </div>
                      </div>

                      <div class="result-header field has-addons">
                        <div class="control result-count">
                          <p class="subtitle is-5 has-text-dark	">
                            <strong class="has-text-black">
                              {props.queryResult.features.length} Properties
                              found
                            </strong>
                          </p>
                        </div>
                        <p class="control">
                          <span class="select is-info">
                            <select>
                              <option>Best Match</option>
                              <option>Lowest Price</option>
                              <option>Highest Price</option>
                              <option>Most popular</option>
                            </select>
                          </span>
                        </p>
                      </div>
                    </div>
                    <div class="property-container">
                      <PropertyConsumer>
                        {props => {
                          return (
                            <ResultCard
                              showPopUp={item =>
                                props.setSelectedProperty(item)
                              }
                              selectedProperty={props.selectedProperty}
                              queryResult={props.queryResult}
                              refs={props.refs}
                            />
                          );
                        }}
                      </PropertyConsumer>
                    </div>
                  </div>
                ) : (
                  <h1>Loading </h1>
                )}
                <div class="column map-column">
                  <MapGLRenderer
                    mapProperties={mapProperties}
                    queryResult={props.queryResult}
                  />
                </div>
              </div>
            </div>
          );
        }}
      </PropertyConsumer>
    );
  }
}

export default SearchResult;
