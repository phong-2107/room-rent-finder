import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/user/SignIn.scss";
import AuthForm from "../../components/auth/AuthForm";
import { register } from "../../features/auth/authApiRegister";
import { saveToken, saveUser } from "../../utils/storage";

const SignUp = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleRegister = async () => {
        if (form.password !== form.confirmPassword) {
            setError("Mật khẩu xác nhận không khớp");
            return;
        }

        try {
            const data = await register(form.username, form.email, form.password);
            saveToken(data.token, true);
            saveUser(data.user, true);
            navigate("/");
        } catch (err) {
            setError(err.message || "Đăng ký thất bại");
        }
    };

    const signUpButtonStyle = {
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
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
