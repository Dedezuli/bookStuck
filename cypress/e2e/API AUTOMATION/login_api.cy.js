/// <reference types="Cypress"/>
import { faker } from '@faker-js/faker';

let name = faker.name.firstName();
let email = faker.internet.email();

describe('Login and API Access', () => {
    beforeEach(() => {
        cy.api({
            method: 'GET',
            url: 'https://demo.bookstackapp.com/login',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);

            const parser = new DOMParser();
            const doc = parser.parseFromString(response.body, 'text/html');
            const tokenMeta = doc.querySelector('meta[name="token"]');

            if (tokenMeta) {
                const accessToken = tokenMeta.getAttribute('content');
                cy.wrap(accessToken).as('accessToken'); 
                cy.log('Extracted Token:', accessToken);
            } else {
                throw new Error('Token meta tag not found');
            }
        });
    });

    it('Successfully logs in and extracts token', () => {
        cy.get('@accessToken').then((token) => {
            expect(token).to.be.a('string');
            cy.log('Token successfully stored:', token);
        });
    });

    it('Should fail to create a user when lacking permission', function () {
        cy.get('@accessToken').then((token) => {  
            cy.api({
                method: 'GET',
                url: 'https://demo.bookstackapp.com/api/users',
                failOnStatusCode: false,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: {}
            }).then((response) => {
                expect(response.status).to.eq(403);
                expect(response.body.error).to.have.property(
                    'message',
                    'The owner of the used API token does not have permission to make API calls'
                );
            });
        });
    });
});
