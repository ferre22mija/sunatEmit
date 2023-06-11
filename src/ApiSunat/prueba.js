const {By,Key,Builder} = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function NewSelenium(){
    var searchString = "Automation testing with Selenium and JavaScript";

    //To wait for browser to build and launch properly
    const service = new chrome.ServiceBuilder('D:/proyectos personales/sunatVinculo/chromedriver.exe');
    const driver = new Builder().forBrowser('chrome').setChromeService(service).build();

     //To fetch http://google.com from the browser with our code.
     await driver.get("https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm?pestana=*&agrupacion=*");
     driver.sleep(5000);
     //To send a search query by passing the value in searchString.
      let query= 'document.getElementById("txtRuc").value="10235605941";'
    setTimeout(() => {
      driver.executeScript(query);
    }, 1000);

     //It is always a safe practice to quit the browser after execution
    //  await driver.quit();
}

async function printer(){
  console.log("nelnel")
  await new Promise(r => setTimeout(r, 2000));
  console.log("sfleng")
}
printer()