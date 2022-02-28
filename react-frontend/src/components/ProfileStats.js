import { React, useEffect, useState, useContext } from 'react';
import axiosInstance from '../axios';
import { Context } from "../Context";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    // root: {
    //   display: 'flex',
    //   flexWrap: 'wrap',
    //   '& > *': {
    //     margin: theme.spacing(1),
    //     width: theme.spacing(16),
    //     height: theme.spacing(16),
    //   },
    // },
    chartName: {
        padding: '10px',
        textAlign: 'center',
    }
  }));

export default function ProfileStats(props) {
    const classes = useStyles();
    const [fillups, setFillups] = useState(null)

    useEffect(() => {
        axiosInstance.get('/fillups/?user__user_name=' + props.user).then((res) => {
            setFillups(res.data)
        });
    }, [])


    return (
        <div className={classes.root}>
            {
                fillups === null ?
                <h5>Stats Page is Rendering</h5> :
                <>
                    <Paper elevation={2}>
                        <h3 className={classes.chartName}>Mileage Over Time</h3>
                        <ResponsiveContainer width='80%' height={300}>
                            <LineChart data={fillups} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="mpg" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>


                    <br></br>
                    <Paper elevation={2}>
                        <h3 className={classes.chartName}>Price/Gallon Over Time</h3>
                        <ResponsiveContainer width='80%' height={300}>
                            <LineChart data={fillups} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="price_per_gallon" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>

                </>

            }
        </div>
    )
}