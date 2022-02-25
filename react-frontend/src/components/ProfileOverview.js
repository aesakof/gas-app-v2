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

import Moment from 'moment';



export default function ProfileOverview(props) {

    const [cars, setCars] = useState(null)
    const [fillups, setFillups] = useState(null)
    const { username } = useContext(Context);

    useEffect(() => {
        // var date = new Date();
        // date.setFullYear(date.getFullYear() - 1);
        const date = Moment().subtract(1, 'years').format('YYYY-MM-DD')
        Promise.all([
            axiosInstance.get('/fillups/?user__user_name=' + props.user + '&date_after=' + date),
            axiosInstance.get('/cars/?status=Active&user__user_name=' + props.user)
        ]).then(function ([res1, res2]) {
            setFillups(res1.data)
            setCars(res2.data);
        });
    }, [props.user]);

	return (
        <>
            {
                fillups === null ?
                <h5>Loading fillups data...</h5> :
                <>
                    <h2>{username}'s Last Year of Fillups/h2>
                    <Fillups fillups={fillups} />
                </>
                
            }
            {
                cars === null ?
                <h5>Loading cars data...</h5> :
                <>
                    <h2>{username}'s Active Cars</h2>
                    <Cars cars={cars} />
                </>
            }
        </>
    )
}