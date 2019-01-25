describe("Authentication", () => {
  context("signup", () => {
    beforeEach(() => {
      cy.visit("https://kevpy.github.io/SendIT/ui/register.html");
    });

    // Test invalid data
    it("displays errors with ivalid data", () => {
      cy.get("input[name=name]").type("test");
      cy.get("input[name=email]").type("test");
      cy.get("input[name=psw]").type("test");
      cy.get("input[name=psw-repeat]").type("test");

      cy.get("button").click();

      // should still be on the same url
      cy.url().should("include", "/register");

      // visible error messages should be present
      cy.get("p").and("contain", "Not a valid email address");
    });

    // Test user signup with existing user
    it("user with give email address exits", () => {
      cy.get("input[name=name]").type("user1");
      cy.get("input[name=email]").type("user1@email.com");
      cy.get("input[name=psw]").type("Passw0rd");
      cy.get("input[name=psw-repeat]").type("Passw0rd");

      cy.get("button").click();

      // should still be on the same url
      cy.url().should("include", "/register");

      // visible error messages should be present
      cy.get("p").and("contain", "User with given email address exist");
    });

    // Test user signup with none matching passwords
    it("user with give email address exits", () => {
      cy.get("input[name=name]").type("user1");
      cy.get("input[name=email]").type("user1@email.com");
      cy.get("input[name=psw]").type("Passw0rd");
      cy.get("input[name=psw-repeat]").type("test");

      cy.get("button").click();

      // should still be on the same url
      cy.url().should("include", "/register");

      // visible error messages should be present
      cy.get("p").and("contain", "PASSWORD and REPEAT PASSWORD should match");
    });

    // Test sucessful user signup
    // it.only("sucessful user signup", () => {
    //   cy.get("input[name=name]").type("user 5");
    //   cy.get("input[name=email]").type("user5@email.com");
    //   cy.get("input[name=psw]").type("Passw0rd");
    //   cy.get("input[name=psw-repeat]").type("Passw0rd");

    //   //   cy.get("button").click();

    //   cy.server({
    //     method: "POST",
    //     delay: 1000,
    //     status: 201,
    //     response: {}
    //   });
    //   cy.route("http://127.0.0.1:5500/ui/register.html", {
    //     Message: "User saved successfully",
    //     data: {
    //       email: "user5@email.com",
    //       name: "User 5"
    //     }
    //   }).as("signup");

    // should still be on the same url
    //   cy.url().should("include", "/login");

    // visible error messages should be present
    //   cy.get("button").and("contain", "Login");
    // });
  });
});
