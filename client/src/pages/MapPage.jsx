import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Panel from '../components/Panel';
import { supabase } from "../supabase/supabaseclient";

mapboxgl.accessToken = 'pk.eyJ1IjoidGF3c2lmcm0iLCJhIjoiY202YjhweDhlMDVvZjJrcTF5NHZqOWtqZCJ9.zm_8A2NMmZ84jE9szLWOHw';

const MapPage = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
          const { data, error } = await supabase
            .from("DisasterReports") 
            .select(
              "longitude, latitude"
            ); 
    
          if (error) {
            console.error("Error fetching reports:", error);
          } else {
            console.log("Fetched reports:", data);
            setReports(data);
          }
        };

        const fetchDisasterEvents = async () => {
            try {
              const response = await fetch(
                "https://api.predicthq.com/v1/events?category=disasters",
                {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                    Authorization: "Bearer S2eXabtxjUMSI3JS0cre2r1apR50nOt2iI51ej6C",
                  },
                }
              );
      
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
      
              const data = await response.json();
              console.log("Fetched disaster events:", data); // Log the fetched data
      
              // Extract relevant information and combine with existing reports
              const disasterReports = data.results.map((event) => ({
                title: event.title,
                description: event.description,
                category: event.category, // Get the category directly
                longitude: event.location[0], // Access longitude from location array
                latitude: event.location[1], // Access latitude from location array
                created_at: new Date().toISOString(), // Use current date for created_at
                severity: "Unknown", // Set a default severity or modify as needed
              }));
      
              // Combine with existing reports from Supabase
              setReports((prevReports) => [...prevReports, ...disasterReports]);
            } catch (error) {
              console.error("Error fetching disaster events:", error);
            }
          };
    
        fetchReports();
        fetchDisasterEvents();
      }, []);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [0, 0],
            zoom: 2
        });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    map.current.flyTo({
                        center: [longitude, latitude],
                        zoom: 8,
                        essential: true // this animation is considered essential with respect to prefers-reduced-motion
                    });

                    const userLocationMarker = document.createElement('div');
                    userLocationMarker.style.width = '10px';
                    userLocationMarker.style.height = '10px';
                    userLocationMarker.style.backgroundColor = '#1e90ff'; // DodgerBlue color
                    userLocationMarker.style.borderRadius = '50%';
                    userLocationMarker.style.boxShadow = '0 0 10px 5px rgba(30, 144, 255, 0.7)'; // Glowing effect

                    new mapboxgl.Marker(userLocationMarker)
                        .setLngLat([longitude, latitude])
                        .addTo(map.current);
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }

    }, []);

    useEffect(() => {
        if (!map.current) return; // wait for the map to initialize

        reports.forEach(report => {
            const reportMarker = document.createElement('div');
            reportMarker.style.width = '10px';
            reportMarker.style.height = '10px';
            reportMarker.style.backgroundColor = '#ff0000'; // Red color
            reportMarker.style.borderRadius = '50%';
            reportMarker.style.boxShadow = '0 0 10px 5px rgba(255, 0, 0, 0.7)'; // Glowing effect

            new mapboxgl.Marker(reportMarker)
                .setLngLat([report.longitude, report.latitude])
                .addTo(map.current);
        });
    }, [reports]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
            <Panel>
            </Panel>
        </div>
    );
};

export default MapPage;