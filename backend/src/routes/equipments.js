// backend/src/routes/equipments.js
const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Importação dos middlewares
const authenticateToken = require('../middleware/auth');
const authorizedRoles = require('../middleware/roles');

// Configuração de armazenamento para upload de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
const upload = multer({ storage });

// Rota: GET /api/equipments - Listar todos os equipamentos
router.get('/', async (req, res) => {
  try {
    const equipments = await prisma.equipment.findMany();
    res.json(equipments);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar equipamentos' });
  }
});

// Rota: POST /api/equipments - Criar equipamento (apenas para admin)
router.post(
  '/',
  authenticateToken,
  authorizedRoles('admin'),
  upload.single('image'),
  async (req, res) => {
    try {
      const { name, description, status } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      const equipment = await prisma.equipment.create({
        data: {
          name,
          description,
          imageUrl,
          status
        }
      });

      res.status(201).json(equipment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao criar equipamento' });
    }
  }
);

module.exports = router;
