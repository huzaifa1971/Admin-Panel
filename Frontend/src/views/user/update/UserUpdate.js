import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import config from '../../../config';


const UserUpdate = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    is_active: '',
    phone_number: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams(); // Use useParams to get route parameters

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/users/edit/${id}`);
        const data = await response.json();
        console.log(data);

        if (data.status === 200) {
          setUser(data.user);
        } else {
          console.error('Error fetching user:', data);
        }
      } catch (error) {
        console.error('An error occurred while fetching user:', error);
      }
    };

    fetchuser();
  }, [id]);

  // ... (previous code)

  const handleUpdateuser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${config.apiUrl}/api/users/edit/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setSuccessMessage('user Updated');
        // Redirect to the user list page after successful update
        navigate('/users/View');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError('An error occurred during user update');
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
          Edit User
        </Typography>
        {successMessage && (
          <Typography variant="body2" color="success" sx={{ mt: 1 }}>
            {successMessage}
          </Typography>
        )}
        <Box component="form" onSubmit={handleUpdateuser} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            type="tel"
            value={user.phone_number}
            onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
          />

          <InputLabel id="isActive-label">Status*</InputLabel>
          <Select
            labelId="isActive-label"
            id="isActive"
            value={user.is_active}
            label="Is Active"
            onChange={(e) => setUser({ ...user, is_active: e.target.value })}
            fullWidth
            required

          >
            <MenuItem value="1">Active</MenuItem>
            <MenuItem value="0">Inactive</MenuItem>
          </Select>
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Update User
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UserUpdate;
