import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;

  if (password !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  // Create a session token (in a real app, you'd want to use a proper session ID)
  const token = Buffer.from(Date.now().toString()).toString('base64');

  // Set cookie
  const cookie = serialize('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 // 24 hours
  });

  res.setHeader('Set-Cookie', cookie);
  res.status(200).json({ success: true });
}
