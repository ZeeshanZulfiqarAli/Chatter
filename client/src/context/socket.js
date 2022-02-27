import React from 'react';
import { io } from "socket.io-client";
// import { SOCKET_URL } from "config";

// const SOCKET_URL = window.location.hostname + ':'

// export const socket = io(SOCKET_URL);
export const socket = io('http://localhost:5000');
export const SocketContext = React.createContext();