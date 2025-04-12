const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// CRUD operations for vendors
const VendorService = {
  async createVendor(vendor) {
    const query = `
      INSERT INTO vendors (name, email, phone_number, gst_number, address, shop_type, city, ratings)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const values = [
      vendor.name,
      vendor.email,
      vendor.phone_number,
      vendor.gst_number,
      vendor.address,
      vendor.shop_type,
      vendor.city,
      vendor.ratings,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async getVendors() {
    const result = await pool.query("SELECT * FROM vendors;");
    return result.rows;
  },

  async updateVendor(id, vendor) {
    const query = `
      UPDATE vendors
      SET name = $1, email = $2, phone_number = $3, gst_number = $4, address = $5,
          shop_type = $6, city = $7, ratings = $8
      WHERE id = $9
      RETURNING *;
    `;
    const values = [
      vendor.name,
      vendor.email,
      vendor.phone_number,
      vendor.gst_number,
      vendor.address,
      vendor.shop_type,
      vendor.city,
      vendor.ratings,
      id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async deleteVendor(id) {
    const query = "DELETE FROM vendors WHERE id = $1 RETURNING *;";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};

module.exports = VendorService;
