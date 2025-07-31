/* import LocationTracker from './components/LocationTracker';
 */import MapTracker from './components/MapTracker';

function App() {
    return (
        <div>
            <h1>Rastreamento em Tempo Real</h1>
            {/* <LocationTracker driverId="123e4567-e89b-12d3-a456-426614174000" /> */}
            <MapTracker driverId="123e4567-e89b-12d3-a456-426614174000" />
        </div>
    );
}

export default App;