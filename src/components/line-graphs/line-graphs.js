import React, { useState, useEffect } from 'react';
import { Line, Bar, Chart } from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import moment from 'moment';
import { Typography,CardContent, Grid } from '@material-ui/core';
import "react-datepicker/dist/react-datepicker.css";
import styles from './line-graphs.module.css';

const LineGraph = (props) => {
    const [startDate, setStartDate] = useState(new Date('2020-06-23T13:00'));

    let dataSet = [];
    let endDate = moment(startDate).add(1, 'hours');
    for (let i = 0; i < props.dataSet.length; i++) {
        if (moment(props.dataSet[i].timeStamp).isBetween(startDate, endDate)) {
            dataSet.push(props.dataSet[i]);
        }
    }

    const assembleData = (date) => {
        setStartDate(date);
    }

    useEffect(() => {
        Chart.pluginService.register({
            afterDraw: function (chart, easing) {
                if (chart.tooltip._active && chart.tooltip._active.length) {
                    const activePoint = chart.controller.tooltip._active[0];
                    const ctx = chart.ctx;
                    const x = activePoint.tooltipPosition().x;
                    const topY = chart.legend.bottom;
                    const bottomY = chart.chartArea.bottom
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(x, topY);
                    ctx.lineTo(x, bottomY);
                    ctx.lineWidth = 2;
                    ctx.setLineDash([5, 5]);
                    ctx.strokeStyle = "#bfc0c1";
                    ctx.stroke();
                    ctx.restore();
                }
            }
        });
    })

    const options = {
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                gridLines: {
                    display: true
                }
            }]
        }, tooltips: {
            mode: 'x',
            intersect: false
        },
    }

    const legend = {
        display: true,
        fill: true,
        position: "top",
        labels: {
            fontColor: "#323130",
            fontSize: 14
        }
    };

    const lineChart = (
        dataSet.length ?
            (<Line
                options={options}
                legend={legend}
                data={{
                    labels: dataSet.map(({ timeStamp }) => { return moment(timeStamp).format('h:mm:ss a')}),
                    datasets: [{
                        data: dataSet.map(({ valX }) => { return valX; }),
                        label: props.gyroscope[0],
                        borderColor: '#3333ff',
                        backgroundColor: 'white',
                        pointBackgroundColor: '#3333ff',
                        pointRadius: 3,
                        pointHoverRadius: 4,
                        fill: false
                    }, {
                        data: dataSet.map(({ valY }) => { return valY; }),
                        label: props.gyroscope[1],
                        borderColor: 'red',
                        backgroundColor: 'white',
                        fill: false,
                        pointBackgroundColor: 'red',
                        pointRadius: 3,
                        pointHoverRadius: 4,
                    },
                    {
                        data: dataSet.map(({ valZ }) => { return valZ; }),
                        label: props.gyroscope[2],
                        borderColor: 'green',
                        backgroundColor: 'white',
                        fill: false,
                        pointBackgroundColor: 'green',
                        pointRadius: 3,
                        pointHoverRadius: 4,
                    }
                    ]
                }}
            ></Line>)
            : (<div>Sorry, No Data Available between {moment(startDate).format('MMM D, h:mm:ss a')} to {moment(endDate).format('MMM D, h:mm:ss a')}.  
                Kindly Select Another Date</div>)
    )


    return (
        <div>
            <Grid xs={12} md={5} container justify="center" className={styles.Content} item  style={{ margin: '3%' }}>
                <CardContent>
                    <div className={styles.Hide}
                    style={{ display: 'inline', fontSize: '1.1rem'}}>
                    Select Date </div>
                    <DatePicker
                        className="form-control"
                        style={{borderTopLeftRadius:'0rem',borderBottomLeftRadius:'0rem'}}
                        selected={startDate}
                        onChange={date => assembleData(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={60}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </CardContent>
            </Grid>
            <Grid container justify="center">

                <div className="LineGraph" style={{ width: '80%' }}>
                    {lineChart}
                    <br></br>
                </div>
            </Grid>
        </div>
    );
}

export default LineGraph;