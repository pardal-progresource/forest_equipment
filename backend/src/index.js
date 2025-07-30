const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authRoutes = require('./routes/auth');
const equipmentRoutes = require('./routes/equipments');
const loanRoutes = require('./routes/loans');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/equipments', equipmentRoutes);
app.use('/api/loans', loanRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor backend iniciado na porta ${PORT}`));