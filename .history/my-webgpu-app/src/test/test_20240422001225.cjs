// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { Builder, By, until } = require('selenium-webdriver');
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const chrome = require('selenium-webdriver/chrome');

async function runTest() {
    let options = new chrome.Options();
    // Configure additional options as needed, e.g., headless mode
    // options.headless();

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
    
    try {
        await driver.get('http://yourwebsite.com');
        await driver.findElement(By.id('someElementId')).click();
        await driver.wait(until.titleIs('expectedTitle'), 1000);
    } finally {
        await driver.quit();
    }
}

runTest();
