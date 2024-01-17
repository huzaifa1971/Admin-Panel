import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  MenuItem,
  InputLabel,
  Select,
} from '@mui/material';
import config from '../../../config';
import { useNavigate } from 'react-router-dom';


const CreateCategories = () => {
  const [name, setName] = useState('');
  const [parentID, setParentID] = useState('0'); // '0' for no parent, set '1' if a parent is selected
  const [image, setImage] = useState(null);
  const [isActive, setIsActive] = useState(''); // '0' or '1' for the select field
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  console.log("categories", categories[0]?.name);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/category`);
        const data = await response.json();
        // console.log("data", data);
        if (data.status === 200) {
          setCategories(data.message);
        } else {
          console.error('Error fetching Categories:', data);
        }
      } catch (error) {
        console.error('An error occurred while fetching Categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('parent_id', parentID);
      formData.append('image', image);
      formData.append('is_active', isActive);

      const response = await fetch(`${config.apiUrl}/api/category`, {
        method: 'POST',
        body: formData,
      });
      console.log("response", response);
      if (response.ok) {
        setSuccessMessage('Category Added Successfully');
        navigate('/categories/View');
        // Clear form fields after success
        setName('');
        setParentID('0');
        setImage(null);
        setIsActive('');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError('An error occurred while adding Category');
    }
  };
  // console.log("parentID", parentID);
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
          Add Category
        </Typography>
        {successMessage && (
          <Typography variant="body2" color="success" sx={{ mt: 1 }}>
            {successMessage}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} encType="multipart/form-data" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputLabel id="parentID-label">Parent ID</InputLabel>
          <Select
            labelId="parentID-label"
            id="parentID"
            value={parentID}
            label="Parent ID"
            onChange={(e) => setParentID(e.target.value)}
            fullWidth
          >
            <MenuItem value="0">Select Category</MenuItem>
            {categories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <InputLabel id="isActive-label">Status*</InputLabel>
          <Select
            labelId="isActive-label"
            id="isActive"
            value={isActive}
            label="Is Active"
            onChange={(e) => setIsActive(e.target.value)}
            fullWidth
            required
          >
            <MenuItem value="1">Active</MenuItem>
            <MenuItem value="0">Inactive</MenuItem>
          </Select>
          <InputLabel id="image-label">Image*</InputLabel>
          <input
            accept="image/*"
            id="image"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add Category
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateCategories;
