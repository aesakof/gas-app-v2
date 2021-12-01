import React, { useState, useEffect } from "react"
// import { Link } from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	postTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
    button: {
        marginTop: '25px',
        marginBottom: '25px',
    }
}));

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

            <Container maxWidth="md" component="main">
                <Button
                    href={'/cars/register'}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                >
                    Register New Car
                </Button>
                <br></br>
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
                                <TableCell>Action</TableCell>
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
                                    <TableCell align="left">
                                        <Link
                                            color="textPrimary"
                                            href={'/cars/edit/' + car.id}
                                            className={classes.link}
                                        >
                                            <EditIcon></EditIcon>
                                        </Link>
                                        <Link
                                            color="textPrimary"
                                            href={'/cars/delete/' + car.id}
                                            className={classes.link}
                                        >
                                            <DeleteForeverIcon></DeleteForeverIcon>
                                        </Link>
									</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            
        }
        </>
      );
}

export default Cars