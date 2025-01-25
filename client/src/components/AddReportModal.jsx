import React, { useState, useEffect } from 'react';
import { supabase } from "../supabase/supabaseclient";

const ReportModal = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [severity, setSeverity] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [location, setLocation] = useState('default');

    const cityCoordinates = {
        default: null,
        toronto: { lat: 43.65107, lon: -79.347015 },
        new_york: { lat: 40.712776, lon: -74.005974 },
        london: { lat: 51.507351, lon: -0.127758 },
        paris: { lat: 48.856613, lon: 2.352222 },
        tokyo: { lat: 35.689487, lon: 139.691711 },
        sydney: { lat: -33.868820, lon: 151.209290 },
        moscow: { lat: 55.755825, lon: 37.617298 },
        beijing: { lat: 39.904202, lon: 116.407394 },
        rio_de_janeiro: { lat: -22.906847, lon: -43.172897 },
        cape_town: { lat: -33.924870, lon: 18.424055 },
        cairo: { lat: 30.044420, lon: 31.235712 },
        delhi: { lat: 28.613939, lon: 77.209023 },
        mexico_city: { lat: 19.432608, lon: -99.133209 },
        berlin: { lat: 52.520008, lon: 13.404954 },
        buenos_aires: { lat: -34.603722, lon: -58.381592 },
        nairobi: { lat: -1.286389, lon: 36.817223 },
        bangkok: { lat: 13.756331, lon: 100.501762 },
        istanbul: { lat: 41.008240, lon: 28.978359 },
        seoul: { lat: 37.566536, lon: 126.977966 },
        jakarta: { lat: -6.208763, lon: 106.845599 },
        hamilton: { lat: 43.2557, lon: -79.8711 },
        markham: { lat: 43.8561, lon: -79.3370 },
        brampton: { lat: 43.7315, lon: -79.7624 },
        mississauga: { lat: 43.5890, lon: -79.6441 },
        waterloo: { lat: 43.4643, lon: -80.5204 },
        ottawa: { lat: 45.4215, lon: -75.6972 },
        montreal: { lat: 45.5017, lon: -73.5673 },
        north_york: { lat: 43.7615, lon: -79.4111 },
        scarborough: { lat: 43.7764, lon: -79.2318 },
    };

    useEffect(() => {
        if (location === 'default') {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLatitude(position.coords.latitude);
                        setLongitude(position.coords.longitude);
                    },
                    (error) => {
                        console.error('Error getting user location:', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        } else {
            const coords = cityCoordinates[location];
            if (coords) {
                setLatitude(coords.lat);
                setLongitude(coords.lon);
            }
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (latitude === null || longitude === null) {
            console.error('Location not available');
            return;
        }
        const { data, error } = await supabase
            .from('DisasterReports')
            .insert([
                { title, description, category, severity, latitude, longitude }
            ]);

        if (error) {
            console.error('Error inserting data:', error);
        } else {
            console.log('Data inserted:', data);
            onClose();
        }
    };

    if (!isOpen) return null;

    const modalStyle = {
        position: 'fixed',
        top: '10%',
        width: '300px',
        backgroundColor: '#333',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        zIndex: 1,
        color: 'white',
    };

    const modalContentStyle = {
        backgroundColor: '#333',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #888',
        width: '80%',
        maxWidth: '500px',
        borderRadius: '10px',
        color: 'white',
    };

    const closeButtonStyle = {
        color: '#aaa',
        float: 'right',
        fontSize: '28px',
        fontWeight: 'bold',
        cursor: 'pointer',
    };
    
    const closeButtonHoverStyle = {
        color: 'black',
    };
    
    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
        backgroundColor: '#444',
        color: 'white',
    };
    
    const buttonStyle = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
    };

    return (
        <div style={modalStyle}>
            <div style={modalContentStyle}>
                <span
                    style={closeButtonStyle}
                    onMouseOver={(e) => (e.currentTarget.style.color = closeButtonHoverStyle.color)}
                    onMouseOut={(e) => (e.currentTarget.style.color = closeButtonStyle.color)}
                    onClick={onClose}
                >
                    &times;
                </span>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            style={inputStyle}
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            style={{ ...inputStyle, height: '100px' }}
                        />
                    </label>
                    <label>
                        Category:
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            style={inputStyle}
                        >
                            <option value="">Select Category</option>
                            <option value="earthquake">Earthquake</option>
                            <option value="flood">Flood</option>
                            <option value="hurricane">Hurricane</option>
                            <option value="wildfire">Wildfire</option>
                            <option value="tornado">Tornado</option>
                        </select>
                    </label>
                    <label>
                        Severity:
                        <select
                            value={severity}
                            onChange={(e) => setSeverity(e.target.value)}
                            required
                            style={inputStyle}
                        >
                            <option value="">Select Severity</option>
                            <option value="not severe">Not Severe</option>
                            <option value="mild">Mild</option>
                            <option value="moderate">Moderate</option>
                            <option value="severe">Severe</option>
                        </select>
                    </label>
                    <label>
                        Location:
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            style={inputStyle}
                        >
                            <option value="default">Current Location</option>
                            <option value="toronto">Toronto</option>
                            <option value="hamilton">Hamilton</option>
                            <option value="markham">Markham</option>
                            <option value="brampton">Brampton</option>
                            <option value="mississauga">Mississauga</option>
                            <option value="waterloo">Waterloo</option>
                            <option value="ottawa">Ottawa</option>
                            <option value="montreal">Montreal</option>
                            <option value="north_york">North York</option>
                            <option value="scarborough">Scarborough</option>
                            <option value="new_york">New York</option>
                            <option value="london">London</option>
                            <option value="paris">Paris</option>
                            <option value="tokyo">Tokyo</option>
                            <option value="sydney">Sydney</option>
                            <option value="moscow">Moscow</option>
                            <option value="beijing">Beijing</option>
                            <option value="rio_de_janeiro">Rio de Janeiro</option>
                            <option value="cape_town">Cape Town</option>
                            <option value="cairo">Cairo</option>
                            <option value="delhi">Delhi</option>
                            <option value="mexico_city">Mexico City</option>
                            <option value="berlin">Berlin</option>
                            <option value="buenos_aires">Buenos Aires</option>
                            <option value="nairobi">Nairobi</option>
                            <option value="bangkok">Bangkok</option>
                            <option value="istanbul">Istanbul</option>
                            <option value="seoul">Seoul</option>
                            <option value="jakarta">Jakarta</option>
                        </select>
                    </label>
                    <button type="submit" style={buttonStyle}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReportModal;