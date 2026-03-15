import { prisma } from "../lib/prisma";

async function main() {
  // Clear previous data for reset
  await prisma.friendship.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.friend.deleteMany();

  // adding friends
  const friendX = await prisma.friend.create({
    data: { name: "Alex", notes: "Met at university" }
  });

  const friendY = await prisma.friend.create({
    data: { name: "Sam", notes: "Hiking buddy" }
  });

//   const jordan = await prisma.friend.create({
//     data: { name: "Jordan", notes: "Gamer friend" }
//   });

  // adding tags
  const universityTag = await prisma.tag.create({
    data: { name: "University", friendId: friendX.id }
  });

  const hikingTag = await prisma.tag.create({
    data: { name: "Hiking", friendId: friendY.id }
  });

  const gamingTag = await prisma.tag.create({
    data: { name: "Gaming", friendId: friendX.id }
  });

  const gymTagY = await prisma.tag.create({
    data: { name: "Gym", friendId: friendY.id }
  });

    const gymTagX = await prisma.tag.create({
    data: { name: "Gym", friendId: friendX.id }
  });

  // --- 3. Set primary tag (for clustering) ---
  await prisma.friend.update({
    where: { id: friendX.id },
    data: { primaryTagId: universityTag.id }
  });

  await prisma.friend.update({
    where: { id: friendY.id },
    data: { primaryTagId: hikingTag.id }
  });

//   await prisma.friend.update({
//     where: { id: jordan.id },
//     data: { primaryTagId: gamingTag.id }
//   });

  // create mutual friendships
  await prisma.friendship.create({
    data: { friendAId: friendX.id, friendBId: friendY.id }
  });

//   await prisma.friendship.create({
//     data: { friendAId: alex.id, friendBId: jordan.id }
//   });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });