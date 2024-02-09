


import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { Link as Lin, useNavigate } from "react-router-dom"; // Import useNavigate
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import { signupUser } from "../api";

const defaultTheme = createTheme();

export default function SignUp() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [razorPayId, setRazorPayId] = React.useState("");
    const navigate = useNavigate(); // Get navigate function from react-router-dom
    const [error, setError] = React.useState(""); // State to hold the error message

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await signupUser({ email, password, razorpayAccountId: razorPayId });
            if (response.success) {
                // Signup successful, redirect to make-payment page
                navigate("/make-payment");
            } else {
                // Signup failed, set error message
                setError("Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            // Show an error message to the user
            setError("Signup failed. Please try again.");
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <AssignmentIndOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign Up
                    </Typography>
                    <Box
                        component='form'
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='razorPayId'
                            label='Razor Pay Id'
                            id='razorPayId'
                            value={razorPayId}
                            onChange={(e) => setRazorPayId(e.target.value)}
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                            disabled={email === "" || password === "" || razorPayId === ""}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href='#' variant='body2'>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Lin to={"/login"}>
                                    <Link href='#' variant='body2'>
                                        {"Already have an account? Log in"}
                                    </Link>
                                </Lin>
                            </Grid>
                        </Grid>
                        {error && (
                            <Typography variant='body2' color='error' align='center'>
                                {error}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
