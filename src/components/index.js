import React, { useState, useEffect } from "react";

import MakatiCard from "../makati.jpg";
import MandaluyongCard from "../mandaluyong.jpg";
import QuezonCityCard from "../quezoncity.jpg";
import TextLoop from "react-text-loop";
import { Link } from "react-dom";

function SuggestionBox({ data, searchTerm, redirectSearch }) {
  return (
    <>
      {data && data.length ? (
        <>
          <a className="panel-block" onClick={() => redirectSearch()}>
            Suggested province {data[0].location.province}
          </a>
          {data.map((source, i) => (
            <a
              className="panel-block"
              key={i}
              onClick={() => redirectSearch(source, source.location.city)}
            >
              <span className="panel-icon">
                <i className="fa fa-map-marker"></i>
              </span>
              {source.location.address.toUpperCase()}
            </a>
          ))}
        </>
      ) : (
        <>
          <a className="panel-block">Find your place now</a>
        </>
      )}
    </>
  );
}
class IndexComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValue: null,
      data: [],
      showSuggestions: false
    };
  }

  onSearchSubmit = e => {
    // console.log(`/places?query=${this.state.searchValue}`)
    // this.props.history.push(`/places?query=${this.state.searchValue}`);
  };

  componentDidMount() {
    console.log(this.state.data);
  }

  redirectSearch = (selectedData, searchParam) => {
    const { history } = this.props;
    const { data } = this.state;
    history.push({
      pathname: `/${data[0].location.province}/${searchParam}`,
      selectedData
    });
  };

  onSearchValueChange = e => {
    this.setState({
      searchValue: e.target.value
    });
    if (e.target.value.length <= 2 && e.key === "Backspace") {
      this.setState({
        data: []
      });
      return;
    }

    if (e.target.value.length <= 2) return;

    fetch(`/api/search?query=${e.target.value}`, {
      method: "POST"
    }).then(res => {
      res.json().then(parsed => this.setState({ data: [...parsed] }));
    });
  };

  render() {
    const { data, searchValue, showSuggestions } = this.state;
    return (
      <React.Fragment>
        <section className="section">
          <div className="container search-container">
            <h1 className="title">Settle with ease</h1>
            <h2 className="subtitle">
              Find the right{" "}
              <strong>
                <TextLoop
                  interval={2000}
                  springConfig={{ stiffness: 180, damping: 8 }}
                  adjustingSpeed={500}
                >
                  <span>place</span>
                  <span>room</span>
                  <span>neighbor</span>
                  <span>community</span>
                  <span>apartment</span>
                  <span>house</span>
                  <span>city</span>
                  <span>floor plans</span>
                </TextLoop>{" "}
              </strong>{" "}
              for you, right now.
            </h2>
            <div className="search-place">
              <div className="field has-addons">
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input is-large"
                    type="address"
                    placeholder="City, Neighborhood, ZIP"
                    onKeyUp={this.onSearchValueChange}
                  />
                  <span className="icon is-medium is-left">
                    <i className="fa fa-map-marker fa-sm"></i>
                  </span>
                  <div className="panel">
                    <SuggestionBox
                      data={data}
                      searchTerm={searchValue}
                      redirectSearch={this.redirectSearch}
                    />
                  </div>
                </div>
                <div className="control">
                  <button
                    className="button is-info is-large"
                    onClick={() => this.onSearchSubmit()}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <h1 className="subtitle">
              <strong>Most searched place</strong>
            </h1>
            <div className="columns">
              <div className="column is-one-third">
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={MakatiCard} alt="Placeholder image" />
                    </figure>
                  </div>
                  <div className="card-content">
                    {/* <div className="media">
                                    <div className="media-left">
                                        <figure className="image is-48x48">
                                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
                                        </figure>
                                    </div>
                                    <div className="media-content">
                                        <p className="title is-4">John Smith</p>
                                        <p className="subtitle is-6">@johnsmith</p>
                                    </div>
                                    </div> */}

                    <div className="content">
                      <p className="title is-4 has-text-black">Makati City</p>
                      Financial center of the Philippines
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={MandaluyongCard} alt="Placeholder image" />
                    </figure>
                  </div>
                  <div className="card-content">
                    {/* <div className="media">
                                    <div className="media-left">
                                        <figure className="image is-48x48">
                                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
                                        </figure>
                                    </div>
                                    <div className="media-content">
                                        <p className="title is-4">John Smith</p>
                                        <p className="subtitle is-6">@johnsmith</p>
                                    </div>
                                    </div> */}

                    <div className="content">
                      <p className="title is-4 has-text-black">
                        Mandaluyong City
                      </p>
                      A first className highly urbanized city
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="card bm--card-equal-height">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={QuezonCityCard} alt="Placeholder image" />
                    </figure>
                  </div>
                  <div className="card-content">
                    {/* <div className="media">
                                    <div className="media-left">
                                        <figure className="image is-48x48">
                                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
                                        </figure>
                                    </div>
                                    <div className="media-content">
                                        <p className="title is-4">John Smith</p>
                                        <p className="subtitle is-6">@johnsmith</p>
                                    </div>
                                    </div> */}

                    <div className="content">
                      <p className="title is-4 has-text-black">Quezon City</p>
                      Home to major educational institutions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default IndexComponent;
