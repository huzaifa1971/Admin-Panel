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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';


const CreateProducts = () => {
  const [categoryID, setCategoryID] = useState('');
  const [parentID, setParentID] = useState('');
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [isActive, setIsActive] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [parentCategories, setParentCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/category`);
        const data = await response.json();
        if (data.status === 200) {
          setCategories(data.message);
          setParentCategories(data.message.filter(cat => !cat.parent_id));
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

  const handleParentCategoryChange = (parentId) => {
    setParentID(parentId);
    setCategoryID('');
  };

  const handleCategoryChange = (categoryId) => {
    setCategoryID(categoryId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('category_id', categoryID);
      formData.append('parent_id', parentID);
      formData.append('name', name);
      formData.append('details', details);
      formData.append('image', image);
      formData.append('price', price);
      formData.append('weight', weight);
      formData.append('is_active', isActive);

      const response = await fetch(`${config.apiUrl}/api/product`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage('Product Added Successfully');
        navigate('/products/View');
        // Clear form fields after success
        setCategoryID('');
        setParentID('');
        setName('');
        setDetails('');
        setImage(null);
        setPrice('');
        setWeight('');
        setIsActive('');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError('An error occurred while adding Product');
    }
    if (!details) {
      setError('Details are required');
      return;
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
          Add Product
        </Typography>
        {successMessage && (
          <Typography variant="body2" color="success" sx={{ mt: 1 }}>
            {successMessage}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} encType="multipart/form-data" sx={{ mt: 1 }}>
          <InputLabel id="parentID-label">Category*</InputLabel>
          <Select
            labelId="parentID-label"
            id="parentID"
            value={parentID}
            label="Parent Category"
            onChange={(e) => handleParentCategoryChange(e.target.value)}
            fullWidth
            required
          >
            <MenuItem value="">Select Category</MenuItem>
            {parentCategories.map((parentCategory) => (
              <MenuItem key={parentCategory.id} value={parentCategory.id}>
                {parentCategory.name}
              </MenuItem>
            ))}
          </Select>

          <InputLabel id="categoryID-label">Sub Category</InputLabel>
          <Select
            labelId="categoryID-label"
            id="categoryID"
            value={categoryID}
            label="Category"
            onChange={(e) => handleCategoryChange(e.target.value)}
            fullWidth
          >
            <MenuItem value="0">Select Sub Category</MenuItem>
            {categories
              .filter((cat) => cat.parent_id === parentID)
              .map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
          </Select>

          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <InputLabel id="details-label">Details*</InputLabel>
          <CKEditor
            editor={ClassicEditor}
            data={details}
            onChange={(event, editor) => setDetails(editor.getData())}
          />

          <InputLabel id="image-label">Image*</InputLabel>
          <input
            accept="image/*"
            id="image"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="price"
            label="Price"
            name="price"
            type="number"
            autoComplete="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="weight"
            label="Weight"
            name="weight"
            type="number"
            autoComplete="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

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

          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add Product
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateProducts;
