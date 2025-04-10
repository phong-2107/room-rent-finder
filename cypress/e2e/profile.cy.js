describe("Hồ sơ người dùng", () => {
    beforeEach(() => {
        cy.viewport(1440, 900);
        cy.loginAsUser();
        cy.wait(3000);
        cy.visit("http://localhost:3000/profile");
    });
    
    

    context("Cập nhật thông tin", () => {
        beforeEach(() => {
          cy.visit("http://localhost:3000/profile"); // Thêm dòng này
          cy.url().should("include", "/profile");
          cy.wait(5000);
        });
      

    it("TC_0041 - Thay đổi thông tin thành công", () => {
        cy.get('input[name="email"]').clear().type("newuser@gmail.com");
        cy.get('input[name="soDienThoai"]').clear().type("0928282221");
        cy.get('input[name="diaChi"]').clear().type("HCMs");
        cy.get('select[name="gioiTinh"]').select("Nam");
        cy.contains("Lưu thay đổi").click();
        cy.contains("Cập nhật thông tin thành công!").should("exist");
      });
    
      it("TC_0042 - Không thay đổi thông tin gì", () => {
        // Đảm bảo người dùng đã đăng nhập và đang ở trang "Hồ sơ"
        
        // Không thay đổi bất kỳ trường nào
        // Click nút Lưu thay đổi
        cy.contains("Lưu thay đổi").click();
      
        // Kiểm tra thông báo hiển thị đúng
        cy.contains("Không có thay đổi nào được thực hiện.").should("exist");
      });
    
      it("TC_0043 - Email không đúng định dạng", () => {
        cy.get('input[name="email"]').clear().type("newuser@gmailcom");
        cy.contains("Lưu thay đổi").click();
        cy.contains("Vui lòng kiểm tra lại thông tin đã nhập!").should("exist");
      });
    
      it("TC_0044 - Bỏ trống email", () => {
        cy.get('input[name="email"]').clear();
        cy.contains("Lưu thay đổi").click();
        cy.contains("Vui lòng kiểm tra lại thông tin đã nhập!").should("exist");
      });
    
      it("TC_0045 - Bỏ trống số điện thoại", () => {
        cy.get('input[name="soDienThoai"]').clear();
        cy.contains("Lưu thay đổi").click();
        cy.contains("Vui lòng kiểm tra lại thông tin đã nhập!").should("exist");
      });
  });

  context("Đổi mật khẩu", () => {
    beforeEach(() => {
      cy.contains("Đổi mật khẩu", { timeout: 3000 }).should("be.visible").click();
});


it("TC_0034 - Bỏ trống mật khẩu hiện tại", () => {
  cy.get('input[name="matKhauMoi"]').type("1234567Khanh");
  cy.get('input[name="xacNhanMatKhau"]').type("1234567Khanh");
  cy.contains("Xác nhận đổi mật khẩu").click();
  cy.contains("Vui lòng nhập mật khẩu hiện tại").should("exist");
});

it("TC_0035 - Bỏ trống mật khẩu mới", () => {
  cy.get('input[name="matKhauHienTai"]').type("12345679Khanh");
  cy.get('input[name="xacNhanMatKhau"]').type("1234567Khanh");
  cy.contains("Xác nhận đổi mật khẩu").click();
  cy.contains("Vui lòng nhập mật khẩu mới").should("exist");
});

it("TC_0036 - Mật khẩu mới quá ngắn", () => {
  cy.get('input[name="matKhauHienTai"]').type("12345679Khanh");
  cy.get('input[name="matKhauMoi"]').type("3Aa");
  cy.get('input[name="xacNhanMatKhau"]').type("3Aa");
  cy.contains("Xác nhận đổi mật khẩu").click();
  cy.contains("Mật khẩu phải có ít nhất 6 ký tự").should("exist");
});

it("TC_0037 - Mật khẩu mới sai định dạng", () => {
  cy.get('input[name="matKhauHienTai"]').type("12345679Khanh");
  cy.get('input[name="matKhauMoi"]').type("456789");
  cy.get('input[name="xacNhanMatKhau"]').type("456789");
  cy.contains("Xác nhận đổi mật khẩu").click();
  cy.contains("Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số").should("exist");
});

it("TC_0038 - Bỏ trống xác nhận mật khẩu", () => {
  cy.get('input[name="matKhauHienTai"]').type("12345679Khanh");
  cy.get('input[name="matKhauMoi"]').type("12345Khanh");
  cy.contains("Xác nhận đổi mật khẩu").click();
  cy.contains("Vui lòng xác nhận mật khẩu mới").should("exist");
});

it("TC_0039 - Xác nhận mật khẩu không khớp", () => {
  cy.get('input[name="matKhauHienTai"]').type("12345679Khanh");
  cy.get('input[name="matKhauMoi"]').type("12345Khanh");
  cy.get('input[name="xacNhanMatKhau"]').type("123456Khanh");
  cy.contains("Xác nhận đổi mật khẩu").click();
  cy.contains("Xác nhận mật khẩu không khớp").should("exist");
});

it("TC_0040 - Mật khẩu hiện tại và mật khẩu mới giống nhau", () => {
  cy.get('input[name="matKhauHienTai"]').type("12345679Khanh");
  cy.get('input[name="matKhauMoi"]').type("12345679Khanh");
  cy.get('input[name="xacNhanMatKhau"]').type("12345679Khanh");
  cy.contains("Xác nhận đổi mật khẩu").click();
  cy.contains("Mật khẩu mới không được giống mật khẩu cũ.").should("exist");

  it("TC_0033 - Đổi mật khẩu thành công", () => {
    cy.get('input[name="matKhauHienTai"]').type("12345679Khanh");
    cy.get('input[name="matKhauMoi"]').type("1234567Khanh");
    cy.get('input[name="xacNhanMatKhau"]').type("1234567Khanh");
    cy.contains("Xác nhận đổi mật khẩu").click();
    cy.contains("Đổi mật khẩu thành công! Đang chuyển hướng về trang hồ sơ...").should("exist");
  });
});
});
});