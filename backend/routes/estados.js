const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// GET: listar estados
router.get('/', async (req, res) => {
  try {
    const response = await supabase.get('/estados?select=*');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: agregar estado
router.post('/', async (req, res) => {
  try {
    const { descripcion } = req.body;
    const response = await supabase.post('/estados', [{ descripcion }]);
    res.json(response.data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
