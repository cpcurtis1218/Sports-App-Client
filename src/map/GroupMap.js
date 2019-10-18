import React from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from './Marker.js'

const GroupMap = (props) => (
  <GoogleMapReact
    // bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
    defaultCenter={props.defaultCenter}
    defaultZoom={props.defaultZoom}
  >
    <Marker
      text='Test Marker'
      lat={42.325}
      lng={-71.05}
    />
  </GoogleMapReact>
)

export default GroupMap
