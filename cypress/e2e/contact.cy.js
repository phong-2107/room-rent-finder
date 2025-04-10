describe("Trang Liên hệ", () => {
    const url = "http://localhost:3000/contact"; // thay đổi nếu URL khác
  
    beforeEach(() => {
        cy.viewport(1440, 900);
      cy.visit(url);
    });
  
    it("TC-0046: Gửi liên hệ thành công", () => {
      cy.get('input[name="name"]').type("Nguyễn Văn A");
      cy.get('input[name="email"]').type("abc@example.com");
      cy.get('input[name="phone"]').type("0912345678");
      cy.get('textarea[name="message"]').type("Tôi muốn được tư vấn về sản phẩm.");
      cy.contains("GỬI NGAY").click();
  
      cy.contains("Gửi thông tin liên hệ thành công!").should("exist");
    });
  
    it("TC-0047: Gửi liên hệ thiếu họ tên", () => {
      cy.get('input[name="email"]').type("abc@example.com");
      cy.get('input[name="phone"]').type("0912345678");
      cy.get('textarea[name="message"]').type("Tôi cần hỗ trợ.");
      cy.contains("GỬI NGAY").click();
  
      cy.contains("Vui lòng nhập họ tên.").should("exist");
      cy.contains("Gửi thông tin liên hệ thành công!").should("not.exist");
    });
  
    it("TC-0049: Gửi liên hệ sai định dạng email", () => {
      cy.get('input[name="name"]').type("Nguyễn Văn A");
      cy.get('input[name="email"]').type("abc");
      cy.get('input[name="phone"]').type("0912345678");
      cy.get('textarea[name="message"]').type("Nội dung tư vấn...");
      cy.contains("GỬI NGAY").click();
  
      cy.contains("Email không hợp lệ.").should("exist");
    });
  
    it("TC-0050: Gửi liên hệ trống nội dung", () => {
      cy.get('input[name="name"]').type("Nguyễn Văn A");
      cy.get('input[name="email"]').type("abc@example.com");
      cy.get('input[name="phone"]').type("0912345678");
      cy.contains("GỬI NGAY").click();
  
      cy.contains("Vui lòng nhập nội dung.").should("exist");
    });
  
    it("TC-0008: Gửi liên hệ khi bỏ trống tất cả", () => {
      cy.contains("GỬI NGAY").click();
  
      cy.contains("Vui lòng nhập họ tên.").should("exist");
      cy.contains("Vui lòng nhập email.").should("exist");
      cy.contains("Vui lòng nhập số điện thoại.").should("exist");
      cy.contains("Vui lòng nhập nội dung.").should("exist");
    });
  });
  