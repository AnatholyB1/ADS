import { Builder, By, until } from 'selenium-webdriver';
import { Options } from '@microsoft/edge-selenium-tools';

async function runTest() {
    const options = new Options();
    // Ajoutez des options de configuration ici si nécessaire, comme le mode sans tête
    // options.headless();

    const driver = await new Builder()
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
