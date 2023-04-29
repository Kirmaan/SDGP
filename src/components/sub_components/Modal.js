import './modal.css';
import { TopNav, LabelText, GridCol, GridRow, Paragraph, H2, H3, H4, Button,Caption,H6,DateField } from 'govuk-react';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
      <H2>Patient & Appointment Details</H2>
        {children}


 
        
        <br />
        <Button  type="button" onClick={handleClose}>
            Close
        </Button>
      </section>
    </div>
  );
};

export default Modal;