import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from '../../../config';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/product`);
        const data = await response.json();
        if (data.status === 200) {
          setProducts(data.message);
        } else {
          console.error('Error fetching Products:', data);
        }
      } catch (error) {
        console.error('An error occurred while fetching Products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditProduct = (id) => {
    const path = `/products/Update/${id}`;
    navigate(path);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this Product?');

      if (confirmDelete) {
        const response = await fetch(`${config.apiUrl}/api/product/delete/${productId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
          );
          console.log('Product deleted successfully');
        } else {
          console.error('Error deleting Product:', response.statusText);
        }
      } else {
        console.log('Product deletion canceled');
      }
    } catch (error) {
      console.error('An error occurred while deleting Product:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Product List</h2>
      <button className="btn btn-primary mb-2" onClick={() => navigate('/products/Create')}>
        Add Product
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Images</th>
            <th scope="col">Parent Category</th>
            <th scope="col">Category</th>
            <th scope="col">Name</th>
            <th scope="col">Details</th>
            <th scope="col">Price</th>
            <th scope="col">Weight</th>
            <th scope="col">Is Active</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                {product.image && (
                  <img
                    src={`http://127.0.0.1:8000/storage/${product.image}`}
                    alt={`Image for ${product.name}`}
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                )}
              </td>
              <td>
                {product.parent_id
                  ? categories.find((c) => c.id === product.parent_id)?.name || 'No'
                  : '-'}
              </td>
              <td>
                {product.category_id
                  ? categories.find((c) => c.id === product.category_id)?.name || 'No'
                  : '-'}
              </td>
              <td>{product.name}</td>
              <td>{product.details}</td>
              <td>{product.price}</td>
              <td>{product.weight}</td>
              <td>{product.is_active ? 'Active' : 'Inactive'}</td>
              <td>
                <button onClick={() => handleEditProduct(product.id)} className="btn btn-primary me-2">
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination className="justify-content-center">
        {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map((number) => (
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

export default ViewProducts;
