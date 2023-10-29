import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import "leaflet/dist/leaflet.css";

const LeafletMap = dynamic(() => import('../components/LeafletMap'), { ssr: false });

const MapPageLazy: React.FC = () => {
    const [mapKey, setMapKey] = useState(0);

    const handleMapReload = () => {
        setMapKey((prevKey) => prevKey + 1);
    };



    return (
        <div>
            {/* Other page content */}
            {/* <button onClick={}>Geolocation</button> */}
            <button onClick={handleMapReload}>Reload Map</button>
            <div>
                <LeafletMap key={mapKey} />
            </div>
        </div>
    );
};

export default MapPageLazy;