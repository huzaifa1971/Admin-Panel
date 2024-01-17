import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem, InputLabel, Select } from '@mui/material';
import config from '../../../config';
import { useNavigate } from 'react-router-dom';


const Create = () => {
    const [firstname, setFirstName] = useState('');
    // console.log("firstname", firstname);

    const [lastname, setLastName] = useState('');
    // console.log("lastname", lastname);

    const [email, setEmail] = useState('');
    // console.log("email", email);

    const [address, setAddress] = useState('');
    // console.log("address", address);

    const [phone, setPhoneNumber] = useState('');
    // console.log("phone", phone);

    const [country, setCountry] = useState('');
    // console.log("country", country);

    const [city, setCity] = useState('');
    // console.log("city", city);

    const [message, setMessage] = useState('');
    // console.log("message", message);

    const [file, setFile] = useState(null); // File state to store the uploaded file
    // console.log("file", file);

    const [error, setError] = useState(null);
    // console.log("error", error);

    const [successMessage, setSuccessMessage] = useState(null);
    // console.log("successMessage", successMessage);
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('firstname', firstname);
            formData.append('lastname', lastname);
            formData.append('email', email);
            formData.append('address', address);
            formData.append('phone', phone);
            formData.append('country', country);
            formData.append('city', city);
            formData.append('message', message);
            formData.append('file', file); // Append the file to the FormData

            const response = await fetch(`${config.apiUrl}/api/dealer`, {
                method: 'POST',
                body: formData,
            });
            // console.log("response", response);
            if (response.ok) {
                setSuccessMessage('Dealer Created');
                navigate('/dealer/View');

            } else {
                const errorMessage = await response.text();
                console.error(errorMessage); // Log the error message to the console
                setError(errorMessage);
            }
        } catch (error) {
            console.error(error); // Log any unexpected errors to the console
            setError('An error occurred during registration');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Add Dealer
                </Typography>
                {successMessage && (
                    <Typography variant="body2" color="success" sx={{ mt: 1 }}>
                        {successMessage}
                    </Typography>
                )}
                <div>
                    <Box component="form" onSubmit={handleSubmit} encType="multipart/form-data" sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstname"
                            label="First Name"
                            name="firstname"
                            autoComplete="firstname"
                            autoFocus
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastname"
                            label="Last Name"
                            name="lastname"
                            autoComplete="lastname"
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            value={`${firstname} ${lastname}`}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="address"
                            label="Address"
                            name="address"
                            autoComplete="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <InputLabel id="country-label">Country*</InputLabel>
                        <Select
                            labelId="country-label"
                            id="country"
                            value={country}
                            label="Country"
                            onChange={(e) => setCountry(e.target.value)}
                            fullWidth
                            required
                        >
                            <MenuItem value="USA">USA</MenuItem>
                            <MenuItem value="Canada">Canada</MenuItem>
                            {/* Add more countries as needed */}
                        </Select>
                        <InputLabel id="city-label">City*</InputLabel>
                        <Select
                            labelId="city-label"
                            id="city"
                            value={city}
                            label="City"
                            onChange={(e) => setCity(e.target.value)}
                            fullWidth
                            required
                        >
                            <MenuItem value="New York">New York</MenuItem>
                            <MenuItem value="Toronto">Toronto</MenuItem>
                            {/* Add more cities as needed */}
                        </Select>
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="message"
                            label="Message"
                            name="message"
                            multiline
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        /><br /><br />
                        <label htmlFor="file">Image*</label>
                        <input
                            required
                            type="file"
                            id="file"
                            name="file"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        {error && (
                            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                {error}
                            </Typography>
                        )}
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Add Dealer
                        </Button>
                    </Box>
                </div>
            </Box>
        </Container>
    );
};

export default Create;
