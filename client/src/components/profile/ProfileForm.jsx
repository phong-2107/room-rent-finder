import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileForm = ({ user, onProfileUpdate }) => {
  const [formData, setFormData] = useState({
    hoTen: "",
    email: "",
    soDienThoai: "",
    diaChi: "",
    gioiTinh: "",
  });
  const [originalData, setOriginalData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      const initialData = {
        hoTen: user.hoTen || "",
        email: user.email || "",
        soDienThoai: user.soDienThoai || "",
        diaChi: user.diaChi || "",
        gioiTinh: user.gioiTinh || "",
      };
      setFormData(initialData);
      setOriginalData(initialData); // Lưu dữ liệu ban đầu để so sánh
      if (user.anhDaiDien) {
        setImagePreview(
          user.anhDaiDien.startsWith("http")
            ? user.anhDaiDien
            : `http://localhost:3001/${user.anhDaiDien}`
        );
      }
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        toast.error("Chỉ chấp nhận file JPG, JPEG hoặc PNG");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Kích thước file không được vượt quá 2MB");
        return;
      }
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.hoTen.trim()) {
      newErrors.hoTen = "Họ tên không được để trống";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!formData.soDienThoai.trim()) {
      newErrors.soDienThoai = "Số điện thoại không được để trống";
    } else if (!/^(0[3|5|7|8|9])+([0-9]{8})$/.test(formData.soDienThoai)) {
      newErrors.soDienThoai = "Số điện thoại không hợp lệ";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Vui lòng kiểm tra lại thông tin đã nhập!");
      return;
    }

    // Kiểm tra xem dữ liệu có thay đổi không
    const isChanged =
      JSON.stringify(formData) !== JSON.stringify(originalData) || profileImage;
    if (!isChanged) {
      toast.info("Không có thay đổi nào được thực hiện.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
        return;
      }

      const submitData = new FormData();
      submitData.append("hoTen", formData.hoTen);
      submitData.append("email", formData.email);
      submitData.append("soDienThoai", formData.soDienThoai);
      submitData.append("diaChi", formData.diaChi || "");
      submitData.append("gioiTinh", formData.gioiTinh || "");
      if (profileImage) {
        submitData.append("anhDaiDien", profileImage);
      }

      const response = await fetch("http://localhost:3001/api/user/update-profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: submitData,
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.errors) {
          const serverErrors = {};
          data.errors.forEach((err) => {
            serverErrors[err.param] = err.msg;
          });
          setErrors(serverErrors);
          toast.error("Vui lòng kiểm tra lại thông tin đã nhập!");
        } else {
          toast.error(data.message || "Cập nhật thông tin thất bại. Vui lòng thử lại.");
        }
        return;
      }

      toast.success("Cập nhật thông tin thành công!");

      // Cập nhật lại originalData sau khi cập nhật thành công
      setOriginalData(formData);
      setProfileImage(null);

      // Gọi callback để cập nhật trạng thái user trong component cha nếu có
      if (onProfileUpdate && data.user) {
        onProfileUpdate(data.user);
      }
    } catch (error) {
      console.error("Lỗi cập nhật thông tin:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-form">
      <div className="profile-form__container">
        <div className="profile-form__title">
          <div className="profile-form__title-text">Thông tin cá nhân</div>
        </div>

        <form className="profile-form__contain" onSubmit={handleSubmit}>
          <div className="profile-form__field">
            <div className="profile-form__field-group">
              <div className="profile-form__label">
                <div className="profile-form__label-text">
                  Họ tên <span className="required-field">*</span>
                </div>
              </div>
              <input
                readOnly
                type="text"
                name="hoTen"
                className={`profile-form__input ${errors.hoTen ? "is-invalid" : ""}`}
                value={formData.hoTen}
                onChange={handleInputChange}
              />
              {errors.hoTen && (
                <div className="error-message">{errors.hoTen}</div>
              )}
            </div>
          </div>
          <div className="profile-form__avatar-section">
            <div className="profile-form__avatar-group">
              <div className="profile-form__label">
                <div className="profile-form__label-text">Ảnh đại diện</div>
              </div>
              <div
                className="profile-form__avatar-image"
                style={{
                  backgroundImage: imagePreview ? `url(${imagePreview})` : "none",
                  backgroundColor: !imagePreview ? "#f0f0f0" : "transparent",
                }}
              >
                {!imagePreview && <div className="avatar-placeholder">Chưa có ảnh</div>}
              </div>
            </div>

            <label
              htmlFor="profile-image-upload"
              className="profile-form__button profile-form__button--secondary profile-form__avatar-button"
            >
              Thay đổi ảnh
              <input
                id="profile-image-upload"
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </label>
          </div>

          <div className="profile-form__field">
            <div className="profile-form__field-group">
              <div className="profile-form__label">
                <div className="profile-form__label-text">
                  Email <span className="required-field">*</span>
                </div>
              </div>
              <input
                type="email"
                name="email"
                className={`profile-form__input ${errors.email ? "is-invalid" : ""}`}
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>
          </div>

          <div className="profile-form__field">
            <div className="profile-form__field-group">
              <div className="profile-form__label">
                <div className="profile-form__label-text">
                  Số điện thoại <span className="required-field">*</span>
                </div>
              </div>
              <input
                type="tel"
                name="soDienThoai"
                className={`profile-form__input ${
                  errors.soDienThoai ? "is-invalid" : ""
                }`}
                value={formData.soDienThoai}
                onChange={handleInputChange}
              />
              {errors.soDienThoai && (
                <div className="error-message">{errors.soDienThoai}</div>
              )}
            </div>
          </div>

          <div className="profile-form__field">
            <div className="profile-form__field-group">
              <div className="profile-form__label">
                <div className="profile-form__label-text">Địa chỉ</div>
              </div>
              <input
                type="text"
                name="diaChi"
                className="profile-form__input"
                value={formData.diaChi}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="profile-form__field">
            <div className="profile-form__field-group">
              <div className="profile-form__label">
                <div className="profile-form__label-text">Giới tính</div>
              </div>
              <select
                name="gioiTinh"
                className="profile-form__input"
                value={formData.gioiTinh}
                onChange={handleInputChange}
              >
                <option value="">-- Chọn giới tính --</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
          </div>

          <div className="profile-form__button-wrapper">
            <a
              href="/changepassword"
              className="profile-form__button profile-form__button--secondary"
            >
              Đổi mật khẩu
            </a>
            <button
              type="submit"
              className="profile-form__button profile-form__button--primary"
              disabled={loading}
            >
              {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;