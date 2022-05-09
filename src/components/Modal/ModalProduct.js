import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BsXCircle } from 'react-icons/bs';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const ProductModal = (props) => {
  const { show, type, data } = props;
  const [product, setProduct] = useState({});

  useEffect(() => {
    setProduct(data);
  }, [data]);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const closeModal = () => {
    props.handleCloseModal();
  };

  return (
    <div className="modal-product">
      <Modal
        isOpen={show}
        appElement={document.getElementById('root')}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Formik
          initialValues={{
            name: product.name || '',
            price: product.price || 0,
            size: product.size || [],
            status: product.status || 0,
            trademark: product.trademark || '',
            main_stone: product.main_stone || '',
            main_color_stone: product.main_color_stone || '',
            shape: product.shape || '',
            gender: product.gender || 0,
            weight: product.weight || 0,
            description: product.description || '',
            images: product.images || [],
            reviews: product.reviews || 0,
            stars: product.stars || 0,
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Name is required'),
            price: Yup.string().required('Price is required'),
            size: Yup.number().required('Size is required'),
            status: Yup.number().required('Status is required'),
            trademark: Yup.string().required('Trade mark is required'),
            main_stone: Yup.string().required('Main Stone is required'),
            main_color_stone: Yup.number().required(
              'Main Color Stone is required'
            ),
            shape: Yup.string().required('Shape is required'),
            gender: Yup.number().required('Gender is required'),
            weight: Yup.number().required('Weight is required'),
            description: Yup.string().required('Description is required'),
            reviews: Yup.number().required('Reviews is required'),
          })}
          onSubmit={async (fields) => {
            const valueFields = {
              ...fields,
              evaluate: Number(fields.evaluate),
              reviews: Number(fields.reviews),
            };
            if (type === 'Add') {
              await axios
                .post(`http://localhost:5000/product/add`, valueFields)
                .then((res) => {
                  closeModal();
                  toast.success('Thêm sản phẩm thành công!');
                })
                .catch((error) => {
                  toast.error(error || 'Thêm sản phẩm không thành công!');
                });
            } else if (type === 'Edit') {
              await axios
                .put(
                  `http://localhost:5000/product/update/${product.productId}`,
                  valueFields
                )
                .then((response) => {
                  closeModal();
                  toast.success('Sủa sản phẩm thành công !');
                })
                .catch((error) => {
                  toast.error(error || 'Sửa sản phẩm không thành công');
                });
            }
          }}
        >
          {({ errors, status, touched }) => (
            <Form>
              <div className="form-row form-product col-12">
                <div className="form-group col-12 icon-close">
                  <BsXCircle onClick={closeModal} />
                </div>
                <Row>
                  <Col className="form-group col-12">
                    <label htmlFor="name">Product Name</label>
                    <Field
                      name="name"
                      type="text"
                      placeholder="Please enter a name"
                      className={
                        'form-control' +
                        (errors.name && touched.name ? ' is-invalid' : '')
                      }
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col className="form-group col-6">
                    <label>Price</label>
                    <Field
                      name="price"
                      type="number"
                      placeholder="Please enter a price"
                      className={
                        'form-control' +
                        (errors.price && touched.price ? ' is-invalid' : '')
                      }
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                  <Col className="form-group col-6">
                    <label htmlFor="trademark">Trade Mark</label>
                    <Field
                      name="trademark"
                      type="number"
                      placeholder="Please enter a trade mark"
                      className={
                        'form-control' +
                        (errors.trademark && touched.trademark
                          ? ' is-invalid'
                          : '')
                      }
                    />
                    <ErrorMessage
                      name="trademark"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col className="form-group col-6">
                    <label htmlFor="description">Main Stone</label>
                    <Field
                      name="main_stone"
                      type="text"
                      placeholder="Please enter a main stone"
                      className={
                        'form-control' +
                        (errors.main_stone && touched.main_stone
                          ? ' is-invalid'
                          : '')
                      }
                    />
                    <ErrorMessage
                      name="main_stone"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                  <Col className="form-group col-6">
                    <label htmlFor="color">Main Color Stone</label>
                    <Field
                      name="main_color_stone"
                      type="text"
                      placeholder="Please enter a main color stone"
                      className={
                        'form-control' +
                        (errors.main_color_stone && touched.main_color_stone
                          ? ' is-invalid'
                          : '')
                      }
                    />
                    <ErrorMessage
                      name="main_color_stone"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col className="form-group col-4">
                    <label id="radio-status">Status</label>
                  </Col>
                  <Col className="form-group col-4">
                    <label htmlFor="reviews">Gender</label>
                  </Col>
                  <Col className="form-group col-4">
                    <label htmlFor="evaluate">Shape</label>
                    <Field
                      name="shape"
                      type="text"
                      placeholder="Please enter a shape"
                      className={
                        'form-control' +
                        (errors.shape && touched.shape ? ' is-invalid' : '')
                      }
                    />
                    <ErrorMessage
                      name="shape"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col className="form-group col-4">
                    <label htmlFor="image">Weight</label>
                    <Field
                      name="weight"
                      type="number"
                      placeholder="Please enter a trade mark"
                      className={
                        'form-control' +
                        (errors.weight && touched.weight ? ' is-invalid' : '')
                      }
                    />
                    <ErrorMessage
                      name="weight"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                  <Col className="form-group col-4">
                    <label htmlFor="image">Reviews</label>
                    <Field
                      name="reviews"
                      type="number"
                      placeholder="Please enter a reviews"
                      className={
                        'form-control' +
                        (errors.reviews && touched.reviews ? ' is-invalid' : '')
                      }
                    />
                    <ErrorMessage
                      name="reviews"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                  <Col className="form-group col-4">
                    <label htmlFor="image">Stars</label>
                    <Field
                      name="stars"
                      type="number"
                      placeholder="Please enter starts"
                      className={
                        'form-control' +
                        (errors.stars && touched.stars ? ' is-invalid' : '')
                      }
                    />
                    <ErrorMessage
                      name="stars"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                </Row>
                <hr />
                <div className="form-group col-12">
                  <label htmlFor="image">Description</label>
                  <Field
                    name="description"
                    type="text"
                    as="textarea"
                    placeholder="Please enter a description"
                    className={
                      'form-control' +
                      (errors.description && touched.description
                        ? ' is-invalid'
                        : '')
                    }
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="image">Image</label>
                </div>
                <div className="form-group col-12 mt-3">
                  <button type="submit" className="btn btn-primary mr-2">
                    {type === 'Add' ? 'Add New' : 'Edit Product'}
                  </button>
                  {type === 'Add' ? (
                    <button type="reset" className="btn btn-secondary">
                      Reset
                    </button>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default ProductModal;
