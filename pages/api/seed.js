import { createArtist } from '../../lib/seed_helper';
import dbConnect from '../../lib/dbConnect';
import _ from 'lodash';
import Artist from '../../models/Artist';

export default async function handler(req, res) {
  try {
    await dbConnect();

    const artists = _.times(15, () => createArtist());
    // console.log(artists);
    const albunsCount = artists.reduce(
      (acc, val) => val.albums.length + acc,
      0
    );
    const { data } = await imageUnsplash('person');
    data.forEach((element, i) => {
      artists[i].image = element.urls.regular;
    });

    const { data: data2 } = await imageUnsplash('minimal', albunsCount);
    let count = 0;
    artists.forEach((artist) => {
      artist.albums.forEach((album) => {
        album.image = data2[count].urls.regular;
        count = count + 1;
      });
    });

    // await Artist.deleteMany();

    //await Artist.insertMany(artists);
    res.status(200).json({ message: 'successful seeded!!!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot connect to database' });
  }
}
