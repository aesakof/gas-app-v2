import { React, useEffect, useState, useContext } from 'react';
import { useParams, useRouteMatch, Link, Route, Switch } from 'react-router-dom';
import axiosInstance from '../axios';
import { Context } from "../Context";

import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Cars from './Cars';
import Fillups from './Fillups';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Profile() {

    const { user } = useParams();
    let { path, url } = useRouteMatch();

    const [cars, setCars] = useState(null)
    const [fillups, setFillups] = useState(null)
    const { username } = useContext(Context);

    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        Promise.all([
            axiosInstance.get('/fillups/?user__user_name=' + user),
            axiosInstance.get('/cars/?status=Active&user__user_name=' + user)
        ]).then(function ([res1, res2]) {
            console.log(res2.data);
            setFillups(res1.data)
            setCars(res2.data);
        });
    }, [user]);

	return (
        <>
            <h1>{user}'s Profile</h1>
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant="fullWidth">
                        <Tab label="Overview" component={Link} to={`${url}`} {...a11yProps(0)} />
                        <Tab label="Stats" component={Link} to={`${url}/stats`} {...a11yProps(1)} />
                        <Tab label="Fillups" component={Link} to={`${url}/fillups`} {...a11yProps(2)} />
                        <Tab label="Cars" component={Link} to={`${url}/cars`} {...a11yProps(3)} />
                    </Tabs>
                </AppBar>

                <Switch>
                    <Route exact path={`${path}`}>
                        <h3>Profile dude's overview, man</h3>
                    </Route>
                    <Route exact path={`${path}/stats`}>
                        <h3>Profile dude's stats, man</h3>
                    </Route>
                    <Route exact path={`${path}/fillups`}>
                        {
                        fillups === null ?
                        <h5>Loading fillups data...</h5> :
                        <Fillups fillups={fillups} />
                        }
                    </Route>
                    <Route exact path={`${path}/cars`}>
                        {
                        cars === null ?
                        <h5>Loading cars data...</h5> :
                        <>
                            <h2>{username}'s Active Cars</h2>
                            <Cars cars={cars} />
                        </>
                        }
                    </Route>
                </Switch>
            </div>
        </>
    )
}