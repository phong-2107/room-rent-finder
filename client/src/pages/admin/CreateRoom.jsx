import React, { useState } from 'react';
import '../../styles/admin/createRoom.scss';

const CreateRoom = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  
  const handleImageSelect = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setSelectedImages((prevImages) => [...prevImages, ...fileArray]);
    }
  };
  
  const handleRemoveImage = (imageToRemove) => {
    setSelectedImages(selectedImages.filter(image => image !== imageToRemove));
  };
  
  return (
    <div className="create-room-page">

      
      <div className="form-container">
      <div className="page-title">
        <h2>Thêm tin phòng</h2>
    </div>
        <form className="room-form">
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="roomName">Tên phòng</label>
              <input type="text" id="roomName" className="form-input" />
            </div>
            
            <div className="form-field">
              <label htmlFor="roomType">Loại phòng</label>
              <input type="text" id="roomType" className="form-input" />
            </div>
            
            <div className="form-field">
              <label htmlFor="roomArea">Diện tích phòng</label>
              <input type="text" id="roomArea" className="form-input" />
            </div>
            
            <div className="form-field">
              <label htmlFor="roomPrice">Giá</label>
              <input type="text" id="roomPrice" className="form-input" />
            </div>
            
            <div className="form-field">
              <label htmlFor="roomStatus">Trạng thái</label>
              <input type="text" id="roomStatus" className="form-input" />
            </div>
            
            <div className="form-field description-field">
              <label htmlFor="roomDescription">Mô tả</label>
              <textarea 
                id="roomDescription" 
                className="form-input description-textarea" 
                rows="5"
              ></textarea>
            </div>
            
            <div className="form-field image-field">
              <label>Ảnh phòng</label>
              <div className="image-upload-container">
                <label htmlFor="roomImages" className="image-upload-btn">
                  <span className="upload-icon">+</span>
                  <span>Chọn ảnh phòng</span>
                </label>
                <input 
                  type="file" 
                  id="roomImages" 
                  accept="image/*" 
                  multiple 
                  onChange={handleImageSelect}
                  style={{ display: 'none' }}
                />
              </div>
              
              <div className="image-previews-wrapper">
                {selectedImages.map((image, index) => (
                  <div key={index} className="image-preview-item">
                    <img src={image} alt={`Preview ${index}`} className="preview-image" />
                    <button 
                      type="button" 
                      className="remove-image-btn"
                      onClick={() => handleRemoveImage(image)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-btn">Xác nhận</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;