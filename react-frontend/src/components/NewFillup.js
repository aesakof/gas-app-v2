import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewFillup() {
    const {register, handleSubmit} = useForm();
    const onSubmit = data => console.log(data);

    return (
        <>
            <h1>NEW FILLUP FORM DUDE</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("firstName")} />
                <input {...register("lastName")} />
                <select {...register("gender")}>
                    <option value="female">female</option>
                    <option value="male">male</option>
                    <option value="other">other</option>
                </select>
                <input type="submit" />
            </form>
        </>
    )
}