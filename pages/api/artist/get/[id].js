import dbConnect from '../../../../lib/dbConnect';
import Artist from '../../../../models/Artist';

export default async function handler(req, res) {
  try {
    await dbConnect();

    const artist = await Artist.findById(req.query.id);

    res.status(200).json(artist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot connect to database' });
  }
}
