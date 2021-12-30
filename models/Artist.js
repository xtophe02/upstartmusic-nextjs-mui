import mongoose from 'mongoose';
import Album from './Album';

const artistSchema = new mongoose.Schema({
  name: String,
  age: Number,
  yearsActive: Number,
  image: String,
  genre: String,
  website: String,
  netWorth: Number,
  labelName: String,
  retired: Boolean,
  albums: [Album], //subdocument
});

const Artist = mongoose.models.Artist || mongoose.model('Artist', artistSchema);

export default Artist;
