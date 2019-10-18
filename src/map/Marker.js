import React from 'react'
import { markerStyle } from './markerStyle.js'

const Marker = (props) => (
  <div style={markerStyle}>{props.text}</div>
)

export default Marker
