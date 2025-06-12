const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");

// GET: listar pedidos con JOIN virtual
router.get("/", async (req, res) => {
  try {
    const { limit, offset } = req.query;

    const params = {
      select: 'id,fecha,fecha_pago,nota,monto_pagado,estado_id,persona:persona_id(nombre),menu:menu_id(nombre,precio),estado:estado_id(descripcion)',
      order: 'fecha.desc'
    };

    const headers = {};

    let response;

    if (limit && offset) {
      // Si hay paginación
      params.limit = limit;
      params.offset = offset;
      headers.Prefer = 'count=exact';

      response = await supabase.get('/pedidos', {
        params,
        headers
      });

      const total = parseInt(response.headers['content-range']?.split('/')[1] || response.data.length);

      res.json({
        pedidos: response.data,
        total
      });
    } else {
      // Sin paginación
      response = await supabase.get('/pedidos', { params });
      res.json({ pedidos: response.data });
    }

  } catch (error) {
    console.error('❌ Error al obtener pedidos:', error.message);
    res.status(500).json({ error: error.message });
  }
});






// POST: agregar pedido
router.post("/", async (req, res) => {
  try {
    let { persona_id, menu_id, fecha, estado_id, fecha_pago, nota } = req.body;

    // Si el estado es pagado (1) y no viene fecha_pago, asigna fecha actual
    if (parseInt(estado_id) === 1 && !fecha_pago) {
      fecha_pago = new Date().toISOString().split("T")[0];
    }

    const payload = [
      { persona_id, menu_id, fecha, estado_id, fecha_pago, nota },
    ];
    const response = await supabase.post("/pedidos", payload);
    res.json(response.data[0]);
  } catch (error) {
    console.error(
      "❌ Error al guardar pedido:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// PUT: actualizar pedido
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let { estado_id, fecha_pago, nota, monto_pagado } = req.body;

    if (parseInt(estado_id) === 1 && !fecha_pago) {
      fecha_pago = new Date().toISOString().split("T")[0];
    }

    const payload = { estado_id, fecha_pago, nota, monto_pagado };
    const response = await supabase.patch(`/pedidos?id=eq.${id}`, payload);

    res.json(response.data[0]);
  } catch (error) {
    console.error(
      "❌ Error al actualizar pedido:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

module.exports = router;
