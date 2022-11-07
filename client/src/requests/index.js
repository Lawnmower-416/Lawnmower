/* Axios Library used to send HTTP requests to our back-end API
    The baseURL should be modified to fit the ec2 backe-end instead of localhost */

import axios from 'axios';
axios.defaults.withCredentials = false;
export const baseAPI = axios.create({
    baseURL: 'http://ec2-3-94-193-80.compute-1.amazonaws.com:3000'
});