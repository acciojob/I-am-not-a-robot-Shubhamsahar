//your code here
describe('Robot Blocker', () => {
    it('works correctly', () => {
        cy.visit('/').then(() => {
            console.log('Page loaded');
        });
        cy.get('h3').should('contain', 'Please click on the identical tiles to verify that you are not a robot.').then(() => {
            console.log('h3 tag found');
        });
        cy.get('img').should('have.length', 6).then(() => {
            console.log('Images found');
        });
        cy.get('#reset').should('not.be.visible').then(() => {
            console.log('Reset button is not visible');
        });
        cy.get('#verify').should('not.be.visible').then(() => {
            console.log('Verify button is not visible');
        });
        cy.get('img').eq(0).click().then(() => {
            console.log('Image 1 clicked');
        });
        cy.get('#reset').should('be.visible').then(() => {
            console.log('Reset button is visible');
        });
        cy.get('#verify').should('not.be.visible').then(() => {
            console.log('Verify button is still not visible');
        });
        cy.get('img').eq(1).click().then(() => {
            console.log('Image 2 clicked');
        });
        cy.get('#verify').should('be.visible').then(() => {
            console.log('Verify button is visible');
        });
    });
});

