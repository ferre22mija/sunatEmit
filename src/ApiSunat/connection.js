const {By,Key,Builder} = require("selenium-webdriver");
require("chromedriver");


async function ConnectSelenium(){
    setTimeout(() => {
        console.log("Delayed for 1 second.");
      }, "1000")
      
 
    var searchString = "Automation testing with Selenium and JavaScript";

    //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();

     //To fetch http://google.com from the browser with our code.
     await driver.get("http://google.com");
         
     //To send a search query by passing the value in searchString.
     await driver.findElement(By.name("q")).sendKeys(searchString,Key.RETURN);

     //Verify the page title and print it
     var title = await driver.getTitle();
     console.log('Title is:',title);

     //It is always a safe practice to quit the browser after execution

     await driver.quit();


}

export default ConnectSelenium;


async function IngresarFactura(){
    //Ingresa
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://api-seguridad.sunat.gob.pe/v1/clientessol/4f3b88b3-d9d6-402a-b85d-6a0bc857746a/oauth2/loginMenuSol?originalUrl=https://e-menu.sunat.gob.pe/cl-ti-itmenu/AutenticaMenuInternet.htm&state=rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAADdAAEZXhlY3B0AAZwYXJhbXN0AEsqJiomL2NsLXRpLWl0bWVudS9NZW51SW50ZXJuZXQuaHRtJmI2NGQyNmE4YjVhZjA5MTkyM2IyM2I2NDA3YTFjMWRiNDFlNzMzYTZ0AANleGVweA==");

}

function IngresarBoleta(){
    
}