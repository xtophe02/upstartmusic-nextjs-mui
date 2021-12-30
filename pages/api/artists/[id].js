// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Artist from '../../../models/Artist';
import dbConnect from '../../../lib/dbConnect';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect();
      const artist = await Artist.findOne({ _id: req.query.id });

      res.status(200).json(artist);
    } catch (error) {
      res.status(500).json({ error: 'Cannot connect to database' });
    }
  } else {
    res.status(500).json({ error: 'no other methods allowed than get' });
  }
}
