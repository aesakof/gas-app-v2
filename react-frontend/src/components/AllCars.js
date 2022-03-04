import React, { useState, useEffect } from "react"
import axiosInstance from '../axios';
import Cars from './Cars'


export default function AllCars() {
    const [cars, setCars] = useState(null)

    useEffect(() => {
        axiosInstance.get('/cars/').then((res) => {
            setCars(res.data)
        });
    }, [])

    return (
        <>
            <br></br>
            {
                cars === null ?
                <h5>Loading cars data...</h5> :
                <Cars cars={cars} />
            }
        </>
      );
}