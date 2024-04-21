const { Builder, By, until } = require('selenium-webdriver');
const { Options } = require('@microsoft/edge-selenium-tools');

async function runTest() {
    let options = new Options();
    // Configure additional options as needed, e.g., headless mode
    // options.headless();

    let driver = await new Builder()
        .forBrowser('MicrosoftEdge')
        .setEdgeOptions(options)
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
