const { Builder, By, Key, until } = require("selenium-webdriver"); // Mengimpor modul selenium-webdriver
const assert = require("assert"); // Mengimpor modul assert untuk melakukan asersi
const HomePage = require("../pages/homePage"); // Mengimpor kelas HomePage
const LoginPage = require("../pages/loginPage"); // Mengimpor kelas LoginPage
const { takeScreenshot } = require("../utils/screenshot"); // Mengimpor fungsi takeScreenshot
const testData = require("./fixtures/testData"); // Mengimpor data uji dari testData

async function HomeTest() {
  describe("Home Page Test", function () { // Mendefinisikan suite pengujian untuk halaman beranda
    let driver; // Mendeklarasikan variabel driver
    let browserName = "chrome"; // Menentukan nama browser yang akan digunakan
    let homePage; // Mendeklarasikan variabel homePage
    let loginPage; // Mendeklarasikan variabel loginPage

    beforeEach(async function () { // Hook beforeEach yang akan dijalankan sebelum setiap pengujian
      this.timeout(30000); // Menetapkan batas waktu untuk hook ini menjadi 30 detik
      // Menginisialisasi WebDriver
      driver = await new Builder().forBrowser(browserName).build();
      loginPage = new LoginPage(driver); // Membuat instance dari LoginPage
      homePage = new HomePage(driver); // Membuat instance dari HomePage

      // Masuk sebelum melanjutkan ke halaman beranda
      await loginPage.open("https://saucedemo.com"); // Membuka halaman login
      await loginPage.login(testData.validCredentials.username, testData.validCredentials.password); // Melakukan login dengan kredensial yang valid
      await driver.wait(until.titleIs("Swag Labs"), 5000); // Menunggu halaman beranda dimuat
    });

    it("View Products", async function () { // Mendefinisikan pengujian untuk melihat produk
      this.timeout(30000); // Menetapkan batas waktu untuk pengujian ini menjadi 30 detik
      // Memverifikasi bahwa produk ditampilkan di halaman beranda
      const products = await homePage.getProducts();
      assert.strictEqual(products.length > 0, true, "No products found on the home page"); // Memastikan bahwa produk ditemukan di halaman beranda
      await takeScreenshot(driver, "view_products.png"); // Mengambil screenshot dan menyimpannya dengan nama "view_products.png"
    });

    it("Add Product to Cart", async function () { // Mendefinisikan pengujian untuk menambahkan produk ke keranjang
      this.timeout(30000); // Menetapkan batas waktu untuk pengujian ini menjadi 30 detik
      // Menambahkan produk pertama ke keranjang
      await homePage.addProductToCart(0);
      const cartCount = await homePage.getCartCount();
      assert.strictEqual(cartCount, 1, "Product was not added to the cart"); // Memastikan bahwa produk berhasil ditambahkan ke keranjang
      await takeScreenshot(driver, "add_product_to_cart.png"); // Mengambil screenshot dan menyimpannya dengan nama "add_product_to_cart.png"
    });

    afterEach(async function () { // Hook afterEach yang akan dijalankan setelah setiap pengujian
      // Menutup browser setelah setiap pengujian
      await driver.quit();
    });
  });
}

HomeTest(); // Menjalankan fungsi HomeTest

// npm run test:home untuk menjalankan pengujian homeTest.js