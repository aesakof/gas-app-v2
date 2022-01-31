import { AppBar, Toolbar, Typography, makeStyles, Button, IconButton, Drawer, MenuItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Context } from "../Context";

const useStyles = makeStyles(() => ({
    header: {
        backgroundColor: "black",
    },
    logo: {
        fontWeight: 400,
        color: "white",
        textAlign: "left",
    },
    menuButton: {
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    drawerContainer: {
        padding: "20px 30px",
    }
}));

const getHeaders = (username) => {
    const headers = [
        {
            label: "All Fillups",
            href: "/fillups",
        },
        {
            label: "All Cars",
            href: "/cars",
        },
    ]
    if(!username) {
        return [
            ...headers,
            {
                label: "Register",
                href: "/register",
            },
            {
                label: "Login",
                href: "/login",
            },
        ]
    } else {
        return [
            ...headers,
            {
                label: "New Fillup",
                href: "/fillups/new",
            },
            {
                label: "New Car",
                href: "/cars/register",
            },
            {
                label: username,
                href: "/profile",
            },
            {
                label: "Log Out",
                href: "/logout",
            }
        ]
    }
}


export default function Header() {
    const [mobileView, setMobileView] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();

    const { username, setUsername } = useContext(Context);

    useEffect(() => {
        if(username === null && localStorage.getItem('username') !== null) {
            setUsername(localStorage.getItem('username'))
        }
    }, [username]);

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setMobileView(true)
                : setMobileView(false);
        };

        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());

        return () => {
            window.removeEventListener("resize", () => setResponsiveness());
        }
    }, []);

    const displayDesktop = () => {
        return (
            <Toolbar className={toolbar}>
                {gasAppLogo}
                <div>{getMenuButtons()}</div>
            </Toolbar>
        );
    };

    const displayMobile = () => {
        const handleDrawerOpen = () => setDrawerOpen(true);
        const handleDrawerClose = () => setDrawerOpen(false);

        return (
            <Toolbar>
                <IconButton
                    {... {
                        edge: "start",
                        color: "inherit",
                        "aria-label": "menu",
                        "aria-haspopup": "true",
                        onClick: handleDrawerOpen,
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer
                    {... {
                        anchor: "left",
                        open: drawerOpen,
                        onClose: handleDrawerClose,
                    }}
                >
                    <div className={drawerContainer}>{getDrawerChoices()}</div>
                </Drawer>
                <div>{gasAppLogo}</div>
            </Toolbar>
        )
    }

    const gasAppLogo = (
        <Typography variant="h6" component="h1" className={logo}>
            Gas App
        </Typography>
    );

    const getMenuButtons = () => {
        return getHeaders(username).map(({ label, href }) => {
            return (
                <Button
                    {...{
                        key: label,
                        color: "inherit",
                        to: href,
                        component: RouterLink,
                        className: menuButton
                    }}
                >
                    {label}
                </Button>
            );
        });
    };

    const getDrawerChoices = () => {
        return getHeaders(username).map(({ label, href }) => {
            return (
                <MenuItem
                    {... {
                        component: RouterLink,
                        to: href,
                        color: "inherit",
                        style: { textDecoration: "none" },
                        key: label,
                    }}
                >
                    {label}
                </MenuItem>
            );
        });
    };

    return (
        <header>
            <AppBar className={header}>
                {mobileView ? displayMobile() : displayDesktop()}
            </AppBar>
        </header>
    );
}




// import React from 'react';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import { makeStyles } from '@material-ui/core/styles';
// import { NavLink } from 'react-router-dom';
// import Link from '@material-ui/core/Link';
// import Button from '@material-ui/core/Button';

// const useStyles = makeStyles((theme) => ({
// 	appBar: {
// 		borderBottom: `1px solid ${theme.palette.divider}`,
//         backgroundColor: `#333`,
//         color: `white`
// 	},
// 	link: {
// 		margin: theme.spacing(1, 1.5),
//         color: `white`
// 	},
// 	toolbarTitle: {
// 		flexGrow: 1,
//         color: `white`
// 	},
// }));

// function Header() {
// 	const classes = useStyles();
// 	return (
// 		<React.Fragment>
// 			<CssBaseline />
// 			<AppBar
// 				position="static"
// 				color="default"
// 				elevation={0}
// 				className={classes.appBar}
// 			>
// 				<Toolbar className={classes.toolbar}>
// 					<Typography
// 						variant="h6"
// 						color="inherit"
// 						noWrap
// 						className={classes.toolbarTitle}
// 					>
// 						<Link
// 							component={NavLink}
// 							to="/"
// 							underline="none"
// 							color="textPrimary"
// 						>
// 							Blog
// 						</Link>
// 					</Typography>
//                     <Typography variant="h6" className={classes.toolbarTitle} noWrap>
//                         <Link
//                             component={NavLink} 
//                             to="/fillups"
//                         >
//                             Fillups
//                         </Link>
//                         <Link 
//                             component={NavLink} 
//                             to="/cars"
//                         >
//                             Cars
//                         </Link>
//                     </Typography>
//                     <Typography variant="h6" className={classes.toolbarTitle} noWrap>
//                         <Link 
//                             component={NavLink} 
//                             to="/cars"
//                         >
//                             Cars
//                         </Link>
//                     </Typography>
// 					<nav>
// 						<Link
// 							color="textPrimary"
// 							href="#"
// 							className={classes.link}
// 							component={NavLink}
// 							to="/register"
// 						>
// 							Register
// 						</Link>
// 					</nav>
// 					<Button
// 						href="#"
// 						color="inherit"
// 						variant="outlined"
// 						className={classes.link}
// 						component={NavLink}
// 						to="/login"
// 					>
// 						Login
// 					</Button>
// 					<Button
// 						href="#"
// 						color="inherit"
// 						variant="outlined"
// 						className={classes.link}
// 						component={NavLink}
// 						to="/logout"
// 					>
// 						Logout
// 					</Button>
// 				</Toolbar>
// 			</AppBar>
// 		</React.Fragment>
// 	);
// }

// export default Header;

// // function Header() {
// // 	const classes = useStyles();
// // 	return (
// // 		<>
// // 			<CssBaseline />
// // 			<AppBar
// // 				position="static"
// // 				color="white"
// // 				elevation={0}
// // 				className={classes.appBar}
// // 			>
// // 				<Toolbar>
// // 					<Typography variant="h6" className={classes.text} noWrap>
// // 						Gas App
// // 					</Typography>
// //                     <Typography variant="h6" className={classes.text} noWrap>
// //                         <Link to="/fillups">Fillups</Link>
// // 					</Typography>
// //                     <Typography variant="h6" className={classes.text} noWrap>
// //                         <Link to="/cars">Cars</Link>
// // 					</Typography>
// // 				</Toolbar>
// // 			</AppBar>
// // 		</>
// // 	);
// // }

// // export default Header;