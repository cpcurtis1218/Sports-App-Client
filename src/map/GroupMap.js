import React from 'react'
import GoogleMapReact from 'google-map-react'

const GroupMap = (props, markers) => (
  <GoogleMapReact
    // bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
    defaultCenter={props.defaultCenter}
    defaultZoom={props.defaultZoom}
  >
  </GoogleMapReact>
)

export default GroupMap
