import React, { useState, useEffect } from 'react';

import MakatiCard from '../makati.jpg'
import MandaluyongCard from '../mandaluyong.jpg'
import QuezonCityCard from '../quezoncity.jpg'
import TextLoop from "react-text-loop";
import {Link} from "react-dom";



function SuggestionBox({data, searchTerm, redirectSearch}){
    
    return (
        <>
            {data && data.length ? (
                <>
                    <a class="panel-block" onClick={() => redirectSearch()}>
                        Suggested province {data[0].province}
                    </a>
                {data.map((source, i) => (
                      <a class="panel-block" key={i} onClick={() => redirectSearch(source, source.city)}>
                        <span class="panel-icon">
                            <i class="fa fa-map-marker"></i>
                        </span>
                        {source.address.toUpperCase()}
                      </a>
                    )   
                )}
                </>
            ) : <>
                <a class="panel-block">
                    <span class="panel-icon">
                        <i class="fa fa-cross"></i>
                    </span>
                    Find your place now
                </a>
            </>}
        </>
    )
}
class IndexComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            searchValue: null,
            data: [],
            showSuggestions: false,
  
        }
    }

    onSearchSubmit = (e) => {
        // console.log(`/places?query=${this.state.searchValue}`)
        // this.props.history.push(`/places?query=${this.state.searchValue}`);
    }

    componentDidMount(){
        console.log(this.state.data)
    }

    redirectSearch = (selectedData, searchParam) => {
        const { history } = this.props;
        const { data } = this.state;
        history.push({
            pathname: `/${data[0].province}/${searchParam}`,
            selectedData
         })
    }

  
    onSearchValueChange = (e) => {
        this.setState({
            searchValue: e.target.value
        })
        if(e.target.value.length <= 2 && e.key === 'Backspace') {
            this.setState({
                data: []
            })
            return;
        }

        if(e.target.value.length <= 2) return;

        fetch(`/api/search?query=${e.target.value}`, {
            method: 'POST'
        })
        .then((res) => {
            res.json().then(parsed => this.setState({data: [...parsed]}))
        })
    }

    render(){
    const { data, searchValue, showSuggestions } = this.state;
    return (
        
        <React.Fragment>
            <section class="section">
                <div class="container search-container">
                    <h1 class="title">Settle with ease</h1>
                    <h2 class="subtitle">
                        Find the right <strong>   
                            <TextLoop interval={2000} springConfig={{ stiffness: 180, damping: 8 }}
              adjustingSpeed={500}>
                                <span>place</span>
                                <span>room</span>
                                <span>neighbor</span>
                                <span>community</span>
                                <span>apartment</span>
                                <span>house</span>
                                <span>city</span>
                                <span>floor plans</span>
 
                            </TextLoop>{" "}</strong> for you, right now.
                    </h2>
                    <div class="search-place">
                    <div class="field has-addons">
                        <div class="control has-icons-left has-icons-right">
                            <input class="input is-large" type="address" placeholder="City, Neighborhood, ZIP" onKeyUp={this.onSearchValueChange}/>
                            <span class="icon is-medium is-left">
                                <i class="fa fa-map-marker fa-lg"></i>
                            </span>
                            <div class="panel">
                            <SuggestionBox 
                                data={data} 
                                searchTerm={searchValue} 
                                redirectSearch={this.redirectSearch}
                            />
                            </div>
                        </div>
                        <div class="control">
                            <button class="button is-info is-large" onClick={() => this.onSearchSubmit()}>
                            Search
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="container">
                <h1 class="subtitle"><strong>Most searched place</strong></h1>
                    <div class="columns">
                        <div class="column is-one-third">
                            <div class="card">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                    <img src={MakatiCard} alt="Placeholder image"/>
                                    </figure>
                                </div>
                                <div class="card-content">
                                    {/* <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-48x48">
                                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-4">John Smith</p>
                                        <p class="subtitle is-6">@johnsmith</p>
                                    </div>
                                    </div> */}

                                    <div class="content">
                                    <p class="title is-4 has-text-black">Makati City</p>
                                    Financial center of the Philippines
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                        <div class="card">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                    <img src={MandaluyongCard} alt="Placeholder image"/>
                                    </figure>
                                </div>
                                <div class="card-content">
                                    {/* <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-48x48">
                                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-4">John Smith</p>
                                        <p class="subtitle is-6">@johnsmith</p>
                                    </div>
                                    </div> */}

                                    <div class="content">
                                    <p class="title is-4 has-text-black">Mandaluyong City</p>
                                    A first class highly urbanized city
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                        <div class="card bm--card-equal-height">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                    <img src={QuezonCityCard} alt="Placeholder image"/>
                                    </figure>
                                </div>
                                <div class="card-content">
                                    {/* <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-48x48">
                                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-4">John Smith</p>
                                        <p class="subtitle is-6">@johnsmith</p>
                                    </div>
                                    </div> */}

                                    <div class="content">
                                    <p class="title is-4 has-text-black">Quezon City</p>
                                   Home to major educational institutions
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </React.Fragment>
    )
                                }
}

export default IndexComponent;