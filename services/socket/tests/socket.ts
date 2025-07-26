// navegador ou Node.js com socket.io-client
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

socket.emit("location_update", {
    driverId: "123e4567-e89b-12d3-a456-426614174000",
    latitude: -23.55,
    longitude: -46.63
});