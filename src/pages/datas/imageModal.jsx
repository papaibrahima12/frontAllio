import Modal from 'react-modal';


const ImageModal = ({ isOpen, closeModal, imageUrl }) => {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
      >
        <img src={imageUrl} alt="Large Image" style={{ width: '100%', height: 'auto' }} />
      </Modal>
    );
  };
  