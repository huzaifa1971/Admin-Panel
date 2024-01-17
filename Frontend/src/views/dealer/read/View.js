import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from '../../../config';

const View = () => {
  const [dealer, setDealer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dealerPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDealer = async () => {
      try {
        // `${config.apiUrl}/api/employees`
        const response = await fetch(`${config.apiUrl}/api/dealer`);
        const data = await response.json();


        if (data.status === 200) {
          setDealer(data.message);
        } else {
          console.error('Error fetching dealer:', data);
        }
      } catch (error) {
        console.error('An error occurred while fetching dealer:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDealer();
  }, []);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (!dealer || dealer.length === 0) {
  //   return <p>No dealer found</p>;
  // }

  const indexOfLastDealer = currentPage * dealerPerPage;
  const indexOfFirstDealer = indexOfLastDealer - dealerPerPage;
  const currentDealer = dealer.slice(indexOfFirstDealer, indexOfLastDealer);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddUser = () => {
    navigate('/dealer/Create');
  };

  const handleDeleteUser = async (userId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');

      if (confirmDelete) {
        const response = await fetch(`${config.apiUrl}/api/dealer/delete/${userId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setDealer((prevDealer) => prevDealer.filter((dealer) => dealer.id !== userId));
          console.log('Dealer deleted successfully');
        } else {
          console.error('Error deleting dealer:', response.statusText);
        }
      } else {
        console.log('User deletion canceled');
      }
    } catch (error) {
      console.error('An error occurred while deleting user:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Dealer List</h2>
      <button className="btn btn-primary mb-2" onClick={handleAddUser}>
        Add Dealer
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Image</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Address</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Country</th>
            <th scope="col">City</th>
            <th scope="col">Message</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentDealer.map((dealer) => (
            <tr key={dealer.id}>
              <td>{dealer.id}</td>
              <td>
                <img
                  src={`http://127.0.0.1:8000/storage/${dealer.file}`} // Adjust this path based on your image storage structure
                  alt="Dealer Image"
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
              </td>
              <td>{dealer.firstname}</td>
              <td>{dealer.lastname}</td>
              <td>{dealer.address}</td>
              <td>{dealer.email}</td>
              <td>{dealer.phone}</td>
              <td>{dealer.country}</td>
              <td>{dealer.city}</td>
              <td>{dealer.message}</td>
              <td>
                <Link to={`/dealer/Update/${dealer.id}`} className="btn btn-primary me-2">
                  Edit
                </Link>
                <button className="btn btn-danger" onClick={() => handleDeleteUser(dealer.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination className="justify-content-center">
        {[...Array(Math.ceil(dealer.length / dealerPerPage)).keys()].map((number) => (
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
