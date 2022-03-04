import React, { useState, useEffect } from "react"
import axiosInstance from '../axios';
import Fillups from './Fillups'


export default function AllFillups() {
    const [fillups, setFillups] = useState(null)

    useEffect(() => {
        axiosInstance.get('/fillups/').then((res) => {
            setFillups(res.data)
        });
    }, [])

    return (
        <>
            <br></br>
            {
                fillups === null ?
                <h5>Loading fillups data...</h5> :
                <Fillups fillups={fillups} />
            }
        </>
      );
}