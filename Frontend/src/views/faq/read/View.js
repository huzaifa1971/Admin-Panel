import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from '../../../config';

const View = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [faqsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/faq`);
        const data = await response.json();
        console.log(data)

        // console.log('API response:', data);

        if (data.status === 200) {
          setFaqs(data.FAQ); // Update to use the correct property name
        } else {
          console.error('Error fetching FAQs:', data);
        }
      } catch (error) {
        console.error('An error occurred while fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);



  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (!faqs || faqs.length === 0) {
  //   return <p>No FAQs found</p>;
  // }

  const indexOfLastFaq = currentPage * faqsPerPage;
  const indexOfFirstFaq = indexOfLastFaq - faqsPerPage;
  const currentFaqs = faqs.slice(indexOfFirstFaq, indexOfLastFaq);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteFAQ = async (faqId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this FAQ?');

      if (confirmDelete) {
        const response = await fetch(`${config.apiUrl}/api/faq/delete/${faqId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq.id !== faqId));
          console.log('FAQ deleted successfully');
        } else {
          console.error('Error deleting FAQ:', response.statusText);
        }
      } else {
        console.log('FAQ deletion canceled');
      }
    } catch (error) {
      console.error('An error occurred while deleting FAQ:', error);
    }
  };

  const handleAddFAQ = () => {
    navigate('/faq/CreateFAQ'); // Update the route as needed
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">FAQ List</h2>
      <button className="btn btn-primary mb-2" onClick={handleAddFAQ}>
        Add FAQ
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Question</th>
            <th scope="col">Answer</th>
            <th scope="col">Status</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentFaqs.map((faq) => (
            <tr key={faq.id}>
              <td>{faq.id}</td>
              <td>{faq.question}</td>
              <td>{faq.answer}</td>
              <td>{faq.is_active ? 'Active' : 'InActive'}</td>
              <td>{faq.created_at}</td>
              <td>{faq.updated_at}</td>
              <td>
                <Link to={`/faq/UpdateFAQ/${faq.id}`} className="btn btn-primary me-2">
                  Edit
                </Link>
                <button className="btn btn-danger" onClick={() => handleDeleteFAQ(faq.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination className="justify-content-center">
        {[...Array(Math.ceil(faqs.length / faqsPerPage)).keys()].map((number) => (
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
