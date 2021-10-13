import prisma from '@lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
  const session = await getSession({ req });
  const username = session.user.username;

  const result = await prisma.user.delete({
    where: {
      username: username,
    },
  });
  res.json(result);
}
