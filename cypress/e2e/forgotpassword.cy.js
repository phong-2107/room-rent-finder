describe('Forgot Password Tests', () => {
    const url = 'http://localhost:3000/forgotpassword'; // tùy URL thực tế
    beforeEach(() => {
        cy.viewport(1440, 900);

      cy.visit(url);
    });
  
    it('TC_0025 - Gửi yêu cầu với email đã đăng ký', () => {
      cy.get('input#email').type('usertest@gmail.com');
      cy.get('button.forgot-btn').click();
      cy.contains('Mật khẩu mới đã được gửi đến email của bạn.').should('be.visible');
    });
  
    it('TC_0026 - Gửi yêu cầu (bỏ trống email)', () => {
      cy.get('button.forgot-btn').click();
      cy.contains('Vui lòng nhập email.').should('be.visible');
    });
  
    it('TC_0027 - Gửi yêu cầu với email không đúng định dạng', () => {
      cy.get('input#email').type('usertest@gmailcom');
      cy.get('button.forgot-btn').click();
      cy.contains('Đã xảy ra lỗi.').should('be.visible');
    });
  
    it('TC_0028 - Gửi yêu cầu với email không tồn tại trong hệ thống', () => {
      cy.get('input#email').type('usertest1@gmail.com');
      cy.get('button.forgot-btn').click();
      cy.contains('Email không tồn tại trong hệ thống.').should('be.visible');
    });
  });
  