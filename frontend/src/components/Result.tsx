import { useSelector } from "react-redux";
import { analysis } from "../features/analysis";
import { Analysis } from "../interfaces/analysis";
import { Card, Badge, ListGroup, Stack, Button } from "react-bootstrap";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const analysisResult: Analysis = useSelector(analysis);

  const navigate = useNavigate();

  /**
   * Navigates back to the search page
   */
  const goBack = () => {
    navigate("/");
  };

  /**
   * Save the analysis to local storage
   */
  const save = () => {
    localStorage.setItem("analysis", JSON.stringify(analysisResult));

    alert("Analysis saved successfully!");
  };

  return (
    <div
      style={{
        width: "80%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "10%",
      }}
    >
      <h1>Patent Infringement Analysis</h1>
      <Stack
        className="mb-5"
        direction="horizontal"
        gap={3}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          position: "relative",
        }}
      >
        <Button
          variant="secondary"
          style={{ position: "absolute", left: "0" }}
          onClick={goBack}
        >
          <IoArrowBackOutline size={20} />
        </Button>
        <p>
          Company:{" "}
          <span style={{ fontWeight: "bold" }}>
            {analysisResult.company_name}
          </span>
        </p>
        <p>
          Patent ID:{" "}
          <span style={{ fontWeight: "bold" }}>{analysisResult.patent_id}</span>
        </p>
        <p>
          Date:{" "}
          <span style={{ fontWeight: "bold" }}>
            {analysisResult.analysis_date}
          </span>
        </p>
        <Button
          variant="success"
          style={{ position: "absolute", right: "0" }}
          onClick={save}
        >
          Save
        </Button>
      </Stack>

      <h3 style={{ width: "100%" }} className="mb-3">
        Overall Risk Assessment
      </h3>

      <p style={{ width: "100%" }} className="mb-5">
        {analysisResult.overall_risk_assessment}
      </p>

      {analysisResult.top_infringing_products.length ? (
        <>
          <h3 style={{ width: "100%" }} className="mb-3">
            Top 2 Infringing Products
          </h3>

          <Stack
            direction="horizontal"
            gap={3}
            style={{ display: "flex", alignItems: "flex-start" }}
          >
            {analysisResult.top_infringing_products.map((product) => (
              <Card
                key={product.product_name}
                className="mb-3"
                bg="dark"
                text="white"
              >
                <Card.Body>
                  <Card.Title style={{ fontSize: "24px" }}>
                    {product.product_name}
                  </Card.Title>
                  <Card.Title className="mb-3">
                    {product.infringement_likelihood === "High" && (
                      <Badge bg="danger">High Infringement Risk</Badge>
                    )}
                    {product.infringement_likelihood === "Moderate" && (
                      <Badge bg="warning" style={{ color: "black" }}>
                        Moderate Infringement Risk
                      </Badge>
                    )}
                    {product.infringement_likelihood === "Low" && (
                      <Badge bg="secondary" style={{ color: "#fff" }}>
                        Low Infringement Risk
                      </Badge>
                    )}
                  </Card.Title>
                  <Card.Text className="mb-4">{product.explanation}</Card.Text>
                  <Card.Subtitle style={{ fontSize: "18px" }} className="mb-2">
                    Relevant Claims
                  </Card.Subtitle>
                  <Card.Text className="mb-4">
                    Claim {product.relevant_claims.join(", ")}
                  </Card.Text>
                  <Card.Subtitle style={{ fontSize: "18px" }} className="mb-2">
                    Specific Features
                  </Card.Subtitle>
                  <ListGroup>
                    {product.specific_features.map((feature, index) => (
                      <ListGroup.Item
                        key={index}
                        className="bg-dark text-white"
                      >
                        {feature}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            ))}
          </Stack>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Result;
