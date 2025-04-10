describe('Kiểm thử chức năng đăng nhập và đăng ký', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  // TC_0001 - Đăng nhập thành công
  it('TC_0001 - Đăng nhập thành công', () => {
    cy.get('input#taiKhoan').type('userpro');
    cy.get('input#password').type('123456');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/');
  });

  // TC_0002 - Mật khẩu không đủ ký tự
  it('TC_0002 - Mật khẩu không đủ ký tự', () => {
    cy.get('input#taiKhoan').type('userpro');
    cy.get('input#password').type('1');
    cy.get('button[type="submit"]').click();
    cy.contains('Tài khoản hoặc mật khẩu không đúng!').should('be.visible');
  });

  // TC_0003 - Bỏ trống mật khẩu
  it('TC_0003 - Bỏ trống mật khẩu', () => {
    cy.get('input#taiKhoan').type('userpro');
    cy.get('input#password').clear();
    cy.get('button[type="submit"]').click();
    cy.contains('Đăng nhập thất bại').should('be.visible');
  });

  // TC_0004 - Nhập sai tài khoản
  it('TC_0004 - Nhập sai tài khoản', () => {
    cy.get('input#taiKhoan').type('aaa');
    cy.get('input#password').type('123456');
    cy.get('button[type="submit"]').click();
    cy.contains('Tài khoản hoặc mật khẩu không đúng!').should('be.visible');
  });

  // TC_0005 - Bỏ trống tài khoản
  it('TC_0005 - Bỏ trống tài khoản', () => {
    cy.get('input#taiKhoan').clear();
    cy.get('input#password').type('123456');
    cy.get('button[type="submit"]').click();
    cy.contains('Đăng nhập thất bại').should('be.visible');
  });

  // TC_0006 - Bỏ trống cả tài khoản và mật khẩu
  it('TC_0006 - Bỏ trống cả tài khoản và mật khẩu', () => {
    cy.get('input#taiKhoan').clear();
    cy.get('input#password').clear();
    cy.get('button[type="submit"]').click();
    cy.contains('Đăng nhập thất bại').should('be.visible');
  });

  // TC_0007 - Nhập sai mật khẩu
  it('TC_0007 - Nhập sai mật khẩu', () => {
    cy.get('input#taiKhoan').type('userpro');
    cy.get('input#password').type('1234567');
    cy.get('button[type="submit"]').click();
    cy.contains('Tài khoản hoặc mật khẩu không đúng!').should('be.visible');
  });

  it('TC_0008 - Đăng xuất thành công', () => {
    cy.get('input#taiKhoan').type('userpro');
    cy.get('input#password').type('123456');
    cy.get('button[type="submit"]').click();
  
    // Đợi user menu hiển thị sau login
    cy.get('[data-testid="user-menu-toggle"]', { timeout: 10000 }).should('be.visible').click();
  
    // Đợi dropdown hiển thị (class `dropdown-box` phải có class `show`)
    cy.get('.dropdown-box.show', { timeout: 5000 }).should('be.visible');
  
    // Click vào Đăng xuất
    cy.contains('Đăng xuất').click();
  
    // Kiểm tra URL đã chuyển về /login
    cy.url().should('include', '/login');
  });
  
  

  // TC_0009 - Đăng ký thành công
  it('TC_0009 - Đăng ký thành công', () => {
    cy.visit('http://localhost:3000/register');
    cy.get('input#hoTen').type('Nguyen Van A');
    cy.get('input#email').type('usertest@gmail.com');
    cy.get('input#soDienThoai').type('0123456789');
    cy.get('input#password').type('123456');
    cy.get('input#confirmPassword').type('123456');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/');
  });

  // TC_0010 - Đăng ký không nhập thông tin
  it('TC_0010 - Đăng ký không nhập thông tin', () => {
    cy.visit('http://localhost:3000/register');
    cy.get('button[type="submit"]').click();
    cy.contains('Họ tên không được để trống').should('be.visible');
  });
});
