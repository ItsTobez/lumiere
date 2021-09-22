import prisma from '@lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
  const { username } = req.body;
  const session = await getSession({ req });

  const result = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      username,
    },
  });
  res.json(result);
}
