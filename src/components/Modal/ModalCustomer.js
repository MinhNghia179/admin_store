import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BsXCircle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";

const CustomerModal = (props) => {
  const { show, type, data } = props;
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    setCustomer(data);
  }, [data]);

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
            firstName: customer.firstName || "",
            lastName: customer.lastName || "",
            phone: customer.phone || "",
            address: customer.address || "",
            email: customer.email || "",
            password: customer.password || "",
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required("First name is required"),
            lastName: Yup.string().required("Last name is required"),
            phone: Yup.string().required("Phone is required"),
            address: Yup.string().required("Address is required"),
            email: Yup.string().required("Email is required"),
            password: Yup.string().required("Password is required")
          })}
          onSubmit={(fields) => {
            const valueFields = {
              ...fields
            };
            if (type === "Add") {
              axios
                .post(`http://localhost:5000/customer/add`, valueFields)
                .then((res) => {
                  props.handleCloseModal();
                  toast.success("Thêm sản phẩm thành công!");
                })
                .catch((error) => {
                  toast.error(error || "Thêm sản phẩm không thành công!");
                });
            } else if (type === "Edit") {
              axios
                .put(
                  `http://localhost:5000/customer/update/${customer.customerId}`,
                  valueFields
                )
                .then((response) => {
                  props.handleCloseModal();
                  toast.success("Sủa sản phẩm thành công !");
                })
                .catch((error) => {
                  toast.error(error || "Sửa sản phẩm không thành công");
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
                  <label htmlFor="name">First Name</label>
                  <Field
                    name="firstName"
                    type="text"
                    className={
                      "form-control" +
                      (errors.firstName && touched.firstName ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="modelYear">Last Name</label>
                  <Field
                    name="lastName"
                    type="text"
                    className={
                      "form-control" +
                      (errors.lastName && touched.lastName
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="price">Phone</label>
                  <Field
                    name="phone"
                    type="text"
                    className={
                      "form-control" +
                      (errors.phone && touched.phone ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="description">Address</label>
                  <Field
                    name="address"
                    type="text"
                    className={
                      "form-control" +
                      (errors.address && touched.address
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="color">Email</label>
                  <Field
                    name="email"
                    type="text"
                    className={
                      "form-control" +
                      (errors.email && touched.email ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="evaluate">Password</label>
                  <Field
                    name="password"
                    type="text"
                    className={
                      "form-control" +
                      (errors.password && touched.password ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group col-12 mt-3">
                  <button type="submit" className="btn btn-primary mr-2">
                    {type === "Add" ? "Add New" : "Edit Customer"}
                  </button>
                  {type === "Add" ? (
                    <button type="reset" className="btn btn-secondary">
                      Reset
                    </button>
                  ) : (
                    ""
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
