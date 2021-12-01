import React, { useEffect, useState } from 'react';
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

export default function EditFillup() {

    const history = useHistory();
    const { id } = useParams();
	const initialFormData = Object.freeze({
        car_name: '',
        make: '',
        model: '',
        model_year: '',
        status: ''
	});

	const [formData, updateFormData] = useState(initialFormData);

    useEffect(() => {
        axiosInstance.get('/cars/edit/cardetail/' + id).then((res) => {
            updateFormData({
                ...formData,
                ['car_name']: res.data.name,
                ['make']: res.data.make,
                ['model']: res.data.model,
                ['model_year']: res.data.model_year,
                ['status']: res.data.status,
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
		e.preventDefault();
		axiosInstance
			.put('/cars/edit/' + id + '/', {
                username: 1,
                name: formData.car_name,
                make: formData.make,
                model: formData.model,
                model_year: parseInt(formData.model_year),
                status: formData.status
			})
			.then((res) => {
				history.push('/cars/');
			});
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Register New Car
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="car_name"
								label="Car Name"
								name="car_name"
								autoComplete="car_name"
                                value={formData.car_name}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="make"
								label="Make"
								name="make"
								autoComplete="make"
                                value={formData.make}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="model"
								label="Model"
								name="model"
								autoComplete="model"
                                value={formData.model}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="model_year"
								label="Model Year"
								name="model_year"
								autoComplete="model_year"
                                value={formData.model_year}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="status"
								label="Status"
								name="status"
								autoComplete="status"
                                value={formData.status}
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
						Update Car
					</Button>
				</form>
			</div>
		</Container>
	);
}