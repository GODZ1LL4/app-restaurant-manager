const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// GET: listar pagos
router.get("/", async (req, res) => {
  try {
    const { limit, offset } = req.query;

    const headers = {
      Prefer: "count=exact"
    };

    // Paginar correctamente usando el header Range
    if (limit && offset) {
      const from = Number(offset);
      const to = from + Number(limit) - 1;
      headers.Range = `${from}-${to}`;
    }

    // Solo se permite filtrar y ordenar usando Supabase REST syntax:
    const response = await supabase.get("/pagos_restaurante?order=fecha.desc", {
      headers,
    });

    const pagos = response.data || [];

    const total = response.headers["content-range"]
      ? parseInt(response.headers["content-range"].split("/")[1])
      : pagos.length;

    res.json({ pagos, total });
  } catch (error) {
    console.error("❌ Error al obtener pagos:", error.message);
    res.status(500).json({ error: error.message });
  }
});


// POST: agregar pago
router.post('/', async (req, res) => {
  try {
    const { fecha, monto, descripcion,codigo_semana } = req.body;
    const response = await supabase.post('/pagos_restaurante', [{ fecha, monto, descripcion,codigo_semana }]);
    res.json(response.data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
