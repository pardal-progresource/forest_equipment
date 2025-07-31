const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

// Configuração do armazenamento de arquivos
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

// Middleware para verificar token JWT
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Listar todos os equipamentos
router.get('/', async (req, res) => {
  const equipments = await prisma.equipment.findMany();
  res.json(equipments);
});

// Criar novo equipamento com upload de imagem (protegido)
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
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
});

module.exports = router;
