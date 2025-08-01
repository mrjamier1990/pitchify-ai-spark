import React from "react";

/**
 * AuroraBackground - A full-screen background with animated, swirly aurora effect and subtle diagonal lines overlay.
 * Usage: <AuroraBackground>...content...</AuroraBackground>
 */
const AuroraBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className="aurora-bg"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Diagonal lines overlay - now behind the content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            "repeating-linear-gradient(120deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 0.5px, transparent 1px, transparent 5px)"
        }}
      />
      {/* Dark overlay to make background slightly darker */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          background: "rgba(10,16,32,0.65)"
        }}
      />
      {/* Content goes above the overlay */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          color: "#fff"
        }}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * AuroraBackgroundAuth - A full-screen background with animated, swirly aurora effect for auth pages (no dark overlay).
 * Usage: <AuroraBackgroundAuth>...content...</AuroraBackgroundAuth>
 */
const AuroraBackgroundAuth: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className="aurora-bg-auth"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Diagonal lines overlay - now behind the content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            "repeating-linear-gradient(120deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 0.5px, transparent 1px, transparent 5px)"
        }}
      />
      {/* Content goes above the overlay */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          color: "#fff"
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AuroraBackground;
export { AuroraBackgroundAuth }; 