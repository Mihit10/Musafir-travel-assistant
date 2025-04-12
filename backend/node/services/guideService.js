const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// CRUD operations for guides
const GuideService = {
  async createGuide(guide) {
    const query = `
      INSERT INTO guides (name, email, phone_number, adhar_card, years_of_experience, age, ratings, language, city, places)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;
    const values = [
      guide.name,
      guide.email,
      guide.phone_number,
      guide.adhar_card,
      guide.years_of_experience,
      guide.age,
      guide.ratings,
      guide.language,
      guide.city,
      guide.places,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async getGuides() {
    const result = await pool.query("SELECT * FROM guides;");
    return result.rows;
  },

  async updateGuide(id, guide) {
    const query = `
      UPDATE guides
      SET name = $1, email = $2, phone_number = $3, adhar_card = $4, years_of_experience = $5,
          age = $6, ratings = $7, language = $8, city = $9, places = $10
      WHERE id = $11
      RETURNING *;
    `;
    const values = [
      guide.name,
      guide.email,
      guide.phone_number,
      guide.adhar_card,
      guide.years_of_experience,
      guide.age,
      guide.ratings,
      guide.language,
      guide.city,
      guide.places,
      id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async deleteGuide(id) {
    const query = "DELETE FROM guides WHERE id = $1 RETURNING *;";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};

module.exports = GuideService;
