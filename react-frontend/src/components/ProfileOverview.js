import { React, useEffect, useState, useContext } from 'react';
import axiosInstance from '../axios';
import { Context } from "../Context";

import { Link } from "react-router-dom"

import Cars from './Cars';
import Fillups from './Fillups';

import Moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    statsGrid: {
        padding: '20px'
    },
    statBlock: {
        width: '50%',
        float: 'left',
        padding: '20px',
    } ,
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    sectionHeader: {
        paddingTop: '25px',
    }
}));

export default function ProfileOverview(props) {
    const classes = useStyles();
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
            <h2 className={classes.sectionHeader}>Overview Stats</h2>
            <Container component={Paper} className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <div>
                            <p># Cars Owned: </p>
                            <p># Fillups Made: </p>
                            <p>Total Distance Drive: </p>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <p>Total Gallons Filled: </p>
                            <p>Total $ Spent: </p>
                            <p>Average MPG: </p>
                        </div>
                    </Grid>
                </Grid>
            </Container>
            {
                cars === null ?
                <h5>Loading cars data...</h5> :
                <>
                    <h2 className={classes.sectionHeader}>Active Cars</h2>
                    <Cars cars={cars} page='profile' />
                </>
            }
            {
                fillups === null ?
                <h5>Loading fillups data...</h5> :
                <>
                    <h2 className={classes.sectionHeader}>Last Year of Fillups</h2>
                    <Fillups fillups={fillups} page='profile' />
                </>
                
            }
        </>
    )
}