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

function Cars() {
    const [cars, setCars] = useState(null)
    const classes = useStyles();

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/cars/')
            .then(res => res.json())
            .then(data => {
                console.log(data[0])
                setCars(data)
                
            })
    }, [])

    return (
        <>
        {
            cars === null ?
            <h5>Loading cars data...</h5> :

            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Car Name</TableCell>
                    <TableCell>Make</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell>Model Year</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Username</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {cars.map((car) => (
                    <TableRow key={car.name}>
                    <TableCell component="th" scope="row">
                        {car.name}
                    </TableCell>
                    <TableCell>{car.make}</TableCell>
                    <TableCell>{car.model}</TableCell>
                    <TableCell>{car.model_year}</TableCell>
                    <TableCell>{car.status}</TableCell>
                    <TableCell>{car.username}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        }
        </>
      );
}

export default Cars