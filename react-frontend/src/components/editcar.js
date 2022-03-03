import React, { useEffect, useState, useContext } from 'react';
import axiosInstance from '../axios';
import { useHistory, useParams } from 'react-router-dom';
import { Context } from '../Context';

import { range } from '../helpers';
//MaterialUI
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

export default function EditCar() {

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

    const model_year_range = range(1990, new Date().getFullYear() + 1);

    useEffect(() => {
        axiosInstance.get('/cars/' + id).then((res) => {
            updateFormData({
                ...formData,
                'car_name': res.data.name,
                'make': res.data.make,
                'model': res.data.model,
                'model_year': res.data.model_year,
                'status': res.data.status,
            });
        }); 
    }, []);

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
		e.preventDefault();
		axiosInstance
			.put('/cars/' + id + '/', {
                // username: 1,
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
					Edit Car
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
						Update Car
					</Button>
				</form>
			</div>
		</Container>
	);
}