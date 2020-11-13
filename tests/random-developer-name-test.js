import { Selector } from 'testcafe';

// Import modules for IDs generating
import { nanoid } from 'nanoid';

fixture `Generating input data (a developer name)`
    .page('https://devexpress.github.io/testcafe/example/');

test(`Check a random developer name`, async t => {
    const nameInput    = Selector('#developer-name');
    const submitButton = Selector('#submit-button');
    const result       = Selector('#article-header');

    // Generate a developer name using nanoid and save it to a variable
    const randomDeveloperName = 'testuser_' + nanoid();

    await t
        // Type the developer name in input
        .typeText(nameInput, randomDeveloperName)
        .click(submitButton)
        .expect(result.innerText).contains(randomDeveloperName);
});
