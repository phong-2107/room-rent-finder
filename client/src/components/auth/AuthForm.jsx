import React from "react";

const AuthForm = ({
    type, // 'signIn' | 'signUp' | 'forgotPassword'
    form,
    onChange,
    onFileChange, // New prop for handling profile image uploads
    onSubmit,
    error,
    buttonStyle,
}) => {
    const isSignUp = type === "signUp";
    const isSignIn = type === "signIn";
    const isForgotPassword = type === "forgotPassword";

    return (
        <div className="form">
            {isSignUp && (
                <div className="form-group">
                    <label htmlFor="hoTen">Họ và Tên</label>
                    <input
                        id="hoTen"
                        type="text"
                        placeholder="Nhập họ và tên"
                        value={form.hoTen}
                        onChange={(e) => onChange("hoTen", e.target.value)}
                        required
                    />
                </div>
            )}

            {(isSignIn ) && (
                <div className="form-group">
                    <label htmlFor="taiKhoan">Tài khoản</label>
                    <input
                        id="taiKhoan"
                        type="text"
                        placeholder="Nhập tài khoản"
                        value={form.taiKhoan}
                        onChange={(e) => onChange("taiKhoan", e.target.value)}
                        required
                    />
                </div>
            )}

            {(isSignUp || isForgotPassword) && (
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder={isForgotPassword ? "Nhập email để khôi phục mật khẩu" : "Nhập email"}
                        value={form.email}
                        onChange={(e) => onChange("email", e.target.value)}
                        required
                    />
                </div>
            )}

            {isSignUp && (
                <div className="form-group">
                    <label htmlFor="soDienThoai">Số điện thoại</label>
                    <input
                        id="soDienThoai"
                        type="text"
                        placeholder="Số điện thoại"
                        value={form.soDienThoai}
                        onChange={(e) => onChange("soDienThoai", e.target.value)}
                        required
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
                        required
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
                        required
                    />
                </div>
            )}

            {/* {isSignUp && (
                <div className="form-group">
                    <label htmlFor="profileImage">Ảnh đại diện</label>
                    <input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        onChange={onFileChange} // Handle file input
                    />
                </div>
            )} */}

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
                type="submit"
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