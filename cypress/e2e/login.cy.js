describe('Login Page Tests', () => {
  const baseUrl = 'http://localhost:3000'; // hoặc URL thật của bạn

  beforeEach(() => {
    cy.visit(`${baseUrl}/login`);
  });

  it('1. Hiển thị đúng các thành phần trong form đăng nhập', () => {
    cy.get('input#username').should('be.visible');
    cy.get('input#password').should('be.visible');
    cy.contains('Đăng nhập').should('be.visible');
  });

  it('2. Không nhập gì và nhấn đăng nhập → hiển thị lỗi', () => {
    cy.contains('Đăng nhập').click();
    cy.get('.error').should('exist');
  });

  it('3. Nhập sai định dạng username/email → hiện lỗi', () => {
    cy.get('input#username').type('saiemail');
    cy.get('input#password').type('123456');
    cy.contains('Đăng nhập').click();
    cy.get('.error').should('contain', 'Đăng nhập thất bại');
  });

  it('4. Nhập đúng email nhưng sai mật khẩu → hiển thị lỗi', () => {
    cy.get('input#username').type('AD@gmail.com');
    cy.get('input#password').type('12345');
    cy.contains('Đăng nhập').click();
    cy.get('.error').should('contain', 'Đăng nhập thất bại');
  });

  it('5. Đăng nhập thành công → chuyển hướng về trang chủ', () => {
    cy.get('input#username').type('AD@gmail.com');
    cy.get('input#password').type('123');
    cy.contains('Đăng nhập').click();
    cy.url().should('eq', `${baseUrl}/`);
  });

  it('6. Tùy chọn "Ghi nhớ tài khoản" hoạt động đúng', () => {
    cy.get('input[type="checkbox"]').check().should('be.checked');
  });

  it('7. Link "Quên mật khẩu?" hoạt động', () => {
    cy.contains('Quên mật khẩu?').click();
    cy.url().should('include', '/forgotpassword');
  });

  it('8. Link "Đăng ký" hoạt động đúng', () => {
    cy.contains('Chưa có tài khoản?').find('a').click();
    cy.url().should('include', '/register');
  });

  it('9. Nút Google login hiển thị (nếu có)', () => {
    cy.get('.google-btn').should('be.visible');
  });

  it('10. Gõ lại thông tin → lỗi biến mất (nếu có xử lý)', () => {
    cy.contains('Đăng nhập').click();
    cy.get('.error').should('exist');
    cy.get('input#username').type('a');
    cy.get('.error').should('not.exist');
  });
});
