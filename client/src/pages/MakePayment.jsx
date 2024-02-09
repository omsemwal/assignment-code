


import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { payment } from "../api";
import { Link as RouterLink } from "react-router-dom";

const MakePayment = () => {
    const [senderEmail, setSenderEmail] = useState("");
    const [receiverEmail, setReceiverEmail] = useState("");
    const [amount, setAmount] = useState("");
    const [paymentStatus, setPaymentStatus] = useState(null);

    const handlePayment = async () => {
        try {
            // Call the payment API
            const response = await payment({ senderEmail, receiverEmail, amount });
            // Check if payment was successful
            if (response && response.success) {
                setPaymentStatus("Payment successful");
            } else {
                setPaymentStatus("Payment failed");
            }
        } catch (error) {
            console.error("Error making payment:", error);
            setPaymentStatus("An error occurred while processing payment");
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "95vh",
            }}
        >
            <Box
                sx={{
                    width: "400px",
                    height: "500px",
                }}
            >
                <Typography>Make a Payment</Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="senderEmail"
                    label="Sender Email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="receiverEmail"
                    label="Receiver Email"
                    value={receiverEmail}
                    onChange={(e) => setReceiverEmail(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="amount"
                    label="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handlePayment}
                    sx={{ mt: 2 }}
                >
                    Pay
                </Button>
                {/* {paymentStatus && (
                    <Typography sx={{ mt: 2 }}>
                        {paymentStatus}
                    </Typography>
                )} */}
                <Button
                    component={RouterLink}
                    to="/payment/:"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    View Payment Details
                </Button>
            </Box>
        </Box>
    );
};

export default MakePayment;
