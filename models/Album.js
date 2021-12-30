import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
  title: String,
  date: Date,
  copiesSold: Number,
  numberTracks: Number,
  image: String,
  revenue: Number,
});

// const Album = mongoose.models.Album || mongoose.model('Album', albumSchema);

export default albumSchema;
