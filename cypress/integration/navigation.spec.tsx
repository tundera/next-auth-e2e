describe("Navigation", () => {
  it("should navigate to the client page", () => {
    cy.visit("http://localhost:3000/")

    cy.get('a[href*="client"]').click()
    cy.url().should("include", "/client")

    cy.findByText(/Client Side Rendering/).should("exist")
  })

  it("should navigate to the client page", () => {
    cy.visit("http://localhost:3000/")

    cy.get('a[href*="server"]').click()
    cy.url().should("include", "/server")

    cy.findByText(/Server Side Rendering/).should("exist")
  })

  it("should navigate to the server page", () => {
    cy.visit("http://localhost:3000/")

    cy.get('a[href*="server"]').click()
    cy.url().should("include", "/server")

    cy.findByText(/Server Side Rendering/).should("exist")
  })

  it("should navigate to the policy page", () => {
    cy.visit("http://localhost:3000/")

    cy.get('a[href*="policy"]').click()
    cy.url().should("include", "/policy")

    cy.findByText(/Terms of Service/).should("exist")
  })

  it("should navigate to the protected page", () => {
    cy.visit("http://localhost:3000/")

    cy.get('a[href*="protected"]').click()
    cy.url().should("include", "/protected")

    cy.findByText(/Protected Page/).should("exist")
  })

  it("should navigate to the API example page", () => {
    cy.visit("http://localhost:3000/")

    cy.get('a[href*="api-example"]').click()
    cy.url().should("include", "/api-example")

    cy.findByText(/API Example/).should("exist")
  })
})
