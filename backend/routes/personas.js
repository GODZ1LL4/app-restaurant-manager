const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// Obtener todas las personas
router.get('/', async (req, res) => {
  try {
    const response = await supabase.get('/personas?select=*');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Agregar persona
router.post('/', async (req, res) => {
  try {
    const { nombre } = req.body;
    const response = await supabase.post('/personas', [{ nombre }]);
    res.json(response.data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
