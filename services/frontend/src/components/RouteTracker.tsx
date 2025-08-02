import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import socket from "../sockets/socket";

import { markerIcon } from "./MapTracker";
import axios from "axios";

export default function RouteTracker({ driverId }: { driverId: string }) {
    const [locations, setLocations] = useState<LocationDriver[]>([]);

    useEffect(() => {


        axios.get(`http://localhost:3004/locations/${driverId}`)
            .then((res) => setLocations(res.data))
            .catch((err) => console.error('Erro ao buscar histórico:', err));


        console.log('Iniciando rastreamento para o driver:', driverId);
        socket.emit('unificated_location_update', driverId);

        socket.on('locationBroadcast', (data) => {

            if (data.driverId !== driverId) return;

            console.log('Nova localização recebida:', data);
            setLocations((prev) => [
                ...prev,
                {
                    driverId: data.driverId,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    timestamp: data.timestamp
                }
            ]);


        });

        return () => {
            socket.off('locationBroadcast');
        };
    }, [driverId]);

    const last = locations[locations.length - 1];
    console.log('Última localização:', last);

    return (
        last ? (
            <div style={{ height: '500px', width: '100%' }}>
                <MapContainer center={[last.latitude ? last.latitude : 0, last.longitude ? last.longitude : 0]} zoom={14} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    <Polyline positions={locations.map(loc => [loc.latitude, loc.longitude])} color="blue" />
                    <Marker position={[last.latitude ? last.latitude : 0, last.longitude ? last.longitude : 0]} icon={markerIcon}>
                        <Popup>
                            Última localização do motorista {last.driverId} <br />
                            {new Date(last.timestamp).toLocaleString()} <br />
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>) : (<div>Nenhuma localização disponível</div>)
    );
}