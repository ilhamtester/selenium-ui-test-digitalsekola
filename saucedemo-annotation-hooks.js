// Import modul yang diperlukan dari selenium-webdriver
const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");
const { describe, before, after, it } = require("mocha");

// Deskripsi suite pengujian SauceDemo menggunakan Mocha
describe("SauceDemo Test Suite", function() {
  let driver;

  // Meningkatkan batas waktu untuk seluruh suite pengujian
  this.timeout(20000); // 20 detik

  // Hook 'before' untuk menyiapkan WebDriver sebelum pengujian dimulai
  before(async function() {
    // Membuat instance baru dari opsi Chrome tanpa mode headless
    let options = new chrome.Options();
    // options.addArguments("--headless"); // Menghapus argumen headless untuk tampilan UI

    // Membuat instance baru dari WebDriver untuk Chrome dengan opsi yang ditentukan
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
  });

  // Hook 'after' untuk membersihkan WebDriver setelah pengujian selesai
  after(async function() {
    // Menutup browser
    await driver.quit();
  });

  // Kasus uji untuk login dan menambahkan item ke keranjang
  describe("Login Test", function() {
    it("should login successfully", async function() {
      // Membuka URL di browser
      await driver.get("https://saucedemo.com");
      console.log("Opened saucedemo.com");
      await driver.sleep(2000); // Menunda 2 detik

      // Login
      await driver.findElement(By.id("user-name")).sendKeys("standard_user");
      console.log("Entered username");
      await driver.sleep(2000); // Menunda 2 detik

      await driver.findElement(By.xpath("//input[@id='password']")).sendKeys("secret_sauce");
      console.log("Entered password");
      await driver.sleep(2000); // Menunda 2 detik

      await driver.findElement(By.name("login-button")).click();
      console.log("Clicked login button");
      await driver.sleep(2000); // Menunda 2 detik
    });

    describe("Dashboard Validation", function() {
      it("should validate user is on the dashboard", async function() {
        // Memvalidasi bahwa pengguna berada di dashboard
        let titleText = await driver.findElement(By.css(".app_logo")).getText();
        assert.strictEqual(
          titleText.includes("Swag Labs"),
          true,
          'Title does not include "Swag Labs"'
        );
        console.log("Validated user is on the dashboard");
        await driver.sleep(2000); // Menunda 2 detik
      });
    });

    describe("Add to Cart Test", function() {
      it("should add item to cart", async function() {
        // Menambahkan item ke keranjang
        await driver.findElement(By.css(".inventory_item button")).click();
        console.log("Added item to cart");
        await driver.sleep(2000); // Menunda 2 detik
      });

      it("should validate item is added to cart", async function() {
        // Memvalidasi bahwa item telah ditambahkan ke keranjang
        let cartBadge = await driver.findElement(By.css(".shopping_cart_badge")).getText();
        assert.strictEqual(cartBadge, "1", "Item was not added to the cart");
        console.log("Validated item is added to cart");
        await driver.sleep(2000); // Menunda 2 detik
      });

      it("should validate item in cart", async function() {
        // Membuka menu keranjang
        await driver.findElement(By.css(".shopping_cart_link")).click();
        console.log("Opened cart menu");
        await driver.sleep(2000); // Menunda 2 detik

        // Memvalidasi item di keranjang
        let cartItem = await driver.findElement(By.css(".cart_item .inventory_item_name")).getText();
        assert.strictEqual(cartItem, "Sauce Labs Backpack", "Item in cart does not match the added item");
        console.log("Validated item in cart");
        await driver.sleep(2000); // Menunda 2 detik

        // Menambahkan penundaan untuk menjaga browser tetap terbuka selama 10 detik
        await driver.sleep(2000);

        // Pernyataan untuk menunjukkan keberhasilan pengujian
        console.log("Testing with annotations and hooks is successful");
      });
    });
  });
});

/* npm test */