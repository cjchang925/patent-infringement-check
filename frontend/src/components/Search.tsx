import { useState } from "react";
import { FormControl, Button, Form } from "react-bootstrap";
import { Analysis } from "../interfaces/analysis";
import { useDispatch } from "react-redux";
import { update } from "../features/analysis";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "./Loading";

/**
 * Search page
 */
const Search = () => {
  // The patent ID for the search
  const [patentId, setPatentId] = useState("");

  // The company name for the search
  const [company, setCompany] = useState("");

  const [title] = useState("Patent Infringement Check");

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Fetches the analysis from the server and updates the store
   */
  const search = async (): Promise<void> => {
    setLoading(true);

    const analysis: Analysis = await fetch(
      `http://localhost:8080/search?patentId=${encodeURIComponent(
        patentId
      )}&companyName=${encodeURIComponent(company)}`
    ).then((res) => res.json());

    console.log(analysis);

    dispatch(update(analysis));
    setLoading(false);
    navigate("/result");
  };

  /**
   * Handles the view last analysis button click
   */
  const handleViewLastAnalysis = () => {
    const analysis = localStorage.getItem("analysis");

    if (analysis) {
      dispatch(update(JSON.parse(analysis)));
      navigate("/result");
    } else {
      alert("No analysis found. Please perform a new search.");
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div
      style={{
        width: "50%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
        className="mb-4"
      >
        {title.split("").map((letter, index) => {
          return (
            <motion.span
              key={index}
              style={{
                color: "#fff",
                fontSize: "60px",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.8 }}
        style={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Form>
          <Form.Group className="mb-3" controlId="ControlInput1">
            <Form.Label style={{ color: "#fff" }}>Patent ID</Form.Label>
            <FormControl
              type="text"
              value={patentId}
              onChange={(e) => setPatentId(e.target.value)}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="ControlTextarea1">
            <Form.Label style={{ color: "#fff" }}>Company Name</Form.Label>
            <FormControl
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Button variant="primary" onClick={() => search()}>
          Search
        </Button>
        <Button variant="success" onClick={handleViewLastAnalysis}>
          View last analysis
        </Button>
      </motion.div>
    </div>
  );
};

export default Search;
