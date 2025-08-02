import { useEffect, useState } from "react";
import socket from "../sockets/socket";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { markerIcon } from "./MapTracker";

export default function DashboardMap() {

    const [drivers, setDrivers] = useState<LocationDriver[]>([]);
    console.log(drivers)
    useEffect(() => {

        console.log('Iniciando rastreamento de todos os entregadores');
        socket.on('locationBroadcast', (data: LocationDriver) => {
            setDrivers((prevDrivers) => {
                const updatedDrivers = { ...prevDrivers };

                return {
                    ...updatedDrivers,
                    [data.driverId]: {
                        latitude: data.latitude,
                        longitude: data.longitude,
                        timestamp: data.timestamp
                    }
                }
            })
        })

        return () => {
            socket.off('locationBroadcast');
        }
    }, []);

    const locations = Object.entries(drivers);

    return (
        <div style={{ height: '600px', width: '100%' }}>
            <h2>Dashboard Map</h2>
            {
                locations.length > 0 ? (
                    <MapContainer center={[locations[0][1].latitude, locations[0][1].longitude]} zoom={14} style={{ height: '100%', width: '100%' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {
                            locations.map((location, index) => (
                                <Marker key={index} position={[location[1].latitude, location[1].longitude]} icon={markerIcon}>
                                    <Popup>
                                        Driver ID: {location[0]} <br />
                                        Timestamp: {location[1].timestamp}
                                    </Popup>
                                </Marker>
                            ))
                        }
                    </MapContainer>
                ) : (
                    <p>Aguardando localização dos entregadores...</p>
                )
            }
        </div>
    )
}