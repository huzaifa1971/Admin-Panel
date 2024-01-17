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


const UpdateFAQ = () => {
  const [faq, setFAQ] = useState({
    question: '',
    answer: '',
    is_active: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/faq/edit/${id}`);
        const data = await response.json();
        console.log(data);
        if (data.status === 200) {
          setFAQ(data.faq);
        } else {
          console.error('Error fetching FAQ:', data);
        }
        setData(data?.faq);
      } catch (error) {
        console.error('An error occurred while fetching FAQ:', error);
      }
    };

    fetchFAQ();
  }, [id]);

  const handleUpdateFAQ = async (e) => {
    e.preventDefault();

    try {
      const csrftoken = getCookie('csrftoken');

      const formData = new FormData();
      formData.append('question', faq.question);
      formData.append('answer', faq.answer);
      formData.append('is_active', faq.is_active);

      const apiUrl = `${config.apiUrl}/api/faq/edit/${id}`;

      const response = await fetch(apiUrl, {
        method: 'POST', // Use PATCH if it's appropriate for your API
        body: formData,
        headers: {
          'X-CSRFToken': csrftoken,
        },
      });

      if (response.ok) {
        setSuccessMessage('FAQ Updated');
        navigate('/faq/View'); // Update the route as needed
      } else {
        const errorMessage = await response.text();
        console.error('Update failed. Server response:', errorMessage);
        setError('Failed to update FAQ. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred during FAQ update:', error);
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
          Edit FAQ
        </Typography>
        {successMessage && (
          <Typography variant="body2" color="success" sx={{ mt: 1 }}>
            {successMessage}
          </Typography>
        )}
        <Box component="form" onSubmit={handleUpdateFAQ} encType="multipart/form-data" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            required
            id="question"
            name="question"
            autoComplete="question"
            value={faq?.question}
            onChange={(e) => setFAQ({ ...faq, question: e.target.value })}
          />
          <InputLabel id="answer-label">Answer*</InputLabel>
          <CKEditor
            editor={ClassicEditor}
            data={faq.answer}
            onChange={(event, editor) => {
              const answer = editor.getData();
              setFAQ({ ...faq, answer });
            }}
          />
          <InputLabel id="is_active-label">Status*</InputLabel>
          <Select
            labelId="is_active-label"
            id="is_active"
            value={faq?.is_active}
            label="Is Active"
            onChange={(e) => setFAQ({ ...faq, is_active: e.target.value })}
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
            Update FAQ
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UpdateFAQ;
