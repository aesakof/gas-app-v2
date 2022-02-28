import React, { useState, useEffect } from "react"
import axiosInstance from '../axios';
import Fillups from './Fillups'


export default function AllFillups(props) {
    const [fillups, setFillups] = useState(null)

    useEffect(() => {
        axiosInstance.get('/fillups/?user__user_name=' + props.user).then((res) => {
            console.log(res.data)
            setFillups(res.data)
        });
    }, [])

    return (
        <>
        {
            fillups === null ?
            <h5>Loading fillups data...</h5> :
            <Fillups fillups={fillups} page='profile' />
        }
        </>
      );
}