describe("TÌM KIẾM PHÒNG TRỌ GIÁ RẺ", () => {
    beforeEach(() => {
        cy.viewport(1440, 900);

      cy.visit("http://localhost:3000/"); // Truy cập trang chủ
    });
  
    it("TC_0029 - Tìm kiếm phòng trọ ở trang chủ", () => {
        cy.get(".button-2").should("be.visible").click({ force: true });
        cy.url({ timeout: 10000 }).should("include", "/findroom");
        cy.get(".text-wrapper-11").should("contain", "DANH SÁCH PHÒNG TRỌ");
      });
  
      it("TC_0030 - Tìm kiếm theo khu vực", () => {
        cy.visit("http://localhost:3000/");
      
        // Chờ dropdown load hoàn tất
        cy.intercept('GET', '**/api/diadiem').as('fetchLocations');
        cy.wait('@fetchLocations');
      
        // Chọn option theo value (ổn định và chính xác)
        cy.get('select').eq(1).select("67ea6d7cf45f6276995baab4", { force: true });
      
        // Bấm nút tìm kiếm
        cy.get(".button-2").should("be.visible").click({ force: true });
      
        // Kiểm tra URL và kết quả
        cy.url().should("include", "/findroom");
        cy.contains("Hà Nội - Cầu Giấy").should("exist");
      });
      

      
  
      it("TC_0031 - Tìm kiếm theo mức giá", () => {
        cy.visit("http://localhost:3000/");
      
        // Chờ dữ liệu location
        cy.intercept('GET', '**/api/diadiem').as('fetchLocations');
        cy.wait('@fetchLocations');
      
        // Chọn mức giá "1 - 3 triệu"
        cy.get('select').eq(2).select("1-3tr", { force: true });
      
        // Bấm nút tìm kiếm
        cy.get(".button-2").should("be.visible").click({ force: true });
      
        // Kiểm tra URL
        cy.url().should("include", "/findroom");
      
        // Kiểm tra tất cả các phần tử hiển thị giá đều nằm trong khoảng 1 - 3 triệu
        cy.get('.text-wrapper-21').each(($el) => {
          const text = $el.text(); // "4.5 Triệu / Tháng"
          const match = text.match(/([\d.]+)\s*Triệu/);
      
          if (match) {
            const price = parseFloat(match[1]);
            expect(price).to.be.within(1, 3);
          } else {
            throw new Error("Không tìm thấy giá hợp lệ trong chuỗi: " + text);
          }
        });
      });
      
      
  
      it("TC_0032 - Tìm kiếm kết hợp: vị trí + giá + diện tích", () => {
        cy.visit("http://localhost:3000/");
      
        // Chờ API địa điểm
        cy.intercept('GET', '**/api/diadiem').as('fetchLocations');
        cy.wait('@fetchLocations');
      
        // Chọn diện tích 60 m² (dropdown 0)
        cy.get('select').eq(0).select("60", { force: true });
      
        // Chọn khu vực (dropdown 1) - Quận 1, value là giả định
        cy.get('select').eq(1).select("67ea6d7cf45f6276995baab6", { force: true });
      
        // Chọn mức giá 3 - 5 triệu (dropdown 2)
        cy.get('select').eq(2).select("3-5tr", { force: true });
      
        // Click nút tìm kiếm
        cy.get(".button-2").should("be.visible").click({ force: true });
      
        // Kiểm tra URL đúng
        cy.url().should("include", "/findroom");
      
        // ✅ Kiểm tra khu vực
        cy.contains("TP. Hồ Chí Minh - Quận 1").should("exist");
      
        // ✅ Kiểm tra giá (3 - 5 triệu)
        cy.get('.text-wrapper-21').each(($el) => {
          const text = $el.text(); // Ví dụ: "4.5 Triệu / Tháng"
          const match = text.match(/([\d.]+)\s*Triệu/);
          if (match) {
            const price = parseFloat(match[1]);
            expect(price).to.be.within(3, 5);
          } else {
            throw new Error("Không tìm thấy giá hợp lệ trong chuỗi: " + text);
          }
        });
      
        // ✅ Kiểm tra diện tích
        cy.get('.text-wrapper-20').each(($el) => {
          const text = $el.text(); // Ví dụ: "60 m²"
          const match = text.match(/(\d+)\s*m²/);
          if (match) {
            const area = parseInt(match[1]);
            expect(area).to.equal(60);
          }
        });
      });
      
      
  });
  