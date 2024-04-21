import { Builder, By, until } from 'selenium-webdriver';

async function runTest() {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://yourwebsite.com');
        await driver.findElement(By.id('someElementId')).click();
        await driver.wait(until.titleIs('expectedTitle'), 1000);
    } finally {
        await driver.quit();
    }
}

runTest();
