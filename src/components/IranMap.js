import React from 'react';

import './IranMap.css';

import CityModal from './CityModal';

import axios from 'axios'

class IranMap extends React.Component {

    state = {
        citiesData: null,
        selectedCity: null,
        isModalOpen: false,
    };

    async componentDidMount() {
        const {data: citiesData} = await axios.get("http://localhost:9000/cities")
        this.setState({citiesData})
    }


    cityClicked =  (id) => async (event) => {
        event.preventDefault();
        // Fetch city details and open modal
        const {data: selectedCity} = await axios.get(`http://localhost:9000/cities/${id}`)
        this.setState({selectedCity, isModalOpen: true})
    };

    closeModal = () => {
        this.setState({
            isModalOpen: false,
        });
    };

    render() {
        return (
            <div>
                <div className="map-container">
                    {(this.state.citiesData || []).map((record) => (
                        <div
                            key={record.id}
                            className="city-name"
                            style={{
                                top: `${record.top}%`,
                                left: `${record.left}%`,
                            }}
                            onClick={this.cityClicked(record.id)}
                        >
                            {record.name}
                        </div>
                    ))}
                </div>
                <CityModal
                    city={this.state.selectedCity}
                    isOpen={this.state.isModalOpen}
                    onClose={this.closeModal}
                />
            </div>
        );
    }
}

export default IranMap;
