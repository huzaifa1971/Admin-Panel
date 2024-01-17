import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import config from '../../../config';


const Update = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    joining_date: '',
    is_active: '',
    joining_salary: '',
    phone_number: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams(); // Use useParams to get route parameters

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/employees/edit/${id}`);
        const data = await response.json();

        if (data.status === 200) {
          setEmployee(data.employee);
        } else {
          console.error('Error fetching employee:', data);
        }
      } catch (error) {
        console.error('An error occurred while fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  // ... (previous code)

  const handleUpdateEmployee = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${config.apiUrl}/api/employees/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        setSuccessMessage('Employee Updated');
        // Redirect to the employee list page after successful update
        navigate('/user/View');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError('An error occurred during employee update');
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
        <Box component="form" onSubmit={handleUpdateEmployee} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={employee.name}
            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={employee.email}
            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="joiningDate"
            label="Joining Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={employee.joining_date}
            onChange={(e) => setEmployee({ ...employee, joining_date: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="joiningSalary"
            label="Joining Salary"
            type="number"
            value={employee.joining_salary}
            onChange={(e) => setEmployee({ ...employee, joining_salary: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            type="tel"
            value={employee.phone_number}
            onChange={(e) => setEmployee({ ...employee, phone_number: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            value={employee.password}
            onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
          />

          <InputLabel id="isActive-label">Status*</InputLabel>
          <Select
            labelId="isActive-label"
            id="isActive"
            value={employee.is_active}
            label="Is Active"
            onChange={(e) => setEmployee({ ...employee, is_active: e.target.value })}
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

export default Update;
