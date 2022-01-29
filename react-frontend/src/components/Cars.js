import React, { useState, useEffect, useContext } from "react"
import axiosInstance from '../axios';
import { Context } from "../Context";
import { Link } from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Container from '@material-ui/core/Container';
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

    const { username, setUsername } = useContext(Context);

    useEffect(() => {
        axiosInstance.get('/cars/').then((res) => {
            console.log(res.data)
            setCars(res.data)
        });
    }, [])

    return (
        <>
        {
            cars === null ?
            <h5>Loading cars data...</h5> :

            <Container maxWidth="xl" component="main">
                <Link to={'/cars/register'}>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                    >
                        Register New Car
                    </Button>
                </Link>

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
                                <TableCell>Distance Driven</TableCell>
                                <TableCell>First Fillup</TableCell>
                                <TableCell>Last Fillup</TableCell>
                                <TableCell>Number of Fillups</TableCell>
                                <TableCell>Gallons Filled</TableCell>
                                <TableCell>Average MPG</TableCell>
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
                                    <TableCell>{car.total_distance}</TableCell>
                                    <TableCell>{car.first_fillup}</TableCell>
                                    <TableCell>{car.last_fillup}</TableCell>
                                    <TableCell>{car.num_fillups}</TableCell>
                                    <TableCell>{car.gallons_filled}</TableCell>
                                    <TableCell>{car.avg_mpg}</TableCell>
                                    <TableCell align="left">
                                        { username !== car.username ?
                                        <></> : 
                                        <>
                                            <Link
                                                to={'/cars/edit/' + car.id}
                                                className={classes.link}
                                            >
                                                <EditIcon color="primary"></EditIcon>
                                            </Link>
                                            <Link
                                                to={'/cars/delete/' + car.id}
                                                className={classes.link}
                                            >
                                                <DeleteForeverIcon color="primary"></DeleteForeverIcon>
                                            </Link>
                                        </>}
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