import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { BsXCircle } from 'react-icons/bs';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Col, Row } from 'react-bootstrap';

const CustomerModal = (props) => {
  const { show, type, data } = props;
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    setCustomer(data);
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
            name: customer.name || '',
            phone: customer.phone || '',
            address: customer.address || '',
            email: customer.email || '',
            password: customer.password || '',
            birthday: customer.birthday || 0,
            display_name: customer.display_name || '',
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Name is required'),
            phone: Yup.string().required('Phone is required'),
            address: Yup.string().required('Address is required'),
            email: Yup.string().required('Email is required'),
            password: Yup.string().required('Password is required'),
            birthday: Yup.string().required('Birthday is required'),
            display_name: Yup.string().required('Display name is required'),
          })}
          onSubmit={(fields) => {
            const valueFields = {
              ...fields,
            };
            if (type === 'Add') {
              axios
                .post(`http://localhost:5000/customer/add`, valueFields)
                .then((res) => {
                  closeModal();
                  toast.success('Thêm sản phẩm thành công!');
                })
                .catch((error) => {
                  toast.error(error || 'Thêm sản phẩm không thành công!');
                });
            } else if (type === 'Edit') {
              axios
                .put(
                  `http://localhost:5000/customer/update/${customer.customerId}`,
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
                    <label htmlFor="name">Name</label>
                    <Field
                      name="name"
                      type="text"
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
                  <Col className="form-group col-12">
                    <label htmlFor="modelYear">Phone</label>
                    <Field
                      name="phone"
                      type="text"
                      className={
                        'form-control' +
                        (errors.phone && touched.phone ? ' is-invalid' : '')
                      }
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col className="form-group col-12">
                    <label htmlFor="price">Address</label>
                    <Field
                      name="address"
                      type="text"
                      className={
                        'form-control' +
                        (errors.address && touched.address ? ' is-invalid' : '')
                      }
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col className="form-group col-12">
                    <label htmlFor="description">Email</label>
                    <Field
                      name="email"
                      type="text"
                      className={
                        'form-control' +
                        (errors.email && touched.email ? ' is-invalid' : '')
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col className="form-group col-12">
                    <label htmlFor="color">BirthDay</label>
                    <Field
                      name="birthday"
                      type="text"
                      className={
                        'form-control' +
                        (errors.birthday && touched.birthday
                          ? ' is-invalid'
                          : '')
                      }
                    />
                    <ErrorMessage
                      name="birthday"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col className="form-group col-12">
                    <label htmlFor="evaluate">Display Name</label>
                    <Field
                      name="display_name"
                      type="text"
                      className={
                        'form-control' +
                        (errors.display_name && touched.display_name
                          ? ' is-invalid'
                          : '')
                      }
                    />
                    <ErrorMessage
                      name="display_name"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col className="form-group col-12">
                    <label htmlFor="evaluate">Password</label>
                    <Field
                      name="password"
                      type="text"
                      className={
                        'form-control' +
                        (errors.password && touched.password
                          ? ' is-invalid'
                          : '')
                      }
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                </Row>
                <div className="form-group col-12 mt-3">
                  <button type="submit" className="btn btn-primary mr-2">
                    {type === 'Add' ? 'Add New' : 'Edit Customer'}
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

export default CustomerModal;
