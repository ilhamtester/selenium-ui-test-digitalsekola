const { By, until } = require("selenium-webdriver"); // Mengimpor modul selenium-webdriver

class HomePage {
  constructor(driver) { // Konstruktor untuk kelas HomePage
    this.driver = driver; // Menyimpan instance driver
  }

  async open(url) { // Metode untuk membuka URL yang ditentukan
    await this.driver.get(url); // Membuka URL di browser
  }

  async getProducts() { // Metode untuk mendapatkan daftar produk di halaman
    await this.driver.wait(until.elementsLocated(By.className("inventory_item")), 5000); // Menunggu hingga elemen produk ditemukan
    return await this.driver.findElements(By.className("inventory_item")); // Mengembalikan daftar elemen produk
  }

  async addProductToCart(index) { // Metode untuk menambahkan produk ke keranjang berdasarkan indeks
    const products = await this.getProducts(); // Mendapatkan daftar produk
    if (products.length > index) { // Memeriksa apakah indeks valid
      await products[index].findElement(By.className("btn_inventory")).click(); // Mengklik tombol tambah ke keranjang
    }
  }

  async getCartCount() { // Metode untuk mendapatkan jumlah item di keranjang
    await this.driver.wait(until.elementLocated(By.className("shopping_cart_badge")), 5000); // Menunggu hingga ikon keranjang muncul
    return parseInt(await this.driver.findElement(By.className("shopping_cart_badge")).getText(), 10); // Mengembalikan jumlah item di keranjang sebagai angka
  }
}

module.exports = HomePage; // Mengekspor kelas HomePage untuk digunakan di file lain
