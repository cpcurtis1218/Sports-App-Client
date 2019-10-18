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
  },
  {
    text: 'Test Marker 3',
    lat: 42.35,
    lng: -71.07
  }
]

const GroupMap = (props) => (
  <GoogleMapReact
    // bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
    defaultCenter={props.defaultCenter}
    defaultZoom={props.defaultZoom}
  >
    {markerList.map((m, i) => <Marker key={i} text={m.text} lat={m.lat} lng={m.lng}/>)}
  </GoogleMapReact>
)

export default GroupMap
