import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import * as executions from '../fragments/executions';

Given('executions and errors', () => {
  cy.server();
  cy.fixture('executions_latest.json').as('executionsLatest');
  cy.route('GET', '/api/projects/the-demo-project/executions/latest', '@executionsLatest');
  cy.visit(executions.url);
});

When('on the executions and errors page, the user clicks on the actions and job reports button {string}', (id) => {
  executions.getActionsAndJobReportsButton(id).click();
});

Then('on the executions and errors page, in the actions and job reports list, the actions button {string} is visible', (id) => {
  executions.getActionsButton(id).should('be.visible');
});

