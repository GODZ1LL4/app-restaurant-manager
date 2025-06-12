const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// GET: listar menú
router.get('/', async (req, res) => {
  try {
    const response = await supabase.get('/menu?select=*');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: agregar ítem al menú
router.post('/', async (req, res) => {
  try {
    const { nombre, precio } = req.body;
    const response = await supabase.post('/menu', [{ nombre, precio }]);
    res.json(response.data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
