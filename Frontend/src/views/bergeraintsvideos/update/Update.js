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

const Update = () => {
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState({
    title: '',
    description: '',
    is_active: '',
    file: null,
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log("id", id)
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/bergerpaintsvideos/edit/${id}`);
        const data = await response.json();
        console.log("data", data);
        if (data.status === 200) {
          setVideo(data.message);
        } else {
          console.error('Error fetching video:', data);
        }
        setData(data?.bergerPaintsVideo);
      } catch (error) {
        console.error('An error occurred while fetching video:', error);
      }
    };

    fetchVideo();
  }, [id]);

  const handleUpdateVideo = async (e) => {
    e.preventDefault();

    try {
      const csrftoken = getCookie('csrftoken');

      const formData = new FormData();
      console.log(formData, "formData");
      formData.append('title', video.title);
      formData.append('description', video.description);
      formData.append('is_active', video.is_active);
      formData.append('file', video.file);

      const apiUrl = `${config.apiUrl}/api/bergerpaintsvideos/edit/${id}`;

      const response = await fetch(apiUrl, {
        method: 'POST', // Use PATCH if it's appropriate for your API
        body: formData,
        headers: {
          'X-CSRFToken': csrftoken,
        },
      });

      if (response.ok) {
        setSuccessMessage('Video Updated');
        navigate('/bergeraintsvideos/View'); // Update the route as needed
      } else {
        const errorMessage = await response.text();
        console.error('Update failed. Server response:', errorMessage);
        setError('Failed to update video. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred during video update:', error);
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
          Edit Video
        </Typography>
        {successMessage && (
          <Typography variant="body2" color="success" sx={{ mt: 1 }}>
            {successMessage}
          </Typography>
        )}
        <Box component="form" onSubmit={handleUpdateVideo} encType="multipart/form-data" sx={{ mt: 1 }}>
          <TextField
            required
            margin="normal"
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            value={video?.title}
            onChange={(e) => setVideo({ ...video, title: e.target.value })}
          />
          <InputLabel id="description-label">Description*</InputLabel>
          <CKEditor
            editor={ClassicEditor}
            data={video?.description}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDescription(data);
            }}
          />
          <InputLabel id="is_active-label">Status*</InputLabel>
          <Select
            labelId="is_active-label"
            id="is_active"
            value={video?.is_active}
            label="Is Active"
            onChange={(e) => setVideo({ ...video, is_active: e.target.value })}
            fullWidth
            required
          >
            <MenuItem value="1">Active</MenuItem>
            <MenuItem value="0">Inactive</MenuItem>
          </Select>
          <InputLabel htmlFor="file">Video File*</InputLabel>
          <input
            type="file"
            id="file"
            name="file"
            accept="video/*"
            onChange={(e) => setVideo({ ...video, file: e.target.files[0] })}
            required
          />
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Update Video
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Update;
