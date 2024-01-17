import React, { useState } from 'react';
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



const CreateNewsAndEvent = () => {
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [isActive, setIsActive] = useState(''); // '0' or '1' for the select field
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('short_description', shortDescription);
      formData.append('long_description', longDescription);
      formData.append('is_active', isActive);
      formData.append('image', image);

      const response = await fetch(`${config.apiUrl}/api/newsandevents`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage('News and Event Added Successfully');
        navigate('/newsandevent/View');
        // Clear form fields after success
        setTitle('');
        setShortDescription('');
        setLongDescription('');
        setIsActive('');
        setImage(null);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError('An error occurred while adding News and Event');
    }
    if (!shortDescription) {
      setError('Short Description is required');
      return;
    }
    if (!longDescription) {
      setError('Long Description is required');
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
          Add News and Event
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
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputLabel id="shortDescription-label">Short Description*</InputLabel>
          <CKEditor
            editor={ClassicEditor}
            data={shortDescription}
            onChange={(event, editor) => {
              const data = editor.getData();
              setShortDescription(data);
            }}
          />
          <InputLabel id="longDescription-label">Long Description*</InputLabel>
          <CKEditor
            editor={ClassicEditor}
            data={longDescription}
            onChange={(event, editor) => {
              const data = editor.getData();
              setLongDescription(data);
            }}
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
            Add News and Event
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateNewsAndEvent;
