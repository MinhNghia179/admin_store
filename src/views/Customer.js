import React, { useEffect, useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { BsFillPencilFill } from 'react-icons/bs';
import { Card, CardBody, Row, Col, Button } from 'reactstrap';
import axios from 'axios';
import Pagination from 'components/Pagination/Pagination';
import ConfirmModal from 'components/Modal/ModalConfirm';
import CustomerModal from 'components/Modal/ModalCustomer';

function Customer() {
  const [loading, setLoading] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [type, setType] = useState('Add');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCustomer, setCurrentCustomer] = useState({});
  const [customersPerPage] = useState(10);

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/customer');
      if (res) {
        setCustomerList(res.data);
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [showModal, showModalConfirm]);

  const handleAddNewCustomer = (type, data) => {
    setType(type);
    setCurrentCustomer(data);
    setShowModal(true);
  };

  const handleDeleteCustomer = (customer) => {
    setShowModalConfirm(true);
    setCurrentCustomer(customer);
  };

  const handleConfirm = (data) => {
    if (data) {
      axios
        .delete(
          `http://localhost:5000/customer/delete/${currentCustomer.customerId}`
        )
        .then(() => {});
    }
    setShowModalConfirm(false);
  };

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstPost = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customerList.slice(
    indexOfFirstPost,
    indexOfLastCustomer
  );

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="content content-customer content-product">
        <ConfirmModal show={showModalConfirm} handleConfirm={handleConfirm} />
        <CustomerModal
          show={showModal}
          handleCloseModal={handleCloseModal}
          type={type}
          data={currentCustomer}
        />
        <Row>
          <Col md="12">
            <Card className="demo-icons">
              <CardBody className="all-icons">
                <div className="btn-add-product">
                  <Button
                    variant="primary"
                    onClick={() => handleAddNewCustomer('Add', '')}
                  >
                    Add New Customer
                  </Button>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Email</th>
                      <th>Password</th>
                      <th>BirthDay</th>
                      <th>Name Display</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCustomers.map((customer, index) => (
                      <tr key={index}>
                        <td>{customer.name || 'N/A'}</td>
                        <td>{customer.phone || 'N/A'}</td>
                        <td>{customer.address || 'N/A'}</td>
                        <td>{customer.email || 'N/A'}</td>
                        <td>{customer.password || 'N/A'}</td>
                        <td>{customer.birthday || 'N/A'}</td>
                        <td>{customer.display_name || 'N/A'}</td>
                        <td>
                          <div className="list-icon">
                            <BsFillTrashFill
                              onClick={() => handleDeleteCustomer(customer)}
                            />
                            <BsFillPencilFill
                              onClick={() =>
                                handleAddNewCustomer('Edit', customer)
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  productsPerPage={customersPerPage}
                  totalProducts={customerList.length}
                  paginate={paginate}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Customer;
