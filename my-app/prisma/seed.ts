import prisma from "../src/lib/prisma";

async function main() {
  // Clear existing data so seed can be re-run safely.
  await prisma.task.deleteMany();
  await prisma.taskList.deleteMany();

  await prisma.taskList.createMany({
    data: [
      { isS1: true, },
      { isS1: false, },
    ],
  });

  const personalTasks = [
    { name: "Buy groceries", isComplete: false},
    { name: "Call Mom", isComplete: false },
  ];

  const professionalTasks = [
    { name: "Send project update", isComplete: false },
    { name: "Prepare presentation", isComplete: false },
  ];

  for (const task of personalTasks) {
    await prisma.task.create({
      data: {
        ...task,
        pageIsS1: true,
      },
    });
  }

  for (const task of professionalTasks) {
    await prisma.task.create({
      data: {
        ...task,
        pageIsS1: false,
      },
    });
  }

  console.log(`Seeded ${personalTasks.length} personal tasks and ${professionalTasks.length} professional tasks.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
