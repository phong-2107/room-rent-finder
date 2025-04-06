import React from "react";

const AuthForm = ({
    type, // 'signIn' | 'signUp' | 'forgotPassword'
    form,
    onChange,
    onSubmit,
    error,
    buttonStyle
}) => {
    const isSignUp = type === "signUp";
    const isSignIn = type === "signIn";
    const isForgotPassword = type === "forgotPassword";

    return (
        <div className="form">

            {(isSignIn || isSignUp) && (
                <div className="form-group">
                    <label htmlFor="username">Tên đăng nhập</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Tên đăng nhập"
                        value={form.username}
                        onChange={(e) => onChange("username", e.target.value)}
                    />
                </div>
            )}

            {(isSignUp || isForgotPassword) && (
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder={isForgotPassword ? "Nhập email để khôi phục mật khẩu" : "Email"}
                        value={form.email}
                        onChange={(e) => onChange("email", e.target.value)}
                    />
                </div>
            )}

            {(isSignIn || isSignUp) && (
                <div className="form-group">
                    <label htmlFor="password">Mật khẩu</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Mật khẩu"
                        value={form.password}
                        onChange={(e) => onChange("password", e.target.value)}
                    />
                </div>
            )}

            {isSignUp && (
                <div className="form-group">
                    <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        value={form.confirmPassword}
                        onChange={(e) => onChange("confirmPassword", e.target.value)}
                    />
                </div>
            )}

            {error && <p className="error">{error}</p>}

            {isSignIn && (
                <div className="options">
                    <label className="remember">
                        <input
                            type="checkbox"
                            checked={form.remember}
                            onChange={() => onChange("remember", !form.remember)}
                        />
                        Ghi nhớ tài khoản
                    </label>
                    <a href="/forgotpassword" className="forgot">Quên mật khẩu?</a>
                </div>
            )}

            <button
                className={
                    isSignIn ? "login-btn"
                    : isSignUp ? "register-btn"
                    : "forgot-btn"
                }
                onClick={onSubmit}
                style={buttonStyle}
            >
                {isSignIn ? "Đăng nhập" : isSignUp ? "Đăng ký" : "Xác nhận"}
            </button>

            {isSignIn && (
                <>
                    <div className="divider"><span>Hoặc</span></div>
                    <button className="google-btn">
                        <img
                            src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                            alt="Google"
                        />
                    </button>
                    <div className="register">
                        Chưa có tài khoản? <a href="/register">Đăng ký</a>
                    </div>
                </>
            )}

            {isSignUp && (
                <div className="login-redirect">
                    Đã có tài khoản rồi? <a href="/login">Đăng nhập</a>
                </div>
            )}
        </div>
    );
};

export default AuthForm;
