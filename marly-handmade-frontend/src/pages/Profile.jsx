import React, { useState } from "react";
import { Link } from "react-router-dom";


function Profile() {
  const [profileData, setProfileData] = useState({
    fullName: "Tom Cook",
    email: "tom.cook@example.com",
    title: "Product Manager",
    language: "English",
    dateFormat: "DD-MM-YYYY",
    autoTimezone: true,
  });

  const [isEditing, setIsEditing] = useState({
    fullName: false,
    email: false,
    title: false,
    language: false,
    dateFormat: false,
  });

  const handleUpdate = (field) => {
    setIsEditing({ ...isEditing, [field]: false });
    // Aquí irá la llamada al API para actualizar
    console.log(`Updating ${field}:`, profileData[field]);
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      
      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: "40px",
          backgroundColor: "#f5f5f5",
          marginLeft: "230px",
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            marginBottom: "10px",
            color: "#333",
            fontWeight: "400",
          }}
        >
          Profile
        </h1>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "40px" }}>
          This information will be displayed publicly so be careful what you
          share.
        </p>

        {/* Profile Section */}
        <div style={{ maxWidth: "800px" }}>
          {/* Full Name */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 0",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <span style={{ color: "#666", fontSize: "14px", width: "150px" }}>
              Full name
            </span>
            <span style={{ flex: 1, color: "#333", fontSize: "14px" }}>
              {profileData.fullName}
            </span>
            <button
              onClick={() => handleUpdate("fullName")}
              style={{
                background: "none",
                border: "none",
                color: "#0066cc",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Update
            </button>
          </div>

          {/* Email */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 0",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <span style={{ color: "#666", fontSize: "14px", width: "150px" }}>
              Email address
            </span>
            <span style={{ flex: 1, color: "#333", fontSize: "14px" }}>
              {profileData.email}
            </span>
            <button
              onClick={() => handleUpdate("email")}
              style={{
                background: "none",
                border: "none",
                color: "#0066cc",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Update
            </button>
          </div>

          {/* Title */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 0",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <span style={{ color: "#666", fontSize: "14px", width: "150px" }}>
              Title
            </span>
            <span style={{ flex: 1, color: "#333", fontSize: "14px" }}>
              {profileData.title}
            </span>
            <button
              onClick={() => handleUpdate("title")}
              style={{
                background: "none",
                border: "none",
                color: "#0066cc",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Update
            </button>
          </div>

          {/* Languages and Dates Section */}
          <h2
            style={{
              fontSize: "24px",
              marginTop: "50px",
              marginBottom: "10px",
              color: "#333",
              fontWeight: "400",
            }}
          >
            Languages and dates
          </h2>
          <p style={{ fontSize: "14px", color: "#666", marginBottom: "30px" }}>
            Choose what language and date format to use throughout your account.
          </p>

          {/* Language */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 0",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <span style={{ color: "#666", fontSize: "14px", width: "150px" }}>
              Language
            </span>
            <span style={{ flex: 1, color: "#333", fontSize: "14px" }}>
              {profileData.language}
            </span>
            <button
              onClick={() => handleUpdate("language")}
              style={{
                background: "none",
                border: "none",
                color: "#0066cc",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Update
            </button>
          </div>

          {/* Date Format */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 0",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <span style={{ color: "#666", fontSize: "14px", width: "150px" }}>
              Date format
            </span>
            <span style={{ flex: 1, color: "#333", fontSize: "14px" }}>
              {profileData.dateFormat}
            </span>
            <button
              onClick={() => handleUpdate("dateFormat")}
              style={{
                background: "none",
                border: "none",
                color: "#0066cc",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Update
            </button>
          </div>

          {/* Automatic Timezone */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 0",
            }}
          >
            <span style={{ color: "#666", fontSize: "14px", width: "150px" }}>
              Automatic timezone
            </span>
            <div style={{ flex: 1 }}></div>
            <label
              style={{
                position: "relative",
                display: "inline-block",
                width: "50px",
                height: "24px",
              }}
            >
              <input
                type="checkbox"
                checked={profileData.autoTimezone}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    autoTimezone: e.target.checked,
                  })
                }
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: profileData.autoTimezone
                    ? "#0066cc"
                    : "#ccc",
                  transition: "0.4s",
                  borderRadius: "24px",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    content: "",
                    height: "18px",
                    width: "18px",
                    left: profileData.autoTimezone ? "28px" : "3px",
                    bottom: "3px",
                    backgroundColor: "white",
                    transition: "0.4s",
                    borderRadius: "50%",
                  }}
                ></span>
              </span>
            </label>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
