import _ from 'lodash';
import faker from 'faker';

// console.log(imageUnsplash[0].urls.regular);

export function createArtist() {
  return {
    name: faker.name.findName(),
    age: randomBetween(15, 45),
    yearsActive: randomBetween(0, 15),
    // image: imageUnsplash('person'),
    genre: faker.music.genre(),
    website: faker.internet.url(),
    netWorth: randomBetween(0, 5000000),
    labelName: faker.company.companyName(),
    retired: faker.datatype.boolean(),
    albums: getAlbums(),
  };
}

function getAlbums() {
  return _.times(randomBetween(2, 5), () => {
    const copiesSold = randomBetween(1, 1000000);

    return {
      title: _.capitalize(faker.random.words()),
      date: faker.date.past(),
      copiesSold,
      numberTracks: randomBetween(1, 20),
      // image: faker.image.imageUrl(),
      revenue: copiesSold * 12.99,
    };
  });
}

function getAlbumImage() {
  const types = _.keys(faker.image);
  const method = randomEntry(types);

  return faker.image[method]();
}

function randomEntry(array) {
  return array[~~(Math.random() * array.length)];
}

function randomBetween(min, max) {
  return ~~(Math.random() * (max - min)) + min;
}
