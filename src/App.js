import React from 'react';
import styles from './App.module.css'
// import data from './data/dataset.json';
import LineGraph from './components/line-graphs/line-graphs';
import HeatMap from './components/heat-map/heat-map'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BarChart from './components/bar-chart/bar-chart';
import { fetchData } from './api';
import Loader from './components/loader/loader'

class App extends React.Component {

  state = {
    data: [],
    activeTab: 0
  };

  handleChange = (event, activeTab) => {
    this.setState((state) => ({ activeTab }));
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    console.log('data = ', fetchedData);

    this.setState({ data: fetchedData });
  }

  returnView() {
    let data = this.state.data;
    let gyroData= [],acceData=[],heatMapData=[]
    for(let i=0;i<data.length;i++){
      gyroData.push({timeStamp: data[i].timeStamp,valX: data[i].gyroX,valY: data[i].gyroY,valZ: data[i].gyroZ});
      acceData.push({timeStamp: data[i].timeStamp,valX: data[i].acceX,valY: data[i].acceY,valZ: data[i].acceZ});
      heatMapData.push({lat: data[i].latitude,lng: data[i].longitude})
    }
    let gyroscope = ['gyroX', 'gyroY', 'gyroZ'];

    let accelerometer = ['acceX', 'acceY', 'acceZ'];
    if (this.state.data.length) {
      if (this.state.activeTab === 0) {
        return (
          <LineGraph dataSet={gyroData} gyroscope={gyroscope} ></LineGraph>
        )
      }
      if (this.state.activeTab === 1) {
        return (
          <LineGraph dataSet={acceData} gyroscope={accelerometer} ></LineGraph>
        )
      }
      else if (this.state.activeTab === 2) {
        return (
          <BarChart dataSet={data}></BarChart>
        )
      }
      else if (this.state.activeTab === 3) {
        console.log('heatMap',heatMapData);
        return (
          <HeatMap center={{ lat: 51.775, lng: 0.434 }} zoom={8} positions={heatMapData} />
        )
      }
    }
    else {
      return (
        <Loader message='Loading . . .'></Loader>
      );
    }
  }

  render() {
    const { activeTab } = this.state;
    return (
      <div className={styles.App}>
        <Paper>
          <Tabs
            tabItemContainerStyle={{ width: 225 }}
            className={styles.Tab}
            value={activeTab}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Gyroscope" />
            <Tab label="Accelerometer 1" />
            <Tab label="Accelerometer 2" />
            <Tab label="Heat Map" />
          </Tabs>
        </Paper>
        {this.returnView()}
      </div>
    );
  }
}

export default App;