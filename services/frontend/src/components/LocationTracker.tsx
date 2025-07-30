import { useEffect, useState } from 'react';
import socket from '../sockets/socket';

type Location = {
    latitude: number;
    longitude: number;
    timestamp: string;
};

export default function LocationTracker({ entregadorId }: { entregadorId: string }) {
    const [locations, setLocations] = useState<Location[]>([]);

    useEffect(() => {
        socket.emit('joinRoom', entregadorId); // opcional

        socket.on('locationBroadcast', (data) => {
            console.log('Nova localização recebida:', data);

            setLocations((prev) => [...prev, data]);
        });

        return () => {
            socket.off('locationBroadcast');
        };
    }, [entregadorId]);

    return (
        <div>
            <h2>Localizações em tempo real</h2>
            <ul>
                {locations.map((location, index) => (
                    <li key={index}>
                        Lat: {location.latitude} | Lng: {location.longitude} | {new Date(location.timestamp).toLocaleTimeString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}
