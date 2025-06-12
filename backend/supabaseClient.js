const axios = require('axios');
require('dotenv').config();

const supabase = axios.create({
  baseURL: `${process.env.SUPABASE_URL}/rest/v1`,
  headers: {
    apikey: process.env.SUPABASE_API_KEY,
    Authorization: `Bearer ${process.env.SUPABASE_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

module.exports = supabase;
