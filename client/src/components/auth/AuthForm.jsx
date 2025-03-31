import React from "react";

const AuthForm = ({ username, password, remember, onChange, onSubmit, error }) => (
    <div className="form">
        <div className="form-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
                id="username"
                type="text"
                placeholder="Email đăng nhập"
                value={username}
                onChange={(e) => onChange("username", e.target.value)}
            />
        </div>

        <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
                id="password"
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => onChange("password", e.target.value)}
            />
        </div>

        {error && <p className="error">{error}</p>}

        <div className="options">
            <label className="remember">
                <input
                    type="checkbox"
                    checked={remember}
                    onChange={() => onChange("remember", !remember)}
                />
                Ghi nhớ tài khoản
            </label>
            <a href="#" className="forgot">Quên mật khẩu?</a>
        </div>

        <button className="login-btn" onClick={onSubmit}>
            Đăng nhập
        </button>

        <div className="divider"><span>Hoặc</span></div>

        <button className="google-btn">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" />
        </button>

        <div className="register">
            Chưa có tài khoản? <a href="#">Đăng ký</a>
        </div>
    </div>
);

export default AuthForm;
