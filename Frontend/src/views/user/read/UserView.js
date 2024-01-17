import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from '../../../config';

const UserView = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/users`);
        const data = await response.json();
        if (data.status === 200) {
          setUsers(data.users);
        } else {
          console.error('Error fetching users:', data);
        }
      } catch (error) {
        console.error('An error occurred while fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddUser = () => {
    navigate('/users/Create');
  };

  const handleDeleteUser = async (userId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');

      if (confirmDelete) {
        const response = await fetch(`${config.apiUrl}/api/users/delete/${userId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
          console.log('User deleted successfully');
        } else {
          console.error('Error deleting user:', response.statusText);
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
      <h2 className="text-center mb-4">User List</h2>
      <button className="btn btn-primary mb-2" onClick={handleAddUser}>
        Add User
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Is Active</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>{user.is_active ? 'Active' : 'Inactive'}</td>
              <td>{user.created_at}</td>
              <td>{user.updated_at}</td>
              <td>
                <Link to={`/users/Update/${user.id}`} className="btn btn-primary me-2">
                  Edit
                </Link>
                <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination className="justify-content-center">
        {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map((number) => (
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

export default UserView;
