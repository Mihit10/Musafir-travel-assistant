const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// CRUD operations for homestays
const HomestayService = {
  async createHomestay(homestay) {
    const query = `
      INSERT INTO homestays (
        owner_name, phone_number, ratings, city, place, cost_per_night, 
        room_category, is_ac, amenities, rooms_available
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;
    const values = [
      homestay.owner_name,
      homestay.phone_number,
      homestay.ratings,
      homestay.city,
      homestay.place,
      homestay.cost_per_night,
      homestay.room_category,
      homestay.is_ac,
      homestay.amenities,
      homestay.rooms_available,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async getHomestays() {
    const result = await pool.query("SELECT * FROM homestays;");
    return result.rows;
  },

  async updateHomestay(id, homestay) {
    const query = `
      UPDATE homestays
      SET owner_name = $1, phone_number = $2, ratings = $3, city = $4, place = $5,
          cost_per_night = $6, room_category = $7, is_ac = $8, amenities = $9, 
          rooms_available = $10
      WHERE id = $11
      RETURNING *;
    `;
    const values = [
      homestay.owner_name,
      homestay.phone_number,
      homestay.ratings,
      homestay.city,
      homestay.place,
      homestay.cost_per_night,
      homestay.room_category,
      homestay.is_ac,
      homestay.amenities,
      homestay.rooms_available,
      id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async deleteHomestay(id) {
    const query = "DELETE FROM homestays WHERE id = $1 RETURNING *;";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};

module.exports = HomestayService;
