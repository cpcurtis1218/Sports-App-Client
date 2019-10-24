import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

class MapContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      center: {
        lat: 42.3512354,
        lng: -71.0584297
      }
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.center !== this.props.center) {
      this.setState({
        center: this.props.center
      })
    }
  }

  onMarkerDragEnd = (coordinates) => {
    const { latLng } = coordinates
    const lat = latLng.lat()
    const lng = latLng.lng()

    const center = {
      lat: lat,
      lng: lng
    }

    this.setState({
      center: center
    })
  }

  render () {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={this.props.style}
        initialCenter={{
          lat: 42.3512354,
          lng: -71.0584297
        }}
        center={this.state.center}
      >
        <Marker
          name={'Current Location'}
          position={this.state.center}
          draggable
          onDragend={(t, map, coordinates) => this.onMarkerDragEnd(coordinates)}
        />
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
})(MapContainer)
