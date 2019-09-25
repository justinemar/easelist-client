import React, { createContext, createRef } from 'react';

const PropertyContext = createContext({
    selectedProperty: null,
    queryResult: null,
    refs: null,
    setSelectedProperty: () => {},
    setScrollToView: () => {}
})


export class PropertyProvider extends React.Component {
    updateSelectedProperty = (property, propID) => {
        this.setState({
            selectedProperty: property
        })

    }

    handleScrollToView = (propID) => {
        const { refs } = this.state;
        console.log(propID)
        refs[propID].current.scrollIntoView({
            behaviour: 'smooth',
            block: 'start'
        })
    }
    
    componentWillMount(){
        this.getRelatedResults()
    }

    getRelatedResults = () => {
              const param = this.props.match.params.searchParam;
        fetch(`/api/search?query=${param}`, {
          method: 'POST'
        })
        .then((res) => res.json())
        .then(parsed => {
                const refs = parsed.reduce((acc, value) => {
                    acc[value.feature._id] = createRef();
                    return acc;
                }, {});

                this.setState({
                    queryResult:{
                        features: parsed
                    },
                    refs: refs
                })
            })
      }

    state = {
        selectedProperty: [],
        queryResult: {
            features: []
        },
        refs: [],
        setSelectedProperty: this.updateSelectedProperty,
        setScrollToView: this.handleScrollToView
    }


    render(){
        return(
            <PropertyContext.Provider value={this.state}>
                {this.props.children}
            </PropertyContext.Provider>
        )
    }
}   

export const PropertyConsumer = PropertyContext.Consumer;