import React, { useState, useEffect } from "react";
import ReportModal from "./AddReportModal";
import ReportDisplay from "./ReportDisplay";
import { supabase } from "../supabase/supabaseclient"; // Import your Supabase client
import AddReportIcon from "../icons/addReport.svg";

const Panel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const handleAddReportClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const panelStyle = {
    position: "fixed",
    top: "20px",
    left: "20px",
    width: "280px",
    height: "calc(100vh - 40px)",
    backgroundColor: "rgba(51, 51, 51, 0.9)", // Dark background with opacity
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    overflowY: "auto",
    zIndex: 10, // Ensure the panel is above the map
    color: "white", // Text color
    backdropFilter: "blur(10px)", // Blur background
  };

  const buttonStyle = {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    backgroundColor: "#813737",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    textAlign: "center",
  };

  const iconStyle = {
    width: "64px",
    height: "64px",
    marginBottom: "5px",
  };

  const buttonHoverStyle = {
    backgroundColor: "#1c86ee", // Slightly darker blue on hover
  };

  const reportContainerStyle = {
    overflowY: "auto",
    maxHeight: "calc(100% - 60px)", // Adjust based on the height of the button and padding
  };

  useEffect(() => {
    const fetchReports = async () => {
        const { data, error } = await supabase
            .from("DisasterReports") // Replace with your actual table name
            .select(
                "id, title, description, category, severity, longitude, latitude, created_at"
            ); // Fetch all required columns

        if (error) {
            console.error("Error fetching reports:", error);
        } else {
            console.log("Fetched reports:", data); // Log the fetched reports
            setReports(data); // Set the fetched reports to state
            fetchDisasterEvents(data); // Fetch disaster events after setting reports
        }
    };

    const fetchDisasterEvents = async (existingReports) => {
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

            // Combine existing reports with disaster reports
            setReports((prevReports) => [...existingReports, ...disasterReports]);
        } catch (error) {
            console.error("Error fetching disaster events:", error);
        }
    };

    fetchReports();
}, []);

  return (
    <>
      <div style={panelStyle} className="panel">
        <style>
          {`
                      /* Hide the scrollbar */
                      .report-container::-webkit-scrollbar {
                          width: 0;
                          height: 0;
                      }

                      .report-container {
                          -ms-overflow-style: none;  /* IE and Edge */
                          scrollbar-width: none;  /* Firefox */
                      }
                  `}
        </style>
        <button
          style={buttonStyle}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              buttonHoverStyle.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor =
              buttonStyle.backgroundColor)
          }
          onClick={handleAddReportClick}
        >
          <div style={{ textAlign: "center" }}>
            <img src={AddReportIcon} alt="Add Report" style={iconStyle} />
            <div>Add Report</div>
          </div>
        </button>
        <div style={reportContainerStyle} className="report-container">
          {reports.map((report) => (
            <ReportDisplay
              key={report.id}
              title={report.title}
              location={`${report.latitude}, ${report.longitude}`} // Combine latitude and longitude for display
              severity={report.severity}
              description={report.description}
              category={report.category}
              longitude={report.longitude}
              latitude={report.latitude}
              createdAt={report.created_at}
            />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <ReportModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
      )}
    </>
  );
};

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  right: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 20, // Ensure the modal is above the panel
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
};

export default Panel;
