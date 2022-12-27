//Example
describe("Navigation", () => {
    it("should navigate to conversion history page", () => {
        cy.visit("http://localhost:3000/");
        cy.get(".menu-item:not(active)").click();
        //check url
        cy.url().should("include", "/history")
    })
})
