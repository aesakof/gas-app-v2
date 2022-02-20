import { React, useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axios';
import { Context } from "../Context";

import { makeStyles } from '@material-ui/core/styles';

import ProfileTabs from './ProfileTabs';
import Cars from './Cars';
import Fillups from './Fillups';


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

export default function Profile() {

    const { user } = useParams();

    const [cars, setCars] = useState(null)
    const [fillups, setFillups] = useState(null)
    const { username } = useContext(Context);

    useEffect(() => {
        Promise.all([
            axiosInstance.get('/fillups/?user__user_name=' + user),
            axiosInstance.get('/cars/?status=Active&user__user_name=' + user)
        ]).then(function ([res1, res2]) {
            console.log(res2.data);
            setFillups(res1.data)
            setCars(res2.data);
        });
    }, [user]);

	return (
        <>
            <h1>{user}'s Profile</h1>
            <ProfileTabs />
            <>
            {
                cars === null ?
                <h5>Loading cars data...</h5> :
                <>
                    <h2>{username}'s Active Cars</h2>
                    <Cars cars={cars} />
                </>
            }
            </>
            <>
            {
                fillups === null ?
                <h5>Loading fillups data...</h5> :
                <Fillups fillups={fillups} />
            }
            </>
        </>
    )
}