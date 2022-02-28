import React, { useContext, useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';
import { Context } from '../Context';

import { range } from '../helpers';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
        padding: '20px',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function CreateCar() {

    const history = useHistory();
	const initialFormData = {
        car_name: '',
        make: '',
        model: '',
        model_year: new Date().getFullYear(),
        status: 'Active'
	};

	const [formData, updateFormData] = useState(initialFormData);

    const { username } = useContext(Context);

    const model_year_range = range(1990, new Date().getFullYear() + 1);

    useEffect(() => {
        if(!username && !localStorage.getItem('username')) {
            history.push('/login/');
        }
    }, [username, history]);

	const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
	};

    const handleSelectChange = (year) => {
        updateFormData({
            ...formData,
            [year.target.name]: year.target.value
        });
	};

	const handleSubmit = (e) => {
        console.log(formData);
		e.preventDefault();
		axiosInstance
			.post('/cars/', {
                // user: 1,
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
		<Container component={Paper} maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
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
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel>Model Year</InputLabel>
                                <Select
                                    required
                                    onChange={handleSelectChange}
                                    id="model_year"
                                    label="Model Year"
                                    name="model_year"
                                    autoComplete="model_year"
                                    value={formData.model_year}
                                >
                                    {
                                    model_year_range.map((year) => (
                                        <MenuItem value={year}>{year}</MenuItem>
                                    ))
                                    }
                                </Select>
                            </FormControl>
						</Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    required
                                    onChange={handleChange}
                                    id="status"
                                    label="status"
                                    name="status"
                                    autoComplete="status"
                                    value={formData.status}
                                >
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Inactive">Inactive</MenuItem>
                                </Select>
                            </FormControl>
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
						Register Car
					</Button>
				</form>
			</div>
		</Container>
	);
}