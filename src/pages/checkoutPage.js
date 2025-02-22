const { By, until } = require("selenium-webdriver"); // Mengimpor modul selenium-webdriver

class CheckoutPage {
  constructor(driver) { // Konstruktor untuk kelas CheckoutPage
    this.driver = driver; // Menyimpan instance driver
  }

  async open(url) { // Metode untuk membuka URL yang ditentukan
    await this.driver.get(url); // Membuka URL yang ditentukan
  }

  async enterShippingInformation(firstName, lastName, postalCode) { // Metode untuk memasukkan informasi pengiriman
    await this.driver.wait(until.elementLocated(By.id("first-name")), 50000); // Menunggu elemen input nama depan ditemukan
    await this.driver.findElement(By.id("first-name")).sendKeys(firstName); // Memasukkan nama depan
    await this.driver.wait(until.elementLocated(By.id("last-name")), 50000); // Menunggu elemen input nama belakang ditemukan
    await this.driver.findElement(By.id("last-name")).sendKeys(lastName); // Memasukkan nama belakang
    await this.driver.wait(until.elementLocated(By.id("postal-code")), 50000); // Menunggu elemen input kode pos ditemukan
    await this.driver.findElement(By.id("postal-code")).sendKeys(postalCode); // Memasukkan kode pos
  }

  async completeCheckout() { // Metode untuk menyelesaikan proses checkout
    await this.driver.wait(until.elementLocated(By.id("continue")), 50000); // Menunggu elemen tombol lanjut ditemukan
    await this.driver.findElement(By.id("continue")).click(); // Mengklik tombol lanjut
    await this.driver.wait(until.elementLocated(By.id("finish")), 50000); // Menunggu elemen tombol selesai ditemukan
    await this.driver.findElement(By.id("finish")).click(); // Mengklik tombol selesai
  }

  async getCheckoutConfirmation() { // Metode untuk mendapatkan konfirmasi checkout
    await this.driver.wait(until.elementLocated(By.className("complete-header")), 30000); // Menunggu elemen header konfirmasi ditemukan
    return await this.driver.findElement(By.className("complete-header")).getText(); // Mendapatkan teks konfirmasi
  }
}

module.exports = CheckoutPage; // Mengekspor kelas CheckoutPage