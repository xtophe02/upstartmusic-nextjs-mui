import dbConnect from '../../../lib/dbConnect';
import Artist from '../../../models/Artist';

const ELEMENTS_PAGE = 10;

export default async function handler(req, res) {
  try {
    await dbConnect();
    let artists;
    // console.log(req.query);
    if (Object.keys(req.query).length !== 0) {
      let { sort, page, order, age, yearsActive, text } = req.query;
      age = JSON.parse(age);
      yearsActive = JSON.parse(yearsActive);

      const buildQuery = () => {
        const query = {};
        if (age) {
          query.age = { $gte: age[0], $lte: age[1] };
        }
        if (yearsActive) {
          query.yearsActive = { $gte: yearsActive[0], $lte: yearsActive[1] };
        }
        if (text.trim() !== '') {
          query.$text = { $search: text };
          query.score = { $meta: 'textScore' };
        }
        // console.log(query);
        return query;
        // $text: { $search: text },
        // age: { $gte: age[0], $lte: age[1] },
        // yearsActive: ,
      };

      const total = await Artist.count(buildQuery());

      artists = await Artist.find(buildQuery())

        .sort({ [sort]: order })
        // .sort({ score: { $meta: 'textScore' } });
        .skip(ELEMENTS_PAGE * Number(page) - ELEMENTS_PAGE)
        .limit(ELEMENTS_PAGE);
      res.status(200).json({ artists, total });
    } else {
      const total = await Artist.find().sort({ age: '1' });
      const SortActiveYears = await Artist.find().sort({ yearsActive: '1' });

      artists = await Artist.find().sort({ name: '1' }).limit(10);
      res.status(200).json({
        artists,
        total,
        age: [total[0].age, total[total.length - 1].age],
        yearsActive: [
          SortActiveYears[0].yearsActive,
          SortActiveYears[SortActiveYears.length - 1].yearsActive,
        ],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot connect to database' });
  }
}
