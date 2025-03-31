import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/user/SignIn.scss";
import AuthForm from "../../components/auth/AuthForm";
import { login } from "../../features/auth/authApi";
import { saveToken, saveUser } from "../../utils/storage";

const SignIn = () => {
    const [form, setForm] = useState({ username: "", password: "", remember: false });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleLogin = async () => {
        try {
            const data = await login(form.username, form.password);
            // saveToken(data.token, form.remember);
            // saveUser(data.user, form.remember); 
            saveToken(data.token, true);
            saveUser(data.user, true);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="sign-in">
            <div className="container">
                <div className="logo">
                    <a href="/"><img src="/assets/images/logo1.png" alt="logo" /></a>
                </div>
                <AuthForm
                    username={form.username}
                    password={form.password}
                    remember={form.remember}
                    onChange={handleChange}
                    onSubmit={handleLogin}
                    error={error}
                />
            </div>

            <div className="footer">
                <p>Được tạo bởi</p>
                <div className="footer-logo">
                    <img src="/assets/images/logo1.png" alt="logo" />
                </div>
            </div>
        </div>
    );
};

export default SignIn;
