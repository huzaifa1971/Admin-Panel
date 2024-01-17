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

const UpdateCategories = () => {
  const [category, setCategory] = useState({
    name: '',
    parent_id: '',
    image: null,
    is_active: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [existingData, setExistingData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [parentID, setParentID] = useState('0'); // '0' for no parent, set '1' if a parent is selected
  // const [successMessage, setSuccessMessage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/category`);
        const data = await response.json();
        console.log("data", data);
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

  useEffect(() => {
    const fetchCategory = async () => {
      try {

        const response = await fetch(`${config.apiUrl}/api/category/edit/${id}`);

        if (!response.ok) {
          console.error('Error fetching Category. Server response:', response.statusText);
          return;
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          const data = await response.json();
          console.log('Fetched Data:', data);
          if (data.status === 200) {
            setExistingData(data?.message);
            setCategory({
              name: data?.category.name || '',
              parent_id: data?.category.parent_id || '',
              image: data?.category.image || '',
              is_active: data?.category.is_active || '',
            });
          } else {
            console.error('Error fetching Category:', data);
          }
        } else {
          const textData = await response.text();
          console.error('Non-JSON response. Server response:', textData);
        }
      } catch (error) {
        console.error('An error occurred while fetching Category:', error);
      }


    };


    fetchCategory();
  }, [id]);

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
  
    try {
      // Check if the required field (name) is empty
      if (!category.image) {
        setError('Please fill in the Image field.');
        return;
      }
  
      const csrftoken = getCookie('csrftoken');
  
      const formData = new FormData();
      formData.append('name', category.name || existingData.name || '');
      formData.append('parent_id', parentID || existingData.parent_id || ''); // Updated line
      formData.append('image', category.image || existingData.image || '');
      formData.append('is_active', category.is_active || existingData.is_active || '');
  
      const apiUrl = `${config.apiUrl}/api/category/edit/${id}`;
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRFToken': csrftoken,
        },
      });
  
      if (response.ok) {
        setSuccessMessage('Category Updated');
        navigate('/categories/view');
      } else {
        const errorMessage = await response.text();
        console.error('Update failed. Server response:', errorMessage);
        setError('Failed to update Category. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred during Category update:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };
  

  const handleImageChange = (e) => {
    setCategory({ ...category, image: e.target.files[0] });
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
          Edit Category
        </Typography>
        {successMessage && (
          <Typography variant="body2" color="success" sx={{ mt: 1 }}>
            {successMessage}
          </Typography>
        )}
        <Box component="form" onSubmit={handleUpdateCategory} encType="multipart/form-data" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            required
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            value={category?.name || existingData?.name || ''}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
          />

          <InputLabel id="parent_id-label">Parent ID</InputLabel>
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
          <InputLabel id="is_active-label">Status*</InputLabel>
          <Select
            labelId="is_active-label"
            id="is_active"
            value={category?.is_active || existingData?.is_active || ''}
            label="Is Active"
            onChange={(e) => setCategory({ ...category, is_active: e.target.value })}
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
            onChange={handleImageChange}
            required
          />
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Update Category
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UpdateCategories;
