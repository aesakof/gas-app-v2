import React, { useState, useEffect } from "react"
import axiosInstance from '../axios';
import Cars from './Cars'


export default function AllCars(props) {
    const [cars, setCars] = useState(null)

    useEffect(() => {
        axiosInstance.get('/cars/?user__user_name=' + props.user).then((res) => {
            setCars(res.data)
        });
    }, [])

    return (
        <>
        {
            cars === null ?
            <h5>Loading cars data...</h5> :
            <Cars cars={cars} page='profile' />
        }
        </>
      );
}