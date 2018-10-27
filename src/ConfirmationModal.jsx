import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';

const ConfirmationModal = ({
  open, onClose, message, onContinue, onCancel,
}) => (
  <Modal
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    open={open}
    onClose={onClose}
  >
    <div className="newProjectModal">
      {message}
      <button
        type="button"
        onClick={onContinue}
      >
        Si
      </button>
      <button
        type="button"
        onClick={onCancel}
      >
        No
      </button>
    </div>
  </Modal>
);

ConfirmationModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  message: PropTypes.string.isRequired,
  onContinue: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

ConfirmationModal.defaultProps = {
  open: false,
  onClose: null,
};

export default ConfirmationModal;
