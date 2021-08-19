import React from 'react';
import { Link } from "react-router-dom"

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: `#333`
	},
    text:{
        color: `white`
    }
}));

function Header() {
	const classes = useStyles();
	return (
		<>
			<CssBaseline />
			<AppBar
				position="static"
				color="white"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar>
					<Typography variant="h6" className={classes.text} noWrap>
						Gas App
					</Typography>
                    <Typography variant="h6" className={classes.text} noWrap>
                        <Link to="/fillups">Fillups</Link>
					</Typography>
                    <Typography variant="h6" className={classes.text} noWrap>
                        <Link to="/cars">Cars</Link>
					</Typography>
				</Toolbar>
			</AppBar>
		</>
	);
}

export default Header;