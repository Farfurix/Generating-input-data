import { Selector } from 'testcafe';

// Import the required libraries
import faker from 'faker';
import generator from 'generate-password';

fixture `Form validation test`
    .page('../page/form-validation.html');

test('Successful password validation', async t => {

    let validPasswords = [];

    for (let i = 0; i < 5; i++) {
        let newRandomPassword = generator.generate({
            length: faker.random.number({ 'min': 10, 'max': 20 }), // 10-20 characters long
            numbers: true,
            uppercase: true,
            lowercase: true,
            strict: true });

        validPasswords.push(newRandomPassword);
    }

    // Try all the passwords and see if they are found valid
    for (const validPassword of validPasswords) {
        await t
            .typeText('#email', faker.internet.email(), { replace:true })
            .typeText('#password', validPassword, { replace: true })
            .click('#submit')
            // check that there's no warning
            .expect(Selector('#password-status').value).eql('Valid password with a length of ' + validPassword.length);
    }

});

test('Invalid password warning', async t => {

    // These passwords are too short
    const shortPasswords = generator.generateMultiple(5, {
        length: 7,
        numbers: true,
        strict: true
    });

    // These passwords lack uppercase characters
    const passwordsWithoutUppercase = generator.generateMultiple(5, {
        length: 8,
        numbers: true,
        uppercase: false,
        strict: true
    });

    // These passwords lack lowercase characters
    const passwordsWithoutLowercase = generator.generateMultiple(5, {
        length: 8,
        numbers: true,
        lowercase: false,
        strict: true
    });

    // These passwords lack digits
    const passwordsWithoutDigits = generator.generateMultiple(5, {
        length: 8,
        strict: true
    });

    const invalidPasswords = shortPasswords.concat(passwordsWithoutUppercase, passwordsWithoutLowercase, passwordsWithoutDigits);

    // Try all the passwords and see if they are found valid
    for (const invalidPassword of invalidPasswords) {
        await t
            .typeText('#email', faker.internet.email(), { replace: true })
            .typeText('#password', invalidPassword, { replace: true })
            .click('#submit')
            .expect(Selector('#password-status').value).eql('Not valid');
    }

});
