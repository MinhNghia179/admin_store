import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BsXCircle } from "react-icons/bs";
import axios from "axios";
import { toast } from 'react-toastify';

const ProductModal = (props) => {
  const { show, type, data } = props;
  const [listCategory, setListCategory] = useState([]);
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/category`).then((response) => {
      setListCategory(response.data);
    });
  },[]);

  useEffect(() => {
    setProduct(data);
  },[data])

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const closeModal = () => {
    props.handleCloseModal();
  };

  return (
    <div className="modal-product">
      <Modal
        isOpen={show}
        appElement={document.getElementById("root")}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Formik
          initialValues={{
            name: product.name || '',
            categoryId: product.categoryId || 0,
            modelYear: product.modelYear || 0,
            price: product.price || 0,
            description: product.description || '',
            color: product.color || '',
            evaluate: product.evaluate || 0,
            reviews: product.reviews || 0,
            image: product.image || ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Product Name is required"),
            categoryId: Yup.string().required("Category is required"),
            modelYear: Yup.number().required("Modal Year is required"),
            price: Yup.number().required("Price is required"),
            description: Yup.string().required("Description is required"),
            color: Yup.string().required("Color is required"),
            evaluate: Yup.number().required("Evaluate is required"),
            reviews: Yup.number().required('Reviews is required')
          })}
          onSubmit={(fields) => {
            const valueFields = { ...fields, evaluate: Number(fields.evaluate), reviews: Number(fields.reviews) }
            if (type === 'Add') {
              axios.post(`http://localhost:5000/product/add`, valueFields).then(res => {
                props.handleCloseModal();
                toast.success('Thêm sản phẩm thành công!');
              }).catch((error) => {
                toast.error(error || 'Thêm sản phẩm không thành công!');
              })
            } else if (type === 'Edit') {
              axios.put(`http://localhost:5000/product/update/${product.productId}`, valueFields).then((response) => {
                props.handleCloseModal();
                toast.success('Sủa sản phẩm thành công !');
              }).catch((error) => {
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
                      <div className="form-group col-12">
                          <label htmlFor="name">Product Name</label>
                          <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                          <ErrorMessage name="name" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group col-12">
                          <label>Category</label>
                          <Field name="categoryId" as="select" className={'form-control' + (errors.categoryId && touched.categoryId ? ' is-invalid' : '')}>
                              { listCategory && listCategory.map((category, index) => {
                                  return <option key={index} value={category.categoryId}>{category.name}</option>
                              }) }
                          </Field>
                          <ErrorMessage name="categoryId" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group col-12">
                          <label htmlFor="modelYear">Modal Year</label>
                          <Field name="modelYear" type="number" className={'form-control' + (errors.modelYear && touched.modelYear ? ' is-invalid' : '')} />
                          <ErrorMessage name="modelYear" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group col-12">
                          <label htmlFor="price">List Price</label>
                          <Field name="price" type="number" className={'form-control' + (errors.price && touched.price ? ' is-invalid' : '')} />
                          <ErrorMessage name="price" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group col-12">
                          <label htmlFor="description">Description</label>
                          <Field name="description" type="text" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                          <ErrorMessage name="description" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group col-12">
                          <label htmlFor="color">Color</label>
                          <Field name="color" type="text" className={'form-control' + (errors.color && touched.color ? ' is-invalid' : '')} />
                          <ErrorMessage name="color" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group col-12">
                          <label htmlFor="evaluate">Evaluate</label>
                          <Field name="evaluate" type="text" className={'form-control' + (errors.evaluate && touched.evaluate ? ' is-invalid' : '')} />
                          <ErrorMessage name="evaluate" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group col-12">
                          <label htmlFor="reviews">Reviews</label>
                          <Field name="reviews" type="text" className={'form-control' + (errors.reviews && touched.reviews ? ' is-invalid' : '')} />
                          <ErrorMessage name="reviews" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group col-12">
                          <label htmlFor="image">Image</label>
                          <Field name="image" type="text" className={'form-control' + (errors.image && touched.image ? ' is-invalid' : '')} />
                          <ErrorMessage name="image" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group col-12 mt-3">
                          <button type="submit" className="btn btn-primary mr-2">{ type === 'Add' ? 'Add New': 'Edit Product'}</button>
                          { type === 'Add' ? (<button type="reset" className="btn btn-secondary">Reset</button>) : '' }
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
