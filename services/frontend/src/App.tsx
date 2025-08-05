/* import LocationTracker from './components/LocationTracker';
import DashboardMap from './components/DashboardMap'; */
import RouteByPackage from './components/RouteByPackage';
//import RouteTracker from './components/RouteTracker';


function App() {
    return (
        <div>
            <h1>Rastreamento em Tempo Real</h1>
            {/* <LocationTracker driverId="123e4567-e89b-12d3-a456-426614174000" /> */}

            {/*  <DashboardMap /> */}
            {/*  <RouteTracker driverId="123e4567-e89b-12d3-a456-426614174000" /> */}
            <RouteByPackage packageId="123e4567-e89b-12d3-a456-426614174001" />


        </div>
    );
}

export default App;