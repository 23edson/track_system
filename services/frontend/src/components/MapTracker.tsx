import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import socket from "../sockets/socket";
import Leaflet from 'leaflet';

export const markerIcon = new Leaflet.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});


export default function MapTracker({ driverId }: { driverId: string }) {
    const [locations, setLocations] = useState<LocationDriver[]>([]);

    useEffect(() => {
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

            setLocations((prev) => [...prev, data]);
        });

        return () => {
            socket.off('locationBroadcast');
        };
    }, [driverId]);

    return (
        <div style={{ height: '500px', width: '100%' }}>
            {locations.length > 0 ? (
                <MapContainer
                    center={[locations[locations.length - 1].latitude, locations[locations.length - 1].longitude]}
                    zoom={15}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                        position={[locations[locations.length - 1].latitude, locations[locations.length - 1].longitude]}
                        icon={markerIcon}
                    >
                        <Popup>
                            Entregador: {driverId}<br />
                            Atualizado em: {new Date(locations[locations.length - 1].timestamp).toLocaleTimeString()}
                        </Popup>
                    </Marker>
                </MapContainer>
            ) : (
                <p>Aguardando localização do entregador...</p>
            )}
        </div>
    );
}