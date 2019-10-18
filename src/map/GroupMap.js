import React from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from './Marker.js'

const markerList = [
  {
    text: 'Test Marker',
    lat: 42.325,
    lng: -71.05
  },
  {
    text: 'Test Marker 2',
    lat: 42.38,
    lng: -71.06
  }
]

const GroupMap = (props) => (
  <GoogleMapReact
    // bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
    defaultCenter={props.defaultCenter}
    defaultZoom={props.defaultZoom}
  >
    {markerList.map(o => <Marker key={o.text} text={o.text} lat={o.lat} lng={o.lng}/>)}
  </GoogleMapReact>
)

export default GroupMap
