import React, { useRef, useEffect, useState } from "react";
import L, { IconOptions, LeafletMouseEvent, LocationEvent, ErrorEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// import geoJsonData from './_geoJSON.json'
import mapData from './geoJSON.json'

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

const LeafletMap: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initializeMap = async () => {
            try {
                if (mapRef.current) {
                    const map = L.map(mapRef.current).setView([21.306944, -157.858337], 13);
                    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                        attribution:
                            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                        maxZoom: 18,
                    }).addTo(map);
                    map.locate({ setView: true, maxZoom: 16 });
                    function onLocationFound(e: LocationEvent) {
                        const radius = e.accuracy;

                        L.marker(e.latlng).addTo(map).bindPopup(`You are within ${radius} meters from this point`)
                        L.circle(e.latlng, radius).addTo(map)
                    }

                    map.on('locationfound', onLocationFound);

                    function onLocationError(e: ErrorEvent) {
                        alert(e.message);
                    }

                    map.on('locationerror', onLocationError);

                    // const fetchGeoJsonData = async () => {
                    //     const response = await fetch("./geoJSON.json");
                    //     const data = await response.json();
                    //     return data;
                    // };

                    // const geoJsonData = await fetchGeoJsonData();

                    const geoJSONLayer = L.geoJSON(mapData, {
                        pointToLayer: (feature, latlng) => {
                            const name = feature.properties.name;
                            const address = feature.properties.address;
                            const marker = L.marker(latlng, {
                                title: name,
                            });

                            marker.on('click', function () {
                                document.querySelectorAll('p').forEach(allP => allP.remove())
                                const pElement = document.createElement("p");
                                pElement.textContent = `${name} \n ${address}`;
                                document.body.appendChild(pElement);
                            });

                            marker.bindPopup(name + `<br/>` + address);

                            return marker;
                        },
                        coordsToLatLng: (coords) => {
                            return new L.LatLng(coords[1], coords[0], coords[2]);
                        },
                    });

                    geoJSONLayer.addTo(map);

                    // axios.get('./geoJSON')
                    //     .then(function (response) {
                    //         // Create a Leaflet GeoJSON layer using the response data
                    //         var geojsonLayer = L.geoJSON(response.data).addTo(map);

                    //         // Fit the map bounds to the GeoJSON layer
                    //         map.fitBounds(geojsonLayer.getBounds());
                    //     })
                    //     .catch(function (error) {
                    //         console.error('Error loading GeoJSON file:', error);
                    //     });

                    // async function fetchGeoJsonData() {
                    //     const response = await axios.get('src/components/LeafletMap/geoJSON.geojson');
                    //     const data = response.data;
                    //     return data;
                    // }

                    // async function createGeoJsonLayer() {

                    //     const geoJsonData = await fetchGeoJsonData();

                    //     const geoJSONLayer = L.geoJSON(geoJsonData, {
                    //         pointToLayer: (feature, latlng) => {
                    //             const name = feature.properties.name;
                    //             const address = feature.properties.address;
                    //             const marker = L.marker(latlng, {
                    //                 title: name,
                    //             });

                    //             marker.bindPopup(name + `<br/>` + address);

                    //             return marker;
                    //         },
                    //         coordsToLatLng: (coords) => {
                    //             return new L.LatLng(coords[1], coords[0], coords[2]);
                    //         },
                    //     });

                    //     geoJSONLayer.addTo(map);
                    // }
                    // createGeoJsonLayer();


                }
            } catch (error) {
                console.log("Error initializing map:", error);
            }
        };

        initializeMap();
    }, []);

    return <div ref={mapRef} style={{ height: "800px", width: "1000px" }}></div>;
};

export default LeafletMap;
