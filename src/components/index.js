import React, { useState, useEffect } from 'react';

import MakatiCard from '../makati.jpg'
import MandaluyongCard from '../mandaluyong.jpg'
import QuezonCityCard from '../quezoncity.jpg'
import TextLoop from "react-text-loop";
import {Link} from "react-dom";



class IndexComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            searchValue: null,
            data: null,
            showSuggestions: false
        }
    }

    static defaultProperty={
        suggestions: []
      };

    onSearchSubmit = (e) => {
        console.log(`/places?query=${this.state.searchValue}`)
        this.props.history.push(`/places?query=${this.state.searchValue}`);
    }

    componentDidMount(){
        console.log(this.state.data)
    }

    handleFilter(){
        this.setState((prevState, props) => ({
            panelShow: prevState.panelShow ? false : true
          }));
    }

    onSearchValueChange = (e) => {
        this.setState({
            showSuggestions: false,
            searchValue: e.target.value
        })

        
        if(this.state.searchValue !== ''){
            console.log('not empty')

            fetch(`/api/search?query=${this.state.searchValue}`, {
                method: 'POST'
            })
            .then((res) => res.json())
            .then((res) => {
    
               if(this.state.searchValue === ''){
               
                    console.log('what')
                    return;
               }

               this.setState({
                data: [...res],
                })

            });
        }
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
                            <input class="input is-large" type="address" placeholder="City, Neighborhood, ZIP" onChange={this.onSearchValueChange}
                            value={searchValue}/>
                            <span class="icon is-medium is-left">
                                <i class="fa fa-map-marker fa-lg"></i>
                            </span>
                            <div class="panel">
                                {data && data.length && showSuggestions ? (
                                    <>
                                    {data.map((data, i) => (
                                       <a class="panel-block" key={i}>
                                       <span class="panel-icon">
                                           <i class="fa fa-map-marker-alt"></i>
                                       </span>
                                       {data.province}-{data.title}
                                       </a>
                                        ))}
                                </> )
                                 : (
                                    null)}
                        
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