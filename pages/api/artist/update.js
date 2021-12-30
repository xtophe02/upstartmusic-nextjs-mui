import dbConnect from '../../../lib/dbConnect';
import Artist from '../../../models/Artist';

export default async function handler(req, res) {
  try {
    await dbConnect();
    const id = req.body.id;
    delete req.body.id;
    let albums;
    if (req.body.albums) {
      albums = req.body.albums;
      delete req.body.albums;
    }

    const artist = await Artist.updateOne(
      { _id: id },
      {
        ...req.body,
        $addToSet: { albums },
      }
    );
    console.log(artist);
    res.status(200).json(artist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot connect to database' });
  }
}
