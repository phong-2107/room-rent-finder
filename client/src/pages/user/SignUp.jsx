import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/user/SignIn.scss";
import AuthForm from "../../components/auth/AuthForm";
import { register } from "../../features/auth/authApiRegister";
import { saveToken, saveUser } from "../../utils/storage";

const SignUp = () => {
    const [form, setForm] = useState({
        hoTen: "",
        email: "",
        password: "",
        confirmPassword: "",
        soDienThoai: "",
        roleName: "Customer", // Default role name
        profileImage: null, // Field for handling profile image
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Loading state for the button
    const navigate = useNavigate();

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setError(""); // Clear error when the user starts typing
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleChange("profileImage", file);
        }
    };

    const validateForm = () => {
        if (!form.hoTen.trim()) return "Họ tên không được để trống.";
        if (!form.email.trim()) return "Email không được để trống.";
        if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Email không hợp lệ.";
        if (!form.soDienThoai.trim()) return "Số điện thoại không được để trống.";
        if (!/^\d+$/.test(form.soDienThoai)) return "Số điện thoại chỉ được chứa chữ số.";
        if (form.soDienThoai.length < 10 || form.soDienThoai.length > 11)
            return "Số điện thoại phải có 10 hoặc 11 chữ số.";
        if (form.password.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự.";
        if (form.password !== form.confirmPassword) return "Mật khẩu xác nhận không khớp.";
        return null;
    };

    const handleRegister = async () => {
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true); // Set loading state

        try {
            const data = await register(
                form.hoTen,
                form.email,
                form.password,
                form.soDienThoai,
                form.roleName,
                form.profileImage
            );
            saveToken(data.token, true);
            saveUser(data.user, true);
            navigate("/"); // Navigate to the homepage after successful registration
        } catch (err) {
            setError(err.message || "Đăng ký thất bại");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const signUpButtonStyle = {
        backgroundColor: loading ? "#ccc" : "#4CAF50", // Disabled style during loading
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: loading ? "not-allowed" : "pointer",
    };

    return (
        <div className="page-wrapper">
            <div className="sign-in">
                <div className="container">
                    <div className="global-icon-wrapper">
                        <img className="global-icon" src="./assets/images/global.png" alt="global" />
                    </div>
                    <div className="logo">
                        <a href="/"><img src="/assets/images/logo1.png" alt="logo" /></a>
                    </div>
                    <AuthForm
                        type="signUp"
                        form={form}
                        onChange={handleChange}
                        onFileChange={handleFileChange} // New prop for handling file inputs
                        onSubmit={handleRegister}
                        error={error}
                        buttonStyle={signUpButtonStyle}
                    />
                </div>
            </div>
            <div className="footer-login">
                <p className="footer-copy">Được tạo bởi</p>
                <div className="footer-logo">
                    <img src="/assets/images/logo1.png" alt="logo" />
                </div>
            </div>
        </div>
    );
};

export default SignUp;