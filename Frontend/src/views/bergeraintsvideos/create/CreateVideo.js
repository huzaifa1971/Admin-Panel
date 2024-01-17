import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem, InputLabel, Select } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import config from '../../../config';
import { useNavigate } from 'react-router-dom';


const CreateVideo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isActive, setIsActive] = useState(''); // '0' or '1' for the select field
    const [file, setFile] = useState(null); // File state to store the uploaded file
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('is_active', isActive);
            formData.append('file', file); // Append the file to the FormData

            const response = await fetch(`${config.apiUrl}/api/bergerpaintsvideos`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setSuccessMessage('Video Added Successfully');
                navigate('/bergeraintsvideos/View');
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (error) {
            setError('An error occurred during video upload');
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
                    Add Video
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
                    <InputLabel id="description-label">Description*</InputLabel>
                    <CKEditor

                        editor={ClassicEditor}
                        data={description}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setDescription(data);
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
                    <br /><br />
                    <label htmlFor="file">Video File*</label><br /><br />
                    <input
                        required
                        type="file"
                        id="file"
                        name="file"
                        accept="video/*"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    {error && (
                        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Add Video
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default CreateVideo;