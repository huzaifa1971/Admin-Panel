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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';


const CreateFAQ = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isActive, setIsActive] = useState(''); // '0' or '1' for the select field
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('question', question);
      formData.append('answer', answer);
      formData.append('is_active', isActive);

      const response = await fetch('http://127.0.0.1:8000/api/faq', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage('FAQ Added Successfully');
        navigate('/faq/View');
        // Clear form fields after success
        setQuestion('');
        setAnswer('');
        setIsActive('');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError('An error occurred while adding FAQ');
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
          Add FAQ
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
            id="question"
            label="Question"
            name="question"
            autoComplete="question"
            autoFocus
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <InputLabel id="answer-label">Answer*</InputLabel>
          <CKEditor
            editor={ClassicEditor}
            data={answer}
            onChange={(event, editor) => {
              const data = editor.getData();
              setAnswer(data);
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
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add FAQ
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateFAQ;
