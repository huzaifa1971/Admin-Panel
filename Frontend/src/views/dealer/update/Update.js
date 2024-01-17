import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import config from '../../../config';


const Update = () => {
  const [dealer, setDealer] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    phone: '',
    country: '',
    city: '',
    message: '',
    file: null,
  });
  // console.log(dealer.firstname, dealer.lastname, dealer.email, dealer.address, dealer.phone,);
  // console.log("dealer", dealer);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchDealer = async () => {
      try {
        const response = await fetch(
          `${config.apiUrl}/api/dealer/edit/${id}`
        );
        console.log(response);
        const data = await response.json();
        console.log(data.message);
        if (data.status === 200) {
          setDealer(data.message);
        } else {
          console.error('Error fetching dealer:', data);
        }
        setData(data?.Dealer);
      } catch (error) {
        console.error('An error occurred while fetching dealer:', error);
      }
    };

    fetchDealer();
  }, [id]);

  const handleUpdateDealer = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('firstname', dealer.firstname);
      formData.append('lastname', dealer.lastname);
      formData.append('email', dealer.email);
      formData.append('address', dealer.address);
      formData.append('phone', dealer.phone);
      formData.append('country', dealer.country);
      formData.append('city', dealer.city);
      formData.append('message', dealer.message);
      formData.append('file', dealer.file, dealer.file.name);
      const csrftoken = window.csrfToken;
      console.log('formdat=>', dealer);
      // const apiUrl = `${config.apiUrl}/api/dealer/edit/${id}`;
      const dealerData = JSON.stringify(dealer);
      const response = await fetch(`${config.apiUrl}/api/dealer/edit/${id}`, {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': csrftoken,
        },
        body: formData, // Send FormData
      });
      
      console.log("response", response);
      // const response_ = await fetch(apiUrl, {
      //   method: 'PUT', // Use PATCH if it's appropriate for your API
      //   body: formData,
      //   headers: {
      //     'X-CSRFToken': csrftoken,
      //   },
      // });

      if (response.ok) {
        setSuccessMessage('Contact Updated');
        navigate('/dealer/View');
      } else {
        const errorMessage = await response.text();
        console.error('Update failed. Server response:', errorMessage);
        setError('Failed to update contact. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred during contact update:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

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
          Edit Dealer
        </Typography>
        {successMessage && (
          <Typography variant="body2" color="success" sx={{ mt: 1 }}>
            {successMessage}
          </Typography>
        )}
        <Box component="form" onSubmit={handleUpdateDealer} encType="multipart/form-data" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            required
            id="firstname"
            label="First Name"
            name="firstname"
            autoComplete="firstname"
            value={dealer?.firstname}
            onChange={(e) => setDealer((prevDealer) => ({ ...prevDealer, firstname: e.target.value }))}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            id="lastname"
            label="Last Name"
            name="lastname"
            autoComplete="lastname"
            value={dealer?.lastname}
            onChange={(e) => setDealer((prevDealer) => ({ ...prevDealer, lastname: e.target.value }))}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={dealer?.email}
            onChange={(e) => setDealer((prevDealer) => ({ ...prevDealer, email: e.target.value }))}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            id="address"
            label="Address"
            name="address"
            autoComplete="address"
            value={dealer?.address}
            onChange={(e) => setDealer((prevDealer) => ({ ...prevDealer, address: e.target.value }))}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            id="phone"
            label="Phone Number"
            name="phone"
            type="tel"
            value={dealer?.phone}
            onChange={(e) => setDealer((prevDealer) => ({ ...prevDealer, phone: e.target.value }))}
          />
          <InputLabel id="country-label">Country*</InputLabel>
          <Select
            labelId="country-label"
            id="country"
            value={dealer?.country}
            label="Country"
            onChange={(e) => setDealer((prevDealer) => ({ ...prevDealer, country: e.target.value }))}
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
            value={dealer?.city}
            label="City"
            onChange={(e) => setDealer((prevDealer) => ({ ...prevDealer, city: e.target.value }))}
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
            value={dealer?.message}
            onChange={(e) => setDealer((prevDealer) => ({ ...prevDealer, message: e.target.value }))}
          />
          <InputLabel htmlFor="file">Image*</InputLabel>
          <input
            required
            type="file"
            id="file"
            name="file"
            accept="image/*"
            onChange={(e) =>
              setDealer((prevDealer) => ({
                ...prevDealer,
                file: e.target.files[0],
              }))
            }
          />
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Update Dealer
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Update;
