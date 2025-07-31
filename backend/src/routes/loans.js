const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar novo empréstimo
router.post('/', async (req, res) => {
  const { userId, equipmentId, startDate, status } = req.body;
  const loan = await prisma.loan.create({
    data: {
      userId,
      equipmentId,
      startDate: new Date(startDate),
      status
    }
  });
  await prisma.equipment.update({
    where: { id: equipmentId },
    data: { status: 'in_use' }
  });
  res.json(loan);
});

// Listar empréstimos por utilizador
router.get('/user/:id', async (req, res) => {
  const loans = await prisma.loan.findMany({
    where: { userId: parseInt(req.params.id) },
    include: { equipment: true }
  });
  res.json(loans);
});

module.exports = router;

