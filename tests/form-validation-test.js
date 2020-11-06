import { Selector } from 'testcafe';
import { generateMultiple } from 'generate-password';
import faker from 'faker';

fixture `Generating input data (an email, a password)`
    .page `../page/form-validation.html`;

const passwordInput  = Selector('#password');
const passwordStatus = Selector('#password-status');
const emailInput     = Selector('#email');
const emailStatus    = Selector('#email-status');
const submit         = Selector('#submit');

test('Check success validation', async t => {
    // Generate valid passwords arrays for [8,9,10] characters long
    const validPasswordsWithLength8  = generateMultiple(5, {
        length: 8,
        numbers: true,
        strict: true
    });
    const validPasswordsWithLength9  = generateMultiple(5, {
        length: 9,
        numbers: true,
        strict: true
    });
    const validPasswordsWithLength10 = generateMultiple(5, {
        length: 10,
        numbers: true,
        strict: true
    });

    // Concatenate all the valid passwords arrays into single array
    const validPasswords = validPasswordsWithLength8
        .concat(validPasswordsWithLength9, validPasswordsWithLength10);

    // Type each password and assert the result password state
    for (const validPassword of validPasswords) {
        await t
            .typeText(emailInput, faker.internet.email(), { replace:true })
            .typeText(passwordInput, validPassword, { replace: true })
            .click(submit)
            .expect(emailStatus.value).eql('Valid')
            .expect(passwordStatus.value).eql('Valid (' + validPassword.length + ')');
    }
});

test('Check validation failure', async t => {
    // We use one case of an invalid email
    const invalidEmail = 'invalid@email';

    // Generate invalid passwords arrays
    const shortPasswords = generateMultiple(5, {
        length: 7,
        numbers: true,
        strict: true
    });
    const passwordsWithoutUppercase = generateMultiple(5, {
        length: 8,
        numbers: true,
        uppercase: false,
        strict: true
    });
    const passwordsWithoutLowercase = generateMultiple(5, {
        length: 8,
        numbers: true,
        lowercase: false,
        strict: true
    });
    const passwordsWithoutDigits = generateMultiple(5, {
        length: 8,
        strict: true
    });

    // Concatenate all the invalid passwords arrays into single array
    const invalidPasswords = shortPasswords
        .concat(passwordsWithoutUppercase, passwordsWithoutLowercase, passwordsWithoutDigits);

    // Type each password and assert the result password state
    for (const invalidPassword of invalidPasswords) {
        await t
            .typeText(emailInput, invalidEmail, { replace: true })
            .typeText(passwordInput, invalidPassword, { replace: true })
            .click(submit)
            .expect(emailStatus.value).eql('Not valid')
            .expect(passwordStatus.value).eql('Not valid');
    }
});
