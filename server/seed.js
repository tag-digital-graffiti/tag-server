const db = require('./db')
const {User, Tag} = require('./db/models')
const {green, red} = require('chalk')

// var Promise = require('bluebird');

const seed = async () => {
  await db.sync({force: true})

  // seed your database here!
  const userOne = await User.create({
    username: 'Grapher',
    password: '1234'
  })

  const userTwo = await User.create({
    username: 'Banksy',
    password: '1234'
  })

  const userThree = await User.create({
    username: 'talia',
    password: '1234'
  })

  const userFour = await User.create({
    username: 'Maddog',
    password: '1234'
  })

  const tagOne = await Tag.create({
    imageUrl: '75 Wall St',
    lat: 40.7049444,
    long: -74.0091771,
    assetUrl: 'https://i.imgur.com/qUS6CBj.jpg',
    arTagUrl:
      'https://res.cloudinary.com/coolcaps/image/upload/v1562871027/jdqkivwkkrir0cmee3hv.png',
    userId: 4
  })

  const tagSeven = await Tag.create({
    imageUrl: '75 Wall St',
    lat: 40.7049444,
    long: -74.0091771,
    assetUrl: 'https://i.imgur.com/qUS6CBj.jpg',
    arTagUrl:
      'https://res.cloudinary.com/coolcaps/image/upload/v1562951499/svaj4zj84tuifk2p7okm.png',
    userId: 4
  })

  const tagTwo = await Tag.create({
    imageUrl: '75 Wall St',
    lat: 40.7049444,
    long: -74.0091773,
    assetUrl: 'https://i.imgur.com/IiDUaeJ.png',
    arTagUrl:
      'https://res.cloudinary.com/coolcaps/image/upload/v1562872857/vw35iovjjnf3mjcy43xa.png',
    userId: 4
  })

  const tagThree = await Tag.create({
    imageUrl: '75 Wall St',
    lat: 40.7049444,
    long: -74.0091773,
    assetUrl: 'https://i.imgur.com/7QqWk03.png',
    arTagUrl: 'https://i.imgur.com/hF8Okvi.png',
    userId: 4
  })

  const tagFour = await Tag.create({
    imageUrl: 'Lawrence, NJ',
    lat: 40.629501,
    long: -73.985001,
    assetUrl: 'https://i.imgur.com/qUS6CBj.jpg',
    arTagUrl:
      'https://res.cloudinary.com/coolcaps/image/upload/v1562798486/xjeurmkbhtsld0xi6ysj.png',
    userId: 4
  })

  const tagFive = await Tag.create({
    imageUrl: 'Lawrence, NJ',
    lat: 40.753849,
    long: -73.978435,
    assetUrl: 'https://i.imgur.com/IiDUaeJ.png',
    arTagUrl:
      'https://res.cloudinary.com/coolcaps/image/upload/v1562363991/nukg2iiszvqybgynbyyp.png',
    userId: 1
  })

  const tagSix = await Tag.create({
    imageUrl: 'Lawrence, NJ',
    lat: 40.779756,
    long: -73.955071,
    assetUrl: 'https://i.imgur.com/7QqWk03.png',
    arTagUrl:
      'https://res.cloudinary.com/coolcaps/image/upload/v1562798757/ido9zxutdvk6bbqdzski.png',
    userId: 2
  })

  console.log(green('Seeding success!'))
  db.close()
}

// const syncDb = () => db.sync({ force: true });
//syncDb();
seed().catch(err => {
  console.error(red('Oh noes! Something went wrong!'))
  console.error(err)
  db.close()
})
