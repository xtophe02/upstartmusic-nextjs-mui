import dbConnect from '../../../../lib/dbConnect';
import Artist from '../../../../models/Artist';

export default async function handler(req, res) {
  try {
    await dbConnect();

    await Artist.deleteOne({ _id: req.query.id });

    res.status(200).json({ message: 'Successful deleted on database' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot connect to database' });
  }
}
