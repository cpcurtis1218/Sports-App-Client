import React from 'react'
import GoogleMapReact from 'google-map-react'

const Explore = ({ user }) => (
  <div style={{ 'height': '500px', 'width': '500px', 'margin-left': '200px' }}>
    <GoogleMapReact
      defaultCenter={{ lat: 42.3512354, lng: -71.0584297 }}
      defaultZoom={12}
    >
    </GoogleMapReact>
  </div>
)

export default Explore
