const { By, Key, Builder } = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
async function NewSelenium(recieve: any) {
  var searchString = "Automation testing with Selenium and JavaScript";

  //To wait for browser to build and launch properly
  const service = new chrome.ServiceBuilder('D:/proyectos personales/sunatVinculo/chromedriver.exe');
  const driver = new Builder().forBrowser('chrome').setChromeService(service).build();

  //To fetch http://google.com from the browser with our code.
  await driver.get("https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm?pestana=*&agrupacion=*");
  //To send a search query by passing the value in searchString.
  await new Promise(r => setTimeout(r, 1000));
  //ingresar
  let query: string = 'document.getElementById("txtRuc").value="10235605941";'
  driver.executeScript(query);
  query = 'document.getElementById("txtUsuario").value="MIJARESS";'
  driver.executeScript(query);
  query = 'document.getElementById("txtContrasena").value="12345678";'
  driver.executeScript(query);

  driver.executeScript('document.getElementById("btnAceptar").click()')

  //cambiar link a factura o boleta
  await new Promise(r => setTimeout(r, 2000));
  if (recieve.tipo === "1") {
    await driver.get("https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm?action=execute&code=11.5.3.1.1&s=ww1");
    llenarDatosFactura(driver, recieve)
  } else {
    await driver.get("https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm?action=execute&code=11.5.4.1.1&s=ww1");
    await new Promise(r => setTimeout(r, 1000));
    llenarDatosBoleta(driver,recieve)
  }


  //It is always a safe practice to quit the browser after execution
  //  await driver.quit();
}
export default NewSelenium;

async function llenarDatosFactura(driver: any, recieve: any) {
  await new Promise(r => setTimeout(r, 1000));
  //llenar ruc
  driver.findElement(By.xpath('//input[@id="inicio.numeroDocumento"]')).sendKeys(recieve.rucDni);
  //click cualquier lado
  driver.findElement(By.xpath('//input[@id="inicio.subTipoDC01"]')).click();
  await new Promise(r => setTimeout(r, 1000));
  //click en continuar
  driver.executeScript('document.getElementById("inicio.botonGrabarDocumento_label").click()');

  //llenar productos
  await new Promise(r => setTimeout(r, 1000));
  // recieve.productos.forEach((producto: any, index: number) => {

  //   agregarProducto(driver, producto, recieve.tipo)
  // });
  for (let i = 0; i < recieve.productos.length; i++) {
    const producto = recieve.productos[i];
    console.log(producto);
    await agregarProducto(driver, producto, recieve.tipo)
  }
  await new Promise(r => setTimeout(r, 1000));
  //click en siguiente
  driver.executeScript('document.getElementById("factura.botonGrabarDocumento").click()');


}
async function llenarDatosBoleta(driver: any, recieve: any) {
  driver.executeScript('document.getElementById("inicio.tipoDocumento").value = ""');
  if(recieve.subtipodni === "1"){ //DNI
     let cliente = driver.findElement(By.xpath('//input[@id="inicio.numeroDocumento"]'));
     cliente.click();
     await new Promise(r => setTimeout(r, 1000));
     cliente.sendKeys(recieve.rucDni);
     //click cualquier lado
    driver.findElement(By.xpath('//input[@id="inicio.subTipoDC01"]')).click();
     await new Promise(r => setTimeout(r, 1000));
     driver.findElement(By.xpath('//input[@id="inicio.numeroDocumento"]')).click();
  }else if(recieve.subtipodni === "2"){  // ruc
    driver.findElement(By.xpath('//input[@id="inicio.tipoDocumento"]')).sendKeys("REG. UNICO DE CONTRIBUYENTES");
    let cliente = driver.findElement(By.xpath('//input[@id="inicio.numeroDocumento"]'));
     cliente.click();
     await new Promise(r => setTimeout(r, 1000));
     cliente.sendKeys(recieve.rucDni);
     //click cualquier lado
    driver.findElement(By.xpath('//input[@id="inicio.subTipoDC01"]')).click();
     await new Promise(r => setTimeout(r, 1000));
     driver.findElement(By.xpath('//input[@id="inicio.numeroDocumento"]')).click();
  }else if(recieve.subtipodni === "3"){ // sin documento
    driver.findElement(By.xpath('//input[@id="inicio.tipoDocumento"]')).sendKeys("SIN DOCUMENTO");
    await new Promise(r => setTimeout(r, 1000));
    let cliente = driver.findElement(By.xpath('//input[@id="inicio.razonSocial"]'));
     cliente.click();
     await new Promise(r => setTimeout(r, 1000));
     cliente.sendKeys(recieve.rucDni);
     await new Promise(r => setTimeout(r, 1000));
  }
  driver.executeScript('document.getElementById("inicio.botonGrabarDocumento_label").click()');
  await new Promise(r => setTimeout(r, 1000));
  for (let i = 0; i < recieve.productos.length; i++) {
    const producto = recieve.productos[i];
    console.log(producto);
    await agregarProducto(driver, producto, recieve.tipo)
  }
}

async function agregarProducto(driver: any, producto: any, tipo: string) {
  //seleccionar add
  if (tipo == "1") {
    driver.executeScript('document.getElementById("factura.addItemButton_label").click()');
  } else {
    driver.executeScript('document.getElementById("boleta.addItemButton_label").click()');
  }
  //marca check en bien
  driver.findElement(By.xpath('//input[@id="item.subTipoTI01"]')).click();
  await new Promise(r => setTimeout(r, 1000));
  //limpia cantidad
  driver.executeScript('document.getElementById("item.cantidad").value = ""');
  //agregar cantidad
  driver.findElement(By.xpath('//input[@id="item.cantidad"]')).sendKeys(producto.cantidad);
  //poner descripcion
  driver.executeScript('document.getElementById("item.descripcion").value = "' + producto.descripcion + '"');
  await new Promise(r => setTimeout(r, 1000));
  //limpiar precio unitario
  driver.executeScript('document.getElementById("item.precioUnitario").value = ""');
  //poner precio
  let newPrecio = parseFloat(producto.precio) / 1.18;
  let newPrecioFixed = newPrecio.toFixed(5);
  console.log(newPrecioFixed)
  driver.findElement(By.xpath('//input[@id="item.precioUnitario"]')).sendKeys(newPrecioFixed);
  await new Promise(r => setTimeout(r, 1000));
  //click fuera
  driver.findElement(By.xpath('//form[@id="item.form"]')).click();
  
  //click agregar
  driver.executeScript('document.getElementById("item.botonAceptar_label").click()');
  await new Promise(r => setTimeout(r, 1000));
  

}
