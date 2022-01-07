import React, { useEffect, useState } from "react";
import { Card, CardBody, Row, Col, Button } from "reactstrap";
import Pagination from "components/Pagination/Pagination";
import axios from "axios";
import { BsFillTrashFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import ProductModal from "components/Modal/ModalProduct";
import ConfirmModal from "components/Modal/ModalConfirm";

function Product() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [type, setType] = useState("Add");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProduct, setCurrentProduct] = useState({});
  const [productsPerPage] = useState(10);
  

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/product");
      if (res) {
        setProductList(res.data);
        setLoading(false);
      }
    };
    fetchPosts();
  }, [showModal, showModalConfirm]);

  const handleDeleteProduct = (product) => {
    setShowModalConfirm(true);
    setCurrentProduct(product);
  };

  const handleAddNewProduct = (type, data) => {
    setType(type);
    setCurrentProduct(data);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirm = (data) => {
    if (data) {
      axios.delete(`http://localhost:5000/product/delete/${currentProduct.productId}`).then(() => { });
    }
    setShowModalConfirm(false);
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastProduct - productsPerPage;
  const currentProducts = productList.slice( indexOfFirstPost, indexOfLastProduct );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="content content-product">
        <ConfirmModal show={showModalConfirm} handleConfirm={handleConfirm} />
        <ProductModal
          show={showModal}
          handleCloseModal={handleCloseModal}
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
                    onClick={() => handleAddNewProduct("Add", "")}
                  >
                    Add New Product
                  </Button>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Model Year</th>
                      <th>Price</th>
                      <th>Description</th>
                      <th>Color</th>
                      <th>Evaluate</th>
                      <th>Reviews</th>
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProducts.map((product, index) => (
                      <tr key={index}>
                        <td>{product.name || "N/A"}</td>
                        <td>{product.categoryId || "N/A"}</td>
                        <td>{product.modelYear || "N/A"}</td>
                        <td>{product.price || "N/A"}</td>
                        <td>{product.description || "N/A"}</td>
                        <td>{product.color || "N/A"}</td>
                        <td>{product.evaluate || "N/A"}</td>
                        <td>{product.reviews || "N/A"}</td>
                        <td>{product.image || "N/A"}</td>
                        <td>
                          <div className="list-icon">
                            <BsFillTrashFill onClick={() => handleDeleteProduct(product)} />
                            <BsFillPencilFill onClick={() => handleAddNewProduct("Edit", product)} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  productsPerPage={productsPerPage}
                  totalProducts={productList.length}
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

export default Product;
