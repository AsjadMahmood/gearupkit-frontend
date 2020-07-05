/* global google */
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const gradient = [
  "rgba(0, 255, 255, 0)",
  "rgba(0, 255, 255, 1)",
  "rgba(0, 191, 255, 1)",
  "rgba(0, 127, 255, 1)",
  "rgba(0, 63, 255, 1)",
  "rgba(0, 0, 255, 1)",
  "rgba(0, 0, 223, 1)",
  "rgba(0, 0, 191, 1)",
  "rgba(0, 0, 159, 1)",
  "rgba(0, 0, 127, 1)",
  "rgba(63, 0, 91, 1)",
  "rgba(127, 0, 63, 1)",
  "rgba(191, 0, 31, 1)",
  "rgba(255, 0, 0, 1)"
];

class HeapMap extends Component {

  state = { heatMapData: {} };

  componentDidMount() {
    console.log(this.props);

    this.setState({
      heatMapData: {
        positions: this.props.positions,
        options: {
          radius: 20,
          opacity: 0.6,
          gradient:gradient
        }
      }
    })
  }

  // onMapClick({ x, y, lat, lng, event }) {
  //   if (this._googleMap !== undefined) {
  //     const point = new google.maps.LatLng(lat, lng)
  //     this._googleMap.heatmap.data.push(point)
  //   }
  // }

  // toggleHeatMap() {
  //   this.setState({
  //     heatmapVisible: !this.state.heatmapVisible
  //   }, () => {
  //     if (this._googleMap !== undefined) {
  //       this._googleMap.heatmap.setMap(this.state.heatmapVisible ?
  //         this._googleMap.map_ : null)
  //     }
  //   })
  // }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA5O1Gc17CcPN1f13YIhTaMJW8jveNZdrE" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          heatmapLibrary={true}
          heatmap={this.state.heatMapData}
        >

        </GoogleMapReact>
      </div>
    );
  }

}

export default HeapMap;