const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/personas', require('./routes/personas'));
app.use('/api/menu', require('./routes/menu'));
app.use('/api/estados', require('./routes/estados'));
app.use('/api/pedidos', require('./routes/pedidos'));
app.use('/api/pagos', require('./routes/pagos'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor backend escuchando en http://localhost:${PORT}`));
