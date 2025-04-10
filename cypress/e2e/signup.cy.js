// cypress/e2e/signup_form.cy.js

describe('Form Đăng ký - Kiểm thử đầu vào', () => {
    beforeEach(() => {
        cy.viewport(1440, 900);

      cy.visit('http://localhost:3000/register'); // Giả sử URL đăng ký là /register
    });
  
    it('TC_0011 - Đăng ký ở hệ thống (Tên tài khoản bỏ trống nhưng các trường khác hợp lệ)', () => {
      cy.get('#email').type('usertest@gmail.com');
      cy.get('#soDienThoai').type('0123456789');
      cy.get('#password').type('123456');
      cy.get('#confirmPassword').type('123456');
      cy.get('.register-btn').click();
      cy.contains('Tài khoản không được để trống.').should('be.visible');
    });
  
    it('TC_0012 - Đăng ký ở hệ thống (email bỏ trống nhưng các trường khác hợp lệ)', () => {
      cy.get('#hoTen').type('usertest');
      cy.get('#soDienThoai').type('0123456789');
      cy.get('#password').type('123456');
      cy.get('#confirmPassword').type('123456');
      cy.get('.register-btn').click();
      cy.contains('Email không được để trống.').should('be.visible');
    });
  
    it('TC_0013 - Đăng ký ở hệ thống (bỏ trống số điện thoại nhưng các trường khác hợp lệ)', () => {
      cy.get('#hoTen').type('usertest');
      cy.get('#email').type('usertest@gmail.com');
      cy.get('#password').type('123456');
      cy.get('#confirmPassword').type('123456');
      cy.get('.register-btn').click();
      cy.contains('Số điện thoại không được để trống.').should('be.visible');
    });
  
    it('TC_0014 - Đăng ký ở hệ thống (bỏ trống mật khẩu nhưng các trường khác hợp lệ)', () => {
      cy.get('#hoTen').type('usertest');
      cy.get('#email').type('usertest@gmail.com');
      cy.get('#soDienThoai').type('0123456789');
      cy.get('#confirmPassword').type('123456');
      cy.get('.register-btn').click();
      cy.contains('Mật khẩu phải có ít nhất 6 ký tự.').should('be.visible');
    });
  
    it('TC_0015 - Đăng ký ở hệ thống (mật khẩu không nhập đủ ký tự)', () => {
      cy.get('#hoTen').type('usertest');
      cy.get('#email').type('usertest@gmail.com');
      cy.get('#soDienThoai').type('0123456789');
      cy.get('#password').type('12345');
      cy.get('#confirmPassword').type('12345');
      cy.get('.register-btn').click();
      cy.contains('Mật khẩu phải có ít nhất 6 ký tự.').should('be.visible');
    });
  
    it('TC_0016 - Đăng ký ở hệ thống (bỏ trống xác nhận mật khẩu nhưng các trường khác hợp lệ)', () => {
      cy.get('#hoTen').type('usertest');
      cy.get('#email').type('usertest@gmail.com');
      cy.get('#soDienThoai').type('0123456789');
      cy.get('#password').type('123456');
      cy.get('.register-btn').click();
      cy.contains('Mật khẩu xác nhận không khớp').should('be.visible');
    });
  
    it('TC_0017 - Đăng ký ở hệ thống (nhập tên tài khoản đã được sử dụng)', () => {
      cy.get('#hoTen').type('usertest'); // đã tồn tại
      cy.get('#email').type('usertest2@gmail.com');
      cy.get('#soDienThoai').type('0123456789');
      cy.get('#password').type('123456');
      cy.get('#confirmPassword').type('123456');
      cy.get('.register-btn').click();
      cy.contains('Tài khoản đã có người sử dụng.').should('be.visible');
    });
  
    it('TC_0018 - Đăng ký ở hệ thống (dán ký tự đặc biệt trong trường tên tài khoản (VD: `usertest@#`)', () => {
      cy.get('#hoTen').type('usertest@#');
      cy.get('#email').type('usertest@gmail.com');
      cy.get('#soDienThoai').type('0123456789');
      cy.get('#password').type('123456');
      cy.get('#confirmPassword').type('123456');
      cy.get('.register-btn').click();
      cy.contains('Tài khoản không được chứa ký tự đặc biệt.').should('be.visible');
    });
  
    it('TC_0019 - Đăng ký ở hệ thống (email không đúng định dạng)', () => {
      cy.get('#hoTen').type('usertest');
      cy.get('#email').type('usertest@gmailcom');
      cy.get('#soDienThoai').type('0123456789');
      cy.get('#password').type('123456');
      cy.get('#confirmPassword').type('123456');
      cy.get('.register-btn').click();
      cy.contains('Email không hợp lệ.').should('be.visible');
    });
  
    it('TC_0020 - Đăng ký ở hệ thống (nhập email đã được sử dụng)', () => {
      cy.get('#hoTen').type('usertest2');
      cy.get('#email').type('usertest@gmail.com'); // đã tồn tại
      cy.get('#soDienThoai').type('0121456789');
      cy.get('#password').type('123456');
      cy.get('#confirmPassword').type('123456');
      cy.get('.register-btn').click();
      cy.contains('Email đã được sử dụng!').should('be.visible');
    });

    it('TC_0021 - Đăng ký ở hệ thống (số điện thoại đã tồn tại)', () => {
        cy.get('#hoTen').type('usertest221');
        cy.get('#email').type('usertest1233@gmail.com');
        cy.get('#soDienThoai').type('0123456789'); // đã tồn tại
        cy.get('#password').type('123456');
        cy.get('#confirmPassword').type('123456');
        cy.get('.register-btn').click();
        cy.contains('Số điện thoại đã có người sử dụng.').should('be.visible');
      });
  
      it('TC_0022 - Đăng ký ở hệ thống (số điện thoại không hợp lệ ví dụ có chữ cái, thiếu số...))', () => {
        cy.get('#hoTen').type('usertest');
        cy.get('#email').type('usertest@gmail.com');
        cy.get('#soDienThoai').type('0123456789a'); // không hợp lệ
        cy.get('#password').type('123456');
        cy.get('#confirmPassword').type('123456');
        cy.get('.register-btn').click();
        cy.contains('Số điện thoại chỉ được chứa chữ số.').should('be.visible');
      });
  
      it('TC_0023 - Đăng ký ở hệ thống (số điện thoại vượt quá ký tự cho phép))', () => {
        cy.get('#hoTen').type('usertest');
        cy.get('#email').type('usertest@gmail.com');
        cy.get('#soDienThoai').type('012345678911'); // 12 ký tự
        cy.get('#password').type('123456');
        cy.get('#confirmPassword').type('123456');
        cy.get('.register-btn').click();
        cy.contains('Số điện thoại phải có 10 hoặc 11 chữ số.').should('be.visible');
      });
  
      it('TC_0024 - Đăng ký ở hệ thống (mật khẩu và xác nhận không trùng nhau))', () => {
        cy.get('#hoTen').type('usertest');
        cy.get('#email').type('usertest@gmail.com');
        cy.get('#soDienThoai').type('0123456789');
        cy.get('#password').type('123456');
        cy.get('#confirmPassword').type('1234567'); // không khớp
        cy.get('.register-btn').click();
        cy.contains('Mật khẩu xác nhận không khớp').should('be.visible');
      });
  });
  