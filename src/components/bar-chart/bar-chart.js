import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import moment from 'moment';
import styles from './bar-chart.module.css';
import { CardContent, Grid } from '@material-ui/core';
import "react-datepicker/dist/react-datepicker.css";



const BarChart = (props) => {
    const [startDate, setStartDate] = useState(new Date('2020-06-23T13:00'));

    let dataSet = [];
    let endDate = moment(startDate).add(5, 'minutes');
    for (let i = 0; i < props.dataSet.length; i++) {
        if (moment(props.dataSet[i].timeStamp).isBetween(startDate, endDate)) {
            dataSet.push(props.dataSet[i]);
        }
    }


    const assembleData = (date) => {
        setStartDate(date);
        console.log(startDate);
    }

    const BarGraph = (
        dataSet.length ?
            (<Bar
                data={{
                    labels: dataSet.map(({ timeStamp }) => { return moment(timeStamp).format('h:mm:ss a') }),
                    datasets: [
                        {
                            label: 'acceX',
                            backgroundColor: 'rgba(0, 0, 255, 0.5)',
                            borderColor: "rgba(255,99,132,1)",
                            borderWidth: 1,
                            //stack: 1,
                            hoverBackgroundColor: "rgba(0, 0, 255,0.4)",
                            hoverBorderColor: "rgba(255,99,132,1)",
                            data: dataSet.map(({ acceX }) => { return acceX; }),
                        },
                        {
                            label: 'acceY',
                            backgroundColor: 'rgba(0, 255, 0, 0.5)',
                            borderColor: "rgba(255,99,132,1)",
                            borderWidth: 1,
                            //stack: 1,
                            hoverBackgroundColor: "rgba(0, 255, 0,0.4)",
                            hoverBorderColor: "rgba(255,99,132,1)",
                            data: dataSet.map(({ acceY }) => { return acceY; }),
                        },
                        {
                            label: 'acceZ',
                            backgroundColor: 'rgba(255, 0, 0, 0.5)',
                            borderColor: "rgba(255, 0, 0,1)",
                            borderWidth: 1,
                            //stack: 1,
                            hoverBackgroundColor: "rgba(255,0,0,0.4)",
                            hoverBorderColor: "rgba(255,99,132,1)",
                            data: dataSet.map(({ acceZ }) => { return acceZ; }),
                        }
                    ],
                }}
                options={{
                    responsive: true,
                    legend: {
                        display: true
                    },
                    type: "bar"
                }}>

            </Bar>
            ) : (<div>Sorry, No Data Available between {moment(startDate).format('MMM D, h:mm:ss a')} to {moment(endDate).format('MMM D, h:mm:ss a')}.
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
                <div className="BarGraph" style={{ width: '80%' }}>
                    {BarGraph}
                    <br></br>
                </div>
            </Grid>
        </div>
    );
}

export default BarChart;