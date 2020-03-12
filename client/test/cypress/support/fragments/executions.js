export const url = '/projects/the-demo-project/executions';

  
export const getActionsAndJobReportsButton = (id) => {
    return cy.GetByDataNrt('executions_ActionsAndJobReportsButton_' + id);
}

export const getActionsButton = (id) => {
    return cy.GetByDataNrt('executions_ActionsAndJobReportsButton_Actions_' + id)
}
