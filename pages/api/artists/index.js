import dbConnect from '../../../lib/dbConnect';
import Artist from '../../../models/Artist';

const ELEMENTS_PAGE = 10;

export default async function handler(req, res) {
  try {
    await dbConnect();

    let { sort, page, order, age, yearsActive, text } = req.query;

    const buildQuery = () => {
      const query = {};
      if (age) {
        age = JSON.parse(age);
        query.age = { $gte: age[0], $lte: age[1] };
      }
      if (yearsActive) {
        yearsActive = JSON.parse(yearsActive);
        query.yearsActive = { $gte: yearsActive[0], $lte: yearsActive[1] };
      }
      if (text && text.trim() !== '') {
        query.$text = { $search: text };
        query.score = { $meta: 'textScore' };
      }

      return query;
    };
    const query = buildQuery();

    const artistsCount = await Artist.count(query);
    const artists = await Artist.find(query)

      .sort({ [sort]: order })
      // .sort({ score: { $meta: 'textScore' } });
      .skip(ELEMENTS_PAGE * Number(page) - ELEMENTS_PAGE)
      .limit(ELEMENTS_PAGE);
    res.status(200).json({ artists, artistsCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot connect to database' });
  }
}
