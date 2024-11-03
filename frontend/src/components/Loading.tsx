import { Spinner } from "react-bootstrap";

/**
 * Loading spinner component
 */
const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <Spinner animation="grow" variant="light" />
      <p style={{ color: "#fff" }}>Searching...</p>
    </div>
  );
};

export default Loading;
