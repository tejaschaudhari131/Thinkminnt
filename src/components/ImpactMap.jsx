import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const ImpactMap = () => {
    const locations = [
        { id: 1, name: "Pune Center", lat: 18.5204, lng: 73.8567, stats: "500+ Students" },
        { id: 2, name: "Mumbai Outreach", lat: 19.0760, lng: 72.8777, stats: "200+ Families" },
        { id: 3, name: "Nashik School", lat: 20.0059, lng: 73.7898, stats: "150+ Students" },
        { id: 4, name: "Nagpur Village", lat: 21.1458, lng: 79.0882, stats: "300+ Trees Planted" },
        { id: 5, name: "Aurangabad Clinic", lat: 19.8762, lng: 75.3433, stats: "1000+ Patients" }
    ];

    return (
        <div className="h-[500px] w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white z-0 relative">
            <MapContainer
                center={[19.7515, 75.7139]}
                zoom={6}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map(loc => (
                    <Marker key={loc.id} position={[loc.lat, loc.lng]}>
                        <Popup>
                            <div className="text-center">
                                <h3 className="font-bold text-primary text-lg">{loc.name}</h3>
                                <p className="text-gray-600 font-medium">{loc.stats}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default ImpactMap;
