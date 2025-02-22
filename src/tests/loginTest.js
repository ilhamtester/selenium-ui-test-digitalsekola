const { Builder, By, Key, until } = require("selenium-webdriver"); // Mengimpor modul selenium-webdriver
const assert = require("assert"); // Mengimpor modul assert untuk melakukan asersi
const LoginPage = require("../pages/loginPage"); // Mengimpor kelas LoginPage
const testData = require("./fixtures/testData"); // Mengimpor data uji dari testData
const fs = require('fs'); // Mengimpor modul 'fs' untuk berinteraksi dengan sistem file
const path = require('path'); // Mengimpor modul 'path' untuk bekerja dengan jalur file
const { takeScreenshot, compareScreenshots } = require("../utils/screenshot"); // Mengimpor fungsi takeScreenshot dan compareScreenshots

async function loginTest() {
  describe("Login Test", function () { // Mendefinisikan suite pengujian untuk login
    let driver; // Mendeklarasikan variabel driver
    let loginPage; // Mendeklarasikan variabel loginPage

    before(async function () { // Hook before yang akan dijalankan sebelum pengujian
      this.timeout(30000); // Menetapkan batas waktu untuk hook ini menjadi 30 detik
      // Menginisialisasi WebDriver untuk Chrome
      driver = await new Builder().forBrowser("chrome").build();
      loginPage = new LoginPage(driver); // Membuat instance dari LoginPage
    });

    it("should log in with valid credentials", async function () { // Mendefinisikan pengujian untuk login dengan kredensial yang valid
      this.timeout(30000); // Menetapkan batas waktu untuk pengujian ini menjadi 30 detik
      // Membuka halaman login
      await loginPage.open("https://saucedemo.com");
      // Melakukan aksi login
      await loginPage.login(testData.validCredentials.username, testData.validCredentials.password);
      // Menunggu halaman beranda dimuat
      await driver.wait(until.titleIs("Swag Labs"), 5000);
      // Mengambil screenshot setelah login
      await takeScreenshot(driver, "login-success.png");
      // Memastikan bahwa URL benar setelah login
      const currentUrl = await driver.getCurrentUrl();
      assert.strictEqual(currentUrl, "https://www.saucedemo.com/inventory.html");
    });

    after(async function () { // Hook after yang akan dijalankan setelah pengujian
      // Menutup browser setelah pengujian
      await driver.quit();
    });
  });
}

loginTest(); // Menjalankan fungsi loginTest

// npm run test:login untuk menjalankan pengujian loginTest.js