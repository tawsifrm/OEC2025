import React, { useState, useEffect } from "react";
import ReportModal from "./AddReportModal";
import ReportDisplay from "./ReportDisplay";
import { supabase } from "../supabase/supabaseclient";
import AddReportIcon from "../icons/addReport.svg";
import Logo from "../icons/logo.svg";

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
    backgroundColor: "rgba(51, 51, 51, 0.9)",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    overflowY: "auto",
    zIndex: 10,
    color: "white",
    backdropFilter: "blur(10px)",
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
    backgroundColor: "#1c86ee",
  };

  const reportContainerStyle = {
    overflowY: "auto",
    maxHeight: "calc(100% - 60px)",
  };

  const logoStyle = {
    width: "250px",
    marginBottom: "20px",
  };

  useEffect(() => {
    const fetchReports = async () => {
      const { data, error } = await supabase
        .from("DisasterReports")
        .select("id, title, description, category, severity, longitude, latitude, created_at");

      if (error) {
        console.error("Error fetching reports:", error);
      } else {
        setReports(data);
        fetchDisasterEvents(data);
      }
    };

    const fetchDisasterEvents = async (existingReports) => {
      try {
        const response = await fetch("https://api.predicthq.com/v1/events?category=disasters", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer S2eXabtxjUMSI3JS0cre2r1apR50nOt2iI51ej6C",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const disasterReports = data.results.map((event) => ({
          title: event.title,
          description: event.description,
          category: event.category,
          longitude: event.location[0],
          latitude: event.location[1],
          created_at: new Date().toISOString(),
          severity: "Unknown",
        }));

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
        <img src={Logo} alt="Logo" style={logoStyle} />
        <style>
          {`
            .report-container::-webkit-scrollbar {
              width: 0;
              height: 0;
            }

            .report-container {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}
        </style>
        <button
          style={buttonStyle}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)
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
              location={`${report.latitude}, ${report.longitude}`}
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
  zIndex: 20,
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
};

export default Panel;