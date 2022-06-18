import React from 'react';
import { io } from "socket.io-client";
// import { SOCKET_URL } from "config";

const SOCKET_URL = window.location.hostname + ':'
// const SOCKET_URL = process.env.YOUR_HOST || '0.0.0.0' + ':' + process.env.PORT || 5000;
// export const socket = io(SOCKET_URL);
export const socket = io(SOCKET_URL);
export const SocketContext = React.createContext();