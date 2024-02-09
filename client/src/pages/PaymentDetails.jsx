
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getPayment } from "../api";

const PaymentDetails = () => {
  const [details, setDetails] = useState([]);
  const [emailInput, setEmailInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { email } = useParams();

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await getPayment(email);
        if (response && response.success) {
          setDetails(response.data || []);
          setError("");
        } else {
          throw new Error("Failed to retrieve payment details");
        }
      } catch (error) {
        console.error("Error fetching payment details:", error);
        setError("No payments found for this email");
      }
    }

    fetchDetails();
  }, [email]);

  const handleEmailInputChange = (event) => {
    setEmailInput(event.target.value);
  };

  const handleFetchDetails = async () => {
    try {
      const response = await getPayment(emailInput);
      if (response && response.success) {
        setDetails(response.data || []);
        setError("");
      } else {
        throw new Error("Failed to retrieve payment details");
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
      setError("No payments found for this email");
    }
  };

  const rows = Array.isArray(details)
    ? details.map((detail) => ({
        ...detail,
        id: detail._id,
      }))
    : [];

  const columns = [
    { field: "senderEmail", headerName: "Sender Email", width: 120,alignItems:"center"},
    { field: "receiverEmail", headerName: "Receiver Email", width: 120 },
    { field: "amount", headerName: "Amount", width: 120 },
    { field: "status", headerName: "Status", width: 110 },
  ];

  const makePayment = () => {
    navigate("/make-payment");
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: 2,
        }}
      >
        <TextField
          label="Enter Email"
          value={emailInput}
          onChange={handleEmailInputChange}
          variant="outlined"
          sx={{ marginRight: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleFetchDetails}
          sx={{ marginRight: 2 }}
        >
          Fetch Details
        </Button>
        <Button variant="contained" onClick={makePayment}>
          Make a Payment
        </Button>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100px",
        }}
      >
        <Typography
          sx={{
            backgroundColor: "#f4df4dff",
            color: "#949398ff",
            padding: "10px 100px 10px 100px",
            borderRadius: "10px",
          }}
        >
          Payment Details
        </Typography>
      </Box>
      <Box
        sx={{
          width: "80%",
          margin: "0 auto",
        }}
      >
        {error ? (
          <Typography variant="body1" color="error" align="center">
            {error}
          </Typography>
        ) : (
          <Box
            sx={{
              height: 500,
              width: "100%",
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              disableRowSelectionOnClick
              hideFooter
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PaymentDetails;


