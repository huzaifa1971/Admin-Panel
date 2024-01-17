import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from '../../../config';

const ViewCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/category`);
        const data = await response.json();

        if (data.status === 200) {
          setCategories(data.message);
        } else {
          console.error('Error fetching Categories:', data);
        }
      } catch (error) {
        console.error('An error occurred while fetching Categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (!categories || categories.length === 0) {
  //   return <p>No Categories found</p>;
  // }

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditCategory = (id) => {
    const path = `/categories/update/${id}`;
    navigate(path);
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this Category?');

      if (confirmDelete) {
        const response = await fetch(`${config.apiUrl}/api/category/delete/${categoryId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setCategories((prevCategories) =>
            prevCategories.filter((category) => category.id !== categoryId)
          );
          console.log('Category deleted successfully');
        } else {
          console.error('Error deleting Category:', response.statusText);
        }
      } else {
        console.log('Category deletion canceled');
      }
    } catch (error) {
      console.error('An error occurred while deleting Category:', error);
    }
  };
  console.log("categories", categories);
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Category List</h2>
      <button className="btn btn-primary mb-2" onClick={() => navigate('/categories/create')}>
        Add Category
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCategories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>

              <td>
                {category.image && (
                  <img
                    src={`http://127.0.0.1:8000/storage/${category.image}`}
                    alt={`Image for ${category.name}`}
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                )}
              </td>
              <td>{category.name}</td>
              <td>
                {category.parent_id
                  ? categories.find((c) => c.id === category.parent_id)?.name || '-'
                  : '-'}
              </td>
              <td>{category.is_active ? 'Active' : 'Inactive'}</td>
              <td>
                <button onClick={() => handleEditCategory(category.id)} className="btn btn-primary me-2">
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDeleteCategory(category.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination className="justify-content-center">
        {[...Array(Math.ceil(categories.length / categoriesPerPage)).keys()].map((number) => (
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

export default ViewCategories;
