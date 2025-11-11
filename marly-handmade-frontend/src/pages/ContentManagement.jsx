import React, { useState } from "react";
import { Link } from "react-router-dom";


function ContentManagement() {
  const [aboutContent, setAboutContent] = useState({
    title: "About MARLY's World",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    makerName: "Meet the Maker",
    makerDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  });

  const [collections, setCollections] = useState([
    { id: 1, name: "Collection 1", code: "#66995566" },
    { id: 2, name: "Collection 2", code: "#66995667" },
    { id: 3, name: "Collection 3", code: "#66995802" },
    { id: 4, name: "Collection 4", code: "#66995866" },
    { id: 5, name: "Collection 5", code: "#66660850" },
    { id: 6, name: "Collection 6", code: "#66660852" },
  ]);

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
            marginBottom: "40px",
            color: "#333",
            fontWeight: "400",
          }}
        >
          Content Management
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px",
          }}
        >
          {/* About MARLY's World */}
          <div
            style={{
              background: "white",
              borderRadius: "8px",
              padding: "30px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              position: "relative",
            }}
          >
            <div
              style={{
                border: "2px dashed #ddd",
                borderRadius: "8px",
                padding: "20px",
                minHeight: "400px",
              }}
            >
              {/* Video Player Mockup */}
              <div
                style={{
                  background: "#f0f0f0",
                  borderRadius: "4px",
                  padding: "10px",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    background: "#ddd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ▶
                </div>
                <div
                  style={{
                    flex: 1,
                    height: "4px",
                    background: "#ddd",
                    borderRadius: "2px",
                  }}
                >
                  <div
                    style={{
                      width: "30%",
                      height: "100%",
                      background: "#666",
                      borderRadius: "2px",
                    }}
                  ></div>
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#666"
                  strokeWidth="2"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              </div>

              <h3
                style={{
                  fontSize: "18px",
                  margin: "20px 0 10px 0",
                  color: "#333",
                }}
              >
                About MARLY's World
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "#666",
                  lineHeight: "1.6",
                  marginBottom: "20px",
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <div
                style={{ display: "flex", gap: "20px", marginBottom: "20px" }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "120px",
                    border: "2px dashed #ddd",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "40px",
                    color: "#ddd",
                  }}
                >
                  👤
                </div>
                <div style={{ flex: 1 }}>
                  <h4
                    style={{
                      fontSize: "16px",
                      margin: "0 0 10px 0",
                      color: "#333",
                    }}
                  >
                    Meet the Maker
                  </h4>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      lineHeight: "1.5",
                      margin: 0,
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipiscing elit sed
                    do eiusmod tempor incididunt ut labore et dolore.
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#999",
                      marginTop: "10px",
                    }}
                  >
                    #66995802 #66995802
                  </p>
                </div>
              </div>

              <p style={{ fontSize: "12px", color: "#666", lineHeight: "1.6" }}>
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Duis
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur.
              </p>
            </div>

            <button
              style={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "2px solid #333",
                background: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#333"
                strokeWidth="2"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          </div>

          {/* NEW COLLECTION */}
          <div
            style={{
              background: "white",
              borderRadius: "8px",
              padding: "30px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              position: "relative",
            }}
          >
            <div
              style={{
                border: "2px dashed #ddd",
                borderRadius: "8px",
                padding: "20px",
                minHeight: "400px",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 20px",
                  borderBottom: "1px solid #e0e0e0",
                  marginBottom: "30px",
                }}
              >
                <h2
                  style={{
                    fontSize: "32px",
                    margin: "0 0 20px 0",
                    color: "#333",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                  }}
                >
                  NEW COLLECTION
                </h2>
                <button
                  style={{
                    background: "#333",
                    color: "white",
                    border: "none",
                    padding: "10px 30px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  Buy now
                </button>
              </div>

              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    marginBottom: "15px",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <h3
                style={{
                  fontSize: "18px",
                  margin: "20px 0",
                  color: "#333",
                  textAlign: "center",
                }}
              >
                MARLY Collections
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "15px",
                }}
              >
                {collections.map((col) => (
                  <div
                    key={col.id}
                    style={{
                      border: "2px dashed #ddd",
                      aspectRatio: "1",
                      borderRadius: "4px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "40px",
                      color: "#ddd",
                    }}
                  >
                    <div style={{ fontSize: "40px" }}>✕</div>
                    <div
                      style={{
                        fontSize: "10px",
                        color: "#999",
                        marginTop: "5px",
                      }}
                    >
                      {col.code}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              style={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "2px solid #333",
                background: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#333"
                strokeWidth="2"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ContentManagement;
