const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const equipments = await prisma.equipment.findMany();
  res.json(equipments);
});

router.post('/', async (req, res) => {
  const { name, description, imageUrl, status } = req.body;
  const equipment = await prisma.equipment.create({ data: { name, description, imageUrl, status } });
  res.json(equipment);
});

module.exports = router;
