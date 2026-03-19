import axios from 'axios';
import React, { useMemo } from 'react';

const UseAxios = () => {
    const axiosInstance = useMemo(() => {
        return axios.create({
            // baseURL: 'http://localhost:3000'
            baseURL: 'http://localhost:3000'
           

        })
    }, [])
    return axiosInstance;
};

export default UseAxios;