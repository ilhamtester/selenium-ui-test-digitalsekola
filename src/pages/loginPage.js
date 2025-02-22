const { By, until } = require("selenium-webdriver"); // Mengimpor modul selenium-webdriver

class LoginPage {
  constructor(driver) { // Konstruktor untuk kelas LoginPage
    this.driver = driver; // Menyimpan instance driver
  }

  async open(url) { // Metode untuk membuka URL yang ditentukan
    await this.driver.get(url); // Membuka URL yang ditentukan
  }

  async login(username, password) { // Metode untuk melakukan login
    await this.driver.wait(until.elementLocated(By.id("user-name")), 10000); // Menunggu elemen input username ditemukan
    await this.driver.findElement(By.id("user-name")).sendKeys(username); // Memasukkan username
    await this.driver.wait(until.elementLocated(By.id("password")), 10000); // Menunggu elemen input password ditemukan
    await this.driver.findElement(By.id("password")).sendKeys(password); // Memasukkan password
    await this.driver.findElement(By.id("login-button")).click(); // Mengklik tombol login
  }
}

module.exports = LoginPage; // Mengekspor kelas LoginPage