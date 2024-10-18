describe("example login", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("successfully login", () => {
      cy.login("test@test.com", "test");
      cy.get(".pt-2").should("have.text", "Добро пожаловать test@test.com");
    });
  
    it("Should not login with empty login", () => {
      cy.contains("Log in").click();
      cy.get("#mail").type(" ");
      cy.get("#pass").type("test");
      cy.contains("Submit").click();
      cy.get("#mail")
        .then(($el) => $el[0].checkValidity())
        .should("be.false");
    });
  
    it("Should not login with empty password", () => {
      cy.contains("Log in").click();
      cy.get("#mail").type("test@test.com");
      cy.contains("Submit").click();
      cy.get("#pass")
        .then(($el) => $el[0].checkValidity())
        .should("be.false");
    });
  });
  
    describe("example favorite", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.login("test@test.com", "test");
    });
  
    it("add book by click add", () => {
      cy.createbook("Ловец Снов", "Фэнтези", "Кинг");
      cy.contains("Ловец Снов").should("be.visible");
    });
  
    it("add to favorite book", () => {
      cy.createbook("Ловец Снов", "Фэнтези", "Кинг");
      cy.get("body > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > div:nth-child(1) > div:nth-child(3) > button:nth-child(1)").click();
      cy.visit("/favorites");
      cy.contains("Ловец Снов").should("be.visible");
    });
  
    it("delete from favorite book", () => {
      cy.visit("/favorites");
      cy.contains("Ловец Снов")
        .should("be.visible")
        .within(() => cy.get("button[class='btn btn-secondary']").click({ force: true }));
      cy.contains("Ловец Снов").should("not.exist");
    });
  });
  