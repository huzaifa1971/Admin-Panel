import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from '../../../config';

const View = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // `${config.apiUrl}/api/employees`
        const response = await fetch(`${config.apiUrl}/api/employees`);
        const data = await response.json();
        // console.log("data", data);
        if (data.status === 200) {
          setEmployees(data.employees);
        } else {
          console.error('Error fetching employees:', data);
        }
      } catch (error) {
        console.error('An error occurred while fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (!employees || employees.length === 0) {
  //   return <p>No employees found</p>;
  // }

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddUser = () => {
    navigate('/user/Create');
  };

  const handleDeleteUser = async (userId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');

      if (confirmDelete) {
        const response = await fetch(`${config.apiUrl}/api/employees/delete/${userId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== userId));
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
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Joining Date</th>
            <th scope="col">Joining Salary</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.joining_date}</td>
              <td>{employee.joining_salary}</td>
              <td>{employee.phone_number}</td>
              <td>{employee.is_active ? 'Active' : 'InActive'}</td>
              <td>
                <Link to={`/user/Update/${employee.id}`} className="btn btn-primary me-2">
                  Edit
                </Link>
                <button className="btn btn-danger" onClick={() => handleDeleteUser(employee.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination className="justify-content-center">
        {[...Array(Math.ceil(employees.length / employeesPerPage)).keys()].map((number) => (
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
