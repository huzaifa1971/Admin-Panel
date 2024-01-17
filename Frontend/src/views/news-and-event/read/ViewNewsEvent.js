import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from '../../../config';


const View = () => {
  const [newsAndEvents, setNewsAndEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsAndEventsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewsAndEvents = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/newsandevents`);
        const data = await response.json();
        console.log(data)

        if (data.status === 200) {
          setNewsAndEvents(data.message);
        } else {
          console.error('Error fetching News and Events:', data);
        }
      } catch (error) {
        console.error('An error occurred while fetching News and Events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsAndEvents();
  }, []);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (!newsAndEvents || newsAndEvents.length === 0) {
  //   return <p>No News and Events found</p>;
  // }

  const indexOfLastNewsAndEvent = currentPage * newsAndEventsPerPage;
  const indexOfFirstNewsAndEvent = indexOfLastNewsAndEvent - newsAndEventsPerPage;
  const currentNewsAndEvents = newsAndEvents.slice(indexOfFirstNewsAndEvent, indexOfLastNewsAndEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteNewsAndEvent = async (newsAndEventId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this News and Event?');

      if (confirmDelete) {
        const response = await fetch(`${config.apiUrl}/api/newsandevents/delete/${newsAndEventId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setNewsAndEvents((prevNewsAndEvents) =>
            prevNewsAndEvents.filter((newsAndEvent) => newsAndEvent.id !== newsAndEventId)
          );
          console.log('News and Event deleted successfully');
        } else {
          console.error('Error deleting News and Event:', response.statusText);
        }
      } else {
        console.log('News and Event deletion canceled');
      }
    } catch (error) {
      console.error('An error occurred while deleting News and Event:', error);
    }
  };

  const handleAddNewsAndEvent = () => {
    navigate('/newsandevent/Create'); // Update the route as needed
  };

  const handleEditNewsAndEvent = (id) => {
    const path = `/newsandevent/Update/${id}`;
    navigate(path);
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">News and Event List</h2>
      <button className="btn btn-primary mb-2" onClick={handleAddNewsAndEvent}>
        Add News and Event
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Short Description</th>
            <th scope="col">Long Description</th>
            <th scope="col">Status</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentNewsAndEvents.map((newsAndEvent) => (
            <tr key={newsAndEvent.id}>
              <td>{newsAndEvent.id}</td>
              <td>
                {newsAndEvent.image && (
                  <img
                    src={`http://127.0.0.1:8000/storage/${newsAndEvent.image}`}
                    alt={`Image for ${newsAndEvent.title}`}
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                )}
              </td>
              <td>{newsAndEvent.title}</td>
              <td>{newsAndEvent.short_description}</td>
              <td>{newsAndEvent.long_description}</td>
              <td>{newsAndEvent.is_active ? 'Active' : 'InActive'}</td>
              <td>{newsAndEvent.created_at}</td>
              <td>{newsAndEvent.updated_at}</td>
              <td>
              <button onClick={() => handleEditNewsAndEvent(newsAndEvent.id)} className="btn btn-primary me-2">
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDeleteNewsAndEvent(newsAndEvent.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination className="justify-content-center">
        {[...Array(Math.ceil(newsAndEvents.length / newsAndEventsPerPage)).keys()].map((number) => (
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
