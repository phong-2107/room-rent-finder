import React, { useState } from "react";

const RoomGallery = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="room-gallery">
      <div className="main-image" onClick={() => openModal(currentImageIndex)}>
        <img
          src={images[currentImageIndex]}
          alt={`image-${currentImageIndex}`}
        />
        <button className="nav-button prev" onClick={(e) => {e.stopPropagation(); handlePrev();}}>‹</button>
        <button className="nav-button next" onClick={(e) => {e.stopPropagation(); handleNext();}}>›</button>
      </div>

      <div className="thumbnail-gallery">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`thumb-${index}`}
            className={index === currentImageIndex ? "active" : ""}
            onClick={() => openModal(index)}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <img
              src={images[currentImageIndex]}
              alt={`modal-image-${currentImageIndex}`}
              className="modal-image"
            />
            <button className="modal-prev" onClick={handlePrev}>‹</button>
            <button className="modal-next" onClick={handleNext}>›</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomGallery;
