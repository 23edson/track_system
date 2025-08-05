import { useEffect, useState } from "react"
import socket from "../sockets/socket";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import { markerIcon } from "./MapTracker";

export default function RouteByPackage({ packageId }: { packageId: string }) {

    const [locations, setLocations] = useState<LocationDriver[]>([])


    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch(`http://localhost:3004/locations/package/${packageId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch locations');
                }
                const data = await response.json();
                setLocations(data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();


        socket.on('locationBroadcast', (data: LocationDriver) => {
            if (data.packageId === packageId) {
                setLocations((prev) => [
                    ...prev,
                    {
                        driverId: data.driverId,
                        packageId: data.packageId,
                        latitude: data.latitude,
                        longitude: data.longitude,
                        timestamp: data.timestamp
                    }
                ]);

            }
        })

        return () => {
            socket.off('locationBroadcast');
        }

    }, [packageId])

    if (locations.length === 0) return <div>Carregando as rotas...</div>

    const lastLocation = locations[locations.length - 1];

    return (
        <div>
            Rota do pacote {packageId}

            <div style={{ height: '500px', width: '100%' }}>
                <MapContainer
                    center={[lastLocation.latitude, lastLocation.longitude]}
                    zoom={15}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    <Polyline
                        positions={locations.map(loc => [loc.latitude, loc.longitude])}
                        pathOptions={{ color: 'green' }}
                    />
                    <Marker position={[lastLocation.latitude, lastLocation.longitude]} icon={markerIcon}>
                        <Popup>
                            Pacote: {packageId}<br />
                            Entregador: {lastLocation.driverId}<br />
                            Última atualização: {new Date(lastLocation.timestamp).toLocaleTimeString()}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    )
}