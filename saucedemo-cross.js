// Import necessary modules from selenium-webdriver
const { Builder, By, Key, until, Browser } = require("selenium-webdriver");
const assert = require("assert");

// Define an asynchronous function to run the test
async function saucedemoTest() {
  // Daftar browser yang akan diuji
  const browsers = ["chrome", "firefox", "MicrosoftEdge"];

  // Loop melalui array browser
  for (let browser of browsers) {
    // Membuat instance WebDriver untuk browser yang ditentukan
    let driver = await new Builder().forBrowser(browser).build();

    // Exception Handling & Conclusion
    try {
      // Membuka URL di browser
      await driver.get("https://saucedemo.com");
      console.log("Opened saucedemo.com");
      await driver.sleep(2000); // Delay 2 detik

      // Login
      // Menemukan field input username berdasarkan ID dan memasukkan username
      await driver.findElement(By.id("user-name")).sendKeys("standard_user");
      console.log("Entered username");
      await driver.sleep(2000); // Delay 2 detik

      // Menemukan field input password berdasarkan XPath dan memasukkan password
      await driver.findElement(By.xpath("//input[@id='password']")).sendKeys("secret_sauce");
      console.log("Entered password");
      await driver.sleep(2000); // Delay 2 detik

      // Menemukan tombol login berdasarkan nama dan mengkliknya
      await driver.findElement(By.name("login-button")).click();
      console.log("Clicked login button");
      await driver.sleep(2000); // Delay 2 detik

      // Validasi pengguna berada di dashboard
      // Menemukan elemen yang mengandung teks logo aplikasi dan mendapatkan teksnya
      let titleText = await driver.findElement(By.css(".app_logo")).getText();
      // Memastikan bahwa teks tersebut mengandung "Swag Labs"
      assert.strictEqual(
        titleText.includes("Swag Labs"),
        true,
        'Title does not include "Swag Labs"'
      );
      console.log("Validated user is on the dashboard");
      await driver.sleep(2000); // Delay 2 detik

      // Menambahkan item ke keranjang
      // Menemukan tombol item pertama berdasarkan CSS selector dan mengkliknya
      await driver.findElement(By.css(".inventory_item button")).click();
      console.log("Added item to cart");
      await driver.sleep(2000); // Delay 2 detik

      // Validasi item ditambahkan ke keranjang
      // Menemukan elemen badge keranjang berdasarkan CSS selector dan mendapatkan teksnya
      let cartBadge = await driver.findElement(By.css(".shopping_cart_badge")).getText();
      // Memastikan bahwa teks badge keranjang adalah "1"
      assert.strictEqual(cartBadge, "1", "Item was not added to the cart");
      console.log("Validated item is added to cart");
      await driver.sleep(2000); // Delay 2 detik

      // Membuka menu keranjang
      // Menemukan elemen link keranjang berdasarkan CSS selector dan mengkliknya
      await driver.findElement(By.css(".shopping_cart_link")).click();
      console.log("Opened cart menu");
      await driver.sleep(2000); // Delay 2 detik

      // Validasi item di keranjang
      // Menemukan elemen nama item keranjang berdasarkan CSS selector dan mendapatkan teksnya
      let cartItem = await driver.findElement(By.css(".cart_item .inventory_item_name")).getText();
      // Memastikan bahwa nama item keranjang adalah "Sauce Labs Backpack"
      assert.strictEqual(cartItem, "Sauce Labs Backpack", "Item in cart does not match the added item");
      console.log("Validated item in cart");
      await driver.sleep(2000); // Delay 2 detik

      // Menambahkan delay untuk menjaga browser tetap terbuka selama 10 detik
      await driver.sleep(2000);

      // Pernyataan untuk menunjukkan berhasilnya pengujian
      console.log("Testing Success! with browser " + browser);
    } finally {
      // Menutup browser
      await driver.quit();
    }
  }
}

// Menjalankan fungsi tes
saucedemoTest();