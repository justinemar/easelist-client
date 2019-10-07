"use strict";
import { AuthServiceContext } from "../../../utils/index";
import React, { useContext, useEffect, useState } from "react";
const Properties = props => {
  const [properties, updateProperties] = useState();
  const authContext = useContext(AuthServiceContext);
  const { fetch } = authContext;
  useEffect(() => {
    fetch("https://backend-easelist.herokuapp.com/api/properties", {
      method: "GET"
    }).then(res => {
      updateProperties(res.properties);
    });
  });

  return (
    <>
      <section className="container">
        <div class="columns is-multiline has-text-black">
          <div class="column is-full">
            <h3 class="title is-3 has-text-black">Manage Properties</h3>
            <p class="subtitle is-5 has-text-black">
              You can see all your existing properties here.
            </p>
          </div>
          <div class="column is-full">
            <div class="property-card ">
              <div class="property-image-wrapper">
                <div
                  class="property-image"
                  style={{
                    backgroundImage: `url(https://www.lamudi.com.ph/static/media/bm9uZS9ub25l/2x2x2x380x244/acf06097e27f7f.jpg)`
                  }}
                ></div>
              </div>
              <div class="property-details-wrapper has-text-black is-size-7">
                <h1 class="is-size-6">
                  HOUSE FOR RENT AT CALAMBA LAGUNA [MALES ONLY]
                </h1>
                <p class="is-size-5">
                  <strong>₱2500</strong>
                </p>
                <p class="is-size-6" style={{ fontWeight: "bold" }}>
                  AFFORDABLE HOUSE FOR RENT CALAMBA LAGUNA
                </p>
                <div class="property-control buttons">
                  <a class="button is-primary">Edit</a>
                  <a class="button is-primary">Delete</a>
                  <a class="button is-primary">Advertise</a>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-full">Auto</div>
        </div>
      </section>
    </>
  );
};

export default Properties;
