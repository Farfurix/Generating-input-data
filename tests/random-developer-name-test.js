import { Selector } from 'testcafe';

// Import the nanoid module
import { nanoid } from 'nanoid';

fixture `Random Input Data: example 1`
    .page('https://devexpress.github.io/testcafe/example/');

test('Generate a random name', async t => {

    // Generate a random string with nanoid
    const randomDeveloperName = 'testuser_' + nanoid();

    await t
        // Populate the input field with the random name
        .typeText('#developer-name', randomDeveloperName)
        // Click 'Submit'
        .click('#submit-button')
        // Verify that the page displays the name we just entered
        .expect(Selector('#article-header').innerText).contains('Thank you, ' + randomDeveloperName + '!');

});
