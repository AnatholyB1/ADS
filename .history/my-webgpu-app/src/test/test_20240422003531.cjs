/* eslint-disable no-inner-declarations */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const { Builder, By, until } = require('selenium-webdriver');
const { Options } = require('@microsoft/edge-selenium-tools');
const Stats = require('stats-js');
const fs = require('fs');
const csvWriter = require('fast-csv').write;

async function runTest() {
    let driver = await new Builder()
        .forBrowser('MicrosoftEdge')
        .setEdgeOptions(new Options())
        .build();

    // Create a write stream for the CSV file
    const ws = fs.createWriteStream('output.csv');

    try {
        // Start measuring the loading time
        let loadStartTime = Date.now();

        // Navigate to the page with the 3D model
        await driver.get('http://localhost:5173/three');
        
        // Wait for the 3D model to load completely
        await driver.wait(until.elementLocated(By.id('home')), 10000);

        // Calculate the loading time
        let loadTime = Date.now() - loadStartTime;

        // Set up stats.js for FPS monitoring
        let stats = new Stats();
        stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(stats.dom);

        function animate() {
            stats.begin();
        
            // Rotate the cube by a small amount on each frame
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        
            // Render the scene with the updated cube
            renderer.render(scene, camera);
        
            stats.end();
        
            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);

        // Perform interactions with the model
        let model = await driver.findElement(By.id('home'));
        await model.click();
        await driver.actions().dragAndDrop(model, {x: 100, y: 0}).perform();

        // Additional model interactions can be added here

        // End FPS monitoring after interactions
        setTimeout(() => {
            document.body.removeChild(stats.dom);
        }, 20000); // Adjust time as needed for your test scenario

        // Write the loading time and FPS to the CSV file
        csvWriter([{ Load3DModel: loadTime, FPS: fps }], { headers: true }).pipe(ws);

    } finally {
        await driver.quit();
    }
}

runTest();