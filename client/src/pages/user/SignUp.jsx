import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/user/SignIn.scss";
import AuthForm from "../../components/auth/AuthForm";
import { register } from "../../features/auth/authApiRegister";
import { saveToken, saveUser } from "../../utils/storage";
import ROLE_REDIRECT from "../../constants/roleRedirect";
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


    const validateForm = async () => {
        const specialCharRegex = /[^a-zA-Z0-9 ]/;
        const phoneRegex = /^\d+$/;

        if (!form.hoTen.trim()) return "Tài khoản không được để trống.";
        if (specialCharRegex.test(form.hoTen)) return "Tài khoản không được chứa ký tự đặc biệt.";

        if (!form.email.trim()) return "Email không được để trống.";
        if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Email không hợp lệ.";

        if (!form.soDienThoai.trim()) return "Số điện thoại không được để trống.";
        if (!phoneRegex.test(form.soDienThoai)) return "Số điện thoại chỉ được chứa chữ số.";
        if (form.soDienThoai.length < 10 || form.soDienThoai.length > 11)
            return "Số điện thoại phải có 10 hoặc 11 chữ số.";

        if (form.password.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự.";
        if (form.password !== form.confirmPassword) return "Mật khẩu xác nhận không khớp.";

        // 🔁 Gọi API kiểm tra tài khoản/sđt
        try {
            const res = await fetch("http://localhost:3001/api/user/check-exists", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    hoTen: form.hoTen,
                    soDienThoai: form.soDienThoai,
                }),
            });

            const data = await res.json();

            if (res.status === 409) {
                if (data.errors?.hoTen) return "Tài khoản đã có người sử dụng.";
                if (data.errors?.soDienThoai) return "Số điện thoại đã có người sử dụng.";
            }
        } catch (err) {
            return "Lỗi khi kiểm tra tài khoản. Vui lòng thử lại.";
        }

        return null;
    };


    const handleRegister = async () => {
        const validationError = await validateForm(); // <-- thêm await
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try {
            const data = await register(
                form.hoTen,
                form.email,
                form.password,
                form.soDienThoai,
                form.roleName,
                form.profileImage
            );

            console.log("token", data.token);
            saveToken(data.token, true);

            saveUser(data.user, true);
            const userRole = data.user?.role?.tenRole || "Customer";

            const redirectPath = ROLE_REDIRECT[userRole] || "/";
            navigate(redirectPath);
            navigate("/");
        } catch (err) {
            setError(err.message || "Đăng ký thất bại");
        } finally {
            setLoading(false);
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