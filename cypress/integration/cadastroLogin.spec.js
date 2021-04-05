/// <reference types="cypress" />
let Chance = require('chance');
let chance = new Chance()
const welcome = 'Welcome to your account'
const myAddress = 'Meude Endereço'
const urlMyAccount = 'http://automationpractice.com/index.php?controller=my-account'

describe('Cadastrar Login', () => {
    it('Cadastrar Login com Sucesso', () => {
        cy.visit('index.php')
        //- Clicar no botão de Sign in
        cy.contains('Sign in').click()
        //- Preencher as informações de e-mail (não pode ser repetido)
        cy.get('input#email_create').type(chance.email())

        //- Clicar no botão Create an Account
        cy.get('button#SubmitCreate').click()
        //- Preencher as informações do formulário de cadastro
        cy.get(`#id_gender${chance.integer({ min: 1, max: 2 })}`).check()
        cy.get('input#customer_firstname').type(chance.first())
        cy.get('input#customer_lastname').type(chance.last())
        cy.get('input[type=password]').type(chance.word({ length: 5 }))
        cy.get('#days').select(chance.integer({ min: 1, max: 28 }).toString())
        cy.get('#months').select(chance.month())
        cy.get('#years').select(chance.year({ min: 1920, max: 2020 }))
        cy.get('input#newsletter').check()
       
        cy.get('input#optin').check()
    
        cy.get('input#company').type(chance.company())
        
        cy.get('input#address1 ').type(chance.street())
       
        cy.get('input#address2 ').type(chance.address())
        
        cy.get('input#city').type(chance.city())
        
        cy.get('select#id_state').select(chance.state({ full: true, country: 'us' }), { force: true })
        
        cy.get('input#postcode').type(chance.zip())
        
        cy.get('textarea#other').type(chance.word())
        
        cy.get('input#phone').type(chance.phone())
        
        cy.get('input#phone_mobile').type(chance.phone())
        
        cy.get('input#alias').clear()
        
        cy.get('input#alias').type(myAddress)
        //- Clicar no botão Register
        cy.contains('Register').click()

        //- Validar que foi redirecionado para a url correta
        cy.url().should('eq', urlMyAccount)
        //- Validar exibição do texto 'Welcome to your account'
        cy.get('p.info-account').should('contain.text', welcome)

    });
});