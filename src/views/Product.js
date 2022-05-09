import axios from 'axios';
import ConfirmModal from 'components/Modal/ModalConfirm';
import ProductModal from 'components/Modal/ModalProduct';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';

const Product = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [type, setType] = useState('Add');
  const [currentProduct, setCurrentProduct] = useState({});

  const _fetchData = async () => {
    setLoading(true);

    const res = await axios.get('http://localhost:5000/product');

    if (res) {
      setProductList(res.data);
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  const handleDeleteProduct = (product) => {
    setShowModalConfirm(true);
    setCurrentProduct(product);
  };

  const handleAddNewProduct = (type, data) => {
    setType(type);
    setCurrentProduct(data);
    setShowModal(true);
  };

  const handleConfirm = async (data) => {
    if (!data) {
      return;
    }

    await axios
      .delete(
        `http://localhost:5000/product/delete/${currentProduct.productId}`
      )
      .then(() => {});

    setShowModalConfirm(false);
  };

  useEffect(() => {
    _fetchData();
  }, [showModal, showModalConfirm]);

  if (loading) {
    return <div></div>;
  }

  return (
    <>
      <div className="content content-product">
        <ConfirmModal show={showModalConfirm} handleConfirm={handleConfirm} />
        <ProductModal
          show={showModal}
          handleCloseModal={() => setShowModal(false)}
          type={type}
          data={currentProduct}
        />
        <Row>
          <Col md="12">
            <Card className="demo-icons">
              <CardBody className="all-icons">
                <div className="btn-add-product">
                  <Button
                    variant="primary"
                    onClick={() => handleAddNewProduct('Add', '')}
                  >
                    Add New Product
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Card>
          <CardBody>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Size</th>
                  <th>Status</th>
                  <th>Trade Mark</th>
                  <th>Main Stone</th>
                  <th>Main Color Stone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((customer, index) => (
                  <>
                    <tr key={index}>
                      <td>{customer.name || 'N/A'}</td>
                      <td>{customer.price || 'N/A'}</td>
                      <td>{customer.size || 'N/A'}</td>
                      <td>{customer.status || 'N/A'}</td>
                      <td>{customer.trademark || 'N/A'}</td>
                      <td>{customer.main_stone || 'N/A'}</td>
                      <td>{customer.main_color_stone || 'N/A'}</td>
                      <td>
                        <div className="list-icon">
                          <BsFillTrashFill
                            color={'#DD0000'}
                            onClick={() => handleDeleteProduct(customer)}
                          />
                          <BsFillPencilFill
                            color={'#336699'}
                            onClick={() =>
                              handleAddNewProduct('Edit', customer)
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Product;
