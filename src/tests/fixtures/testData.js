const testData = {
  "baseUrl": "https://www.saucedemo.com", // URL dasar untuk aplikasi yang diuji
  validCredentials: {
    username: "standard_user", // Username yang valid untuk login
    password: "secret_sauce" // Password yang valid untuk login
  },
  productDetails: {
    productName: "Sauce Labs Backpack", // Nama produk yang akan diuji
    productPrice: "$29.99" // Harga produk yang akan diuji
  },
  checkoutInfo: {
    firstName: "John", // Nama depan untuk informasi checkout
    lastName: "Doe", // Nama belakang untuk informasi checkout
    postalCode: "12345" // Kode pos untuk informasi checkout
  },
  shippingInfo: {
    firstName: "Jane", // Nama depan untuk informasi pengiriman
    lastName: "Doe", // Nama belakang untuk informasi pengiriman
    postalCode: "54321" // Kode pos untuk informasi pengiriman
  }
};

module.exports = testData; // Mengekspor objek testData