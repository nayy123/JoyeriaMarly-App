import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";
import orcaVideo from "../assets/retorno.mp4";
import heroImg from "../assets/hero1.png";

interface HeroProps {
  texto: boolean;
}

export default function Hero({ texto }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnd = () => {
      setTimeout(() => setShowVideo(false), 400);
    };

    video.addEventListener("ended", handleEnd);
    return () => video.removeEventListener("ended", handleEnd);
  }, []);

  return (
    <section
      className={styles.hero}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Video */}
      {showVideo && (
        <video
          ref={videoRef}
          src={orcaVideo}
          autoPlay
          muted
          playsInline
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            top: 0,
            left: 0,
            zIndex: 0,
            opacity: showVideo ? 1 : 0,
            transition: "opacity 0.5s ease-out",
          }}
        ></video>
      )}

      {/* Dos capas sobre el video */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "50%",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {texto && (
          <div
            className="textHeroLanding"
            style={{
              position: "relative",
              zIndex: 2, // sobre las capas
              color: "white",
              textAlign: "center",
              top: "10%",
              transform: "translateY(-50%)",
            }}
          >
            <h1 className="textDisruptive" style={{ letterSpacing: "2px" }}>NEW COLLECTION</h1>
            <p style={{ marginTop: "1rem" }}>
              Jewelry with a sea soul. Art you carry with you
            </p>
          </div>
        )}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100vw",
          height: "50%",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {texto && (
          <div
            className="textHeroLanding"
            style={{
              position: "relative",
              zIndex: 2, // sobre las capas
              color: "white",
              textAlign: "center",
              top: "10%",
              transform: "translateY(-50%)",
            }}
          >
            <a href="/product/sea-collection">
              <button
                style={{
                  marginTop: "1.5rem",
                  padding: "0.8rem 1.5rem",
                  border: "none",
                  backgroundColor: "white",
                  color: "black",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Buy now
              </button>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
