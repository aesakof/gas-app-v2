import { React, useEffect, useState, useContext } from 'react';
import axiosInstance from '../axios';
import { Context } from "../Context";

import Cars from './Cars';
import Fillups from './Fillups';

import Moment from 'moment';

import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';


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
            <h2>Overview Stats</h2>
            <Container maxWidth="md" component={Paper}>
                <h2>Overview Stats</h2>
                <p># Cars Owned: </p>
                <p># Fillups Made: </p>
                <p>Total Distance Drive: </p>
                <p>Total Gallons Filled: </p>
                <p>Total $ Spent: </p>
                <p>Average MPG: </p>
            </Container>
            {
                cars === null ?
                <h5>Loading cars data...</h5> :
                <>
                    <h2>{username}'s Active Cars</h2>
                    <Cars cars={cars} page='profile' />
                </>
            }
            {
                fillups === null ?
                <h5>Loading fillups data...</h5> :
                <>
                    <h2>{username}'s Last Year of Fillups</h2>
                    <Fillups fillups={fillups} page='profile' />
                </>
                
            }
        </>
    )
}