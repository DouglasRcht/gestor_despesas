import { When } from "@badeball/cypress-cucumber-preprocessor";

When(
  "seleciono o arquivo {string} do tipo {string}",
  (filename: string, mimeType: string) => {
    cy.get('input[type="file"]').selectFile(
      {
        contents: Cypress.Buffer.from("dummy content"),
        fileName: filename,
        mimeType: mimeType,
      },
      { force: true },
    );
  },
);
