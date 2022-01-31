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

function Fillups() {
    const [fillups, setFillups] = useState(null)
    const classes = useStyles();

    const { username, setUsername } = useContext(Context);

    useEffect(() => {
        axiosInstance.get('/fillups/').then((res) => {
            setFillups(res.data)
        });
    }, [])

    return (
        <>
        {
            fillups === null ?
            <h5>Loading fillups data...</h5> :

            <Container maxWidth="lg" component="main">
                { !username ?
                <></> :
                <Link to={'/fillups/new'}>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                    >
                        Enter New Fillup
                    </Button>
                </Link>}
                <br></br>
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
                                <TableCell>Action</TableCell>
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
                                    <TableCell>{fillup.car_name}</TableCell>
                                    <TableCell>{fillup.total_sale}</TableCell>
                                    <TableCell>{fillup.mpg}</TableCell>
                                    <TableCell>{fillup.username}</TableCell>
                                    <TableCell align="left">
                                        { username !== fillup.username ?
                                        <></> : 
                                        <>
                                            <Link
                                                to={'/fillups/edit/' + fillup.id}
                                                className={classes.link}
                                            >
                                                <EditIcon color="primary"></EditIcon>
                                            </Link>
                                            <Link
                                                to={'/fillups/delete/' + fillup.id}
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

export default Fillups