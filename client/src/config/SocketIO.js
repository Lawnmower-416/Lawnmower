import io from 'socket.io-client'

/**
 * frontend1. Update server url from http://34.193.24.27 to http://34.193.24.27:5000
 */
export const socket = io.connect("http://34.193.24.27:3000")


// Try to understood. the server running on port 3000 ok?