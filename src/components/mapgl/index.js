import React from 'react';
import ReactMapGL, { Marker, Popup }  from 'react-map-gl';



const featureCollection = {
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [
					120.973800,
					14.599920
				]
			},
			"properties": {
				"title": "WANTED BEDSPACER CALAMBA, LAGUNA",
				"description": "NEWLY REFURNISED ROOM AVAILABLE FOR RENT",
				"listID": "039e8dhf8w749f0"
			}
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [
					120.9822006,
					14.6042004
				]
			},
			"properties": {
				"title": "Somewhere out there 2 ",
				"description": "a place somewhere out there 2",
				"listID": "18"
			}
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [
					120.9678802,
					14.6495304
				]
			},
			"properties": {
				"title": "Somewhere out there 3",
				"description": "a place somewhere out there 3",
				"listID": "19"
			}
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [
					124.4397202,
					7.2041702
				]
			},
			"properties": {
				"title": "Somewhere out there 4",
				"description": "a place somewhere out there 4",
				"listID": "20"
			}
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [
					123.8907089,
					10.31672
				]
			},
			"properties": {
				"title": "Somewhere out there 5",
				"description": "a place somewhere out there 5",
				"listID": "21"
			}
		}
	]
}

class MapGLRenderer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            viewport:{
                latitude: 12.8797207,
                longitude: 121.7740173,
                width: "100vw",
                height: "100%",
                zoom: 10,
                center: [121.7740173, 12.8797207]

              },
              token: 'pk.eyJ1IjoiYmVyYmVyb2thIiwiYSI6ImNrMG90cnpzNTA5YzUzbmtyMjFlano1ZDYifQ.pBd7NWQF3lCnVQWH8xeliQ'
        }
    }
    
    componentDidMount(){

    }

    setSelectedPark(park){
        console.log(park);
    }

    render(){
        const { viewport, token } = this.state;
        return(
            <ReactMapGL
                    {...viewport}
                    mapboxApiAccessToken={token}
                    mapStyle="mapbox://styles/berberoka/ck0p00jjm1vfl1co2kyhqfrik"
                    onViewportChange={(viewport) => this.setState({viewport})}
                >
                    {featureCollection.features.map(park => (
                    <Marker
                        key={park.properties.listID}
                        latitude={park.geometry.coordinates[1]}
                        longitude={park.geometry.coordinates[0]}
                    >
                        <button
                        className="marker"
                        onClick={e => {
                            e.preventDefault();
                            this.setSelectedPark(park);
                        }}
                        >
                        </button>
                    </Marker>
                    ))}
            </ReactMapGL>
        )
    }
}


export default MapGLRenderer;