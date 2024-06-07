const express = require('express');
const app = express();

app.use(express.json()); // Habilita el parsing de JSON en las solicitudes

app.post('/api/compra', (req, res) => {
  // Procesar la compra aquí
  const cartData = req.body.cartData;
  const totalAmount = req.body.totalAmount;
  //...
  res.json({ success: true, message: 'Compra procesada con éxito' });
});

app.listen(3000, () => {
  console.log('Servidor iniciado en puerto 3000');
});