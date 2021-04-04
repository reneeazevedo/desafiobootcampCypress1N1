/// <reference types="cypress" />
let Chance = require('chance');
let chance = new Chance()
const myAddress = 'Welcome to your account'
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
        //Title #id_gender1 ou #id_gender2
        cy.get(`#id_gender${chance.integer({ min: 1, max: 2 })}`).check()
        //First Name
        cy.get('input#customer_firstname').type(chance.first())
        //Last Name
        cy.get('input#customer_lastname').type(chance.last())
        //Preenchendo o campo Password
        cy.get('input[type=password]').type(chance.word({ length: 5 }))
        //Informar Date of Birth
        cy.get('#days').select(chance.integer({ min: 1, max: 28 }).toString())
        cy.get('#months').select(chance.month())
        cy.get('#years').select(chance.year({ min: 1920, max: 2020 }))
        //Sign up for...     input#newsletter
        cy.get('input#newsletter').check()
        //Receive special... input#optin
        cy.get('input#optin').check()
        //Company   input#company
        cy.get('input#company').type(chance.company())
        //Address   input#address1 
        cy.get('input#address1 ').type(chance.street())
        //Address(Line 2) input#address2
        cy.get('input#address2 ').type(chance.address())
        //City input#city
        cy.get('input#city').type(chance.city())
        //State #id_state
        cy.get('select#id_state').select(chance.state({ full: true, country: 'us' }), { force: true })
        //Zip  input#postcode
        cy.get('input#postcode').type(chance.zip())
        //Additional information textarea#other
        cy.get('textarea#other').type(chance.word())
        //Home Phone input#phone
        cy.get('input#phone').type(chance.phone())
        //mobile phone input#phone_mobile
        cy.get('input#phone_mobile').type(chance.phone())
        //Assing an address alias input#alias
        //Limpando o campo de alias
        cy.get('input#alias').clear()
        //Inserindo informação no campo alias
        cy.get('input#alias').type('Meu Endereço')
        //- Clicar no botão Register
        cy.contains('Register').click()

        //- Validar que foi redirecionado para a url correta
        cy.url().should('eq', urlMyAccount)
        //- Validar exibição do texto 'Welcome to your account'
        cy.get('p.info-account').should('contain.text', myAddress)

    });
});