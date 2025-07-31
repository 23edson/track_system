import { useEffect, useState } from 'react';
import socket from '../sockets/socket';

export default function LocationTracker({ driverId }: { driverId: string }) {
    const [locations, setLocations] = useState<LocationDriver[]>([]);

    useEffect(() => {

        console.log('Iniciando rastreamento para o driver:', driverId);
        socket.emit('unificated_location_update', driverId);

        socket.on('locationBroadcast', (data) => {
            console.log('Nova localização recebida:', data);

            setLocations((prev) => [...prev, data]);
        });

        return () => {
            socket.off('locationBroadcast');
        };
    }, [driverId]);

    return (
        <div>
            <h2>Localizações em tempo real</h2>
            <ul>
                {locations.map((location, index) => (
                    <li key={index}>
                        Latitude: {location.latitude} | Longitude: {location.longitude} | {new Date(location.timestamp).toLocaleTimeString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}
