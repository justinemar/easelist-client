import React from 'react';
import queryString from 'query-string'
import MapGLRenderer from '../mapgl/index';
const staticData = [{
  "_id":"039e8dhf8w749f0",
  "publisher": "Yll Peng",
  "createdAt": "9/18/2019-3:52PMPHT",
  "title": "WANTED BEDSPACER BINONDO, MANILA",
  "description": "NEWLY REFURNISED ROOM AVAILABLE FOR RENT",
  "type": {
    "variant": "room",
    "size": "844-1221 Sqft"
  },
  "location": {
    "city": "Manila"
  },
  "startingPrice": "$1,280+",
  "variations": [
    {
      "title": "one bed",
      "units": [
        {
          "title": "Unit A2",
          "price": "$1,355+/mo",
          "description": "1 Bed | 1 Bath | 946 Sqft",
          "image": [
            "image1",
            "image2",
            "image3"
          ]
        },
        {
          "title": "Unit C with Den/Dining",
          "price": "$1,370 - $1,395/mo",
          "description": "1 Bed | 1 Bath | 914 Sqft",
          "image": [
            "image1",
            "image2",
            "image3"
          ]
        }
      ]
    },
    {
      "title": "two bed",
      "units": [
        {
          "title": "Unit D",
          "price": "$1,560 - $1,585/mo",
          "description": "2 Beds | 2 Baths 1102 Sqft",
          "image": [
            "image1",
            "image2",
            "image3"
          ]
        },
        {
          "title": "Unit E corner unit",
          "price": "$1,625 - $1,650/mo",
          "description": "2 Beds | 2 Baths 1221 Sqft",
          "image": [
            "image1",
            "image2",
            "image3"
          ]
        }
      ]
    }
  ],
  "amenities": [
    {
      "title": "Perks",
      "listItem": [
        "Cable Ready",
        "Extra Storage",
        "High Speed Internet Access",
        "New/Renovated Interior"
      ]
    }
  ],
  "geometry": []
}]


  function ResultCard(){
    return (
      <div class="columns is-gapless media-left is-marginless">
          <div class="column">
            <div class="card media">
              <div class="card-image property-image" style={{width: '1200px'}}>
                <div class="image is-4by3">
                  <img src="https://www.lamudi.com.ph/static/media/bm9uZS9ub25l/2x2x2x380x244/acf06097e27f7f.jpg" alt="Placeholder image"/>
                </div>
                <footer class="card-footer">
              <a href="#" class="button is-info is-outlined card-footer-item">Save</a>
              <a href="#" class="button is-info is-outlined card-footer-item">Contact</a>
              </footer>
              </div>
              <div class="media-conent card-content">
              <header class="card-header">
                  <p class="card-header-title">
                  STUDIO TYPE APARTMENT
                  </p>
                  <a href="#" class="card-header-icon" aria-label="more options">
                    <span class="icon">
                      <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </a>
              </header>
              <strong>
              <p class="is-size-6">₱ 6,000,000</p>
                </strong>
                  <div class="content is-size-6">
                    Breathe comfort & tranquility into your life at Southwind, a refreshing community nestled in the heights of San Pedro, Laguna. With modern Asian-inspired homes and inspiring views of Laguna de Bay, Southwind is a relaxing haven with a vacation ambiance.
                    <br/>
                    <strong>
                    <p class="is-size-6">Makati Avenue, 1002 Street Global Park</p>
                    <p class="is-size-6">2 Baths</p>
                      </strong>
                  </div>
              </div>
            </div>
            </div>
      </div>
    )
  }

  class SearchResult extends React.Component{
      constructor(props){
          super(props);
          const values = queryString.parse(props.location.search);

          this.state = {
              queryResult: null,
              inputs: {
                query: values.query,
                refinements: ['APARTMENT', 'CONDOS', 'TOWNHOUSE', 'HOUSES'],
                priceRange: null
              }
          }
      }

      componentDidMount(){
        console.log(this.props.location.search);

        this.setState({
          queryResult:staticData
        })
      }

      render(){
          const { query, queryResult } = this.state.inputs;
          return (
            <div class="section is-paddingless">
        <div class="columns">
        { queryResult !== null ? 
              <div class="column properties">
                <div class="filter-control">
                <div class="field has-addons">
                  <p class="control has-icons-left">
                    <input class="input is-info is-rounded" type="text" placeholder="place, zip, neighborhood" value={query}/>
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
                    <a class="button is-primary">
                      More filters
                    </a>
                  </p>
              </div>
              <div class="field">
                <div class="control">
                  <input class="is-checkradio" id="exampleRadioInline1" type="radio" name="exampleRadioInline" checked="checked"/>
                  <label for="exampleRadioInline1">Rent</label>
                  <input class="is-checkradio" id="exampleRadioInline2" type="radio" name="exampleRadioInline"/>
                  <label for="exampleRadioInline2">Buy</label>
                </div>
              </div>
              <div class="field has-addons">
                <div class="control result-count">
                <p class="subtitle is-5 has-text-dark	">
                    <strong class="has-text-black">5</strong> Properties found
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
              <ResultCard/>
              <ResultCard/>
              <ResultCard/>
              <ResultCard/>
              </div> 

              : <h1>Loading </h1>}
              <div class="column map-column">
              <MapGLRenderer/>
              </div>
          </div>
        </div>
          )
      }
  }


  export default SearchResult;