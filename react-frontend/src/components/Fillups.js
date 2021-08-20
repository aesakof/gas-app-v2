import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

function Fillups() {
    const [fillups, setFillups] = useState(null)
    const classes = useStyles();

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/fillups/')
            .then(res => res.json())
            .then(data => {
                console.log(data[0])
                setFillups(data)
                
            })
    }, [])

    return (
        <>
        {
            fillups === null ?
            <h5>Loading fillups data...</h5> :

            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Price Per Gallon</TableCell>
                    <TableCell>Trip Distance</TableCell>
                    <TableCell>Gallons</TableCell>
                    <TableCell>Car</TableCell>
                    <TableCell>Total Sale</TableCell>
                    <TableCell>MPG</TableCell>
                    <TableCell>Username</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {fillups.map((fillup) => (
                    <TableRow key={fillup.date}>
                    <TableCell component="th" scope="row">
                        {fillup.date}
                    </TableCell>
                    <TableCell>{fillup.price_per_gallon}</TableCell>
                    <TableCell>{fillup.trip_distance}</TableCell>
                    <TableCell>{fillup.gallons}</TableCell>
                    <TableCell>{fillup.car}</TableCell>
                    <TableCell>{fillup.total_sale}</TableCell>
                    <TableCell>{fillup.mpg}</TableCell>
                    <TableCell>{fillup.username}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        }
        </>
      );
}

export default Fillups