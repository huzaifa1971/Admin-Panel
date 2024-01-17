import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from '../../../config';

const View = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/bergerpaintsvideos`);
        const data = await response.json();
        console.log(data)


        if (data.status === 200) {
          setVideos(data.message);
        } else {
          console.error('Error fetching videos:', data);
        }
      } catch (error) {
        console.error('An error occurred while fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (!videos || videos.length === 0) {
  //   return <p>No videos found</p>;
  // }

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddVideo = () => {
    navigate('/create/CreateVideo');
  };

  const handleEdit = (id) => {
    const path = `/videos/Update/${id}`;
    navigate(path);
  }
  const handleDeleteVideo = async (videoId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this video?');

      if (confirmDelete) {
        const response = await fetch(`${config.apiUrl}/api/bergerpaintsvideos/delete/${videoId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
          console.log('Video deleted successfully');
        } else {
          console.error('Error deleting video:', response.statusText);
        }
      } else {
        console.log('Video deletion canceled');
      }
    } catch (error) {
      console.error('An error occurred while deleting video:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Video List</h2>
      <button className="btn btn-primary mb-2" onClick={handleAddVideo}>
        Add Video
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Video</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentVideos.map((video) => (
            <tr key={video.id}>
              <td>{video.id}</td>
              <td>
                {video.file && (
                  <video width="200" height="150" controls>
                    <source
                      src={`http://127.0.0.1:8000/storage/${video.file}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                )}
              </td>
              <td>{video.title}</td>
              <td>{video.description}</td>
              <td>{video.is_active ? 'Active' : 'InActive'}</td>
              <td>{video.created_at}</td>
              <td>{video.updated_at}</td>
              <td>
                <Button onClick={() => handleEdit(video.id)} className="btn btn-primary me-2">
                  Edit
                </Button>
                <button className="btn btn-danger" onClick={() => handleDeleteVideo(video.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination className="justify-content-center">
        {[...Array(Math.ceil(videos.length / videosPerPage)).keys()].map((number) => (
          <Pagination.Item
            key={number + 1}
            active={number + 1 === currentPage}
            onClick={() => paginate(number + 1)}
          >
            {number + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default View;
