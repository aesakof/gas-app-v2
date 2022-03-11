import { React, useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import axiosInstance from '../axios';
import { Context } from "../Context";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Moment from 'moment';



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom: '10px'
    },
    chart: {
        paddingBottom: '30px',
        paddingLeft: '20px'
    },
    chartName: {
        padding: '10px',
        textAlign: 'center',
    },
    tab: {
        border: '10px'
    }
  }));

export default function ProfileStats(props) {
    const classes = useStyles();
    const [fillups, setFillups] = useState([]);

    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        axiosInstance.get('/cars/?user__user_name=' + props.user).then((res) => {
            res.data.map( (car) => {
                axiosInstance.get('/fillups/?user__user_name=' + props.user + '&car=' + car.id).then((res2) => {
                    res2.data.forEach((row) => {
                        row["ts"] = Moment(row.date, "YYYY-MM-DD").valueOf();
                    });
                    console.log(res2.data)
                    setFillups(fillups => [...fillups, res2.data])
                })
            })
        });
    }, [])

    // useEffect(() => {
    //     axiosInstance.get('/fillups/?user__user_name=' + props.user).then((res) => {
    //         res.data.forEach((row) => {
    //             row["ts"] = Moment(row.date, "YYYY-MM-DD").valueOf();
    //         });
    //         console.log(res.data)
    //         setFillups(res.data)
    //     });
    // }, [])

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="desc">{Moment(label).format("YYYY-MM-DD")}</p>
                    <p className="label">{`mpg : ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };

    const CustomTab = withStyles({
        root: {
          backgroundColor: 'orange',
        },
        selected: {
          backgroundColor: 'purple',
        },
      })(Tab);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant="fullWidth">
                    {
                        fillups.map( (car_data, index) => (
                            <CustomTab className={classes.tab} label={car_data[0]["car_name"]} {...a11yProps(index)} />
                        ))
                    }
                </Tabs>
            </AppBar>
            {
                fillups.map( (car_data, index) => (
                    <TabPanel value={value} index={index}>
                        <Paper elevation={2} className={classes.chart}>
                            <h3 className={classes.chartName}>Mileage Over Time</h3>
                            <ResponsiveContainer width='90%' height={400}>
                                <LineChart data={car_data} margin={{ top: 5, right: 60, bottom: 5, left: 5 }}>
                                    <Line type="monotone" dataKey="mpg" stroke="#8884d8" />
                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                    <XAxis 
                                        label={{ value: "Fillup Date", position: "insideBottom", offset: 0 }}
                                        dataKey="ts" 
                                        tickFormatter={(unixTimestamp) => Moment(unixTimestamp).format("YYYY-MM-DD")} 
                                        domain={['auto', 'auto']} 
                                        scale="time"
                                        angle={45}
                                        height={100}
                                        textAnchor="start"
                                        width={10}
                                    />    
                                    <YAxis 
                                        label={{ value: "MPG", angle: -90, position: "insideLeft" }}
                                    />
                                    <Tooltip 
                                        content={<CustomTooltip />}
                                        wrapperStyle={{ backgroundColor: "white", borderStyle: "ridge", paddingLeft: "10px", paddingRight: "10px" }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Paper>

                        <br></br>

                        <Paper elevation={2} className={classes.chart}>
                            <h3 className={classes.chartName}>Price/Gallon Over Time</h3>
                            <ResponsiveContainer width='90%' height={400}>
                                <LineChart data={car_data} margin={{ top: 5, right: 60, bottom: 5, left: 5 }}>
                                    <Line type="monotone" dataKey="price_per_gallon" stroke="#8884d8" />
                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                    <XAxis 
                                        label={{ value: "Fillup Date", position: "insideBottom", offset: 0 }}
                                        dataKey="ts" 
                                        tickFormatter={(unixTimestamp) => Moment(unixTimestamp).format("YYYY-MM-DD")} 
                                        domain={['auto', 'auto']} 
                                        scale="time"
                                        angle={45}
                                        height={100}
                                        textAnchor="start"
                                        width={10}
                                    />    
                                    <YAxis 
                                        label={{ value: "Price/Gallon", angle: -90, position: "insideLeft" }}
                                    />
                                    <Tooltip 
                                        content={<CustomTooltip />}
                                        wrapperStyle={{ backgroundColor: "white", borderStyle: "ridge", paddingLeft: "10px", paddingRight: "10px" }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Paper>
                    </TabPanel>
                ))
            }
        </div>
    )
}