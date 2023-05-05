import React from 'react';
import { Modal } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import './ConfirmModal.css';
import {Button} from "@mui/material";

const ConfirmModal = ({ open, handleClose, handleYes, handleNo, title, content, showYesAndNo }) => {
    return (
        <Modal show={open} onHide={handleClose} className="confirm-modal">
            <Modal.Header className="modal-header">
                <Modal.Title className="modal-title">{title}</Modal.Title>
                <Button
                    className="close-button"
                    variant="link"
                    onClick={handleClose}
                    aria-label="close"
                >
                    <CloseIcon />
                </Button>
            </Modal.Header>
            <Modal.Body className="modal-body">
                <p className="content-text">{content}</p>
            </Modal.Body>
            {showYesAndNo && (
                <Modal.Footer className="modal-footer">
                    <Button variant="outlined" onClick={handleNo} className="no-button">
                        No
                    </Button>
                    <Button variant="contained" onClick={handleYes} className="yes-button">
                        Yes
                    </Button>
                </Modal.Footer>
            )}
        </Modal>
    );
};

export default ConfirmModal;


