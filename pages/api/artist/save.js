import dbConnect from '../../../lib/dbConnect';
import Artist from '../../../models/Artist';

export default async function handler(req, res) {
  try {
    await dbConnect();

    const user = new Artist({ ...req.body });
    await user.save();

    res.status(200).json({ message: 'Successful saved on database' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot connect to database' });
  }
}
