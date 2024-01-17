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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import config from '../../../config';

const UpdateNewsAndEvent = () => {
  const [newsAndEvent, setNewsAndEvent] = useState({
    title: '',
    short_description: '',
    long_description: '',
    is_active: '',
    image: null,
  });


  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [existingData, setExistingData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNewsAndEvent = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/newsandevents/edit/${id}`);

        if (!response.ok) {
          console.error('Error fetching News and Event. Server response:', response.statusText);
          return;
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          const data = await response.json();
          console.log('Fetched Data:', data);
          if (data.status === 200) {
            setExistingData(data?.message);
            setNewsAndEvent({
              title: data?.newsAndEvent.title || '',
              short_description: data?.newsAndEvent.short_description || '',
              long_description: data?.newsAndEvent.long_description || '',
              is_active: data?.newsAndEvent.is_active || '',
              image: data?.newsAndEvent.image || '',
            });
          } else {
            console.error('Error fetching News and Event:', data);
          }
        } else {
          const textData = await response.text();
          console.error('Non-JSON response. Server response:', textData);
        }
      } catch (error) {
        console.error('An error occurred while fetching News and Event:', error);
      }
    };

    fetchNewsAndEvent();
  }, [id]);

  const handleUpdateNewsAndEvent = async (e) => {
    e.preventDefault();

    try {
      // Check if the required field (title) is empty
      if (!newsAndEvent.image) {
        setError('Please fill in the Image field.');
        return;
      }

      const csrftoken = getCookie('csrftoken');

      const formData = new FormData();
      formData.append('title', newsAndEvent.title || existingData.title || '');
      formData.append('short_description', newsAndEvent.short_description || existingData.short_description || '');
      formData.append('long_description', newsAndEvent.long_description || existingData.long_description || '');
      formData.append('is_active', newsAndEvent.is_active || existingData.is_active || '');
      formData.append('image', newsAndEvent.image || existingData.image || '');

      const apiUrl = `${config.apiUrl}/api/newsandevents/edit/${id}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRFToken': csrftoken,
        },
      });

      if (response.ok) {
        setSuccessMessage('News and Event Updated');
        navigate('/newsandevent/View');
      } else {
        const errorMessage = await response.text();
        console.error('Update failed. Server response:', errorMessage);
        setError('Failed to update News and Event. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred during News and Event update:', error);
      setError('An unexpected error occurred. Please try again.');
    }
    if (!newsAndEvent?.short_description || !newsAndEvent?.long_description) {
      setError('Short Description and Long Description are required');
      return;
    }
    
  };

  const handleImageChange = (e) => {
    setNewsAndEvent({ ...newsAndEvent, image: e.target.files[0] });
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
          Edit News and Event
        </Typography>
        {successMessage && (
          <Typography variant="body2" color="success" sx={{ mt: 1 }}>
            {successMessage}
          </Typography>
        )}
        <Box component="form" onSubmit={handleUpdateNewsAndEvent} encType="multipart/form-data" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            value={newsAndEvent?.title || existingData?.title || ''}
            onChange={(e) => setNewsAndEvent({ ...newsAndEvent, title: e.target.value })}
            required
          />

          <InputLabel id="shortDescription-label">Short Description*</InputLabel>
          <CKEditor
            editor={ClassicEditor}
            data={newsAndEvent?.short_description || existingData?.short_description || ''}
            onChange={(event, editor) => {
              const data = editor.getData();
              setNewsAndEvent({ ...newsAndEvent, short_description: data });
            }}
          />
          <InputLabel id="longDescription-label">Long Description*</InputLabel>
          <CKEditor
            editor={ClassicEditor}
            data={newsAndEvent?.long_description || existingData?.long_description || ''}
            onChange={(event, editor) => {
              const data = editor.getData();
              setNewsAndEvent({ ...newsAndEvent, long_description: data });
            }}
          />
          <InputLabel id="is_active-label">Status</InputLabel>
          <Select
            labelId="is_active-label"
            id="is_active"
            value={newsAndEvent?.is_active || existingData?.is_active || ''}
            label="Is Active"
            onChange={(e) => setNewsAndEvent({ ...newsAndEvent, is_active: e.target.value })}
            fullWidth
            required
          >
            <MenuItem value="1">Active</MenuItem>
            <MenuItem value="0">Inactive</MenuItem>
          </Select>

          <InputLabel id="image-label">Image</InputLabel>
          <input
            required
            accept="image/*"
            id="image"
            type="file"
            onChange={handleImageChange}
          />
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Update News and Event
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UpdateNewsAndEvent;
