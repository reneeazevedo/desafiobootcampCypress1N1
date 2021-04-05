/// <reference types="cypress" />
let Chance = require('chance');
let chance = new Chance()
const welcome = 'Welcome to your account'
const myAddress = 'Meude Endereço'
const urlMyAccount = 'http://automationpractice.com/index.php?controller=my-account'

describe('Cadastrar Login', () => {
    it('Cadastrar Login com Sucesso', () => {
        //Acessar a página Principal
        cy.visit('index.php')
        //- Clicar no botão de "Sign in"
        cy.contains('Sign in').click()
        //- Preencher as informações de e-mail (não pode ser repetido)
        cy.get('input#email_create').type(chance.email())
        //- Clicar no botão "Create an Account"
        cy.get('button#SubmitCreate').click()
        
        //- Preencher as informações do formulário de cadastro
        //- Escolher gênero "Mr" ou "Mrs"
        cy.get(`#id_gender${chance.integer({ min: 1, max: 2 })}`).check()
        // Preencher "first name"
        cy.get('input#customer_firstname').type(chance.first())
        // Preencher "last name"
        cy.get('input#customer_lastname').type(chance.last())
        // Prencher "password"
        cy.get('input[type=password]').type(chance.word({ length: 5 }))
        //Informar "Date of Birth"
        cy.get('#days').select(chance.integer({ min: 1, max: 28 }).toString())
        cy.get('#months').select(chance.month())
        cy.get('#years').select(chance.year({ min: 1899, max: 2020 }))
        //Marcar "Sign up for our newsletter!""
        cy.get('input#newsletter').check()
        //Marcar "Receive special offers from our partners!"
        cy.get('input#optin').check()
        //Informar "company"
        cy.get('input#company').type(chance.company())
        //Preencher "address"
        cy.get('input#address1 ').type(chance.street())
       //Preecnher "address(Line 2)""
        cy.get('input#address2 ').type(chance.address())
        //Preencher "city"
        cy.get('input#city').type(chance.city())
        // Selecionar "state"
        cy.get('select#id_state').select(chance.state({ full: true, country: 'us' }), { force: true })
        // Informar o "ZIP/Postal Code"
        cy.get('input#postcode').type(chance.zip())
        // Preecnher "Additional information"
        cy.get('textarea#other').type(chance.word())
        // Informar o "Home phone"
        cy.get('input#phone').type(chance.phone())
        // Informar o "Mobile phone"
        cy.get('input#phone_mobile').type(chance.phone())
        // Limpar campo "Assign an address alias for future reference." 
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