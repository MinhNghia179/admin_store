import Modal from "react-modal";
import { BsXCircle } from "react-icons/bs";

const ConfirmModal = (props) => {
  const { show } = props;

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div className="modal-confirm">
      <Modal
        isOpen={show}
        appElement={document.getElementById("root")}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <div className="form-row form-product">
          <div className="form-group col-12 icon-close">
            <BsXCircle onClick={() => props.handleConfirm(false)} />
          </div>
          <div className="form-group col-12">
            <p>Bạn có muốn xóa sản phẩm</p>
          </div>
          <div className="form-group col-12">
            <button type="submit" className="btn btn-primary mr-2" onClick={ () => props.handleConfirm(true) }>Yes</button>
            <button type="reset" className="btn btn-secondary" onClick={ () => props.handleConfirm(false) }>No</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
