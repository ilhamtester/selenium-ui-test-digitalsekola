const { Builder, By, Key, until } = require("selenium-webdriver"); // Mengimpor modul selenium-webdriver
const assert = require("assert"); // Mengimpor modul assert untuk melakukan asersi
const CheckoutPage = require("../pages/checkoutPage"); // Mengimpor kelas CheckoutPage
const LoginPage = require("../pages/loginPage"); // Mengimpor kelas LoginPage
const { takeScreenshot } = require("../utils/screenshot"); // Mengimpor fungsi takeScreenshot
const testData = require("./fixtures/testData"); // Mengimpor data uji dari testData

async function CheckoutTest() {
  describe("Checkout Process Test", function () { // Mendefinisikan suite pengujian untuk proses checkout
    let driver; // Mendeklarasikan variabel driver
    let browserName = "chrome"; // Menentukan nama browser yang akan digunakan
    let checkoutPage; // Mendeklarasikan variabel checkoutPage
    let loginPage; // Mendeklarasikan variabel loginPage

    beforeEach(async function () { // Hook beforeEach yang akan dijalankan sebelum setiap pengujian
      this.timeout(60000); // Menetapkan batas waktu untuk hook ini menjadi 60 detik
      driver = await new Builder().forBrowser(browserName).build(); // Menginisialisasi WebDriver untuk Chrome
      loginPage = new LoginPage(driver); // Membuat instance dari LoginPage
      checkoutPage = new CheckoutPage(driver); // Membuat instance dari CheckoutPage

      // Masuk sebelum melanjutkan ke halaman checkout
      console.log("Opening login page..."); // Mencetak pesan ke konsol
      await loginPage.open(testData.baseUrl); // Membuka halaman login
      console.log("Logging in..."); // Mencetak pesan ke konsol
      await loginPage.login(testData.validCredentials.username, testData.validCredentials.password); // Melakukan login dengan kredensial yang valid
      console.log("Waiting for inventory page to load..."); // Mencetak pesan ke konsol
      await driver.wait(until.elementLocated(By.id("inventory_container")), 30000); // Menunggu halaman inventaris dimuat

      // Melanjutkan ke halaman checkout
      console.log("Opening checkout page..."); // Mencetak pesan ke konsol
      await driver.get(`${testData.baseUrl}/checkout-step-one.html`); // Membuka halaman checkout
      console.log("Waiting for first name input field..."); // Mencetak pesan ke konsol
      await driver.wait(until.elementLocated(By.id("first-name")), 50000); // Menunggu elemen input nama depan ditemukan
    });

    it("Complete Checkout Process", async function () { // Mendefinisikan pengujian untuk menyelesaikan proses checkout
      this.timeout(60000); // Menetapkan batas waktu untuk pengujian ini menjadi 60 detik
      const { firstName, lastName, postalCode } = testData.shippingInfo; // Mendapatkan informasi pengiriman dari testData
      console.log("Entering shipping information..."); // Mencetak pesan ke konsol
      await checkoutPage.enterShippingInformation(firstName, lastName, postalCode); // Memasukkan informasi pengiriman
      console.log("Completing checkout..."); // Mencetak pesan ke konsol
      await checkoutPage.completeCheckout(); // Menyelesaikan proses checkout
      
      // Memverifikasi bahwa checkout berhasil
      console.log("Verifying checkout confirmation..."); // Mencetak pesan ke konsol
      const confirmationMessage = await checkoutPage.getCheckoutConfirmation(); // Mendapatkan pesan konfirmasi checkout
      assert.strictEqual(confirmationMessage, "Thank you for your order!"); // Memastikan pesan konfirmasi sesuai dengan yang diharapkan

      // Mengambil screenshot setelah pengujian
      await takeScreenshot(driver, "checkout-success.png"); // Mengambil screenshot dan menyimpannya dengan nama "checkout-success.png"
    });

    afterEach(async function () { // Hook afterEach yang akan dijalankan setelah setiap pengujian
      console.log("Closing browser..."); // Mencetak pesan ke konsol
      await driver.quit(); // Menutup browser setelah pengujian
    });
  });
}
CheckoutTest(); // Menjalankan fungsi CheckoutTest

// npm run test:checkout untuk menjalankan pengujian checkoutTest.js 