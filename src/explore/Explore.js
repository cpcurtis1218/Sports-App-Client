import React from 'react'
import GoogleMapReact from 'google-map-react'

const Explore = ({ user }) => (
  <div>
    <div style={{ 'color': 'white', 'width': '500px', 'marginLeft': '250px' }}>
      Welcome to Let&apos;s Go{user ? ', ' + user.email : ''}!
      <br/>
      <br/>
      Find a group nearby and join in the fun, or create you&apos;re own group
      and invite others to join you!
    </div>
    <div style={{ 'height': '500px', 'width': '500px', 'marginLeft': '250px', 'marginTop': '2rem' }}>
      <GoogleMapReact
        // bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={{ lat: 42.3512354, lng: -71.0584297 }}
        defaultZoom={12}
      >
      </GoogleMapReact>
    </div>
  </div>
)

export default Explore
