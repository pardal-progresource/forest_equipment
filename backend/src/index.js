const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// Importação de rotas
const authRoutes = require('./routes/auth');
const equipmentRoutes = require('./routes/equipments');
const loanRoutes = require('./routes/loans');

// Middlewares
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta uploads (acesso público às imagens)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/equipments', equipmentRoutes);
app.use('/api/loans', loanRoutes);

// Inicialização do servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor backend iniciado na porta ${PORT}`));
