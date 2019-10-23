import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'

const mapStyles = {
  width: '500px',
  height: '500px'
}

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

  render () {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: 42.3512354,
          lng: -71.0584297
        }}
        center={this.state.center}
      />
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
})(MapContainer)
