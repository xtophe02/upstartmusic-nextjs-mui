import { func } from 'prop-types';
import dbConnect from '../lib/dbConnect';
import Artist from '../models/Artist';

const ELEMENTS_PAGE = 10;

export const getAllArtists = async () => {
  try {
    await dbConnect();
    const artistsCount = await Artist.count();
    const artists = await Artist.find()
      .sort({ name: '1' })
      .limit(ELEMENTS_PAGE);
    const ageMin = await Artist.find({}, 'age').sort({ age: '1' }).limit(1);
    const yearsActiveMin = await Artist.find({}, 'yearsActive')
      .sort({ yearsActive: '1' })
      .limit(1);
    const ageMax = await Artist.find({}, 'age').sort({ age: '-1' }).limit(1);
    const yearsActiveMax = await Artist.find({}, 'yearsActive')
      .sort({ yearsActive: '-1' })
      .limit(1);
    return {
      artistsCount,
      artists: JSON.stringify(artists),
      age: [ageMin[0].age, ageMax[0].age],
      yearsActive: [
        yearsActiveMin[0].yearsActive,
        yearsActiveMax[0].yearsActive,
      ],
    };
  } catch (error) {
    console.log(error);
  }
};

export const getAllArtistsId = async () => {
  try {
    await dbConnect();
    const ids = await Artist.find({}, '_id');

    return JSON.stringify(ids);
  } catch (error) {
    console.log(error);
  }
};

export const getArtistById = async (id) => {
  try {
    await dbConnect();
    const artist = await Artist.findOne({ _id: id });
    return JSON.stringify(artist);
  } catch (error) {
    console.log(error);
  }
};
