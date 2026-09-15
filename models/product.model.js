const db = require("../data/database");
class Product {
  constructor(productData) {
    this.name = productData.name;
    this.price = +productData.price;
    this.summary = productData.summary;
    this.description = productData.description;
    this.image = productData.image;
    this.imagePath = `product-data/images/${productData.image}`;
    this.imageUrl = `/products/assets/images/${productData.image}`;
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }
  static async fetchAllProduct() {
    const products = await db.getDb().collection("products").find().toArray();
    return products.map(function (productDoc) {
      return new Product(productDoc);
    });
  }
  async saveProduct() {
    const productData = {
      name: this.name,
      price: +this.price,
      summary: this.summary,
      description: this.description,
      image: this.image,
    };
    await db.getDb().collection("products").insertOne(productData);
  }
}
module.exports = Product;
