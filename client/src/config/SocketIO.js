import io from 'socket.io-client'

/**
 * frontend1. Update server url from http://34.193.24.27 to http://localhost:5000
 */
export const socket = io.connect("http://localhost:5000")