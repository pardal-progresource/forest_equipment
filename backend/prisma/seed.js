const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.equipment.findMany();
  if (existing.length > 0) return;

  await prisma.equipment.createMany({
    data: [
      {
        name: 'Vara telescópica VTL1',
        description: 'Equipamento analógico para medição de altura',
        imageUrl: null,
        status: 'disponível'
      },
      {
        name: 'Vertex VTX1',
        description: 'Equipamento digital para medição de altura',
        imageUrl: null,
        status: 'indisponível'
      }
    ]
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
