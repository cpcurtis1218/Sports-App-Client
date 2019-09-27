import React from 'react'
import GoogleMapReact from 'google-map-react'

const Explore = ({ user }) => (
  <div style={{ 'height': '500px', 'width': '500px', 'marginLeft': '250px' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.GOOGLE_MAP_API_KEY }}
      defaultCenter={{ lat: 42.3512354, lng: -71.0584297 }}
      defaultZoom={12}
    >
    </GoogleMapReact>
  </div>
)

export default Explore
