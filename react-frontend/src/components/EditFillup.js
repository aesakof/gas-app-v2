import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useHistory, useParams } from 'react-router-dom';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function CreateFillup() {

    const history = useHistory();
    const { id } = useParams();
	const initialFormData = Object.freeze({
        date: '',
        price_per_gallon: '',
        trip_distance: '',
        gallons: '',
        car: ''
	});

	const [formData, updateFormData] = useState(initialFormData);

    useEffect(() => {
        axiosInstance.get('/fillups/edit/fillupdetail/' + id).then((res) => {
            updateFormData({
                ...formData,
                ['date']: res.data.date,
                ['price_per_gallon']: res.data.price_per_gallon,
                ['trip_distance']: res.data.trip_distance,
                ['gallons']: res.data.gallons,
                ['car']: res.data.car,
            });
            console.log(res.data);
        });
    }, [updateFormData]);

	const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
	};

	const handleSubmit = (e) => {
        console.log(localStorage.getItem('access_token'));
		e.preventDefault();
		axiosInstance
            .put('/fillups/edit/' + id + '/', {
                // username: 1,
                date: formData.date,
                price_per_gallon: parseFloat(formData.price_per_gallon),
                trip_distance: parseFloat(formData.trip_distance),
                gallons: parseFloat(formData.gallons),
                car: 1
			})
			.then((res) => {
				history.push('/fillups/');
			});
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Edit Fillup
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="date"
								label="Date"
								name="date"
								autoComplete="date"
                                value={formData.date}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="price_per_gallon"
								label="Price Per Gallon"
								name="price_per_gallon"
								autoComplete="price_per_gallon"
                                value={formData.price_per_gallon}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="trip_distance"
								label="Trip Distance"
								name="trip_distance"
								autoComplete="trip_distance"
                                value={formData.trip_distance}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="gallons"
								label="Gallons"
								name="gallons"
								autoComplete="gallons"
                                value={formData.gallons}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="car"
								label="Car"
								name="car"
								autoComplete="car"
                                value={formData.car}
								onChange={handleChange}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Submit Fillup
					</Button>
				</form>
			</div>
		</Container>
	);
}