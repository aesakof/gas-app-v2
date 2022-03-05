import { React, useEffect, useState, useContext } from 'react';
import { useParams, useRouteMatch, useLocation, Link, Route, Switch } from 'react-router-dom';
import { Context } from "../Context";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import ProfileOverview from './ProfileOverview';
import ProfileCars from './ProfileCars';
import ProfileFillups from './ProfileFillups';
import ProfileStats from './ProfileStats';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    // tabs: {
    //     backgroundColor: 'purple'
    // }
}));

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Profile() {

    const location = useLocation();
    // console.log('Location=' + location.pathname.split("/")[2]);

    const { user } = useParams();
    let { path, url } = useRouteMatch();

    const [cars, setCars] = useState(null)
    const [fillups, setFillups] = useState(null)
    const { username } = useContext(Context);

    const locationToValue = (location) => {
        switch(location) {
            case 'stats':
                return 1;
            case 'fillups':
                return 2;
            case 'cars':
                return 3;
            default:
                return 0;
        }

    };

    const classes = useStyles();
    const [value, setValue] = useState(locationToValue(location.pathname.split("/")[2]));

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        // Promise.all([
        //     axiosInstance.get('/fillups/?user__user_name=' + user),
        //     axiosInstance.get('/cars/?user__user_name=' + user)
        // ]).then(function ([res1, res2]) {
        //     setFillups(res1.data)
        //     setCars(res2.data);
        // });
        // console.log('Value=' + value);
        // console.log('Path=' + path);
        // console.log('URL=' + url);
    }, [value]);

	return (
        <Container component="main">
            <CssBaseline />
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={6} sm={3}>
                        <div>
                            <h1>{user}</h1>
                        </div>
                    </Grid>
                    <Grid item xs={6} sm={3}></Grid>
                    <Grid item xs={6} sm={3}>
                        <div className={classes.paper}>
                            { user !== username ?
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
                        </div>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <div className={classes.paper}>
                            { user !== username ?
                            <></> :
                            <Link to={'/cars/register'}>
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                >
                                    Register New Car
                                </Button>
                            </Link> }
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" className={classes.tabs} variant="fullWidth">
                        <Tab label="Overview" component={Link} to={`${url}`} {...a11yProps(0)} />
                        <Tab label="Stats" component={Link} to={`${url}/stats`} {...a11yProps(1)} />
                        <Tab label="Fillups" component={Link} to={`${url}/fillups`} {...a11yProps(2)} />
                        <Tab label="Cars" component={Link} to={`${url}/cars`} {...a11yProps(3)} />
                    </Tabs>
                </AppBar>

                <Switch>
                    <Route exact path={`${path}`}>
                        <ProfileOverview user={user} />
                    </Route>

                    <Route exact path={`${path}/stats`}>
                        <ProfileStats user={user} />
                    </Route>

                    <Route exact path={`${path}/fillups`}>
                        <ProfileFillups user={user} />
                    </Route>

                    <Route exact path={`${path}/cars`}>
                        <ProfileCars user={user} />
                    </Route>
                </Switch>
            </div>
        </Container>
    )
}