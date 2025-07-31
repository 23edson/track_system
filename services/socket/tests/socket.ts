// navegador ou Node.js com socket.io-client
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");


function gerarLocalizacoesCrescentes(latInicial: number, lonInicial: number, passos = 10, deltaMin = 0.0001, deltaMax = 0.0005) {
    const coordenadas = [];

    let lat = latInicial;
    let lon = lonInicial;

    for (let i = 0; i < passos; i++) {
        // Gera variações pequenas simulando movimento
        lat += Math.random() * (deltaMax - deltaMin) + deltaMin;
        lon += Math.random() * (deltaMax - deltaMin) + deltaMin;

        coordenadas.push({
            latitude: Number(lat.toFixed(6)),
            longitude: Number(lon.toFixed(6))
        });
    }

    return coordenadas;
}

const coordenadas = gerarLocalizacoesCrescentes(-27.1006, -52.6152, 15);


setInterval(() => {
    const localizacao = coordenadas.shift();
    if (localizacao) {
        socket.emit("location_update", {
            driverId: "123e4567-e89b-12d3-a456-426614174000",
            ...localizacao,
        });
    } else {
        coordenadas.push(...gerarLocalizacoesCrescentes(-27.1006, -52.6152, 15));
        console.log("Todas as localizações foram enviadas.");
    }
}, 5000); // Envia a cada 5 segundos
