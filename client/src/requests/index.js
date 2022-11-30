/* Axios Library used to send HTTP requests to our back-end API
    The baseURL should be modified to fit the ec2 backe-end instead of 34.193.24.27 */

import axios from 'axios';
axios.defaults.withCredentials = false;

/**
 * frontend7. Update the origin url from http://34.193.24.27 to http://localhost:5000
 */
export const baseAPI = axios.create({
    baseURL: 'http://localhost:5000'
});